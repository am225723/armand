"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * ArcheryGame.jsx
 * - Bow is an inline SVG overlay (/public/game/bow.svg) so we can deform the real string.
 * - Arrow + candles are drawn on canvas (uses /public/game/arrow.png and /public/game/candle.png).
 * - Fixes:
 *   ✅ Bow moved right so you can pull back
 *   ✅ Candle layout clamps so all candles always show
 *   ✅ More pull room (comfort draw deeper)
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

// Keep these in sync with candle placement logic (bow footprint)
const BOW_LEFT = 84;   // moved right
const BOW_WIDTH = 240; // slightly larger

export default function ArcheryGame({
  onComplete,
  candleCount = 7,
  width = "100%",
  height = 420,
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  // Bow SVG layer refs
  const bowWrapRef = useRef(null);
  const bowSvgHostRef = useRef(null); // where we inject inline svg
  const bowSvgElRef = useRef(null); // actual svg element
  const bowStringElRef = useRef(null); // path/line we will deform

  // We compute these every frame after layout
  const anchorsRef = useRef({
    // in CSS pixels, container coordinates
    stringTop: { x: 0, y: 0 },
    stringBot: { x: 0, y: 0 },
    nock: { x: 0, y: 0 },
    // within SVG viewBox coordinates
    vb: { minX: 0, minY: 0, w: 0, h: 0 },
    // string endpoints within viewBox coords (computed from bbox)
    vbTop: { x: 0, y: 0 },
    vbBot: { x: 0, y: 0 },
    vbNock: { x: 0, y: 0 },
  });

  const [soundOn, setSoundOn] = useState(false);
  const [hapticsOn, setHapticsOn] = useState(false);
  const [assetsReady, setAssetsReady] = useState(false);
  const [bowSvgReady, setBowSvgReady] = useState(false);

  const [shotsUI, setShotsUI] = useState(0);
  const [remainingUI, setRemainingUI] = useState(candleCount);
  const [doneUI, setDoneUI] = useState(false);

  const reducedMotion = useMemo(() => prefersReducedMotion(), []);

  const soundOnRef = useRef(soundOn);
  const hapticsOnRef = useRef(hapticsOn);
  useEffect(() => void (soundOnRef.current = soundOn), [soundOn]);
  useEffect(() => void (hapticsOnRef.current = hapticsOn), [hapticsOn]);

  // Tiny sound
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

  // Other images (arrow/candle). Bow comes from SVG now.
  const imagesRef = useRef({ arrow: null, candle: null, loaded: false });
  useEffect(() => {
    let cancelled = false;
    const arrow = new Image();
    const candle = new Image();

    arrow.src = "/game/arrow.png";
    candle.src = "/game/candle.png";

    let loaded = 0;
    const onLoad = () => {
      loaded += 1;
      if (!cancelled && loaded === 2) {
        imagesRef.current = { arrow, candle, loaded: true };
        setAssetsReady(true);
      }
    };

    arrow.onload = onLoad;
    candle.onload = onLoad;

    return () => {
      cancelled = true;
    };
  }, []);

  // Load bow.svg as INLINE SVG so we can mutate its string
  useEffect(() => {
    let cancelled = false;

    async function loadBowSvg() {
      try {
        const res = await fetch("/game/bow.svg", { cache: "no-store" });
        const txt = await res.text();
        if (cancelled) return;

        const host = bowSvgHostRef.current;
        if (!host) return;

        host.innerHTML = txt;

        const svg = host.querySelector("svg");
        if (!svg) throw new Error("No <svg> root found in bow.svg");
        bowSvgElRef.current = svg;

        // Ensure it scales nicely
        svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
        svg.style.width = "100%";
        svg.style.height = "100%";
        svg.style.display = "block";

        // Find string element
        let stringEl =
          svg.querySelector("#bow-string") ||
          svg.querySelector('[data-role="bow-string"]') ||
          svg.querySelector(".bow-string");

        // Fallback: attempt to auto-detect a long thin vertical-ish line/path
        if (!stringEl) {
          const candidates = Array.from(svg.querySelectorAll("path,line,polyline"));
          const scored = candidates
            .map((el) => {
              const stroke = el.getAttribute("stroke");
              const fill = el.getAttribute("fill");
              const sw = parseFloat(el.getAttribute("stroke-width") || "1");
              let score = 0;

              if (stroke && stroke !== "none") score += 3;
              if (!fill || fill === "none") score += 2;
              if (sw <= 3) score += 2;

              try {
                const bb = el.getBBox();
                const tall = bb.height / Math.max(1, bb.width);
                score += Math.min(6, tall);
                score += Math.min(2, bb.height / 120);
              } catch {}

              return { el, score };
            })
            .sort((a, b) => b.score - a.score);

          stringEl = scored[0]?.el || null;
        }

        bowStringElRef.current = stringEl;
        setBowSvgReady(true);
      } catch {
        setBowSvgReady(false);
      }
    }

    loadBowSvg();
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

    // ==========================
    // FEEL / PHYSICS
    // ==========================
    const GRAVITY = 1450;
    const MAX_PULL = 560;
    const MIN_PULL = 14;

    const MAX_SPEED = 1450;
    const MIN_SPEED = 430;

    const SPRING_K = 92;
    const SPRING_DAMP = 15;
    const FOLLOW_THROUGH_KICK = 28;

    const ARROW_LEN = 280;
    const ARROW_THICK = 20;

    const WIND_MAG = reducedMotion ? 0 : 28;

    const powerFromPull = (pullDist) => {
      const t = clamp01((pullDist - MIN_PULL) / (MAX_PULL - MIN_PULL));
      const eased = 1 - Math.pow(1 - t, 2.0);
      return MIN_SPEED + eased * (MAX_SPEED - MIN_SPEED);
    };

    const constrainPull = (s, x, y) => {
      const rp = s.releasePoint;
      let dx = x - rp.x;
      let dy = y - rp.y;
      dx = Math.min(dx, -14);

      const dist = Math.hypot(dx, dy) || 1;
      const scale = dist > MAX_PULL ? MAX_PULL / dist : 1;
      return { x: rp.x + dx * scale, y: rp.y + dy * scale };
    };

    // ✅ more pull room (deeper comfort)
    const snapPointerToComfortZone = (s, px, py) => {
      const rp = s.releasePoint;
      const comfort = { x: rp.x - 330, y: rp.y + 8 }; // <- more pull room
      const snap = 0.72;
      const blended = {
        x: lerp(px, comfort.x, snap),
        y: lerp(py, comfort.y, snap),
      };
      return constrainPull(s, blended.x, blended.y);
    };

    const init = () => {
      const rect = canvas.getBoundingClientRect();
      const W = rect.width;
      const H = rect.height;

      // ✅ candle layout that ALWAYS fits on screen
      const padR = 26;
      const bowRight = BOW_LEFT + BOW_WIDTH;
      const afterBowGap = 36;

      const minStartX = bowRight + afterBowGap;
      const maxEndX = W - padR;

      const desiredSpread = 52;
      const maxRowWidth = Math.max(0, maxEndX - minStartX);
      const spread =
        candleCount <= 1 ? 0 : Math.min(desiredSpread, maxRowWidth / (candleCount - 1));

      const startX = Math.min(minStartX, maxEndX);
      const rowW = spread * (candleCount - 1);
      const baseX = Math.min(startX, maxEndX - rowW);

      const candles = Array.from({ length: candleCount }).map((_, i) => {
        const x = baseX + i * spread;
        const y = H * 0.44 + Math.sin(i * 0.35) * 4;

        const h = Math.max(84, Math.min(128, H * 0.26));
        const w = h * 0.32;

        return { x, y, w, h, lit: true, flamePhase: Math.random() * 999 };
      });

      const wind = WIND_MAG === 0 ? 0 : (Math.random() * 2 - 1) * WIND_MAG;

      simRef.current = {
        W,
        H,
        wind,

        aiming: false,
        done: false,

        // these will be overwritten by SVG sync
        releasePoint: { x: W * 0.26, y: H * 0.50 },
        stringTop: { x: W * 0.26, y: H * 0.18 },
        stringBot: { x: W * 0.26, y: H * 0.86 },

        pull: { x: W * 0.26 - 200, y: H * 0.50 },
        pullVel: { x: 0, y: 0 },
        pullRelaxed: { x: W * 0.26 - 200, y: H * 0.50 },

        followKick: 0,
        arrows: [],
        particles: [],
        candles,

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

      if (typeof onComplete === "function") {
        try {
          onComplete(payload);
        } catch {}
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

    // ====== Sync canvas “string anchors” from SVG layout ======
    const syncAnchorsFromSvg = () => {
      const s = simRef.current;
      const svg = bowSvgElRef.current;
      const stringEl = bowStringElRef.current;
      const wrap = bowWrapRef.current;
      if (!s || !svg || !wrap || !stringEl) return;

      const wrapRect = wrap.getBoundingClientRect();

      const vb = svg.viewBox?.baseVal;
      const vbX = vb?.x ?? 0;
      const vbY = vb?.y ?? 0;
      const vbW = vb?.width ?? svg.getBBox().width;
      const vbH = vb?.height ?? svg.getBBox().height;

      let bb;
      try {
        bb = stringEl.getBBox();
      } catch {
        return;
      }

      const vbTop = { x: bb.x + bb.width * 0.5, y: bb.y };
      const vbBot = { x: bb.x + bb.width * 0.5, y: bb.y + bb.height };
      const vbNock = { x: vbTop.x, y: lerp(vbTop.y, vbBot.y, 0.52) };

      const toPx = (pt) => {
        const nx = (pt.x - vbX) / vbW;
        const ny = (pt.y - vbY) / vbH;
        const containerRect = container.getBoundingClientRect();
        return {
          x: (wrapRect.left - containerRect.left) + nx * wrapRect.width,
          y: (wrapRect.top - containerRect.top) + ny * wrapRect.height,
        };
      };

      const topPx = toPx(vbTop);
      const botPx = toPx(vbBot);
      const nockPx = toPx(vbNock);

      s.stringTop = topPx;
      s.stringBot = botPx;
      s.releasePoint = nockPx;

      s.pullRelaxed = { x: nockPx.x - 180, y: nockPx.y + 6 };

      // initialize pull once
      if (!s.pull || (s.pull.x === 0 && s.pull.y === 0)) {
        s.pull = { ...s.pullRelaxed };
        s.pullVel = { x: 0, y: 0 };
      }

      anchorsRef.current = {
        stringTop: topPx,
        stringBot: botPx,
        nock: nockPx,
        vb: { minX: vbX, minY: vbY, w: vbW, h: vbH },
        vbTop,
        vbBot,
        vbNock,
      };
    };

    // Deform the SVG string toward your finger
    const deformSvgString = () => {
      const s = simRef.current;
      const svg = bowSvgElRef.current;
      const stringEl = bowStringElRef.current;
      const wrap = bowWrapRef.current;
      if (!s || !svg || !stringEl || !wrap) return;

      if (!s.aiming) {
        const orig = stringEl.__orig;
        if (orig) {
          if (orig.type === "path") stringEl.setAttribute("d", orig.d);
          if (orig.type === "line") {
            stringEl.setAttribute("x1", orig.x1);
            stringEl.setAttribute("y1", orig.y1);
            stringEl.setAttribute("x2", orig.x2);
            stringEl.setAttribute("y2", orig.y2);
          }
        }
        return;
      }

      const wrapRect = wrap.getBoundingClientRect();
      const vb = anchorsRef.current.vb;
      if (!vb.w || !vb.h) return;

      const containerRect = container.getBoundingClientRect();
      const pullLocal = {
        x: (s.pull.x - (wrapRect.left - containerRect.left)) / wrapRect.width,
        y: (s.pull.y - (wrapRect.top - containerRect.top)) / wrapRect.height,
      };

      const pullVB = {
        x: vb.minX + pullLocal.x * vb.w,
        y: vb.minY + pullLocal.y * vb.h,
      };

      const { vbTop, vbBot, vbNock } = anchorsRef.current;

      const dx = pullVB.x - vbNock.x;
      const dist = Math.abs(dx);
      const t = clamp01((dist - 12) / 260);
      const bulge = lerp(0, 80, t);

      const ctrl = {
        x: vbNock.x + dx * 0.85,
        y: vbNock.y + (pullVB.y - vbNock.y) * 0.85,
      };

      if (!stringEl.__orig) {
        if (stringEl.tagName.toLowerCase() === "path") {
          stringEl.__orig = { type: "path", d: stringEl.getAttribute("d") || "" };
        } else if (stringEl.tagName.toLowerCase() === "line") {
          stringEl.__orig = {
            type: "line",
            x1: stringEl.getAttribute("x1"),
            y1: stringEl.getAttribute("y1"),
            x2: stringEl.getAttribute("x2"),
            y2: stringEl.getAttribute("y2"),
          };
        } else {
          return;
        }
      }

      if (stringEl.tagName.toLowerCase() === "path") {
        const d = `M ${vbTop.x} ${vbTop.y} Q ${ctrl.x - bulge} ${ctrl.y} ${vbBot.x} ${vbBot.y}`;
        stringEl.setAttribute("d", d);
      }

      if (stringEl.tagName.toLowerCase() === "line") {
        const x1 = vbTop.x;
        const y1 = vbTop.y;
        const x2 = vbBot.x;
        const y2 = vbBot.y;
        const shift = dx * 0.22;
        stringEl.setAttribute("x1", String(x1 + shift));
        stringEl.setAttribute("y1", String(y1));
        stringEl.setAttribute("x2", String(x2 + shift));
        stringEl.setAttribute("y2", String(y2));
      }
    };

    const update = (dt) => {
      const s = simRef.current;
      if (!s) return;

      syncAnchorsFromSvg();
      updatePullSpring(s, dt);
      deformSvgString();

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

    // ==========================
    // DRAWING
    // ==========================
    const drawVignette = (W, H) => {
      const g = ctx.createRadialGradient(W * 0.58, H * 0.35, 80, W * 0.58, H * 0.45, W * 0.95);
      g.addColorStop(0, "rgba(0,0,0,0.06)");
      g.addColorStop(1, "rgba(0,0,0,0.42)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);

      ctx.save();
      ctx.globalAlpha = 0.18;
      ctx.strokeStyle = "rgba(242,231,209,0.22)";
      ctx.lineWidth = 1;
      ctx.strokeRect(10, 10, W - 20, H - 20);
      ctx.restore();
    };

    const drawCandles = (s) => {
      const { candle } = imagesRef.current;
      for (const c of s.candles) {
        if (!c.lit) continue;

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

        const t = c.flamePhase;
        const flick = 0.78 + 0.22 * Math.sin(t) + 0.10 * Math.sin(t * 2.25);
        const fx = c.x;
        const fy = c.y - c.h * 0.92;
        const fw = c.w * 0.42 * flick;
        const fh = c.h * 0.24 * flick;

        ctx.save();
        ctx.globalAlpha = 0.24;
        ctx.fillStyle = "#ffcc66";
        ctx.beginPath();
        ctx.ellipse(fx, fy, fw * 2.3, fh * 1.7, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        ctx.save();
        ctx.globalAlpha = 0.90;
        ctx.fillStyle = "#ffd27a";
        ctx.beginPath();
        ctx.moveTo(fx, fy - fh);
        ctx.quadraticCurveTo(fx + fw, fy - fh * 0.2, fx, fy + fh);
        ctx.quadraticCurveTo(fx - fw, fy - fh * 0.2, fx, fy - fh);
        ctx.fill();

        ctx.globalAlpha = 0.74;
        ctx.fillStyle = "#fff2c9";
        ctx.beginPath();
        ctx.ellipse(fx, fy, fw * 0.34, fh * 0.58, 0, 0, Math.PI * 2);
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
      ctx.globalAlpha = 0.22;
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

    const drawNockedArrow = (s) => {
      const { arrow } = imagesRef.current;
      if (!arrow) return;

      const rp = s.releasePoint;
      const nock = s.aiming
        ? { x: s.pull.x, y: s.pull.y }
        : { x: s.pullRelaxed.x, y: s.pullRelaxed.y };

      const visualY = s.aiming ? nock.y : rp.y + 6;
      const launch = computeLaunch(s, s.aiming ? s.pull : s.pullRelaxed);

      ctx.save();
      ctx.globalAlpha = s.aiming ? 0.96 : 0.72;
      ctx.translate(nock.x, visualY);
      ctx.rotate(launch.rot);

      const nockOffset = ARROW_LEN * 0.38;
      ctx.drawImage(arrow, -nockOffset, -ARROW_THICK / 2, ARROW_LEN, ARROW_THICK);

      ctx.restore();
    };

    const drawFlyingArrows = (s) => {
      const { arrow } = imagesRef.current;
      if (!arrow) return;

      for (const a of s.arrows) {
        if (!a.alive) continue;
        ctx.save();
        ctx.translate(a.x, a.y);
        ctx.rotate(a.rot);
        ctx.drawImage(arrow, -a.length * 0.38, -a.thickness / 2, a.length, a.thickness);
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

      // Bow is SVG overlay
      drawNockedArrow(s);
      drawTrajectoryPreview(s);
      drawFlyingArrows(s);

      drawParticles(s);
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
  }, [candleCount, onComplete, reducedMotion, bowSvgReady]);

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
          <div style={{ fontSize: 12, opacity: 0.75 }}>Pull the string. Release.</div>
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

          {/* Bow SVG overlay (moved right) */}
          <div
            ref={bowWrapRef}
            style={{
              position: "absolute",
              left: BOW_LEFT,
              top: 6,
              bottom: 10,
              width: BOW_WIDTH,
              pointerEvents: "none",
              opacity: 0.95,
              filter: "drop-shadow(0 10px 22px rgba(0,0,0,0.45))",
            }}
          >
            <div ref={bowSvgHostRef} style={{ width: "100%", height: "100%" }} />
          </div>

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