\
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * Mobile-first Archery mini-game (canvas)
 * - Drag to aim + power
 * - Gravity arc + dotted trajectory preview
 * - Candle hitboxes + sparks
 * - Optional haptics + synthesized sounds (default OFF)
 * - Calls onComplete({ shots, timeMs }) when all candles are out
 *
 * Visuals are tuned to match the BirthdayCard palette:
 * warm amber + cool ink-cyan on a dark, papery gradient.
 */
export default function ArcheryGame({
  onComplete,
  candleCount = 7,
  height = 420,
  showToggles = true,
  defaultHaptics = false,
  defaultSound = false,
}) {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const audioCtxRef = useRef(null);

  const [shots, setShots] = useState(0);
  const [done, setDone] = useState(false);

  const [hint, setHint] = useState("Drag to aim. Release to shoot.");
  const [hapticsOn, setHapticsOn] = useState(defaultHaptics);
  const [soundOn, setSoundOn] = useState(defaultSound);

  const hapticsRef = useRef(defaultHaptics);
  const soundRef = useRef(defaultSound);
  useEffect(() => { hapticsRef.current = hapticsOn; }, [hapticsOn]);
  useEffect(() => { soundRef.current = soundOn; }, [soundOn]);

  const startTimeRef = useRef(0);

  const config = useMemo(
    () => ({
      gravity: 1600, // px/s^2
      maxPower: 1200, // px/s
      minPower: 420, // px/s
      windMax: 90, // px/s horizontal accel
      trailDots: 26,

      candleW: 16,
      candleH: 54,

      arrowW: 34,
      arrowH: 6,

      // Palette (matching BirthdayCard-ish)
      ink: "rgba(190, 240, 255, 0.95)",       // cool ink cyan
      inkSoft: "rgba(190, 240, 255, 0.35)",
      amber: "rgba(255, 210, 122, 0.95)",     // warm candle amber
      amberSoft: "rgba(255, 210, 122, 0.35)",
      paperLine: "rgba(255,255,255,0.10)",
      bgTop: "rgba(255,255,255,0.06)",
      bgBot: "rgba(255,255,255,0.03)",
    }),
    []
  );

  const vibrate = (pattern) => {
    if (!hapticsRef.current) return;
    if (typeof navigator === "undefined") return;
    if (typeof navigator.vibrate !== "function") return;
    try {
      navigator.vibrate(pattern);
    } catch {
      // ignore
    }
  };

  const ensureAudioCtx = async () => {
    if (!soundRef.current) return null;
    if (typeof window === "undefined") return null;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;

    if (!audioCtxRef.current) audioCtxRef.current = new AC();
    // iOS requires resume from a gesture
    if (audioCtxRef.current.state === "suspended") {
      try {
        await audioCtxRef.current.resume();
      } catch {
        // ignore
      }
    }
    return audioCtxRef.current;
  };

  const blip = async ({ freq = 520, dur = 0.06, type = "sine", gain = 0.05 } = {}) => {
    if (!soundRef.current) return;
    const ctx = await ensureAudioCtx();
    if (!ctx) return;

    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type;
    o.frequency.value = freq;

    g.gain.value = 0;
    g.gain.linearRampToValueAtTime(gain, ctx.currentTime + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);

    o.connect(g);
    g.connect(ctx.destination);

    o.start();
    o.stop(ctx.currentTime + dur + 0.02);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });

    // HiDPI setup
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    const resize = () => {
      const cssW = canvas.clientWidth;
      const cssH = canvas.clientHeight;
      canvas.width = Math.floor(cssW * dpr);
      canvas.height = Math.floor(cssH * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const state = {
      aiming: false,
      origin: { x: 78, y: height - 78 },        // launch: bottom-left-ish
      aimNow: { x: 120, y: height - 120 },

      arrows: [],
      sparks: [],

      lastTs: performance.now(),
      wind: (Math.random() * 2 - 1) * config.windMax,

      candles: [],
      w: canvas.clientWidth,
      h: canvas.clientHeight,

      completed: false,
    };

    const rand = (a, b) => a + Math.random() * (b - a);

    const resetCandles = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;

      // Place candles on a cake-ish baseline
      const cakeY = Math.max(140, Math.min(h * 0.55, h - 160));
      const startX = Math.max(w * 0.46, w - (candleCount * 36 + 60));
      state.candles = Array.from({ length: candleCount }).map((_, i) => ({
        x: startX + i * 36 + rand(-3, 3),
        y: cakeY + rand(-6, 6),
        w: config.candleW,
        h: config.candleH,
        lit: true,
        flicker: rand(0, 20),
        wiggle: 0,
      }));
    };
    resetCandles();

    // Helpers
    const clamp01 = (x) => Math.max(0, Math.min(1, x));
    const rectsIntersect = (a, b) =>
      a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;

    const spawnSparks = (x, y) => {
      for (let i = 0; i < 22; i++) {
        state.sparks.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 480,
          vy: (Math.random() - 0.9) * 520,
          life: 0.55 + Math.random() * 0.25,
          size: rand(1, 2.2),
        });
      }
    };

    const shoot = async () => {
      const dx = state.origin.x - state.aimNow.x;
      const dy = state.origin.y - state.aimNow.y;

      let dist = Math.hypot(dx, dy) * 7.2;
      dist = Math.max(config.minPower, Math.min(config.maxPower, dist));

      const angle = Math.atan2(dy, dx);

      state.arrows.push({
        x: state.origin.x,
        y: state.origin.y,
        w: config.arrowW,
        h: config.arrowH,
        vx: Math.cos(angle) * dist,
        vy: Math.sin(angle) * dist,
        rot: angle,
        alive: true,
      });

      setShots((s) => s + 1);
      setHint("Again. Steady.");

      vibrate(12);
      await blip({ freq: 420, dur: 0.05, type: "triangle", gain: 0.04 });
    };

    const onDown = async (e) => {
      if (state.completed) return;
      // ensure audio context can start from gesture
      await ensureAudioCtx();
      state.aiming = true;
      const r = canvas.getBoundingClientRect();
      state.aimNow = { x: e.clientX - r.left, y: e.clientY - r.top };
      vibrate(8);
    };

    const onMove = (e) => {
      if (!state.aiming) return;
      const r = canvas.getBoundingClientRect();
      state.aimNow = { x: e.clientX - r.left, y: e.clientY - r.top };
    };

    const onUp = async () => {
      if (!state.aiming) return;
      state.aiming = false;
      await shoot();
    };

    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);

    // Update loop
    const update = async (dt, w, h) => {
      // arrows
      for (const a of state.arrows) {
        if (!a.alive) continue;

        // wind influences vx slightly
        a.vx += state.wind * dt;
        a.vy += config.gravity * dt;

        a.x += a.vx * dt;
        a.y += a.vy * dt;
        a.rot = Math.atan2(a.vy, a.vx);

        // kill if out of bounds
        if (a.x > w + 120 || a.y > h + 120 || a.y < -180) a.alive = false;

        // collisions
        const arrowBox = { x: a.x, y: a.y, w: a.w, h: a.h };
        for (const c of state.candles) {
          if (!c.lit) continue;
          const candleBox = { x: c.x, y: c.y, w: c.w, h: c.h };
          if (rectsIntersect(arrowBox, candleBox)) {
            c.lit = false;
            c.wiggle = 1;
            a.alive = false;
            spawnSparks(c.x + c.w / 2, c.y);

            vibrate([20, 20, 10]);
            await blip({ freq: 820, dur: 0.06, type: "sine", gain: 0.06 });
          }
        }
      }

      // sparks
      state.sparks = state.sparks.filter((p) => p.life > 0);
      for (const p of state.sparks) {
        p.vy = (p.vy ?? 0) + config.gravity * 0.35 * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.life -= dt;
      }

      // candle wiggle decay + flicker
      for (const c of state.candles) {
        if (c.wiggle > 0) c.wiggle = Math.max(0, c.wiggle - dt * 3);
        c.flicker += dt * 18;
      }

      // completion
      if (!state.completed && state.candles.every((c) => !c.lit)) {
        state.completed = true;
        setDone(true);
        setHint("Perfect. Unlocked.");

        vibrate([30, 30, 30]);
        await blip({ freq: 980, dur: 0.08, type: "triangle", gain: 0.06 });

        if (typeof onComplete === "function") {
          const timeMs = Math.max(0, performance.now() - startTimeRef.current);
          onComplete({ shots: shots + 1, timeMs });
        }
      }
    };

    const drawBackground = (w, h) => {
      // Dark base
      ctx.clearRect(0, 0, w, h);

      // Soft paper gradient (matches BirthdayCard feel)
      const g = ctx.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, "rgba(15,18,22,1)");
      g.addColorStop(1, "rgba(7,9,12,1)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      // Warm + cool glows (like your poem panel)
      const glow1 = ctx.createRadialGradient(w * 0.55, h * 0.18, 10, w * 0.55, h * 0.18, w * 0.9);
      glow1.addColorStop(0, "rgba(255,210,122,0.10)");
      glow1.addColorStop(1, "rgba(255,210,122,0)");
      ctx.fillStyle = glow1;
      ctx.fillRect(0, 0, w, h);

      const glow2 = ctx.createRadialGradient(w * 0.18, h * 0.78, 10, w * 0.18, h * 0.78, w * 0.85);
      glow2.addColorStop(0, "rgba(190,240,255,0.10)");
      glow2.addColorStop(1, "rgba(190,240,255,0)");
      ctx.fillStyle = glow2;
      ctx.fillRect(0, 0, w, h);

      // Subtle grain (cheap, effective)
      ctx.globalAlpha = 0.14;
      for (let i = 0; i < 220; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const r = Math.random() * 1.6;
        ctx.fillStyle = Math.random() > 0.5 ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.10)";
        ctx.fillRect(x, y, r, r);
      }
      ctx.globalAlpha = 1;
    };

    const draw = (w, h) => {
      drawBackground(w, h);

      // “Cake” platform line
      ctx.strokeStyle = config.paperLine;
      ctx.lineWidth = 1;
      ctx.beginPath();
      const cakeY = state.candles.length ? state.candles[0].y + state.candles[0].h + 16 : h * 0.62;
      ctx.moveTo(w * 0.36, cakeY);
      ctx.lineTo(w - 24, cakeY);
      ctx.stroke();

      // Wind indicator
      ctx.font = "12px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
      ctx.fillStyle = "rgba(255,255,255,0.65)";
      const windDir = state.wind >= 0 ? "→" : "←";
      ctx.fillText(`wind ${windDir}`, w - 74, 22);

      // Candles + flames
      for (const c of state.candles) {
        const wiggleX = Math.sin((1 - c.wiggle) * 18) * 5 * c.wiggle;

        // candle body (ink outline + warm fill)
        ctx.fillStyle = "rgba(255,255,255,0.06)";
        ctx.fillRect(c.x + wiggleX, c.y, c.w, c.h);

        ctx.strokeStyle = "rgba(255,255,255,0.10)";
        ctx.strokeRect(c.x + wiggleX, c.y, c.w, c.h);

        if (c.lit) {
          const fx = c.x + c.w / 2 + wiggleX + Math.sin(c.flicker) * 1.8;
          const fy = c.y - 10 + Math.cos(c.flicker * 0.7) * 1.2;

          // flame glow
          const fg = ctx.createRadialGradient(fx, fy, 2, fx, fy, 16);
          fg.addColorStop(0, "rgba(255,210,122,0.55)");
          fg.addColorStop(1, "rgba(255,210,122,0)");
          ctx.fillStyle = fg;
          ctx.beginPath();
          ctx.arc(fx, fy, 16, 0, Math.PI * 2);
          ctx.fill();

          // flame core
          ctx.fillStyle = config.amber;
          ctx.beginPath();
          ctx.ellipse(fx, fy, 5.5, 10, 0, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Trajectory preview while aiming
      if (state.aiming && !state.completed) {
        const dx = state.origin.x - state.aimNow.x;
        const dy = state.origin.y - state.aimNow.y;

        let dist = Math.hypot(dx, dy) * 7.2;
        dist = Math.max(config.minPower, Math.min(config.maxPower, dist));

        const angle = Math.atan2(dy, dx);
        let x = state.origin.x;
        let y = state.origin.y;
        let vx = Math.cos(angle) * dist;
        let vy = Math.sin(angle) * dist;

        ctx.fillStyle = config.inkSoft;
        for (let i = 0; i < config.trailDots; i++) {
          const dt = 0.016;
          vx += state.wind * dt;
          vy += config.gravity * dt;
          x += vx * dt;
          y += vy * dt;
          ctx.fillRect(x, y, 2, 2);
        }
      }

      // Bow (simple ink arc)
      ctx.strokeStyle = config.inkSoft;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(state.origin.x - 10, state.origin.y + 8, 42, -0.8, 0.8);
      ctx.stroke();

      // Arrows
      for (const a of state.arrows) {
        if (!a.alive) continue;
        ctx.save();
        ctx.translate(a.x, a.y);
        ctx.rotate(a.rot);
        ctx.fillStyle = config.ink;
        ctx.fillRect(0, 0, a.w, a.h);

        // tiny arrowhead
        ctx.beginPath();
        ctx.moveTo(a.w, a.h / 2);
        ctx.lineTo(a.w + 8, -3);
        ctx.lineTo(a.w + 8, a.h + 3);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
      }

      // Sparks
      for (const p of state.sparks) {
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = config.amber;
        ctx.fillRect(p.x, p.y, p.size, p.size);
        ctx.globalAlpha = 1;
      }

      // HUD (shots + hint)
      ctx.fillStyle = "rgba(255,255,255,0.70)";
      ctx.fillText(`shots ${shots}`, 14, 22);

      ctx.fillStyle = "rgba(255,255,255,0.75)";
      ctx.fillText(hint, 14, h - 14);
    };

    const loop = async (ts) => {
      const dt = Math.min(0.033, (ts - state.lastTs) / 1000);
      state.lastTs = ts;

      state.w = canvas.clientWidth;
      state.h = canvas.clientHeight;

      if (!startTimeRef.current) startTimeRef.current = performance.now();

      if (!state.completed) {
        // update is async because of sound; keep it lightweight
        await update(dt, state.w, state.h);
      }

      draw(state.w, state.h);

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [candleCount, height, config]);

  return (
    <div style={{ width: "100%", position: "relative" }}>
      {showToggles && (
        <div style={toggles}>
          <button
            type="button"
            onClick={() => setHapticsOn((v) => !v)}
            style={{ ...toggleBtn, ...(hapticsOn ? toggleOn : {}) }}
          >
            Haptics {hapticsOn ? "On" : "Off"}
          </button>
          <button
            type="button"
            onClick={() => setSoundOn((v) => !v)}
            style={{ ...toggleBtn, ...(soundOn ? toggleOn : {}) }}
          >
            Sound {soundOn ? "On" : "Off"}
          </button>
        </div>
      )}

      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height,
          borderRadius: 18,
          border: "1px solid rgba(255,255,255,.10)",
          boxShadow: "0 18px 40px rgba(0,0,0,.40)",
          touchAction: "none",
        }}
      />

      {done && (
        <div style={doneBadge}>
          <div style={{ fontWeight: 900 }}>Unlocked</div>
          <div style={{ fontSize: 12, opacity: 0.8 }}>Proceed to your reward.</div>
        </div>
      )}
    </div>
  );
}

const toggles = {
  position: "absolute",
  zIndex: 5,
  top: 10,
  left: 10,
  display: "flex",
  gap: 8,
};

const toggleBtn = {
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,.14)",
  background: "rgba(255,255,255,.06)",
  color: "rgba(255,255,255,.85)",
  fontSize: 12,
  padding: "8px 10px",
  backdropFilter: "blur(10px)",
};

const toggleOn = {
  border: "1px solid rgba(255,210,122,.35)",
  background: "rgba(255,210,122,.10)",
  color: "rgba(255,210,122,.95)",
};

const doneBadge = {
  position: "absolute",
  left: 14,
  bottom: 14,
  padding: "10px 12px",
  borderRadius: 14,
  border: "1px solid rgba(255,210,122,.20)",
  background: "rgba(0,0,0,.45)",
  color: "rgba(255,210,122,.95)",
  backdropFilter: "blur(10px)",
};
