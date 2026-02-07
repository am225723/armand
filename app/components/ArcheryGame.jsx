"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * ArcheryGame.jsx
 * - Bow is inline SVG (/public/game/bow.svg) so we can deform the string.
 * - Arrow + candle are PNGs (/public/game/arrow.png, /public/game/candle.png).
 *
 * Requested upgrades:
 * ✅ Precisely calibrate arrow nock pixel (based on your Arrow.png transparency bbox)
 * ✅ Limb flex animation tied to pull strength
 * ✅ String snap vibration decay after release
 * ✅ Lock bow scaling across mobile / desktop (consistent layout math)
 * ✅ More pull room (bow placed further right; candles placed after bow)
 * ✅ Auto-advance reliably when candles are out (fires onComplete once)
 *
 * IMPORTANT for best results:
 * - In bow.svg, add id="bow-string" (or class="bow-string") to the string element you want pulled.
 *   Otherwise we try to auto-detect the most “string-like” thin tall path/line.
 */

function clamp01(x) {
  return Math.max(0, Math.min(1, x));
}
function clamp(x, a, b) {
  return Math.max(a, Math.min(b, x));
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

/**
 * Arrow.png calibration (derived from your uploaded Arrow.png):
 * - Image size: 600 x 214
 * - Non-transparent bbox: x=9..592, y=89..128 (arrow itself is in a thin band)
 * We treat the “nock” (string contact) as near the back edge of the visible arrow.
 */
const ARROW_IMG_W = 600;
const ARROW_IMG_H = 214;
const ARROW_NOCK_PX = 11; // near bbox left edge (9) + tiny inset
const ARROW_NOCK_PY = 108; // ~center of bbox vertically (89..128 => ~108.5)

/**
 * Bow layout locking:
 * we compute bow size/position from canvas size the same way on all devices,
 * so scaling feels consistent.
 */
function computeBowLayout(W, H) {
  const pad = 12;
  // stable proportions with clamps
  const bowH = clamp(H * 0.92, 300, 520);
  const bowW = clamp(bowH * 0.44, 200, 320);

  // put bow further right so you can pull back a lot on the left
  const left = clamp(W * 0.15, 110, 220);
  const top = Math.round((H - bowH) / 2);

  return {
    left: Math.round(left),
    top: Math.round(top),
    width: Math.round(bowW),
    height: Math.round(bowH),
    pad,
  };
}

export default function ArcheryGame({
  onComplete,
  candleCount = 7,
  width = "100%",
  height = 420,
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  // Bow SVG overlay refs
  const bowWrapRef = useRef(null);
  const bowSvgHostRef = useRef(null); // where we inject inline svg
  const bowSvgElRef = useRef(null); // actual svg element
  const bowStringElRef = useRef(null); // path/line we will deform

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

  // Bow layout (locks scale/position)
  const [bowLayout, setBowLayout] = useState(() => ({
    left: 140,
    top: 0,
    width: 240,
    height: 420,
    pad: 12,
  }));

  // Keep layout synced to canvas/container size
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const updateLayout = () => {
      const r = canvas.getBoundingClientRect();
      const W = r.width || 1;
      const H = r.height || Number(height) || 420;
      setBowLayout(computeBowLayout(W, H));
    };

    updateLayout();

    const ro = new ResizeObserver(() => updateLayout());
    ro.observe(container);
    ro.observe(canvas);

    window.addEventListener("resize", updateLayout);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateLayout);
    };
  }, [height]);

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

  // Other images (arrow/candle)
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

        svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
        svg.style.width = "100%";
        svg.style.height = "100%";
        svg.style.display = "block";

        // Find string element
        let stringEl =
          svg.querySelector("#bow-string") ||
          svg.querySelector('[data-role="bow-string"]') ||
          svg.querySelector(".bow-string");

        // Fallback detect: tall + skinny + stroked
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
                score += Math.min(8, tall);
                score += Math.min(2, bb.height / 120);
              } catch {}
              return { el, score };
            })
            .sort((a, b) => b.score - a.score);

          stringEl = scored[0]?.el || null;
        }

        bowStringElRef.current = stringEl;

        // If the string is on the RIGHT side of the SVG, flip so string ends up on LEFT.
        // (This satisfies your “strings on the left” requirement.)
        try {
          const vb = svg.viewBox?.baseVal;
          const vbW = vb?.width ?? svg.getBBox().width;
          const vbX = vb?.x ?? 0;

          if (stringEl) {
            const bb = stringEl.getBBox();
            const stringCenterX = bb.x + bb.width * 0.5;
            const midX = vbX + vbW * 0.5;

            // If string center is right of mid, flip horizontally
            if (stringCenterX > midX) {
              svg.style.transform = "scaleX(-1)";
              svg.style.transformOrigin = "50% 50%";
            } else {
              svg.style.transform = "none";
            }
          }
        } catch {}

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
    const MAX_PULL = 720; // more pull room
    const MIN_PULL = 14;

    const MAX_SPEED = 1500;
    const MIN_SPEED = 430;

    const SPRING_K = 92;
    const SPRING_DAMP = 15;

    const FOLLOW_THROUGH_KICK = 30;

    // Arrow sizing (make a bit bigger and crisp)
    const ARROW_LEN = 320;
    const ARROW_THICK = 24;

    const WIND_MAG = reducedMotion ? 0 : 28;

    // string vibe
    const STRING_VIBE_FREQ = 24; // Hz-ish
    const STRING_VIBE_DECAY = 8.5; // bigger = faster decay

    // limb flex
    const LIMB_FLEX_MAX_DEG = 3.2; // subtle
    const LIMB_FLEX_MAX_SKEW = 2.6;

    const powerFromPull = (pullDist) => {
      const t = clamp01((pullDist - MIN_PULL) / (MAX_PULL - MIN_PULL));
      const eased = 1 - Math.pow(1 - t, 2.0);
      return MIN_SPEED + eased * (MAX_SPEED - MIN_SPEED);
    };

    const constrainPull = (s, x, y) => {
      const rp = s.releasePoint;
      let dx = x - rp.x;
      let dy = y - rp.y;

      // require pulling behind the string (to the left), but allow a little slack
      dx = Math.min(dx, -12);

      const dist = Math.hypot(dx, dy) || 1;
      const scale = dist > MAX_PULL ? MAX_PULL / dist : 1;
      return { x: rp.x + dx * scale, y: rp.y + dy * scale };
    };

    // start draw anywhere, then snap toward a comfortable pull lane behind the string
    const snapPointerToComfortZone = (s, px, py) => {
      const rp = s.releasePoint;

      // comfy lane: some distance behind string, slightly below center (matches your screenshot feel)
      const comfort = { x: rp.x - 320, y: rp.y + 8 };

      // snap blend
      const snap = 0.72;
      const blended = {
        x: lerp(px, comfort.x, snap),
        y: lerp(py, comfort.y, snap),
      };

      return constrainPull(s, blended.x, blended.y);
    };

    const initCandles = (W, H) => {
      const padR = 26;

      // place candles AFTER the bow footprint
      const bow = computeBowLayout(W, H);
      const bowRight = bow.left + bow.width;
      const afterBowGap = 64;

      const minStartX = bowRight + afterBowGap;
      const maxEndX = W - padR;

      const maxRowWidth = Math.max(0, maxEndX - minStartX);
      const desiredSpread = 58;
      const spread = candleCount <= 1 ? 0 : Math.min(desiredSpread, maxRowWidth / (candleCount - 1));

      const startX = Math.min(minStartX, maxEndX);
      const rowW = spread * (candleCount - 1);
      const baseX = Math.min(startX, maxEndX - rowW);

      return Array.from({ length: candleCount }).map((_, i) => {
        const x = baseX + i * spread;
        const y = H * 0.44 + Math.sin(i * 0.35) * 4;

        const h = Math.max(92, Math.min(140, H * 0.28));
        const w = h * 0.32;

        return {
          x,
          y,
          w,
          h,
          lit: true,
          flamePhase: Math.random() * 999,
        };
      });
    };

    const init = () => {
      const rect = canvas.getBoundingClientRect();
      const W = rect.width;
      const H = rect.height;

      const wind = WIND_MAG === 0 ? 0 : (Math.random() * 2 - 1) * WIND_MAG;

      simRef.current = {
        W,
        H,
        wind,

        aiming: false,
        done: false,

        // will be overwritten from SVG anchors
        releasePoint: { x: W * 0.26, y: H * 0.52 },
        stringTop: { x: W * 0.26, y: H * 0.18 },
        stringBot: { x: W * 0.26, y: H * 0.86 },

        pull: { x: W * 0.26 - 160, y: H * 0.52 },
        pullVel: { x: 0, y: 0 },
        pullRelaxed: { x: W * 0.26 - 160, y: H * 0.52 },

        followKick: 0,

        // string snap vibration
        stringVibeT: 0,
        stringVibeAmp: 0,

        // bow flex
        pullStrength01: 0,

        arrows: [],
        particles: [],
        candles: initCandles(W, H),

        shots: 0,
        startedAt: null,
        finishedAt: null,
      };

      completedOnceRef.current = false;
      setDoneUI(false);
      setShotsUI(0);
      setRemainingUI(candleCount);
    };

    init();

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
    };

    const finishIfDone = (s) => {
      const left = s.candles.filter((c) => c.lit).length;
      if (left !== 0) return;

      s.done = true;
      if (!s.finishedAt) s.finishedAt = performance.now();

      // AUTO-ADVANCE: fire once, reliably.
      if (!completedOnceRef.current) {
        completedOnceRef.current = true;
        // slight beat so the last “hit” feels satisfying
        setTimeout(() => fireComplete(s), 420);
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

      // string snap vibration (decays)
      s.stringVibeT = 0;
      s.stringVibeAmp = Math.max(s.stringVibeAmp, 1.0);

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
      const rp = s.releasePoint;

      // pull strength for flexing (0..1)
      const dx = s.pull.x - rp.x;
      const dy = s.pull.y - rp.y;
      const dist = Math.hypot(dx, dy);
      s.pullStrength01 = clamp01((dist - MIN_PULL) / (MAX_PULL - MIN_PULL));

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

        const dx2 = s.pull.x - targetX;
        const dy2 = s.pull.y - targetY;

        const ax = -SPRING_K * dx2 - SPRING_DAMP * s.pullVel.x;
        const ay = -SPRING_K * dy2 - SPRING_DAMP * s.pullVel.y;

        s.pullVel.x += ax * dt;
        s.pullVel.y += ay * dt;

        s.pull.x += s.pullVel.x * dt;
        s.pull.y += s.pullVel.y * dt;

        const p = constrainPull(s, s.pull.x, s.pull.y);
        s.pull.x = p.x;
        s.pull.y = p.y;
      }

      // string vibe time update (only when not aiming)
      if (!s.aiming && s.stringVibeAmp > 0.001) {
        s.stringVibeT += dt;
        // exponential decay
        s.stringVibeAmp *= Math.exp(-STRING_VIBE_DECAY * dt);
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
      const containerRect = container.getBoundingClientRect();

      // SVG viewBox
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

      // endpoints of the string element bbox
      const vbTop = { x: bb.x + bb.width * 0.5, y: bb.y };
      const vbBot = { x: bb.x + bb.width * 0.5, y: bb.y + bb.height };

      // nock point around mid (your red-circle idea)
      const vbNock = { x: vbTop.x, y: lerp(vbTop.y, vbBot.y, 0.52) };

      const toPx = (pt) => {
        const nx = (pt.x - vbX) / vbW;
        const ny = (pt.y - vbY) / vbH;
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

      // relaxed position: behind string, slightly below
      s.pullRelaxed = { x: nockPx.x - 180, y: nockPx.y + 8 };

      // initialize pull once
      if (!s.pull || (s.pull.x === 0 && s.pull.y === 0)) {
        s.pull = { ...s.pullRelaxed };
        s.pullVel = { x: 0, y: 0 };
      }
    };

    // Deform the SVG string toward your finger + vibration after release
    const deformSvgString = () => {
      const s = simRef.current;
      const svg = bowSvgElRef.current;
      const stringEl = bowStringElRef.current;
      const wrap = bowWrapRef.current;
      if (!s || !svg || !stringEl || !wrap) return;

      // Store original once
      if (!stringEl.__orig) {
        const tag = stringEl.tagName.toLowerCase();
        if (tag === "path") {
          stringEl.__orig = { type: "path", d: stringEl.getAttribute("d") || "" };
        } else if (tag === "line") {
          stringEl.__orig = {
            type: "line",
            x1: stringEl.getAttribute("x1"),
            y1: stringEl.getAttribute("y1"),
            x2: stringEl.getAttribute("x2"),
            y2: stringEl.getAttribute("y2"),
          };
        } else {
          stringEl.__orig = { type: "other" };
        }
      }

      // If we can’t safely deform, bail
      if (stringEl.__orig.type === "other") return;

      const wrapRect = wrap.getBoundingClientRect();
      const vb = svg.viewBox?.baseVal;
      const vbX = vb?.x ?? 0;
      const vbY = vb?.y ?? 0;
      const vbW = vb?.width ?? svg.getBBox().width;
      const vbH = vb?.height ?? svg.getBBox().height;

      // Convert pull point (CSS px) -> viewBox coords
      const containerRect = container.getBoundingClientRect();
      const pullLocal01 = {
        x: (s.pull.x - (wrapRect.left - containerRect.left)) / wrapRect.width,
        y: (s.pull.y - (wrapRect.top - containerRect.top)) / wrapRect.height,
      };
      const pullVB = {
        x: vbX + pullLocal01.x * vbW,
        y: vbY + pullLocal01.y * vbH,
      };

      // Compute vbTop/vbBot/vbNock from the string bbox every time (stable)
      let bb;
      try {
        bb = stringEl.getBBox();
      } catch {
        return;
      }
      const vbTop = { x: bb.x + bb.width * 0.5, y: bb.y };
      const vbBot = { x: bb.x + bb.width * 0.5, y: bb.y + bb.height };
      const vbNock = { x: vbTop.x, y: lerp(vbTop.y, vbBot.y, 0.52) };

      // If aiming: follow finger strongly.
      // If not aiming: add vibration around the original centerline and then relax.
      let ctrlX = vbNock.x;
      let ctrlY = vbNock.y;

      if (s.aiming) {
        const dx = pullVB.x - vbNock.x; // negative when pulling back (left)
        const dy = pullVB.y - vbNock.y;

        // Tunable curvature strength:
        // stronger pull => more curvature, but clamp so it doesn’t go cartoon.
        const pullDist = Math.hypot(dx, dy);
        const t = clamp01((pullDist - 10) / 320);
        const bulge = lerp(8, 110, t); // ✅ tune curvature strength here

        ctrlX = vbNock.x + dx * 0.92 - bulge; // bias left for a “bowed” string feel
        ctrlY = vbNock.y + dy * 0.92;
      } else {
        // vibration decay after release
        if (s.stringVibeAmp > 0.001) {
          const vib = Math.sin(s.stringVibeT * STRING_VIBE_FREQ * Math.PI * 2);
          // mostly horizontal wiggle, tiny vertical shimmer
          const wigX = vib * (18 * s.stringVibeAmp);
          const wigY = Math.cos(s.stringVibeT * STRING_VIBE_FREQ * Math.PI * 2) * (3.5 * s.stringVibeAmp);
          ctrlX = vbNock.x + wigX;
          ctrlY = vbNock.y + wigY;
        } else {
          // reset to original exactly
          const orig = stringEl.__orig;
          if (orig.type === "path") stringEl.setAttribute("d", orig.d);
          if (orig.type === "line") {
            stringEl.setAttribute("x1", orig.x1);
            stringEl.setAttribute("y1", orig.y1);
            stringEl.setAttribute("x2", orig.x2);
            stringEl.setAttribute("y2", orig.y2);
          }
          return;
        }
      }

      // Apply deformation
      if (stringEl.__orig.type === "path") {
        const d = `M ${vbTop.x} ${vbTop.y} Q ${ctrlX} ${ctrlY} ${vbBot.x} ${vbBot.y}`;
        stringEl.setAttribute("d", d);
      } else if (stringEl.__orig.type === "line") {
        // basic illusion by shifting endpoints slightly toward ctrlX
        const shift = (ctrlX - vbNock.x) * 0.25;
        stringEl.setAttribute("x1", String(vbTop.x + shift));
        stringEl.setAttribute("y1", String(vbTop.y));
        stringEl.setAttribute("x2", String(vbBot.x + shift));
        stringEl.setAttribute("y2", String(vbBot.y));
      }
    };

    // Limb flex tied to pull strength (applied to the whole svg with an origin near grip)
    const applyLimbFlex = () => {
      const s = simRef.current;
      const svg = bowSvgElRef.current;
      if (!s || !svg) return;

      // If bow.svg is flipped horizontally (string on left), keep that flip AND add flex.
      const existing = svg.style.transform || "none";
      const isFlipped = existing.includes("scaleX(-1)");

      const t = s.pullStrength01;
      const ease = 1 - Math.pow(1 - t, 2);

      const rot = lerp(0, -LIMB_FLEX_MAX_DEG, ease);
      const skew = lerp(0, -LIMB_FLEX_MAX_SKEW, ease);

      // Keep flip if already set; then add rotate/skew for flex.
      const base = isFlipped ? "scaleX(-1)" : "";
      const flex = `rotate(${rot}deg) skewY(${skew}deg)`;

      svg.style.transform = `${base} ${flex}`.trim();
      svg.style.transformOrigin = "58% 55%"; // around grip-ish
      svg.style.willChange = "transform";
    };

    const update = (dt) => {
      const s = simRef.current;
      if (!s) return;

      syncAnchorsFromSvg();
      updatePullSpring(s, dt);
      deformSvgString();
      applyLimbFlex();

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

        if (a.x > s.W + 260 || a.y > s.H + 260 || a.y < -260) a.alive = false;

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
      // translucent frosted panel vibe
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

        // warm halo
        ctx.save();
        ctx.globalAlpha = 0.22;
        ctx.fillStyle = "#ffcc66";
        ctx.beginPath();
        ctx.ellipse(c.x, c.y - c.h * 0.88, c.w * 1.15, c.h * 0.38, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        if (candle) {
          ctx.drawImage(candle, c.x - c.w / 2, c.y - c.h, c.w, c.h);
        }

        // Better flame: layered teardrop + inner core + soft glow
        const t = c.flamePhase;
        const flick = 0.80 + 0.20 * Math.sin(t) + 0.09 * Math.sin(t * 2.35);
        const fx = c.x;
        const fy = c.y - c.h * 0.92;
        const fw = c.w * 0.46 * flick;
        const fh = c.h * 0.26 * flick;

        // outer glow
        ctx.save();
        ctx.globalAlpha = 0.26;
        ctx.fillStyle = "#ffcc66";
        ctx.beginPath();
        ctx.ellipse(fx, fy, fw * 2.4, fh * 1.9, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // flame body
        ctx.save();
        ctx.globalAlpha = 0.92;
        ctx.fillStyle = "#ffd27a";
        ctx.beginPath();
        ctx.moveTo(fx, fy - fh);
        ctx.quadraticCurveTo(fx + fw, fy - fh * 0.15, fx, fy + fh);
        ctx.quadraticCurveTo(fx - fw, fy - fh * 0.15, fx, fy - fh);
        ctx.fill();

        // inner core
        ctx.globalAlpha = 0.78;
        ctx.fillStyle = "#fff3d2";
        ctx.beginPath();
        ctx.ellipse(fx, fy, fw * 0.34, fh * 0.62, 0, 0, Math.PI * 2);
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
      ctx.globalAlpha = 0.20;
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

    const drawImageNockedAt = (img, x, y, rot, drawW, drawH) => {
      // scale nock pixel into draw size
      const nockX = (ARROW_NOCK_PX / ARROW_IMG_W) * drawW;
      const nockY = (ARROW_NOCK_PY / ARROW_IMG_H) * drawH;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);

      // place image so nock pixel is exactly at (0,0)
      ctx.drawImage(img, -nockX, -nockY, drawW, drawH);

      ctx.restore();
    };

    const drawNockedArrow = (s) => {
      const { arrow } = imagesRef.current;
      if (!arrow) return;

      // when aiming, the arrow’s nock sits at the finger pull point
      // otherwise it rests on the string at releasePoint
      const rp = s.releasePoint;

      const nock = s.aiming
        ? { x: s.pull.x, y: s.pull.y }
        : { x: rp.x, y: rp.y };

      const launch = computeLaunch(s, s.aiming ? s.pull : s.pullRelaxed);

      ctx.save();
      ctx.globalAlpha = s.aiming ? 0.98 : 0.70;

      // Draw arrow bigger + crisp, aligned to real nock pixel ✅
      drawImageNockedAt(arrow, nock.x, nock.y, launch.rot, ARROW_LEN, ARROW_THICK);

      ctx.restore();
    };

    const drawFlyingArrows = (s) => {
      const { arrow } = imagesRef.current;
      if (!arrow) return;

      for (const a of s.arrows) {
        if (!a.alive) continue;
        ctx.save();
        ctx.globalAlpha = 0.98;
        drawImageNockedAt(arrow, a.x, a.y, a.rot, a.length, a.thickness);
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

      // live resize values
      const rect = canvas.getBoundingClientRect();
      s.W = rect.width;
      s.H = rect.height;

      update(dt);

      ctx.clearRect(0, 0, s.W, s.H);

      drawVignette(s.W, s.H);
      drawCandles(s);

      // bow is SVG overlay, not drawn here
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
  }, [candleCount, onComplete, reducedMotion, bowSvgReady, height]);

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
          <div style={{ fontSize: 12, opacity: 0.75 }}>Start anywhere. Pull back. Release.</div>
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
          {/* Canvas for candles + arrow physics */}
          <canvas
            ref={canvasRef}
            style={{
              width: "100%",
              height,
              display: "block",
              background: "transparent",
            }}
          />

          {/* Bow SVG overlay (locked scale/position) */}
          <div
            ref={bowWrapRef}
            style={{
              position: "absolute",
              left: bowLayout.left,
              top: bowLayout.top,
              width: bowLayout.width,
              height: bowLayout.height,
              pointerEvents: "none",
              opacity: 0.96,
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

                {/* This should rarely be needed now, but is a safe fallback */}
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