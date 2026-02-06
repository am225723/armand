"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * ArcheryGame.jsx (mobile-first)
 * - Uses real assets from /public/game:
 *    /game/bow.png
 *    /game/arrow.png
 *    /game/candle.png
 * - Drag to aim + power
 * - Gravity arc + dotted trajectory preview
 * - Subtle wind
 * - Particles on hit
 * - Haptics + Sound toggles (default OFF)
 *
 * Props:
 *  - onComplete?: () => void
 *  - candleCount?: number (default 7)
 *  - width?: number|string (default "100%")
 *  - height?: number (default 420)
 */

function clamp01(x) {
  return Math.max(0, Math.min(1, x));
}

function rectsIntersect(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function nowSec() {
  return performance.now() / 1000;
}

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function ArcheryGame({
  onComplete,
  candleCount = 7,
  width = "100%",
  height = 420,
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  const [soundOn, setSoundOn] = useState(false);
  const [hapticsOn, setHapticsOn] = useState(false);
  const [assetsReady, setAssetsReady] = useState(false);
  const [shots, setShots] = useState(0);
  const [remaining, setRemaining] = useState(candleCount);

  const reducedMotion = useMemo(() => prefersReducedMotion(), []);

  // Keep these as refs so toggling doesn't restart the simulation.
  const soundOnRef = useRef(soundOn);
  const hapticsOnRef = useRef(hapticsOn);
  useEffect(() => void (soundOnRef.current = soundOn), [soundOn]);
  useEffect(() => void (hapticsOnRef.current = hapticsOn), [hapticsOn]);

  const audioRef = useRef(null); // WebAudio context + nodes
  const playClick = (freq = 520, durationMs = 60) => {
    if (!soundOnRef.current) return;
    try {
      if (!audioRef.current) {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        audioRef.current = { ctx: new Ctx() };
      }
      const ctx = audioRef.current.ctx;
      if (ctx.state === "suspended") ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.value = 0.0001;

      osc.connect(gain);
      gain.connect(ctx.destination);

      const t0 = ctx.currentTime;
      gain.gain.setValueAtTime(0.0001, t0);
      gain.gain.exponentialRampToValueAtTime(0.08, t0 + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + durationMs / 1000);

      osc.start(t0);
      osc.stop(t0 + durationMs / 1000 + 0.02);
    } catch {
      // ignore
    }
  };

  const vibrate = (pattern = 10) => {
    if (!hapticsOnRef.current) return;
    if (navigator && "vibrate" in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch {
        // ignore
      }
    }
  };

  // Load assets (real bow/arrow/candle)
  const imagesRef = useRef({
    bow: null,
    arrow: null,
    candle: null,
    loaded: false,
  });

  useEffect(() => {
    let cancelled = false;

    const bow = new Image();
    const arrow = new Image();
    const candle = new Image();

    // IMPORTANT: case-sensitive on Vercel/Linux. Match filenames exactly in /public/game.
    bow.src = "/game/bow.png";
    arrow.src = "/game/arrow.png";
    candle.src = "/game/candle.png";

    let loaded = 0;
    const onLoad = () => {
      loaded += 1;
      if (!cancelled && loaded === 3) {
        imagesRef.current = { bow, arrow, candle, loaded: true };
        setAssetsReady(true);
      }
    };
    const onError = () => {
      // If any fail, we still run with drawn fallbacks.
      // We only mark ready if all 3 loaded; otherwise keep false.
    };

    bow.onload = onLoad;
    arrow.onload = onLoad;
    candle.onload = onLoad;

    bow.onerror = onError;
    arrow.onerror = onError;
    candle.onerror = onError;

    return () => {
      cancelled = true;
    };
  }, []);

  // Simulation state lives in refs (no re-render loop)
  const simRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d", { alpha: true });

    let raf = 0;
    let last = performance.now();

    // HiDPI canvas (fixes "low quality" on mobile)
    const resize = () => {
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
    };

    resize();
    window.addEventListener("resize", resize);

    // Create candles arranged in an arc-ish row
    const init = () => {
      const rect = canvas.getBoundingClientRect();
      const W = rect.width;
      const H = rect.height;

      const candles = Array.from({ length: candleCount }).map((_, i) => {
        const spread = Math.min(46, Math.max(26, W / (candleCount + 3)));
        const baseX = W * 0.55;
        const x = baseX + i * spread;
        const y = H * 0.46 + Math.sin(i * 0.35) * 4;

        // Candle draw size (tuned to feel like your asset scale)
        const h = Math.max(72, Math.min(110, H * 0.22));
        const w = h * 0.32;

        return {
          x,
          y,
          w,
          h,
          lit: true,
          flicker: Math.random() * 10,
        };
      });

      // Bow anchor (bottom-left)
      const bowAnchor = { x: 26, y: H - 34 };

      // Wind (small)
      const wind = (Math.random() * 2 - 1) * (reducedMotion ? 0 : 70);

      simRef.current = {
        W,
        H,
        bowAnchor,
        wind,
        aiming: false,
        aimNow: { x: bowAnchor.x + 80, y: bowAnchor.y - 120 },
        arrows: [],
        particles: [],
        candles,
        done: false,
        finishedAt: null,
      };

      setRemaining(candles.filter((c) => c.lit).length);
      setShots(0);
    };

    init();

    // Helpers: background and particles
    const drawBackground = (W, H) => {
      // parchment-ish gradient (matches your card world better)
      const g = ctx.createLinearGradient(0, 0, 0, H);
      g.addColorStop(0, "#161412");
      g.addColorStop(0.45, "#0f0e0d");
      g.addColorStop(1, "#0b0a09");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);

      // subtle vignette
      ctx.save();
      ctx.globalAlpha = 0.18;
      ctx.fillStyle = "#000";
      ctx.beginPath();
      ctx.rect(0, 0, W, H);
      ctx.rect(10, 10, W - 20, H - 20);
      ctx.fill("evenodd");
      ctx.restore();
    };

    const spawnSparks = (x, y) => {
      const s = simRef.current;
      for (let i = 0; i < 24; i++) {
        s.particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 420,
          vy: (Math.random() - 0.9) * 520,
          life: 0.38 + Math.random() * 0.22,
        });
      }
    };

    const capsulePath = (x, y, w, h) => ({ x, y, w, h }); // placeholder for hitbox readability

    // Physics constants (tuned for mobile)
    const GRAVITY = 1500; // px/s^2
    const MAX_POWER = 1100;
    const MIN_POWER = 350;

    const shoot = () => {
      const s = simRef.current;
      if (!s || s.done) return;

      const startX = s.bowAnchor.x + 72;
      const startY = s.bowAnchor.y - 122;

      const dx = startX - s.aimNow.x;
      const dy = startY - s.aimNow.y;

      const dist = Math.hypot(dx, dy);
      // drag distance to power (clamped)
      const power = Math.max(MIN_POWER, Math.min(MAX_POWER, dist * 7));

      const angle = Math.atan2(dy, dx);

      // Arrow sizing (drawn image gets scaled)
      s.arrows.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * power,
        vy: Math.sin(angle) * power,
        rot: angle,
        alive: true,
        length: 130,
        thickness: 10,
      });

      setShots((v) => v + 1);
      playClick(420, 55);
      vibrate(10);
    };

    // Pointer events (mobile friendly)
    const onDown = (e) => {
      const s = simRef.current;
      if (!s || s.done) return;

      // Ensure webaudio can start on user gesture
      if (soundOnRef.current) playClick(220, 1);

      s.aiming = true;
      const rect = canvas.getBoundingClientRect();
      s.aimNow = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMove = (e) => {
      const s = simRef.current;
      if (!s || !s.aiming || s.done) return;
      const rect = canvas.getBoundingClientRect();
      s.aimNow = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onUp = () => {
      const s = simRef.current;
      if (!s || !s.aiming || s.done) return;
      s.aiming = false;
      shoot();
    };

    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    canvas.addEventListener("pointerleave", onUp);

    const update = (dt) => {
      const s = simRef.current;
      if (!s) return;

      // update arrows
      for (const a of s.arrows) {
        if (!a.alive) continue;

        a.vy += GRAVITY * dt;
        a.vx += s.wind * dt * 0.2; // wind influence
        a.x += a.vx * dt;
        a.y += a.vy * dt;
        a.rot = Math.atan2(a.vy, a.vx);

        // kill if out of bounds
        if (a.x > s.W + 160 || a.y > s.H + 160 || a.y < -260) a.alive = false;

        // collisions
        const arrowBox = { x: a.x - 10, y: a.y - 6, w: 44, h: 16 };
        for (const c of s.candles) {
          if (!c.lit) continue;
          const candleBox = capsulePath(c.x - c.w / 2, c.y - c.h, c.w, c.h);
          if (rectsIntersect(arrowBox, candleBox)) {
            c.lit = false;
            a.alive = false;

            spawnSparks(c.x, c.y - c.h * 0.75);
            playClick(760, 70);
            vibrate([12, 18, 12]);

            const left = s.candles.filter((cc) => cc.lit).length;
            setRemaining(left);

            if (left === 0 && !s.done) {
              s.done = true;
              s.finishedAt = nowSec();
              if (typeof onComplete === "function") {
                // small delay so the final hit lands
                setTimeout(() => onComplete(), 550);
              }
            }
          }
        }
      }

      // update particles
      s.particles = s.particles.filter((p) => p.life > 0);
      for (const p of s.particles) {
        p.vy = (p.vy ?? 0) + GRAVITY * 0.35 * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.life -= dt;
      }

      // candle flicker
      for (const c of s.candles) {
        c.flicker += dt * 9;
      }
    };

    const drawTrajectoryPreview = (s) => {
      if (!s.aiming) return;

      const startX = s.bowAnchor.x + 72;
      const startY = s.bowAnchor.y - 122;

      const dx = startX - s.aimNow.x;
      const dy = startY - s.aimNow.y;
      const dist = Math.hypot(dx, dy);
      const power = Math.max(MIN_POWER, Math.min(MAX_POWER, dist * 7));
      const angle = Math.atan2(dy, dx);

      let x = startX;
      let y = startY;
      let vx = Math.cos(angle) * power;
      let vy = Math.sin(angle) * power;

      ctx.save();
      ctx.globalAlpha = 0.55;
      ctx.fillStyle = "#f2e7d1";
      for (let i = 0; i < 22; i++) {
        // fixed small step for preview
        const dt = 0.016;
        vy += GRAVITY * dt;
        vx += s.wind * dt * 0.2;
        x += vx * dt;
        y += vy * dt;
        ctx.fillRect(x, y, 2, 2);
      }
      ctx.restore();
    };

    const drawCandles = (s) => {
      const { candle } = imagesRef.current;

      for (const c of s.candles) {
        if (!c.lit) continue;

        // If asset loaded, draw it; else fallback
        if (candle) {
          ctx.save();
          // warm glow behind candle
          ctx.globalAlpha = 0.25;
          ctx.fillStyle = "#ffcc66";
          ctx.beginPath();
          ctx.ellipse(c.x, c.y - c.h * 0.9, c.w * 1.0, c.h * 0.35, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

          ctx.drawImage(candle, c.x - c.w / 2, c.y - c.h, c.w, c.h);
        } else {
          // Fallback: simple candle
          ctx.save();
          ctx.fillStyle = "#e8dcc8";
          ctx.fillRect(c.x - c.w / 2, c.y - c.h, c.w, c.h);
          ctx.fillStyle = "#ffcc66";
          ctx.beginPath();
          ctx.ellipse(c.x, c.y - c.h - 10, 6, 11, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }
    };

    const drawArrows = (s) => {
      const { arrow } = imagesRef.current;

      for (const a of s.arrows) {
        if (!a.alive) continue;

        if (arrow) {
          ctx.save();
          ctx.translate(a.x, a.y);
          ctx.rotate(a.rot);
          ctx.drawImage(arrow, -a.length * 0.12, -a.thickness / 2, a.length, a.thickness);
          ctx.restore();
        } else {
          // fallback arrow
          ctx.save();
          ctx.translate(a.x, a.y);
          ctx.rotate(a.rot);
          ctx.fillStyle = "#d7f3ff";
          ctx.fillRect(0, -2, 40, 4);
          ctx.restore();
        }
      }
    };

    const drawParticles = (s) => {
      ctx.save();
      ctx.fillStyle = "#ffcc66";
      for (const p of s.particles) {
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillRect(p.x, p.y, 2, 2);
      }
      ctx.restore();
    };

    const drawBow = (s) => {
      const { bow } = imagesRef.current;

      // Slight scale-up while aiming to feel responsive
      const scale = s.aiming ? 1.03 : 1.0;

      ctx.save();
      ctx.globalAlpha = 0.96;

      if (bow) {
        const bowW = 150 * scale;
        const bowH = bowW * (bow.height / bow.width);
        const x = 18;
        const y = s.H - bowH - 18;

        ctx.drawImage(bow, x, y, bowW, bowH);
      } else {
        // fallback bow
        ctx.strokeStyle = "#f2e7d1";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(46, s.H - 70, 60, -1.2, 1.1);
        ctx.stroke();
      }

      ctx.restore();
    };

    const drawHUD = (s) => {
      // Wind indicator
      const wind = s.wind || 0;
      ctx.save();
      ctx.globalAlpha = 0.85;
      ctx.fillStyle = "#f2e7d1";
      ctx.font = "12px system-ui, -apple-system, Segoe UI, Roboto, Arial";
      const dir = wind === 0 ? "•" : wind > 0 ? "→" : "←";
      const mag = Math.round(Math.abs(wind));
      ctx.fillText(`Wind ${dir} ${mag}`, s.W - 96, 18);
      ctx.restore();
    };

    const loop = (t) => {
      const s = simRef.current;
      if (!s) return;

      const dt = Math.min(0.033, (t - last) / 1000);
      last = t;

      // In reduced motion, minimize wind and particles
      if (reducedMotion) s.wind = 0;

      update(dt);

      // Draw
      const rect = canvas.getBoundingClientRect();
      s.W = rect.width;
      s.H = rect.height;

      ctx.clearRect(0, 0, s.W, s.H);
      drawBackground(s.W, s.H);
      drawCandles(s);
      drawTrajectoryPreview(s);
      drawArrows(s);
      drawParticles(s);
      drawBow(s);
      drawHUD(s);

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      canvas.removeEventListener("pointerleave", onUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [candleCount, onComplete, reducedMotion]);

  return (
    <div
      ref={containerRef}
      style={{
        width,
        position: "relative",
        userSelect: "none",
        WebkitUserSelect: "none",
        touchAction: "none",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          gap: 10,
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 12px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <div style={{ fontSize: 14, opacity: 0.9, color: "#f2e7d1" }}>
            Extinguish the candles
          </div>
          <div style={{ fontSize: 12, opacity: 0.75, color: "#f2e7d1" }}>
            Drag to aim + power. Release to shoot.
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div style={{ fontSize: 12, opacity: 0.8, color: "#f2e7d1" }}>
            Shots: {shots}
          </div>
          <div style={{ fontSize: 12, opacity: 0.8, color: "#f2e7d1" }}>
            Left: {remaining}
          </div>
        </div>
      </div>

      {/* Canvas area */}
      <div style={{ position: "relative", padding: "0 12px 12px" }}>
        <div
          style={{
            position: "relative",
            borderRadius: 18,
            overflow: "hidden",
            border: "1px solid rgba(242,231,209,0.12)",
            boxShadow: "0 18px 55px rgba(0,0,0,0.45)",
          }}
        >
          <canvas
            ref={canvasRef}
            style={{
              width: "100%",
              height,
              display: "block",
            }}
          />

          {/* Debug badge: helps confirm production is using /game assets */}
          <div
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              fontSize: 12,
              padding: "6px 10px",
              borderRadius: 999,
              background: "rgba(0,0,0,0.35)",
              color: "#fff",
              zIndex: 20,
              border: "1px solid rgba(255,255,255,0.08)",
            }}
            title="If this says LOADING forever, check /game/*.png paths and filename casing."
          >
            {assetsReady ? "ASSETS: OK" : "ASSETS: LOADING"}
          </div>

          {/* Toggles */}
          <div
            style={{
              position: "absolute",
              left: 10,
              top: 10,
              display: "flex",
              gap: 8,
              zIndex: 20,
            }}
          >
            <TogglePill label="Sound" value={soundOn} onChange={setSoundOn} />
            <TogglePill label="Haptics" value={hapticsOn} onChange={setHapticsOn} />
          </div>
        </div>
      </div>

      {/* Footer hint */}
      <div style={{ padding: "0 12px 14px", color: "#f2e7d1", opacity: 0.7, fontSize: 12 }}>
        Tip: If it looks blurry on mobile, the canvas is DPR-scaled already; then it’s likely the asset
        filenames (case-sensitive) or upscaling.
      </div>
    </div>
  );
}

function TogglePill({ label, value, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      style={{
        appearance: "none",
        border: "1px solid rgba(255,255,255,0.10)",
        background: value ? "rgba(255, 204, 102, 0.22)" : "rgba(0,0,0,0.30)",
        color: "#fff",
        borderRadius: 999,
        padding: "6px 10px",
        fontSize: 12,
        lineHeight: "12px",
        cursor: "pointer",
        display: "flex",
        gap: 6,
        alignItems: "center",
      }}
      aria-pressed={value}
    >
      <span style={{ opacity: 0.85 }}>{label}</span>
      <span style={{ opacity: 0.95 }}>{value ? "On" : "Off"}</span>
    </button>
  );
}
