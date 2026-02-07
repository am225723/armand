"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

function clamp01(x) {
  return Math.max(0, Math.min(1, x));
}

function rectsIntersect(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
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

  // keep toggles in refs so sim doesn't reset
  const soundOnRef = useRef(soundOn);
  const hapticsOnRef = useRef(hapticsOn);
  useEffect(() => void (soundOnRef.current = soundOn), [soundOn]);
  useEffect(() => void (hapticsOnRef.current = hapticsOn), [hapticsOn]);

  // lightweight sound
  const audioRef = useRef(null);
  const playTone = (freq = 520, ms = 60) => {
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

      osc.connect(gain);
      gain.connect(ctx.destination);

      const t0 = ctx.currentTime;
      gain.gain.setValueAtTime(0.0001, t0);
      gain.gain.exponentialRampToValueAtTime(0.08, t0 + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + ms / 1000);

      osc.start(t0);
      osc.stop(t0 + ms / 1000 + 0.02);
    } catch {}
  };

  const vibrate = (pattern = 10) => {
    if (!hapticsOnRef.current) return;
    if (navigator && "vibrate" in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch {}
    }
  };

  // images
  const imagesRef = useRef({ bow: null, arrow: null, candle: null, loaded: false });
  useEffect(() => {
    let cancelled = false;
    const bow = new Image();
    const arrow = new Image();
    const candle = new Image();

    // NOTE: filenames are case-sensitive on Vercel/Linux
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
    bow.onload = onLoad;
    arrow.onload = onLoad;
    candle.onload = onLoad;

    return () => {
      cancelled = true;
    };
  }, []);

  // sim state
  const simRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d", { alpha: true });

    let raf = 0;
    let last = performance.now();

    // HiDPI canvas (fixes blur)
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

    const init = () => {
      const rect = canvas.getBoundingClientRect();
      const W = rect.width;
      const H = rect.height;

      const candles = Array.from({ length: candleCount }).map((_, i) => {
        const spread = Math.min(52, Math.max(30, W / (candleCount + 3)));
        const baseX = W * 0.66;
        const x = baseX + i * spread;
        const y = H * 0.46 + Math.sin(i * 0.35) * 4;

        const h = Math.max(78, Math.min(120, H * 0.24));
        const w = h * 0.32;

        return { x, y, w, h, lit: true, flicker: Math.random() * 10 };
      });

      // bow anchor (where the bow sits)
      const bowAnchor = { x: 22, y: H - 18 };

      // IMPORTANT: arrow launch point (roughly where the string meets the arrow)
      const releasePoint = { x: bowAnchor.x + 115, y: bowAnchor.y - 165 };

      // wind (subtle)
      const wind = reducedMotion ? 0 : (Math.random() * 2 - 1) * 65;

      simRef.current = {
        W,
        H,
        wind,
        aiming: false,
        // "pull back" point the user drags to (string hand position)
        pull: { x: releasePoint.x - 70, y: releasePoint.y + 20 },
        bowAnchor,
        releasePoint,
        arrows: [],
        particles: [],
        candles,
        done: false,
      };

      setRemaining(candles.filter((c) => c.lit).length);
      setShots(0);
    };

    init();

    const drawBackground = (W, H) => {
      const g = ctx.createLinearGradient(0, 0, 0, H);
      g.addColorStop(0, "#151311");
      g.addColorStop(0.55, "#0f0e0d");
      g.addColorStop(1, "#0a0908");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);

      // vignette
      ctx.save();
      ctx.globalAlpha = 0.2;
      ctx.fillStyle = "#000";
      ctx.beginPath();
      ctx.rect(0, 0, W, H);
      ctx.rect(12, 12, W - 24, H - 24);
      ctx.fill("evenodd");
      ctx.restore();
    };

    const spawnSparks = (x, y) => {
      const s = simRef.current;
      for (let i = 0; i < 26; i++) {
        s.particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 460,
          vy: (Math.random() - 0.9) * 560,
          life: 0.36 + Math.random() * 0.26,
        });
      }
    };

    // physics
    const GRAVITY = 1500;
    const MAX_PULL = 190; // how far you can draw the string
    const MIN_PULL = 30;
    const MAX_SPEED = 1100;
    const MIN_SPEED = 420;

    // Convert pull distance into power
    const powerFromPull = (pullDist) => {
      const t = clamp01((pullDist - MIN_PULL) / (MAX_PULL - MIN_PULL));
      // ease out for a satisfying curve
      const eased = 1 - Math.pow(1 - t, 2.2);
      return MIN_SPEED + eased * (MAX_SPEED - MIN_SPEED);
    };

    const constrainPull = (s, x, y) => {
      // Constrain pull point to a circle behind the releasePoint
      // so you can pull far, but not across the whole screen in weird ways
      const rp = s.releasePoint;
      const dx = x - rp.x;
      const dy = y - rp.y;

      // We want "pull back" to the LEFT of releasePoint.
      // If user drags to the right, clamp so it still behaves.
      const clampedDx = Math.min(dx, -8);

      const dist = Math.hypot(clampedDx, dy) || 1;
      const max = MAX_PULL;
      const scale = dist > max ? max / dist : 1;

      return { x: rp.x + clampedDx * scale, y: rp.y + dy * scale };
    };

    const shoot = () => {
      const s = simRef.current;
      if (!s || s.done) return;

      const rp = s.releasePoint;
      const pull = s.pull;

      // Arrow should fly from the bow toward the candles.
      // In real archery: you pull string back, so arrow is launched opposite the pull vector.
      const pullDx = pull.x - rp.x;
      const pullDy = pull.y - rp.y;

      const pullDist = Math.hypot(pullDx, pullDy);
      const speed = powerFromPull(pullDist);

      // Launch direction is from pull toward release (opposite of pull vector)
      let vx = (-pullDx / (pullDist || 1)) * speed;
      let vy = (-pullDy / (pullDist || 1)) * speed;

      // Ensure it goes RIGHTWARD (toward candles)
      if (vx < 80) vx = 80;

      s.arrows.push({
        x: rp.x,
        y: rp.y,
        vx,
        vy,
        rot: Math.atan2(vy, vx),
        alive: true,
        length: 140,
        thickness: 12,
      });

      setShots((v) => v + 1);
      playTone(420, 55);
      vibrate(10);
    };

    // pointer events
    const onDown = (e) => {
      const s = simRef.current;
      if (!s || s.done) return;

      // unlock webaudio on gesture (silent warmup if needed)
      if (soundOnRef.current) playTone(220, 1);

      s.aiming = true;
      const r = canvas.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      s.pull = constrainPull(s, x, y);
    };

    const onMove = (e) => {
      const s = simRef.current;
      if (!s || !s.aiming || s.done) return;
      const r = canvas.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      s.pull = constrainPull(s, x, y);
    };

    const onUp = () => {
      const s = simRef.current;
      if (!s || !s.aiming || s.done) return;
      s.aiming = false;
      shoot();
      // reset pull to a relaxed position
      const rp = s.releasePoint;
      s.pull = { x: rp.x - 60, y: rp.y + 10 };
    };

    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    canvas.addEventListener("pointerleave", onUp);

    const update = (dt) => {
      const s = simRef.current;
      if (!s) return;

      // arrows
      for (const a of s.arrows) {
        if (!a.alive) continue;

        a.vy += GRAVITY * dt;
        a.vx += s.wind * dt * 0.2;
        a.x += a.vx * dt;
        a.y += a.vy * dt;
        a.rot = Math.atan2(a.vy, a.vx);

        if (a.x > s.W + 180 || a.y > s.H + 180 || a.y < -260) a.alive = false;

        const arrowBox = { x: a.x - 14, y: a.y - 8, w: 54, h: 18 };
        for (const c of s.candles) {
          if (!c.lit) continue;
          const candleBox = { x: c.x - c.w / 2, y: c.y - c.h, w: c.w, h: c.h };
          if (rectsIntersect(arrowBox, candleBox)) {
            c.lit = false;
            a.alive = false;
            spawnSparks(c.x, c.y - c.h * 0.75);

            playTone(760, 70);
            vibrate([12, 18, 12]);

            const left = s.candles.filter((cc) => cc.lit).length;
            setRemaining(left);

            if (left === 0 && !s.done) {
              s.done = true;
              if (typeof onComplete === "function") {
                setTimeout(() => onComplete(), 550);
              }
            }
          }
        }
      }

      // particles
      s.particles = s.particles.filter((p) => p.life > 0);
      for (const p of s.particles) {
        p.vy = (p.vy ?? 0) + GRAVITY * 0.35 * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.life -= dt;
      }

      for (const c of s.candles) c.flicker += dt * 9;
    };

    const drawTrajectoryPreview = (s) => {
      if (!s.aiming) return;

      const rp = s.releasePoint;
      const pull = s.pull;

      const dx = pull.x - rp.x;
      const dy = pull.y - rp.y;
      const dist = Math.hypot(dx, dy);
      const speed = powerFromPull(dist);

      let vx = (-dx / (dist || 1)) * speed;
      let vy = (-dy / (dist || 1)) * speed;
      if (vx < 80) vx = 80;

      let x = rp.x;
      let y = rp.y;

      ctx.save();
      ctx.globalAlpha = 0.55;
      ctx.fillStyle = "#f2e7d1";
      for (let i = 0; i < 26; i++) {
        const step = 0.016;
        vy += GRAVITY * step;
        vx += s.wind * step * 0.2;
        x += vx * step;
        y += vy * step;
        ctx.fillRect(x, y, 2, 2);
      }
      ctx.restore();
    };

    const drawCandles = (s) => {
      const { candle } = imagesRef.current;

      for (const c of s.candles) {
        if (!c.lit) continue;

        if (candle) {
          // glow behind
          ctx.save();
          ctx.globalAlpha = 0.25;
          ctx.fillStyle = "#ffcc66";
          ctx.beginPath();
          ctx.ellipse(c.x, c.y - c.h * 0.9, c.w * 1.0, c.h * 0.35, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

          ctx.drawImage(candle, c.x - c.w / 2, c.y - c.h, c.w, c.h);
        } else {
          // fallback
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

          // IMPORTANT: Your arrow image points RIGHT already.
          // This draw places the arrow centered and pointing forward.
          ctx.drawImage(arrow, -a.length * 0.12, -a.thickness / 2, a.length, a.thickness);
          ctx.restore();
        } else {
          ctx.save();
          ctx.translate(a.x, a.y);
          ctx.rotate(a.rot);
          ctx.fillStyle = "#d7f3ff";
          ctx.fillRect(0, -2, 46, 4);
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
      const rp = s.releasePoint;

      // Draw the bow image FLIPPED so it faces the candles (to the right)
      // Your bow PNG appears to face left in the screenshot.
      // We mirror it horizontally.
      ctx.save();
      ctx.globalAlpha = 0.96;

      if (bow) {
        const baseW = 160;
        const scale = s.aiming ? 1.03 : 1.0;
        const bowW = baseW * scale;
        const bowH = bowW * (bow.height / bow.width);

        const x = 16;
        const y = s.H - bowH - 16;

        // Mirror horizontally
        ctx.translate(x + bowW, y);
        ctx.scale(-1, 1);
        ctx.drawImage(bow, 0, 0, bowW, bowH);
      } else {
        ctx.strokeStyle = "#f2e7d1";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(58, s.H - 82, 66, -1.15, 1.05);
        ctx.stroke();
      }

      ctx.restore();

      // Optional: draw a string line (helps the "pull" feel)
      if (s.aiming) {
        ctx.save();
        ctx.globalAlpha = 0.55;
        ctx.strokeStyle = "#f2e7d1";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(rp.x, rp.y);
        ctx.lineTo(s.pull.x, s.pull.y);
        ctx.stroke();
        ctx.restore();
      }
    };

    const drawHUD = (s) => {
      ctx.save();
      ctx.globalAlpha = 0.85;
      ctx.fillStyle = "#f2e7d1";
      ctx.font = "12px system-ui, -apple-system, Segoe UI, Roboto, Arial";
      const dir = s.wind === 0 ? "•" : s.wind > 0 ? "→" : "←";
      const mag = Math.round(Math.abs(s.wind));
      ctx.fillText(`Wind ${dir} ${mag}`, s.W - 96, 18);
      ctx.restore();
    };

    const loop = (t) => {
      const s = simRef.current;
      if (!s) return;

      const dt = Math.min(0.033, (t - last) / 1000);
      last = t;

      if (reducedMotion) s.wind = 0;

      update(dt);

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
      <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 12px" }}>
        <div style={{ color: "#f2e7d1" }}>
          <div style={{ fontSize: 14, opacity: 0.92 }}>Extinguish the candles</div>
          <div style={{ fontSize: 12, opacity: 0.75 }}>Pull the string back. Release to shoot.</div>
        </div>
        <div style={{ color: "#f2e7d1", fontSize: 12, opacity: 0.85, display: "flex", gap: 10 }}>
          <span>Shots: {shots}</span>
          <span>Left: {remaining}</span>
        </div>
      </div>

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
          <canvas ref={canvasRef} style={{ width: "100%", height, display: "block" }} />

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
          >
            {assetsReady ? "ASSETS: OK" : "ASSETS: LOADING"}
          </div>

          <div style={{ position: "absolute", left: 10, top: 10, display: "flex", gap: 8, zIndex: 20 }}>
            <TogglePill label="Sound" value={soundOn} onChange={setSoundOn} />
            <TogglePill label="Haptics" value={hapticsOn} onChange={setHapticsOn} />
          </div>
        </div>
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
