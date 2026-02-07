"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * ArcheryGame.jsx (mobile-first, real assets)
 *
 * Changes requested:
 * - Show the whole bow (auto-scale-to-fit + move up)
 * - Center the arrow (draw centered, with optional small nock offset)
 * - Remove “something in front of arrow”  ✅ (removed the pull-point dot / “hand” indicator)
 * - Allow string to be pulled back more (bigger MAX_PULL + bow/release shifted right)
 * - Snap to centerline (magnetism)
 * - Arrow follow-through (spring + brief kick)
 * - Start draw anywhere but snap to comfortable zone
 *
 * Assets expected (case-sensitive on Vercel/Linux):
 *  public/game/bow.png
 *  public/game/arrow.png
 *  public/game/candle.png
 */

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

function lerp(a, b, t) {
  return a + (b - a) * t;
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

    // HiDPI canvas for crisp rendering
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

    // ---------- TUNABLE FEEL CONSTANTS ----------
    const GRAVITY = 1500;

    // Pull farther
    const MAX_PULL = 340; // increased
    const MIN_PULL = 18;

    const MAX_SPEED = 1180;
    const MIN_SPEED = 420;

    // snap-to-centerline
    const MAGNET_STRENGTH = reducedMotion ? 0 : 7.5;

    // start anywhere snap
    const SNAP_TO_ZONE = 0.70;

    // follow-through spring
    const SPRING_K = 95;
    const SPRING_DAMP = 14;
    const FOLLOW_THROUGH_KICK = 22;

    // arrow draw parameters (centered)
    const ARROW_LEN = 150;
    const ARROW_THICK = 12;

    // nock offset (keeps arrow looking seated on string while still “centered”)
    const NOCK_FORWARD = 10; // px (positive = a bit toward candles)
    // -------------------------------------------

    const powerFromPull = (pullDist) => {
      const t = clamp01((pullDist - MIN_PULL) / (MAX_PULL - MIN_PULL));
      const eased = 1 - Math.pow(1 - t, 2.0);
      return MIN_SPEED + eased * (MAX_SPEED - MIN_SPEED);
    };

    const constrainPull = (s, x, y) => {
      const rp = s.releasePoint;
      let dx = x - rp.x;
      let dy = y - rp.y;

      // must stay left of release point
      dx = Math.min(dx, -12);

      const dist = Math.hypot(dx, dy) || 1;
      const scale = dist > MAX_PULL ? MAX_PULL / dist : 1;

      return { x: rp.x + dx * scale, y: rp.y + dy * scale };
    };

    const snapPointerToComfortZone = (s, px, py) => {
      const rp = s.releasePoint;
      const comfort = { x: rp.x - 150, y: rp.y + 20 }; // more room behind
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
        const spread = Math.min(52, Math.max(30, W / (candleCount + 3)));
        const baseX = W * 0.66;
        const x = baseX + i * spread;
        const y = H * 0.46 + Math.sin(i * 0.35) * 4;

        const h = Math.max(78, Math.min(120, H * 0.24));
        const w = h * 0.32;

        return { x, y, w, h, lit: true, flicker: Math.random() * 10 };
      });

      // Move bow right AND up so you can draw back and see the whole image
      const bowAnchor = {
        x: Math.max(110, W * 0.12),
        y: Math.max(H * 0.78, H - 90), // moved up relative to bottom
      };

      // Release point offset from bowAnchor
      const releasePoint = { x: bowAnchor.x + 170, y: bowAnchor.y - 170 };

      const pullRelaxed = { x: releasePoint.x - 110, y: releasePoint.y + 18 };

      const wind = reducedMotion ? 0 : (Math.random() * 2 - 1) * 55;

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

    const computeLaunch = (s) => {
      const rp = s.releasePoint;
      const pull = s.pull;

      const dx = pull.x - rp.x;
      const dy = pull.y - rp.y;
      const dist = Math.hypot(dx, dy);

      const speed = powerFromPull(dist);

      let vx = (-dx / (dist || 1)) * speed;
      let vy = (-dy / (dist || 1)) * speed;

      if (vx < 80) vx = 80;

      const rot = Math.atan2(vy, vx);
      return { vx, vy, rot };
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

      setShots((v) => v + 1);
      playTone(420, 55);
      vibrate(10);
    };

    // start draw anywhere
    const onDown = (e) => {
      const s = simRef.current;
      if (!s || s.done) return;

      if (soundOnRef.current) playTone(220, 1);

      s.aiming = true;

      const r = canvas.getBoundingClientRect();
      const px = e.clientX - r.left;
      const py = e.clientY - r.top;

      const p = snapPointerToComfortZone(s, px, py);
      s.pull.x = p.x;
      s.pull.y = p.y;
      s.pullVel.x = 0;
      s.pullVel.y = 0;
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
      const rp = s.releasePoint;

      if (s.aiming) {
        // magnetize Y toward centerline
        const yTarget = rp.y;
        const m = 1 - Math.exp(-MAGNET_STRENGTH * dt);
        s.pull.y = lerp(s.pull.y, yTarget, m);

        const p = constrainPull(s, s.pull.x, s.pull.y);
        s.pull.x = p.x;
        s.pull.y = p.y;

        s.followKick = Math.max(0, s.followKick - dt * 80);
      } else {
        // follow-through kick
        let targetX = s.pullRelaxed.x;
        let targetY = s.pullRelaxed.y;

        if (s.followKick > 0) {
          targetX = s.pullRelaxed.x - s.followKick;
          s.followKick = Math.max(0, s.followKick - dt * 70);
        }

        const dx = s.pull.x - targetX;
        const dy = s.pull.y - targetY;

        const ax = -SPRING_K * dx - SPRING_DAMP * s.pullVel.x;
        const ay = -SPRING_K * dy - SPRING_DAMP * s.pullVel.y;

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

      for (const a of s.arrows) {
        if (!a.alive) continue;

        a.vy += GRAVITY * dt;
        a.vx += s.wind * dt * 0.2;
        a.x += a.vx * dt;
        a.y += a.vy * dt;
        a.rot = Math.atan2(a.vy, a.vx);

        if (a.x > s.W + 180 || a.y > s.H + 180 || a.y < -260) a.alive = false;

        const arrowBox = { x: a.x - 16, y: a.y - 9, w: 60, h: 20 };
        for (const c of s.candles) {
          if (!c.lit) continue;
          const candleBox = { x: c.x - c.w / 2, y: c.y - c.h, w: c.w, h: c.h };
          if (rectsIntersect(arrowBox, candleBox)) {
            c.lit = false;
            a.alive = false;

            spawnSparks(c.x, c.y - c.h * 0.75);
            playTone(880, 70);
            vibrate([12, 18, 12]);

            const left = s.candles.filter((cc) => cc.lit).length;
            setRemaining(left);

            if (left === 0 && !s.done) {
              s.done = true;
              if (typeof onComplete === "function") setTimeout(() => onComplete(), 550);
            }
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

      for (const c of s.candles) c.flicker += dt * 9;
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
          ctx.save();
          ctx.globalAlpha = 0.25;
          ctx.fillStyle = "#ffcc66";
          ctx.beginPath();
          ctx.ellipse(c.x, c.y - c.h * 0.9, c.w * 1.0, c.h * 0.35, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

          ctx.drawImage(candle, c.x - c.w / 2, c.y - c.h, c.w, c.h);
        } else {
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

    // Centered nocked arrow (with small forward nock offset)
    const drawNockedArrow = (s) => {
      if (!s.aiming) return;

      const { arrow } = imagesRef.current;
      if (!arrow) return;

      const rp = s.releasePoint;
      const launch = computeLaunch(s);

      ctx.save();
      ctx.globalAlpha = 0.9;
      ctx.translate(rp.x, rp.y);
      ctx.rotate(launch.rot);

      // centered, remove weird “thing in front” by not adding any markers
      ctx.drawImage(
        arrow,
        -ARROW_LEN / 2 + NOCK_FORWARD,
        -ARROW_THICK / 2,
        ARROW_LEN,
        ARROW_THICK
      );

      ctx.restore();
    };

    // Centered flying arrows
    const drawArrows = (s) => {
      const { arrow } = imagesRef.current;

      for (const a of s.arrows) {
        if (!a.alive) continue;

        if (arrow) {
          ctx.save();
          ctx.translate(a.x, a.y);
          ctx.rotate(a.rot);
          ctx.drawImage(
            arrow,
            -a.length / 2,
            -a.thickness / 2,
            a.length,
            a.thickness
          );
          ctx.restore();
        } else {
          ctx.save();
          ctx.translate(a.x, a.y);
          ctx.rotate(a.rot);
          ctx.fillStyle = "#d7f3ff";
          ctx.fillRect(-20, -2, 46, 4);
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

    const drawBowAndString = (s) => {
      const { bow } = imagesRef.current;
      const rp = s.releasePoint;

      // string line (NO pull-dot in front of arrow)
      ctx.save();
      ctx.globalAlpha = s.aiming ? 0.62 : 0.38;
      ctx.strokeStyle = "#f2e7d1";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(rp.x, rp.y);
      ctx.lineTo(s.pull.x, s.pull.y);
      ctx.stroke();
      ctx.restore();

      // draw bow: auto-scale to fit canvas so it’s never clipped
      ctx.save();
      ctx.globalAlpha = 0.96;

      if (bow) {
        const padTop = 10;
        const padBottom = 12;

        const aimScale = s.aiming ? 1.03 : 1.0;
        let bowW = 180 * aimScale;
        let bowH = bowW * (bow.height / bow.width);

        const maxH = s.H - padTop - padBottom;
        if (bowH > maxH) {
          const k = maxH / bowH;
          bowH *= k;
          bowW *= k;
        }

        // anchor-based placement, moved up already via bowAnchor.y
        const x = s.bowAnchor.x - 18;
        const y = Math.max(padTop, s.bowAnchor.y - bowH + 18);

        // mirror horizontally so it faces candles
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
      drawNockedArrow(s);
      drawTrajectoryPreview(s);
      drawArrows(s);
      drawParticles(s);
      drawBowAndString(s);
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
          <div style={{ fontSize: 12, opacity: 0.75 }}>
            Start anywhere. Snap to string. Pull farther. Release.
          </div>
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
