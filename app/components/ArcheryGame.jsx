"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * ArcheryGame.jsx
 * - Calls onComplete({ shots, timeMs }) (matches your page.jsx destructuring)
 * - Continue button + event fallback: window "archery:complete" detail { shots, timeMs }
 * - Bigger arrow + arrow follows finger while pulling
 * - Short, curved bowstring segment near bow (no long ugly line)
 * - Better candle flames (flicker + glow + hot core)
 * - Translucent canvas with vignette depth so it blends with your “front card”
 *
 * Assets (case-sensitive):
 *  public/game/bow.png
 *  public/game/arrow.png
 *  public/game/candle.png
 */

function clamp01(x) {
  return Math.max(0, Math.min(1, x));
}
function lerp(a, b, t) {
  return a + (b - a) * t;
}
function rectsIntersect(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}
function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
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

  const [shotsUI, setShotsUI] = useState(0);
  const [remainingUI, setRemainingUI] = useState(candleCount);
  const [doneUI, setDoneUI] = useState(false);

  const reducedMotion = useMemo(() => prefersReducedMotion(), []);

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
      gain.gain.exponentialRampToValueAtTime(0.07, t0 + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + ms / 1000);

      osc.start(t0);
      osc.stop(t0 + ms / 1000 + 0.02);
    } catch {}
  };

  const vibrate = (pattern = 10) => {
    if (!hapticsOnRef.current) return;
    try {
      navigator?.vibrate?.(pattern);
    } catch {}
  };

  // images
  const imagesRef = useRef({ bow: null, arrow: null, candle: null, loaded: false });
  useEffect(() => {
    let cancelled = false;
    const bow = new Image();
    const arrow = new Image();
    const candle = new Image();

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

  const simRef = useRef(null);
  const completedOnceRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d", { alpha: true });

    let raf = 0;
    let last = performance.now();

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

    // -------- feel knobs ----------
    const GRAVITY = 1450;
    const MAX_PULL = 460;
    const MIN_PULL = 14;

    const MAX_SPEED = 1300;
    const MIN_SPEED = 430;

    const SNAP_TO_ZONE = 0.70;

    const SPRING_K = 92;
    const SPRING_DAMP = 15;
    const FOLLOW_THROUGH_KICK = 26;

    // Bigger arrow
    const ARROW_LEN = 240;
    const ARROW_THICK = 16;

    // Adjust to visually seat on string (depends on arrow PNG padding)
    const NOCK_FORWARD = 28;

    const WIND_MAG = reducedMotion ? 0 : 28;

    // Short string segment length (local only, not across the whole arena)
    const STRING_SEGMENT = 0.32;
    // --------------------------------

    const powerFromPull = (pullDist) => {
      const t = clamp01((pullDist - MIN_PULL) / (MAX_PULL - MIN_PULL));
      const eased = 1 - Math.pow(1 - t, 2.0);
      return MIN_SPEED + eased * (MAX_SPEED - MIN_SPEED);
    };

    const constrainPull = (s, x, y) => {
      const rp = s.releasePoint;
      let dx = x - rp.x;
      let dy = y - rp.y;

      dx = Math.min(dx, -14); // must stay left

      const dist = Math.hypot(dx, dy) || 1;
      const scale = dist > MAX_PULL ? MAX_PULL / dist : 1;

      return { x: rp.x + dx * scale, y: rp.y + dy * scale };
    };

    const snapPointerToComfortZone = (s, px, py) => {
      const rp = s.releasePoint;
      const comfort = { x: rp.x - 235, y: rp.y + 18 };
      const blended = {
        x: lerp(px, comfort.x, SNAP_TO_ZONE),
        y: lerp(py, comfort.y, SNAP_TO_ZONE),
      };
      return constrainPull(s, blended.x, blended.y);
    };

    const init = () => {
      const rect = canvas.getBoundingClientRect();
      const W = rect.width;
      const H = rect.height;

      const candles = Array.from({ length: candleCount }).map((_, i) => {
        const spread = Math.min(54, Math.max(30, W / (candleCount + 3)));
        const baseX = W * 0.68;
        const x = baseX + i * spread;
        const y = H * 0.44 + Math.sin(i * 0.35) * 4;
        const h = Math.max(84, Math.min(128, H * 0.26));
        const w = h * 0.32;
        return { x, y, w, h, lit: true, flamePhase: Math.random() * 999 };
      });

      // bow up/right a bit = more room to pull
      const bowAnchor = {
        x: Math.max(150, W * 0.16),
        y: Math.max(H * 0.72, H - 130),
      };

      const releasePoint = { x: bowAnchor.x + 185, y: bowAnchor.y - 178 };
      const pullRelaxed = { x: releasePoint.x - 140, y: releasePoint.y + 16 };

      const wind = WIND_MAG === 0 ? 0 : (Math.random() * 2 - 1) * WIND_MAG;

      simRef.current = {
        W,
        H,
        wind,
        aiming: false,
        bowAnchor,
        releasePoint,

        pull: { ...pullRelaxed },
        pullVel: { x: 0, y: 0 },
        pullRelaxed: { ...pullRelaxed },

        followKick: 0,
        arrows: [],
        particles: [],
        candles,
        done: false,

        shots: 0,
        startedAt: null,
        finishedAt: null,
      };

      completedOnceRef.current = false;
      setDoneUI(false);
      setShotsUI(0);
      setRemainingUI(candles.filter((c) => c.lit).length);
    };

    init();

    const dispatchComplete = (payload) => {
      try {
        window.dispatchEvent(new CustomEvent("archery:complete", { detail: payload }));
      } catch {}
    };

    const fireComplete = (s) => {
      const shots = s.shots;
      const timeMs =
        s.startedAt && s.finishedAt ? Math.max(0, s.finishedAt - s.startedAt) : null;

      const payload = { shots, timeMs };

      setDoneUI(true);

      // This MUST match your page.jsx handler signature
      if (typeof onComplete === "function") {
        try {
          onComplete(payload);
        } catch {
          // If parent handler throws, fallback event still fires
        }
      }

      dispatchComplete(payload);
    };

    const finishIfDone = (s) => {
      const left = s.candles.filter((c) => c.lit).length;
      if (left !== 0) return;

      s.done = true;
      if (!s.finishedAt) s.finishedAt = performance.now();

      if (!completedOnceRef.current) {
        completedOnceRef.current = true;
        setTimeout(() => fireComplete(s), 350);
      }
    };

    const spawnSparks = (x, y) => {
      const s = simRef.current;
      if (!s) return;
      const count = reducedMotion ? 10 : 22;
      for (let i = 0; i < count; i++) {
        s.particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 420,
          vy: (Math.random() - 0.9) * 520,
          life: 0.26 + Math.random() * 0.24,
        });
      }
    };

    const computeLaunch = (s, pullOverride = null) => {
      const rp = s.releasePoint;
      const pull = pullOverride ?? s.pull;

      const dx = pull.x - rp.x;
      const dy = pull.y - rp.y;
      const dist = Math.hypot(dx, dy);

      const speed = powerFromPull(dist);

      let vx = (-dx / (dist || 1)) * speed;
      let vy = (-dy / (dist || 1)) * speed;

      if (vx < 80) vx = 80;

      const rot = Math.atan2(vy, vx);
      return { vx, vy, rot, dist };
    };

    const shoot = () => {
      const s = simRef.current;
      if (!s || s.done) return;

      const rp = s.releasePoint;
      const launch = computeLaunch(s);

      s.arrows.push({
        x: rp.x,
        y: rp.y,
        vx: launch.vx,
        vy: launch.vy,
        rot: launch.rot,
        alive: true,
        length: ARROW_LEN,
        thickness: ARROW_THICK,
      });

      s.followKick = FOLLOW_THROUGH_KICK;

      s.shots += 1;
      setShotsUI(s.shots);

      playTone(420, 55);
      vibrate(10);
    };

    const onDown = (e) => {
      const s = simRef.current;
      if (!s || s.done) return;

      if (!s.startedAt) s.startedAt = performance.now();

      s.aiming = true;

      const r = canvas.getBoundingClientRect();
      const px = e.clientX - r.left;
      const py = e.clientY - r.top;

      const p = snapPointerToComfortZone(s, px, py);
      s.pull.x = p.x;
      s.pull.y = p.y;
      s.pullVel.x = 0;
      s.pullVel.y = 0;

      if (soundOnRef.current) playTone(220, 1);
    };

    const onMove = (e) => {
      const s = simRef.current;
      if (!s || !s.aiming || s.done) return;

      const r = canvas.getBoundingClientRect();
      const px = e.clientX - r.left;
      const py = e.clientY - r.top;

      const p = constrainPull(s, px, py);
      s.pull.x = p.x;
      s.pull.y = p.y;
    };

    const onUp = () => {
      const s = simRef.current;
      if (!s || !s.aiming || s.done) return;

      s.aiming = false;
      shoot();

      playTone(760, 70);
      vibrate([10, 16, 10]);
    };

    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    canvas.addEventListener("pointerleave", onUp);

    const updatePullSpring = (s, dt) => {
      if (s.aiming) {
        const p = constrainPull(s, s.pull.x, s.pull.y);
        s.pull.x = p.x;
        s.pull.y = p.y;
        s.followKick = Math.max(0, s.followKick - dt * 80);
      } else {
        let targetX = s.pullRelaxed.x;
        let targetY = s.pullRelaxed.y;

        if (s.followKick > 0) {
          targetX = s.pullRelaxed.x - s.followKick;
          s.followKick = Math.max(0, s.followKick - dt * 70);
        }

        const dx = s.pull.x - targetX;
        const dy = s.pull.y - targetY;

        const ax = -SPRING_K * dx - 15 * s.pullVel.x;
        const ay = -SPRING_K * dy - 15 * s.pullVel.y;

        s.pullVel.x += ax * dt;
        s.pullVel.y += ay * dt;

        s.pull.x += s.pullVel.x * dt;
        s.pull.y += s.pullVel.y * dt;

        const p = constrainPull(s, s.pull.x, s.pull.y);
        s.pull.x = p.x;
        s.pull.y = p.y;
      }
    };

    const update = (dt) => {
      const s = simRef.current;
      if (!s) return;

      updatePullSpring(s, dt);

      // flame flicker
      for (const c of s.candles) {
        if (c.lit) c.flamePhase += dt * 6.2;
      }

      for (const a of s.arrows) {
        if (!a.alive) continue;

        a.vy += GRAVITY * dt;
        a.vx += s.wind * dt * 0.2;
        a.x += a.vx * dt;
        a.y += a.vy * dt;
        a.rot = Math.atan2(a.vy, a.vx);

        if (a.x > s.W + 220 || a.y > s.H + 220 || a.y < -260) a.alive = false;

        const arrowBox = { x: a.x - 18, y: a.y - 10, w: 66, h: 22 };
        for (const c of s.candles) {
          if (!c.lit) continue;
          const candleBox = { x: c.x - c.w / 2, y: c.y - c.h, w: c.w, h: c.h };
          if (rectsIntersect(arrowBox, candleBox)) {
            c.lit = false;
            a.alive = false;

            spawnSparks(c.x, c.y - c.h * 0.78);
            playTone(880, 70);
            vibrate([12, 18, 12]);

            const left = s.candles.filter((cc) => cc.lit).length;
            setRemainingUI(left);

            if (left === 0) finishIfDone(s);
          }
        }
      }

      s.particles = s.particles.filter((p) => p.life > 0);
      for (const p of s.particles) {
        p.vy = (p.vy ?? 0) + GRAVITY * 0.35 * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.life -= dt;
      }
    };

    // ---------- drawing ----------
    const drawVignette = (W, H) => {
      const g = ctx.createRadialGradient(W * 0.58, H * 0.35, 80, W * 0.58, H * 0.45, W * 0.95);
      g.addColorStop(0, "rgba(0,0,0,0.06)");
      g.addColorStop(1, "rgba(0,0,0,0.42)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);

      ctx.save();
      ctx.globalAlpha = 0.22;
      ctx.strokeStyle = "rgba(242,231,209,0.22)";
      ctx.lineWidth = 1;
      ctx.strokeRect(10, 10, W - 20, H - 20);
      ctx.restore();
    };

    const drawCandles = (s) => {
      const { candle } = imagesRef.current;
      for (const c of s.candles) {
        if (!c.lit) continue;

        // base glow
        ctx.save();
        ctx.globalAlpha = 0.20;
        ctx.fillStyle = "#ffcc66";
        ctx.beginPath();
        ctx.ellipse(c.x, c.y - c.h * 0.88, c.w * 1.1, c.h * 0.36, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        if (candle) {
          ctx.drawImage(candle, c.x - c.w / 2, c.y - c.h, c.w, c.h);
        }

        // flame overlay (better)
        const t = c.flamePhase;
        const flick = 0.78 + 0.22 * Math.sin(t) + 0.10 * Math.sin(t * 2.25);

        const fx = c.x;
        const fy = c.y - c.h * 0.92;
        const fw = c.w * 0.40 * flick;
        const fh = c.h * 0.22 * flick;

        // outer glow
        ctx.save();
        ctx.globalAlpha = 0.22;
        ctx.fillStyle = "#ffcc66";
        ctx.beginPath();
        ctx.ellipse(fx, fy, fw * 2.2, fh * 1.6, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // flame body
        ctx.save();
        ctx.globalAlpha = 0.86;
        ctx.fillStyle = "#ffd27a";
        ctx.beginPath();
        ctx.moveTo(fx, fy - fh);
        ctx.quadraticCurveTo(fx + fw, fy - fh * 0.2, fx, fy + fh);
        ctx.quadraticCurveTo(fx - fw, fy - fh * 0.2, fx, fy - fh);
        ctx.fill();

        // hot core
        ctx.globalAlpha = 0.70;
        ctx.fillStyle = "#fff2c9";
        ctx.beginPath();
        ctx.ellipse(fx, fy, fw * 0.32, fh * 0.55, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    };

    const drawTrajectoryPreview = (s) => {
      if (!s.aiming) return;

      const rp = s.releasePoint;
      const launch = computeLaunch(s);

      let x = rp.x;
      let y = rp.y;
      let vx = launch.vx;
      let vy = launch.vy;

      ctx.save();
      ctx.globalAlpha = 0.24;
      ctx.fillStyle = "#f2e7d1";
      for (let i = 0; i < 28; i++) {
        const step = 0.016;
        vy += GRAVITY * step;
        vx += s.wind * step * 0.2;
        x += vx * step;
        y += vy * step;
        ctx.fillRect(x, y, 2, 2);
      }
      ctx.restore();
    };

    // Arrow always visible; follows finger while aiming.
    const drawNockedArrowAndString = (s) => {
      const { arrow } = imagesRef.current;
      if (!arrow) return;

      const rp = s.releasePoint;
      const nock = s.aiming ? { x: s.pull.x, y: s.pull.y } : { x: s.pullRelaxed.x, y: s.pullRelaxed.y };

      const aim = s.aiming ? s.pull : s.pullRelaxed;
      const launch = computeLaunch(s, aim);

      // arrow (bigger)
      ctx.save();
      ctx.globalAlpha = s.aiming ? 0.94 : 0.65;
      ctx.translate(nock.x, nock.y);
      ctx.rotate(launch.rot);
      ctx.drawImage(arrow, -ARROW_LEN / 2 + NOCK_FORWARD, -ARROW_THICK / 2, ARROW_LEN, ARROW_THICK);
      ctx.restore();

      // short curved string near the bow
      if (s.aiming) {
        const tSeg = STRING_SEGMENT;
        const sx = lerp(rp.x, s.pull.x, tSeg);
        const sy = lerp(rp.y, s.pull.y, tSeg);

        const midx = (rp.x + sx) / 2;
        const midy = (rp.y + sy) / 2 + (s.pull.y - rp.y) * 0.10;

        ctx.save();
        ctx.globalAlpha = 0.52;
        ctx.strokeStyle = "rgba(242,231,209,0.80)";
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(rp.x, rp.y);
        ctx.quadraticCurveTo(midx, midy, sx, sy);
        ctx.stroke();
        ctx.restore();
      }
    };

    const drawFlyingArrows = (s) => {
      const { arrow } = imagesRef.current;
      if (!arrow) return;

      for (const a of s.arrows) {
        if (!a.alive) continue;
        ctx.save();
        ctx.translate(a.x, a.y);
        ctx.rotate(a.rot);
        ctx.drawImage(arrow, -a.length / 2, -a.thickness / 2, a.length, a.thickness);
        ctx.restore();
      }
    };

    const drawParticles = (s) => {
      if (reducedMotion) return;
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
      if (!bow) return;

      ctx.save();
      ctx.globalAlpha = 0.96;

      const padTop = 10;
      const padBottom = 12;

      const aimScale = s.aiming ? 1.02 : 1.0;
      let bowW = 190 * aimScale;
      let bowH = bowW * (bow.height / bow.width);

      const maxH = s.H - padTop - padBottom;
      if (bowH > maxH) {
        const k = maxH / bowH;
        bowH *= k;
        bowW *= k;
      }

      const x = s.bowAnchor.x - 24;
      const y = Math.max(padTop, s.bowAnchor.y - bowH + 18);

      // mirror so it faces right (candles)
      ctx.translate(x + bowW, y);
      ctx.scale(-1, 1);
      ctx.drawImage(bow, 0, 0, bowW, bowH);

      ctx.restore();
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

      update(dt);

      const rect = canvas.getBoundingClientRect();
      s.W = rect.width;
      s.H = rect.height;

      ctx.clearRect(0, 0, s.W, s.H);

      drawVignette(s.W, s.H);
      drawCandles(s);
      drawNockedArrowAndString(s);
      drawTrajectoryPreview(s);
      drawFlyingArrows(s);
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
          <div style={{ fontSize: 12, opacity: 0.75 }}>Pull back. Release.</div>
        </div>
        <div style={{ color: "#f2e7d1", fontSize: 12, opacity: 0.85, display: "flex", gap: 10 }}>
          <span>Shots: {shotsUI}</span>
          <span>Left: {remainingUI}</span>
        </div>
      </div>

      <div style={{ position: "relative", padding: "0 12px 12px" }}>
        <div
          style={{
            position: "relative",
            borderRadius: 18,
            overflow: "hidden",
            border: "1px solid rgba(242,231,209,0.14)",
            boxShadow: "0 18px 55px rgba(0,0,0,0.45)",
            background: "rgba(0,0,0,0.18)",
            backdropFilter: "blur(10px)",
          }}
        >
          <canvas
            ref={canvasRef}
            style={{
              width: "100%",
              height,
              display: "block",
              background: "transparent",
            }}
          />

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

          {doneUI && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(0,0,0,0.55)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 30,
                padding: 18,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  maxWidth: 420,
                  width: "100%",
                  borderRadius: 18,
                  border: "1px solid rgba(242,231,209,0.18)",
                  background: "rgba(20,18,16,0.75)",
                  boxShadow: "0 18px 55px rgba(0,0,0,0.55)",
                  padding: 16,
                  color: "#f2e7d1",
                }}
              >
                <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>Candles out. 🔥✅</div>
                <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 12 }}>Advancing…</div>
                <button
                  type="button"
                  onClick={() => {
                    const s = simRef.current;
                    if (!s) return;
                    if (!s.finishedAt) s.finishedAt = performance.now();
                    const payload = {
                      shots: s.shots,
                      timeMs: s.startedAt && s.finishedAt ? s.finishedAt - s.startedAt : null,
                    };
                    try {
                      if (typeof onComplete === "function") onComplete(payload);
                    } catch {}
                    try {
                      window.dispatchEvent(new CustomEvent("archery:complete", { detail: payload }));
                    } catch {}
                  }}
                  style={{
                    width: "100%",
                    borderRadius: 999,
                    padding: "10px 14px",
                    border: "1px solid rgba(255,255,255,0.12)",
                    background: "rgba(255, 204, 102, 0.22)",
                    color: "#fff",
                    fontSize: 14,
                    cursor: "pointer",
                  }}
                >
                  Continue
                </button>
              </div>
            </div>
          )}
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