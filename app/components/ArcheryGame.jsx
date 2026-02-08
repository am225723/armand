"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

/* ----------------------------- tiny utilities ----------------------------- */
function clamp(v, a, b) {
  return Math.max(a, Math.min(b, v));
}
function clamp01(x) {
  return clamp(x, 0, 1);
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
 * ArcheryGame
 * Assets:
 *  /public/game/bow.svg      (recommended: add id="bow-string" to the string element)
 *  /public/game/arrow.png
 *  /public/game/candle.png
 *
 * Notes:
 * - bow.svg is injected inline so we can deform the string.
 * - arrow.png is drawn on canvas; nock follows finger while drawing.
 * - candles are drawn on canvas + a nicer procedural flame.
 */
export default function ArcheryGame({
  onComplete,
  candleCount = 7,
  width = "100%",
  height = 420,

  /* ---------------------- visual / layout knobs (safe) --------------------- */
  // Fixed-ish bow sizing across devices (locked feel).
  bowWidthPx = 250, // bow visual width
  bowInsetTop = 6,
  bowInsetBottom = 10,

  // Where the bow block sits. We compute a good value per screen, but you can override.
  bowLeftPxOverride = null,

  // Mirror bow so the string appears on the LEFT visually (what you want).
  flipBow = true,

  /* -------------------------- tuning / feel knobs -------------------------- */
  // Stronger = more bend for same pull
  stringCurveStrength = 1.15,

  // Vibration after release (decays quickly)
  stringVibrateOnRelease = true,

  // Subtle limb flex tied to pull
  limbFlex = true,

  // Arrow visuals
  arrowScale = 1.18,

  /**
   * IMPORTANT: nock calibration.
   * This is "where the nock is inside your arrow PNG" measured as ratio of PNG width.
   * Example: if the nock point is 42px from the left edge in a 600px-wide PNG => 42/600 = 0.07
   *
   * Start with 0.12–0.20 range. Nudge until the nock sits EXACTLY on the string.
   */
  arrowNockRatio = 0.16,

  // Aim assist: magnet to centerline
  centerlineMagnet = 0.42,

  // Limit vertical aim so it doesn't “fall” while drawing
  maxAimVerticalPx = 130,

  // Auto-advance delay after final candle hit
  autoAdvanceDelayMs = 520,
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  // Bow SVG overlay refs
  const bowWrapRef = useRef(null);
  const bowSvgHostRef = useRef(null);
  const bowSvgElRef = useRef(null);
  const bowStringElRef = useRef(null);
  const activePointerIdRef = useRef(null);

  // Keep original string geometry so we can restore.
  const stringOrigRef = useRef(null);

  // Assets: arrow/candle image
  const imagesRef = useRef({ arrow: null, candle: null, loaded: false });

  const [assetsReady, setAssetsReady] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [hapticsOn, setHapticsOn] = useState(false);

  const [shotsUI, setShotsUI] = useState(0);
  const [remainingUI, setRemainingUI] = useState(candleCount);
  const [doneUI, setDoneUI] = useState(false);

  const reducedMotion = useMemo(() => prefersReducedMotion(), []);

  const soundOnRef = useRef(soundOn);
  const hapticsOnRef = useRef(hapticsOn);
  useEffect(() => void (soundOnRef.current = soundOn), [soundOn]);
  useEffect(() => void (hapticsOnRef.current = hapticsOn), [hapticsOn]);

  /* --------------------------------- sound -------------------------------- */
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

  /* --------------------------------- loading -------------------------------- */
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

  // Load bow.svg inline so we can mutate its string.
  useEffect(() => {
    let cancelled = false;

    async function loadBow() {
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

        let stringEl =
          svg.querySelector("#bow-string") ||
          svg.querySelector('[data-role="bow-string"]') ||
          svg.querySelector(".bow-string");

        // Fallback heuristic: tall, thin, stroke-only element
        if (!stringEl) {
          const candidates = Array.from(svg.querySelectorAll("path,line,polyline"));
          const scored = candidates
            .map((el) => {
              let score = 0;
              const stroke = el.getAttribute("stroke");
              const fill = el.getAttribute("fill");
              const sw = parseFloat(el.getAttribute("stroke-width") || "1");

              if (stroke && stroke !== "none") score += 3;
              if (!fill || fill === "none") score += 2;
              if (sw <= 3) score += 2;

              try {
                const bb = el.getBBox();
                const tall = bb.height / Math.max(1, bb.width);
                score += Math.min(7, tall);
                score += Math.min(2, bb.height / 120);
              } catch {}

              return { el, score };
            })
            .sort((a, b) => b.score - a.score);

          stringEl = scored[0]?.el || null;
        }

        bowStringElRef.current = stringEl;

        // Store original geometry (path/line only)
        if (stringEl) {
          const tag = stringEl.tagName.toLowerCase();
          if (tag === "path") {
            stringOrigRef.current = { type: "path", d: stringEl.getAttribute("d") || "" };
          } else if (tag === "line") {
            stringOrigRef.current = {
              type: "line",
              x1: stringEl.getAttribute("x1"),
              y1: stringEl.getAttribute("y1"),
              x2: stringEl.getAttribute("x2"),
              y2: stringEl.getAttribute("y2"),
            };
          } else {
            stringOrigRef.current = null;
          }
        }
      } catch {
        // If bow.svg missing, the game still works (no string deformation though).
      }
    }

    loadBow();
    return () => {
      cancelled = true;
    };
  }, []);

  /* -------------------------------- simulation -------------------------------- */
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

    /* ------------------------------ feel / physics ------------------------------ */
    const GRAVITY = 1450;
    const MAX_PULL = 580; // more pull room
    const MIN_PULL = 18;

    const MAX_SPEED = 1500;
    const MIN_SPEED = 420;

    // “follow-through spring” (arrow + string settling)
    const SPRING_K = 98;
    const SPRING_DAMP = 15;
    const FOLLOW_THROUGH_KICK = 30;

    // arrow draw size (scaled)
    const BASE_ARROW_LEN = 280;
    const BASE_ARROW_THICK = 20;

    const WIND_MAG = reducedMotion ? 0 : 26;

    /* --------------------------- bow placement (locked) -------------------------- */
    const computeBowLeftPx = (W) => {
      if (typeof bowLeftPxOverride === "number") return bowLeftPxOverride;

      // Goal: string ends up with real space on the left to pull.
      // So bow block must sit “not too far left”.
      // On small screens, keep it ~22–28% from left.
      // On larger, keep it around 190–240.
      const t = clamp01((W - 360) / 520);
      return Math.round(lerp(150, 220, t)); // 150..220
    };

    const computeBowWidthPx = (W) => {
      // lock-ish sizing: stable but responsive
      // never huge on mobile; never tiny on desktop
      const vw = W * 0.42;
      return Math.round(clamp(vw, 210, bowWidthPx));
    };

    const getBowFootprint = () => {
      const wrap = bowWrapRef.current;
      if (!wrap) return null;
      const wrapRect = wrap.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      return {
        left: wrapRect.left - containerRect.left,
        right: wrapRect.right - containerRect.left,
        top: wrapRect.top - containerRect.top,
        bottom: wrapRect.bottom - containerRect.top,
        width: wrapRect.width,
        height: wrapRect.height,
      };
    };

    /* --------------------------- mapping anchors from SVG -------------------------- */
    // We pull the “string bbox” top, bottom, and a nock point mid-ish.
    // Then map viewBox coords -> CSS px inside the bowWrap.
    const anchorsRef = { current: null };

    const syncAnchorsFromSvg = () => {
      const s = simRef.current;
      const svg = bowSvgElRef.current;
      const stringEl = bowStringElRef.current;
      const wrap = bowWrapRef.current;
      if (!s || !svg || !wrap || !stringEl) return;

      const containerRect = container.getBoundingClientRect();
      const wrapRect = wrap.getBoundingClientRect();

      // viewBox
      const vb = svg.viewBox?.baseVal;
      const vbX = vb?.x ?? 0;
      const vbY = vb?.y ?? 0;
      const vbW = vb?.width ?? 1;
      const vbH = vb?.height ?? 1;

      let bb;
      try {
        bb = stringEl.getBBox();
      } catch {
        return;
      }

      // endpoints + nock in viewBox coords
      const vbTop = { x: bb.x + bb.width * 0.5, y: bb.y };
      const vbBot = { x: bb.x + bb.width * 0.5, y: bb.y + bb.height };
      const vbNock = { x: vbTop.x, y: lerp(vbTop.y, vbBot.y, 0.52) };

      const toPx = (pt) => {
        let nx = (pt.x - vbX) / vbW;
        const ny = (pt.y - vbY) / vbH;

        // account for visual mirroring
        if (flipBow) nx = 1 - nx;

        const xPage = wrapRect.left + nx * wrapRect.width;
        const yPage = wrapRect.top + ny * wrapRect.height;

        return {
          x: xPage - containerRect.left,
          y: yPage - containerRect.top,
        };
      };

      const topPx = toPx(vbTop);
      const botPx = toPx(vbBot);
      const nockPx = toPx(vbNock);

      anchorsRef.current = { vbX, vbY, vbW, vbH, vbTop, vbBot, vbNock, topPx, botPx, nockPx };
      s.stringTop = topPx;
      s.stringBot = botPx;
      s.releasePoint = nockPx;

      // Default relaxed pull: at nock point (string centerline)
      s.pullRelaxed = { x: nockPx.x, y: nockPx.y };

      // Keep pull pinned when not aiming
      if (!s.aiming) {
        s.pull.x = s.pullRelaxed.x;
        s.pull.y = s.pullRelaxed.y;
      }
    };

    /* ------------------------------- candles layout ------------------------------ */
    const buildCandles = (W, H) => {
      const padR = 18;
      const padT = 10;

      // If bow exists, reserve everything up to its right edge + gap.
      const bow = getBowFootprint();
      const reservedLeft = bow ? bow.right + 44 : W * 0.42;

      // Guarantee room even if something weird happens:
      const minStartX = clamp(reservedLeft, W * 0.48, W - 140);
      const maxEndX = W - padR;

      const maxRowW = Math.max(0, maxEndX - minStartX);
      const desiredSpread = 56;
      const spread = candleCount <= 1 ? 0 : Math.min(desiredSpread, maxRowW / (candleCount - 1));

      const rowW = spread * (candleCount - 1);
      const baseX = clamp(minStartX, 0, maxEndX - rowW);

      return Array.from({ length: candleCount }).map((_, i) => {
        const x = baseX + i * spread;
        const y = H * 0.44 + Math.sin(i * 0.35) * 4 + padT;

        const h = Math.max(86, Math.min(132, H * 0.27));
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

    /* --------------------------------- init sim -------------------------------- */
    const init = () => {
      const rect = canvas.getBoundingClientRect();
      const W = rect.width;
      const H = rect.height;

      simRef.current = {
        W,
        H,
        wind: WIND_MAG === 0 ? 0 : (Math.random() * 2 - 1) * WIND_MAG,

        aiming: false,
        done: false,

        // overwritten by SVG anchors once ready
        releasePoint: { x: W * 0.33, y: H * 0.56 },
        stringTop: { x: W * 0.33, y: H * 0.18 },
        stringBot: { x: W * 0.33, y: H * 0.86 },

        pull: { x: W * 0.33, y: H * 0.56 },
        pullVel: { x: 0, y: 0 },
        pullRelaxed: { x: W * 0.33, y: H * 0.56 },

        followKick: 0,

        // string vibration after release
        vibT: 0,
        vibAmp: 0,
        vibDir: 1,

        // bow flex
        flexT: 0,

        arrows: [],
        particles: [],
        candles: buildCandles(W, H),

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

    /* -------------------------------- completion -------------------------------- */
    const emitComplete = (s) => {
      const shots = s.shots;
      const timeMs =
        s.startedAt && s.finishedAt ? Math.max(0, s.finishedAt - s.startedAt) : null;

      const payload = { shots, timeMs };

      // Call user handler
      if (typeof onComplete === "function") {
        try {
          onComplete(payload);
        } catch {}
      }

      // Also broadcast (optional)
      try {
        window.dispatchEvent(new CustomEvent("archery:complete", { detail: payload }));
      } catch {}
    };

    const finishIfDone = (s) => {
      const left = s.candles.filter((c) => c.lit).length;
      if (left !== 0) return;

      s.done = true;
      if (!s.finishedAt) s.finishedAt = performance.now();
      setDoneUI(true);

      if (!completedOnceRef.current) {
        completedOnceRef.current = true;
        setTimeout(() => emitComplete(s), autoAdvanceDelayMs);
      }
    };

    /* -------------------------------- particles -------------------------------- */
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

    /* --------------------------------- pull model -------------------------------- */
    const powerFromPull = (pullDist) => {
      const t = clamp01((pullDist - MIN_PULL) / (MAX_PULL - MIN_PULL));
      // ease-out for satisfying “last inch matters”
      const eased = 1 - Math.pow(1 - t, 2.1);
      return MIN_SPEED + eased * (MAX_SPEED - MIN_SPEED);
    };

    // Comfort zone: start draw anywhere, but snap to a consistent “grab” point.
    const snapPointerToComfortZone = (s, px, py) => {
      const rp = s.releasePoint;
      const comfort = { x: rp.x - 230, y: rp.y }; // left of string (draw back)
      const snap = 0.78;
      const blended = {
        x: lerp(px, comfort.x, snap),
        y: lerp(py, comfort.y, snap),
      };
      return constrainPull(s, blended.x, blended.y);
    };

    // Constrain pulling left + limit vertical
    const constrainPull = (s, x, y) => {
      const rp = s.releasePoint;

      let dx = x - rp.x;
      let dy = y - rp.y;

      // Pull BACK (left). Keep at least a tiny draw so arrow doesn't “dead hang”.
      dx = Math.min(dx, -MIN_PULL);

      // Prevent “arrow just falls” look: cap vertical.
      dy = clamp(dy, -maxAimVerticalPx, maxAimVerticalPx);

      const dist = Math.hypot(dx, dy) || 1;
      const scale = dist > MAX_PULL ? MAX_PULL / dist : 1;

      let out = { x: rp.x + dx * scale, y: rp.y + dy * scale };

      // Centerline magnetism (snap-to-horizontal feeling).
      // Stronger when more drawn.
      const pullAmt = clamp01((Math.abs(dx) - MIN_PULL) / (MAX_PULL - MIN_PULL));
      const mag = clamp01(centerlineMagnet * (0.35 + pullAmt * 0.85));
      out.y = lerp(out.y, rp.y, mag);

      return out;
    };

    // Spring settle back to relaxed string point after release
    const updatePullSpring = (s, dt) => {
      if (s.aiming) {
        // finger-controlled, but constrained
        const p = constrainPull(s, s.pull.x, s.pull.y);
        s.pull.x = p.x;
        s.pull.y = p.y;
        s.followKick = Math.max(0, s.followKick - dt * 80);
      } else {
        let targetX = s.pullRelaxed.x;
        let targetY = s.pullRelaxed.y;

        // quick follow-through kick
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

    /* ------------------------------- launch model ------------------------------- */
    const computeLaunch = (s, pullOverride = null) => {
      const rp = s.releasePoint;
      const pull = pullOverride ?? s.pull;

      const dx = pull.x - rp.x;
      const dy = pull.y - rp.y;

      const dist = Math.hypot(dx, dy);
      const speed = powerFromPull(dist);

      // Arrow launches opposite to draw vector.
      // (draw left => launch right)
      let vx = (-dx / (dist || 1)) * speed;
      let vy = (-dy / (dist || 1)) * speed;

      // keep minimum forward speed
      if (vx < 120) vx = 120;

      const rot = Math.atan2(vy, vx);
      return { vx, vy, rot, dist };
    };

    /* -------------------------------- shooting -------------------------------- */
    const shoot = () => {
      const s = simRef.current;
      if (!s || s.done) return;

      const rp = s.releasePoint;
      const launch = computeLaunch(s, s.pull);

      const ARROW_LEN = BASE_ARROW_LEN * arrowScale;
      const ARROW_THICK = BASE_ARROW_THICK * arrowScale;

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

      // string vibration
      if (stringVibrateOnRelease) {
        const dist = launch.dist || 0;
        const t = clamp01((dist - MIN_PULL) / (MAX_PULL - MIN_PULL));
        s.vibAmp = Math.max(s.vibAmp, 0.9 * t);
        s.vibT = 0;
        s.vibDir *= -1;
      }

      s.shots += 1;
      setShotsUI(s.shots);

      playTone(420, 55);
      vibrate(10);
    };

    /* --------------------------------- input --------------------------------- */
    const onDown = (e) => {
      const s = simRef.current;
      if (!s || s.done) return;
      if (activePointerIdRef.current !== null) return;

      if (!s.startedAt) s.startedAt = performance.now();
      s.aiming = true;
      activePointerIdRef.current = e.pointerId;
      e.preventDefault();
      try {
        canvas.setPointerCapture(e.pointerId);
      } catch {}

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
      if (activePointerIdRef.current !== e.pointerId) return;
      e.preventDefault();

      const r = canvas.getBoundingClientRect();
      const px = e.clientX - r.left;
      const py = e.clientY - r.top;

      const p = constrainPull(s, px, py);
      s.pull.x = p.x;
      s.pull.y = p.y;
    };

    const onUp = (e) => {
      const s = simRef.current;
      if (!s || !s.aiming || s.done) return;
      if (activePointerIdRef.current !== null && e?.pointerId !== activePointerIdRef.current) {
        return;
      }

      s.aiming = false;
      activePointerIdRef.current = null;
      if (e?.pointerId !== undefined) {
        try {
          canvas.releasePointerCapture(e.pointerId);
        } catch {}
      }
      shoot();

      playTone(760, 70);
      vibrate([10, 16, 10]);
    };

    const onCancel = (e) => {
      const s = simRef.current;
      if (!s || !s.aiming || s.done) return;
      if (activePointerIdRef.current !== null && e?.pointerId !== activePointerIdRef.current) {
        return;
      }

      s.aiming = false;
      activePointerIdRef.current = null;
      if (e?.pointerId !== undefined) {
        try {
          canvas.releasePointerCapture(e.pointerId);
        } catch {}
      }
      s.pull.x = s.pullRelaxed.x;
      s.pull.y = s.pullRelaxed.y;
      s.pullVel.x = 0;
      s.pullVel.y = 0;
    };

    const activeListenerOptions = { passive: false };
    canvas.addEventListener("pointerdown", onDown, activeListenerOptions);
    canvas.addEventListener("pointermove", onMove, activeListenerOptions);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onCancel);
    canvas.addEventListener("pointerleave", onCancel);

    /* ---------------------- deform SVG string (and bow flex) ---------------------- */
    const deformSvgString = (s, dt) => {
      const svg = bowSvgElRef.current;
      const stringEl = bowStringElRef.current;
      const wrap = bowWrapRef.current;
      const a = anchorsRef.current;
      if (!s || !svg || !stringEl || !wrap || !a) return;

      // bow flex: apply transform to the wrap (cheap + works without ids)
      if (limbFlex) {
        const dist = Math.hypot(s.pull.x - s.releasePoint.x, s.pull.y - s.releasePoint.y);
        const t = clamp01((dist - MIN_PULL) / (MAX_PULL - MIN_PULL));

        // subtle: rotate a hair + scale a touch.
        const rot = (-1.0 + t * -2.2) * (Math.PI / 180);
        const sy = 1 + t * 0.028;
        const sx = 1 - t * 0.018;

        const base = flipBow ? "scaleX(-1)" : "scaleX(1)";
        wrap.style.transformOrigin = "50% 55%";
        wrap.style.transform = `${base} rotate(${rot}rad) scale(${sx}, ${sy})`;
      } else {
        const base = flipBow ? "scaleX(-1)" : "scaleX(1)";
        wrap.style.transformOrigin = "50% 55%";
        wrap.style.transform = base;
      }

      const tag = stringEl.tagName.toLowerCase();

      // Convert current pull point (container px) into viewBox coords.
      const wrapRect = wrap.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      let localX = (s.pull.x - (wrapRect.left - containerRect.left)) / wrapRect.width;
      const localY = (s.pull.y - (wrapRect.top - containerRect.top)) / wrapRect.height;
      if (flipBow) localX = 1 - localX;

      const pullVB = { x: a.vbX + localX * a.vbW, y: a.vbY + localY * a.vbH };

      const dx = pullVB.x - a.vbNock.x;
      const dy = pullVB.y - a.vbNock.y;

      const distX = Math.abs(dx);
      const tPull = clamp01((distX - 8) / 260);

      // base bulge from pull
      const bulge = lerp(0, 82, tPull) * stringCurveStrength;

      // add vibration after release (not aiming)
      let vib = 0;
      if (!s.aiming && s.vibAmp > 0 && stringVibrateOnRelease) {
        // 52Hz-ish wobble, decaying amplitude
        vib = Math.sin(s.vibT * 52 * Math.PI * 2) * (s.vibAmp * 14) * s.vibDir;
      }

      // control point follows finger, with bulge + vibration
      const ctrl = {
        x: a.vbNock.x + dx * 0.92 + (flipBow ? -bulge : -bulge) + vib,
        y: a.vbNock.y + dy * 0.88,
      };

      // store original if missing
      if (!stringOrigRef.current) {
        if (tag === "path") {
          stringOrigRef.current = { type: "path", d: stringEl.getAttribute("d") || "" };
        } else if (tag === "line") {
          stringOrigRef.current = {
            type: "line",
            x1: stringEl.getAttribute("x1"),
            y1: stringEl.getAttribute("y1"),
            x2: stringEl.getAttribute("x2"),
            y2: stringEl.getAttribute("y2"),
          };
        }
      }

      if (tag === "path") {
        const d = `M ${a.vbTop.x} ${a.vbTop.y} Q ${ctrl.x} ${ctrl.y} ${a.vbBot.x} ${a.vbBot.y}`;
        stringEl.setAttribute("d", d);
      } else if (tag === "line") {
        // crude illusion: shift endpoints slightly
        const shift = (dx * 0.24 + vib * 0.45) * stringCurveStrength;
        stringEl.setAttribute("x1", String(a.vbTop.x + shift));
        stringEl.setAttribute("y1", String(a.vbTop.y));
        stringEl.setAttribute("x2", String(a.vbBot.x + shift));
        stringEl.setAttribute("y2", String(a.vbBot.y));
      }
    };

    const restoreSvgString = () => {
      const stringEl = bowStringElRef.current;
      const orig = stringOrigRef.current;
      if (!stringEl || !orig) return;

      if (orig.type === "path") {
        stringEl.setAttribute("d", orig.d);
      } else if (orig.type === "line") {
        stringEl.setAttribute("x1", orig.x1);
        stringEl.setAttribute("y1", orig.y1);
        stringEl.setAttribute("x2", orig.x2);
        stringEl.setAttribute("y2", orig.y2);
      }
    };

    /* --------------------------------- update --------------------------------- */
    const update = (dt) => {
      const s = simRef.current;
      if (!s) return;

      // keep W/H in sync
      const rect = canvas.getBoundingClientRect();
      s.W = rect.width;
      s.H = rect.height;

      // anchors from SVG (if ready)
      syncAnchorsFromSvg();

      // spring pull + wobble time
      updatePullSpring(s, dt);

      if (s.vibAmp > 0) {
        s.vibT += dt;
        s.vibAmp = Math.max(0, s.vibAmp - dt * 2.8);
      }

      // deform string and flex bow
      if (s.aiming) {
        deformSvgString(s, dt);
      } else {
        // keep a little vibration visible right after release
        if (s.vibAmp > 0) deformSvgString(s, dt);
        else restoreSvgString();
      }

      // flames
      for (const c of s.candles) {
        if (c.lit) c.flamePhase += dt * 6.2;
      }

      // arrows
      for (const a of s.arrows) {
        if (!a.alive) continue;

        a.vy += GRAVITY * dt;
        a.vx += s.wind * dt * 0.2;
        a.x += a.vx * dt;
        a.y += a.vy * dt;
        a.rot = Math.atan2(a.vy, a.vx);

        if (a.x > s.W + 260 || a.y > s.H + 260 || a.y < -280) a.alive = false;

        // collision
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

      // particles
      s.particles = s.particles.filter((p) => p.life > 0);
      for (const p of s.particles) {
        p.vy = (p.vy ?? 0) + GRAVITY * 0.35 * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.life -= dt;
      }
    };

    /* --------------------------------- drawing --------------------------------- */
    const drawVignette = (W, H) => {
      // translucent “glass” background inside the game area
      ctx.save();
      ctx.clearRect(0, 0, W, H);

      const g = ctx.createRadialGradient(W * 0.55, H * 0.35, 60, W * 0.55, H * 0.45, W * 0.95);
      g.addColorStop(0, "rgba(0,0,0,0.04)");
      g.addColorStop(1, "rgba(0,0,0,0.44)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);

      // subtle frame
      ctx.globalAlpha = 0.16;
      ctx.strokeStyle = "rgba(242,231,209,0.30)";
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
        ctx.globalAlpha = 0.20;
        ctx.fillStyle = "#ffcc66";
        ctx.beginPath();
        ctx.ellipse(c.x, c.y - c.h * 0.88, c.w * 1.1, c.h * 0.36, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        if (candle) {
          ctx.drawImage(candle, c.x - c.w / 2, c.y - c.h, c.w, c.h);
        }

        // nicer flame (less “blob”, more flame)
        const t = c.flamePhase;
        const flick = 0.82 + 0.18 * Math.sin(t) + 0.08 * Math.sin(t * 2.4);
        const fx = c.x;
        const fy = c.y - c.h * 0.93;
        const fw = c.w * 0.40 * flick;
        const fh = c.h * 0.26 * flick;

        // outer glow
        ctx.save();
        ctx.globalAlpha = 0.18;
        ctx.fillStyle = "#ffcc66";
        ctx.beginPath();
        ctx.ellipse(fx, fy, fw * 2.5, fh * 1.8, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // flame body
        ctx.save();
        ctx.globalAlpha = 0.92;
        ctx.fillStyle = "#ffd27a";
        ctx.beginPath();
        ctx.moveTo(fx, fy - fh);
        ctx.quadraticCurveTo(fx + fw, fy - fh * 0.12, fx, fy + fh);
        ctx.quadraticCurveTo(fx - fw, fy - fh * 0.12, fx, fy - fh);
        ctx.fill();

        // inner core
        ctx.globalAlpha = 0.78;
        ctx.fillStyle = "#fff3cf";
        ctx.beginPath();
        ctx.ellipse(fx, fy - fh * 0.05, fw * 0.33, fh * 0.55, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    };

    const drawTrajectoryPreview = (s) => {
      if (!s.aiming) return;

      const rp = s.releasePoint;
      const launch = computeLaunch(s, s.pull);

      let x = rp.x;
      let y = rp.y;
      let vx = launch.vx;
      let vy = launch.vy;

      ctx.save();
      ctx.globalAlpha = 0.20;
      ctx.fillStyle = "#f2e7d1";
      for (let i = 0; i < 24; i++) {
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

      // nock point follows finger while aiming; otherwise sits on string
      const nock = s.aiming ? { x: s.pull.x, y: s.pull.y } : { x: rp.x, y: rp.y };

      const launch = computeLaunch(s, s.aiming ? s.pull : s.pullRelaxed);

      const drawLen = BASE_ARROW_LEN * arrowScale;
      const drawThk = BASE_ARROW_THICK * arrowScale;

      // nock pixel inside rendered arrow
      const nockPx = drawLen * arrowNockRatio;

      ctx.save();
      ctx.globalAlpha = s.aiming ? 0.98 : 0.72;
      ctx.translate(nock.x, nock.y);
      ctx.rotate(launch.rot);

      // draw so that the nock sits at origin
      ctx.drawImage(arrow, -nockPx, -drawThk / 2, drawLen, drawThk);

      // subtle arrow sheen
      ctx.globalAlpha = s.aiming ? 0.10 : 0.06;
      ctx.fillStyle = "#ffcc66";
      ctx.fillRect(-nockPx, -1, drawLen, 2);

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

        const nockPx = a.length * arrowNockRatio;
        ctx.drawImage(arrow, -nockPx, -a.thickness / 2, a.length, a.thickness);

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

    /* --------------------------------- main loop -------------------------------- */
    const loop = (t) => {
      const s = simRef.current;
      if (!s) return;

      const dt = Math.min(0.033, (t - last) / 1000);
      last = t;

      // If bow has moved/sized (responsive), candles might need rebuild occasionally.
      // Rebuild gently if we detect we have too little candle area.
      if (t % 600 < 18 && !s.done) {
        const bow = getBowFootprint();
        if (bow) {
          const rightSpace = s.W - (bow.right + 44);
          if (rightSpace < 120 && candleCount > 0) {
            s.candles = buildCandles(s.W, s.H);
            setRemainingUI(s.candles.filter((c) => c.lit).length);
          }
        }
      }

      update(dt);

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

      canvas.removeEventListener("pointerdown", onDown, activeListenerOptions);
      canvas.removeEventListener("pointermove", onMove, activeListenerOptions);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onCancel);
      canvas.removeEventListener("pointerleave", onCancel);
    };
  }, [
    candleCount,
    onComplete,
    reducedMotion,
    bowWidthPx,
    bowInsetTop,
    bowInsetBottom,
    bowLeftPxOverride,
    flipBow,
    stringCurveStrength,
    stringVibrateOnRelease,
    limbFlex,
    arrowScale,
    arrowNockRatio,
    centerlineMagnet,
    maxAimVerticalPx,
    autoAdvanceDelayMs,
  ]);

  /* ----------------------------- bow overlay style ----------------------------- */
  // We compute bow left/width in render using container width at runtime.
  // For anchor mapping, actual DOM rect is the source of truth, so this is safe.
  const bowStyle = useMemo(() => {
    // fallback values; real rect will be measured
    const left = bowLeftPxOverride ?? 180;

    return {
      position: "absolute",
      left,
      top: bowInsetTop,
      bottom: bowInsetBottom,
      width: bowWidthPx,
      pointerEvents: "none",
      opacity: 0.96,
      filter: "drop-shadow(0 10px 22px rgba(0,0,0,0.45))",
      transformOrigin: "50% 55%",
      transform: flipBow ? "scaleX(-1)" : "scaleX(1)",
    };
  }, [bowLeftPxOverride, bowInsetTop, bowInsetBottom, bowWidthPx, flipBow]);

  /* ----------------------------- HUD + container UI ---------------------------- */
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
              touchAction: "none",
            }}
          />

          {/* Bow SVG overlay */}
          <div ref={bowWrapRef} style={bowStyle}>
            <div ref={bowSvgHostRef} style={{ width: "100%", height: "100%" }} />
          </div>

          {/* top-right status */}
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

          {/* toggles */}
          <div style={{ position: "absolute", left: 10, top: 10, display: "flex", gap: 8, zIndex: 20 }}>
            <TogglePill label="Sound" value={soundOn} onChange={setSoundOn} />
            <TogglePill label="Haptics" value={hapticsOn} onChange={setHapticsOn} />
          </div>

          {/* done overlay */}
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
                <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>
                  Candles out. 🔥✅
                </div>
                <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 12 }}>
                  If you don’t auto-advance, tap Continue.
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const s = simRef.current;
                    if (!s) return;
                    if (!s.finishedAt) s.finishedAt = performance.now();
                    completedOnceRef.current = true;
                    try {
                      if (typeof onComplete === "function") {
                        onComplete({
                          shots: s.shots,
                          timeMs:
                            s.startedAt && s.finishedAt ? s.finishedAt - s.startedAt : null,
                        });
                      }
                    } catch {}
                    try {
                      window.dispatchEvent(
                        new CustomEvent("archery:complete", {
                          detail: {
                            shots: s.shots,
                            timeMs:
                              s.startedAt && s.finishedAt ? s.finishedAt - s.startedAt : null,
                          },
                        })
                      );
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
                    fontWeight: 800,
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

      {/* dynamic bow placement tweak (runs after first layout) */}
      <BowLayoutBinder
        containerRef={containerRef}
        bowWrapRef={bowWrapRef}
        canvasRef={canvasRef}
        bowWidthPx={bowWidthPx}
        bowLeftPxOverride={bowLeftPxOverride}
        flipBow={flipBow}
        bowInsetTop={bowInsetTop}
        bowInsetBottom={bowInsetBottom}
      />
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

/**
 * BowLayoutBinder
 * - locks bow placement more consistently across mobile/desktop
 * - ensures there is left-side pull room
 *
 * This avoids a React re-render loop by writing styles directly.
 */
function BowLayoutBinder({
  containerRef,
  bowWrapRef,
  canvasRef,
  bowWidthPx,
  bowLeftPxOverride,
  flipBow,
  bowInsetTop,
  bowInsetBottom,
}) {
  useEffect(() => {
    const container = containerRef.current;
    const bowWrap = bowWrapRef.current;
    const canvas = canvasRef.current;
    if (!container || !bowWrap || !canvas) return;

    let raf = 0;

    const apply = () => {
      const rect = canvas.getBoundingClientRect();
      const W = rect.width;

      // responsive width but locked-ish:
      const vw = W * 0.42;
      const w = Math.round(clamp(vw, 210, bowWidthPx));

      // place so string has room on left:
      // 150..220 depending on W
      const t = clamp01((W - 360) / 520);
      const leftAuto = Math.round(lerp(150, 220, t));

      const left = typeof bowLeftPxOverride === "number" ? bowLeftPxOverride : leftAuto;

      bowWrap.style.left = `${left}px`;
      bowWrap.style.width = `${w}px`;
      bowWrap.style.top = `${bowInsetTop}px`;
      bowWrap.style.bottom = `${bowInsetBottom}px`;
      bowWrap.style.transformOrigin = "50% 55%";

      // keep base flip here too (flex code may override later, but it starts correct)
      if (!bowWrap.style.transform || bowWrap.style.transform === "none") {
        bowWrap.style.transform = flipBow ? "scaleX(-1)" : "scaleX(1)";
      }

      raf = requestAnimationFrame(apply);
    };

    raf = requestAnimationFrame(apply);
    return () => cancelAnimationFrame(raf);
  }, [
    containerRef,
    bowWrapRef,
    canvasRef,
    bowWidthPx,
    bowLeftPxOverride,
    flipBow,
    bowInsetTop,
    bowInsetBottom,
  ]);

  return null;
}
