"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function clamp01(value) {
  return clamp(value, 0, 1);
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function rectsIntersect(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

const STRINGS_SELECTOR_ORDER = [
  "#bow-string",
  ".bow-string",
  '[data-role="bow-string"]',
];

/**
 * Calibration notes:
 * - Nock height on string: STRING_NOCK_Y_FRAC
 * - Arrow nock pixel X fraction: ARROW_NOCK_X_FRAC
 * - Bow horizontal placement: BOW_LEFT_MIN_PX / BOW_LEFT_MAX_PX
 * - Arrow resting height offset: RELEASE_Y_OFFSET_PX
 * - Max pull distance: MAX_PULL_PX
 * - Candle spacing region: CANDLE_REGION_START_PCT / CANDLE_REGION_END_PAD_PX
 */
const STRING_NOCK_Y_FRAC = 0.52;
const ARROW_DRAW_W = 292;
const ARROW_DRAW_H = 20;
const ARROW_NOCK_X_FRAC = 0.105; // ~61px / 585px
const RELEASE_Y_OFFSET_PX = -60;

const BOW_MIRRORED = false;

const BOW_LEFT_MIN_PX = 84;
const BOW_LEFT_MAX_PX = 184;
const BOW_WIDTH_CSS = "clamp(220px, 26vw, 320px)";

const MAX_PULL_PX = 260;
const MIN_PULL_PX = 18;
const MAX_VERTICAL_AIM_PX = 130;
const CENTER_MAGNET_BASE = 0.18;
const CENTER_MAGNET_PULL = 0.48;
const COMFORT_PULL_PX = 172;

const STRING_VIBRATION_MS = 320;
const COMPLETE_AUTO_DELAY_MS = 420;

const CANDLE_REGION_START_PCT = 0.58;
const CANDLE_REGION_END_PAD_PX = 28;

const GRAVITY = 1500;
const MIN_SPEED = 480;
const MAX_SPEED = 1580;
const ARROW_DRAG = 0.005;

const ROTATE_ICON_SIZE = 56;

export default function ArcheryGame({
  onComplete,
  candleCount = 7,
  width = "100%",
  height = 420,
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const bowWrapRef = useRef(null);
  const bowHostRef = useRef(null);

  const bowSvgRef = useRef(null);
  const bowStringRef = useRef(null);
  const injectedStringRef = useRef(null);

  const assetsRef = useRef({ arrow: null, candle: null, ready: false });
  const simRef = useRef(null);

  const pointerIdRef = useRef(null);
  const completeOnceRef = useRef(false);
  const completeTimeoutRef = useRef(null);
  const showRotateRef = useRef(false);

  const [assetsReady, setAssetsReady] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [hapticsOn, setHapticsOn] = useState(false);
  const [shotsUI, setShotsUI] = useState(0);
  const [remainingUI, setRemainingUI] = useState(candleCount);
  const [doneUI, setDoneUI] = useState(false);

  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);

  const reducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  }, []);

  const isPortrait = viewport.height > viewport.width;
  const showRotateOverlay = isCoarsePointer && isPortrait;
  const gameHeight = `clamp(260px, 62vh, ${Math.max(280, Number(height) || 420)}px)`;

  const soundRef = useRef(false);
  const hapticRef = useRef(false);
  useEffect(() => void (soundRef.current = soundOn), [soundOn]);
  useEffect(() => void (hapticRef.current = hapticsOn), [hapticsOn]);

  const audioCtxRef = useRef(null);

  const playTone = useCallback((freq, ms) => {
    if (!soundRef.current || typeof window === "undefined") return;
    try {
      if (!audioCtxRef.current) {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        audioCtxRef.current = new Ctx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.value = freq;
      osc.connect(gain);
      gain.connect(ctx.destination);

      const t = ctx.currentTime;
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(0.06, t + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + ms / 1000);

      osc.start(t);
      osc.stop(t + ms / 1000 + 0.01);
    } catch {
      // no-op
    }
  }, []);

  const vibrate = useCallback((pattern) => {
    if (!hapticRef.current) return;
    try {
      navigator?.vibrate?.(pattern);
    } catch {
      // no-op
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateViewport = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    };

    const coarse = window.matchMedia?.("(pointer: coarse)");
    setIsCoarsePointer(coarse?.matches ?? false);
    updateViewport();

    const onCoarseChange = (event) => setIsCoarsePointer(event.matches);

    window.addEventListener("resize", updateViewport);
    window.addEventListener("orientationchange", updateViewport);
    coarse?.addEventListener?.("change", onCoarseChange);

    return () => {
      window.removeEventListener("resize", updateViewport);
      window.removeEventListener("orientationchange", updateViewport);
      coarse?.removeEventListener?.("change", onCoarseChange);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    const arrow = new Image();
    const candle = new Image();
    arrow.src = "/game/arrow.png";
    candle.src = "/game/candle.png";

    let loaded = 0;
    const markLoaded = () => {
      loaded += 1;
      if (!cancelled && loaded === 2) {
        assetsRef.current = { arrow, candle, ready: true };
        setAssetsReady(true);
      }
    };

    arrow.onload = markLoaded;
    candle.onload = markLoaded;

    return () => {
      cancelled = true;
    };
  }, []);

  const findBowStringElement = useCallback((svg) => {
    for (const selector of STRINGS_SELECTOR_ORDER) {
      const found = svg.querySelector(selector);
      if (found) return found;
    }

    const vb = svg.viewBox?.baseVal;
    const vbH = vb?.height || 1;
    const candidates = Array.from(svg.querySelectorAll("path,line,polyline,rect"));

    let best = null;
    let bestScore = -Infinity;

    for (const element of candidates) {
      let bb;
      try {
        bb = element.getBBox();
      } catch {
        continue;
      }

      if (!bb || bb.height <= vbH * 0.22) continue;

      const stroke = element.getAttribute("stroke");
      const fill = element.getAttribute("fill");
      const strokeWidth = parseFloat(element.getAttribute("stroke-width") || "1");

      const aspect = bb.height / Math.max(1, bb.width);
      const narrow = 1 - clamp01(bb.width / Math.max(1, vb?.width || 1));
      const tall = clamp01(bb.height / vbH);

      let score = 0;
      score += aspect * 2.4;
      score += narrow * 2.2;
      score += tall * 2.0;
      if (stroke && stroke !== "none") score += 1.5;
      if (!fill || fill === "none") score += 1.0;
      if (strokeWidth <= 3) score += 0.6;

      if (score > bestScore) {
        best = element;
        bestScore = score;
      }
    }

    return best;
  }, []);

  const getStringAnchorsFromSvg = useCallback(() => {
    const svg = bowSvgRef.current;
    const stringEl = bowStringRef.current;
    const wrap = bowWrapRef.current;
    const container = containerRef.current;
    if (!svg || !stringEl || !wrap || !container) return null;

    let bb;
    try {
      bb = stringEl.getBBox();
    } catch {
      return null;
    }

    const vb = svg.viewBox?.baseVal;
    const vbX = vb?.x || 0;
    const vbY = vb?.y || 0;
    const vbW = vb?.width || 1;
    const vbH = vb?.height || 1;

    const wrapRect = wrap.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const vbTop = { x: bb.x + bb.width * 0.5, y: bb.y };
    const vbBottom = { x: bb.x + bb.width * 0.5, y: bb.y + bb.height };
    const vbNock = {
      x: vbTop.x,
      y: bb.y + bb.height * STRING_NOCK_Y_FRAC,
    };

    const toContainerPx = (pt) => {
      let nx = (pt.x - vbX) / vbW;
      const ny = (pt.y - vbY) / vbH;
      if (BOW_MIRRORED) nx = 1 - nx;
      return {
        x: wrapRect.left - containerRect.left + nx * wrapRect.width,
        y: wrapRect.top - containerRect.top + ny * wrapRect.height,
      };
    };

    return {
      vbX,
      vbY,
      vbW,
      vbH,
      vbTop,
      vbBottom,
      vbNock,
      pxTop: toContainerPx(vbTop),
      pxBottom: toContainerPx(vbBottom),
      pxNock: toContainerPx(vbNock),
    };
  }, []);

  const ensureInjectedStringPath = useCallback(() => {
    const svg = bowSvgRef.current;
    if (!svg) return;

    if (!injectedStringRef.current) {
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("fill", "none");
      path.setAttribute("stroke", "rgba(255,247,230,0.92)");
      path.setAttribute("stroke-width", "1.55");
      path.setAttribute("stroke-linecap", "round");
      path.setAttribute("vector-effect", "non-scaling-stroke");
      path.setAttribute("data-role", "injected-bow-string");
      path.style.pointerEvents = "none";
      svg.appendChild(path);
      injectedStringRef.current = path;
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    const loadBow = async () => {
      try {
        const response = await fetch("/game/bow.svg", { cache: "no-store" });
        const raw = await response.text();
        if (cancelled) return;

        const host = bowHostRef.current;
        if (!host) return;

        host.innerHTML = raw;

        const svg = host.querySelector("svg");
        if (!svg) return;

        bowSvgRef.current = svg;
        svg.style.width = "100%";
        svg.style.height = "100%";
        svg.style.display = "block";
        svg.setAttribute("preserveAspectRatio", "xMidYMid meet");

        const stringEl = findBowStringElement(svg);
        if (stringEl) {
          bowStringRef.current = stringEl;
          stringEl.style.opacity = "0.08";
        }

        ensureInjectedStringPath();
      } catch {
        // no-op
      }
    };

    loadBow();

    return () => {
      cancelled = true;
    };
  }, [ensureInjectedStringPath, findBowStringElement]);

  const buildCandleLayout = useCallback((W, H, releaseX) => {
    const candles = [];

    const regionStart = Math.max(W * CANDLE_REGION_START_PCT, releaseX + 170);
    const regionEnd = Math.max(regionStart + 120, W - CANDLE_REGION_END_PAD_PX);
    const regionWidth = Math.max(120, regionEnd - regionStart);

    const candleH = clamp(H * 0.24, 70, 118);
    const candleW = candleH * (546 / 1208);

    const baseY = H * 0.72;
    const maxCols = Math.max(1, Math.floor(regionWidth / 54));
    const cols = Math.min(Math.max(1, maxCols), candleCount);
    const rows = Math.ceil(candleCount / cols);
    const rowGap = clamp(candleH * 0.82, 56, 84);

    for (let i = 0; i < candleCount; i += 1) {
      const row = Math.floor(i / cols);
      const col = i % cols;
      const countInRow = Math.min(cols, candleCount - row * cols);
      const rowW = Math.max(0, regionWidth - 20);
      const spacing = countInRow <= 1 ? 0 : rowW / (countInRow - 1);
      const x = clamp(regionStart + 10 + col * spacing, regionStart + 10, regionEnd - 10);
      const y = baseY - row * rowGap;

      candles.push({
        id: i,
        x,
        y,
        w: candleW,
        h: candleH,
        lit: true,
        flamePhase: Math.random() * Math.PI * 2,
      });
    }

    return candles;
  }, [candleCount]);

  const emitComplete = useCallback((payload) => {
    if (typeof onComplete === "function") {
      try {
        onComplete(payload);
      } catch {
        // no-op
      }
    }

    try {
      window.dispatchEvent(new CustomEvent("archery:complete", { detail: payload }));
    } catch {
      // no-op
    }
  }, [onComplete]);

  const completeGame = useCallback(() => {
    const sim = simRef.current;
    if (!sim || completeOnceRef.current) return;
    completeOnceRef.current = true;

    sim.done = true;
    sim.finishedAt = performance.now();

    const payload = {
      shots: sim.shots,
      timeMs:
        sim.startedAt && sim.finishedAt
          ? Math.max(0, sim.finishedAt - sim.startedAt)
          : null,
    };

    emitComplete(payload);
  }, [emitComplete]);

  useEffect(() => {
    showRotateRef.current = showRotateOverlay;
  }, [showRotateOverlay]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    let raf = 0;
    let lastTime = performance.now();

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const initSim = () => {
      const rect = canvas.getBoundingClientRect();
      const W = rect.width;
      const H = rect.height;

      const defaultRelease = {
        x: Math.max(140, W * 0.24),
        y: H * 0.53 + RELEASE_Y_OFFSET_PX,
      };
      const candles = buildCandleLayout(W, H, defaultRelease.x);

      simRef.current = {
        W,
        H,
        wind: reducedMotion ? 0 : (Math.random() * 2 - 1) * 22,

        release: defaultRelease,
        pull: { ...defaultRelease },
        pullVel: { x: 0, y: 0 },

        aiming: false,
        done: false,

        bowAnchors: null,
        stringVibStart: 0,
        stringVibAmp: 0,

        arrows: [],
        particles: [],
        extinguishFx: [],
        candles,
        layoutW: W,
        layoutH: H,
        layoutAnchored: false,

        shots: 0,
        startedAt: null,
        finishedAt: null,
      };

      completeOnceRef.current = false;
      setDoneUI(false);
      setShotsUI(0);
      setRemainingUI(candleCount);
    };

    initSim();

    const pointerToCanvas = (event) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    };

    const constrainPull = (sim, x, y) => {
      const dxRaw = x - sim.release.x;
      const dyRaw = y - sim.release.y;

      const dx = Math.min(dxRaw, -MIN_PULL_PX);
      const dy = clamp(dyRaw, -MAX_VERTICAL_AIM_PX, MAX_VERTICAL_AIM_PX);

      const dist = Math.hypot(dx, dy) || 1;
      const scale = dist > MAX_PULL_PX ? MAX_PULL_PX / dist : 1;
      let nextX = sim.release.x + dx * scale;
      let nextY = sim.release.y + dy * scale;

      const pullNorm = clamp01((Math.abs(dx) - MIN_PULL_PX) / (MAX_PULL_PX - MIN_PULL_PX));
      const magnet = CENTER_MAGNET_BASE + CENTER_MAGNET_PULL * pullNorm;
      nextY = lerp(nextY, sim.release.y, clamp01(magnet));

      return { x: nextX, y: nextY };
    };

    const snapToComfortZone = (sim, x, y) => {
      const comfort = { x: sim.release.x - COMFORT_PULL_PX, y: sim.release.y };
      return constrainPull(sim, lerp(x, comfort.x, 0.72), lerp(y, comfort.y, 0.72));
    };

    const computeLaunch = (sim, pullPoint) => {
      const dx = pullPoint.x - sim.release.x;
      const dy = pullPoint.y - sim.release.y;
      const dist = Math.hypot(dx, dy);
      const t = clamp01((dist - MIN_PULL_PX) / (MAX_PULL_PX - MIN_PULL_PX));
      const eased = 1 - Math.pow(1 - t, 2.1);
      const speed = lerp(MIN_SPEED, MAX_SPEED, eased);

      let vx = (-dx / (dist || 1)) * speed;
      let vy = (-dy / (dist || 1)) * speed;
      if (vx < 160) vx = 160;
      return { vx, vy, rot: Math.atan2(vy, vx), pullDist: dist };
    };

    const updateInjectedString = (sim, nowMs) => {
      const path = injectedStringRef.current;
      const anchors = sim.bowAnchors;
      if (!path || !anchors) return;

      const wrap = bowWrapRef.current;
      const containerRect = container.getBoundingClientRect();
      const wrapRect = wrap?.getBoundingClientRect();
      if (!wrapRect) return;

      let nx = (sim.pull.x - (wrapRect.left - containerRect.left)) / wrapRect.width;
      const ny = (sim.pull.y - (wrapRect.top - containerRect.top)) / wrapRect.height;
      if (BOW_MIRRORED) nx = 1 - nx;

      const pullVB = {
        x: anchors.vbX + nx * anchors.vbW,
        y: anchors.vbY + ny * anchors.vbH,
      };

      const dx = pullVB.x - anchors.vbNock.x;
      const dy = pullVB.y - anchors.vbNock.y;
      const pullT = clamp01(Math.abs(dx) / (MAX_PULL_PX * 0.8));

      const vibrateProgress = clamp01((nowMs - sim.stringVibStart) / STRING_VIBRATION_MS);
      const vibEnv = 1 - vibrateProgress;
      const vib =
        sim.stringVibAmp > 0 && vibrateProgress < 1
          ? Math.sin(vibrateProgress * Math.PI * 20) * sim.stringVibAmp * vibEnv
          : 0;

      const ctrl = {
        x: anchors.vbNock.x + dx * 0.9 - 72 * pullT + vib,
        y: anchors.vbNock.y + dy * 0.9,
      };

      path.setAttribute(
        "d",
        `M ${anchors.vbTop.x} ${anchors.vbTop.y} Q ${ctrl.x} ${ctrl.y} ${anchors.vbBottom.x} ${anchors.vbBottom.y}`
      );

      const opacity = 0.78 + pullT * 0.18;
      path.setAttribute("stroke-opacity", String(opacity));

      if (wrap) {
        const flex = reducedMotion ? 0 : pullT * 0.038;
        wrap.style.transform = `scaleX(${BOW_MIRRORED ? -1 : 1}) scale(${1 - flex * 0.5}, ${1 + flex})`;
      }
    };

    const spawnSparks = (x, y) => {
      const sim = simRef.current;
      if (!sim) return;
      const amount = reducedMotion ? 8 : 20;

      for (let i = 0; i < amount; i += 1) {
        sim.particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 320,
          vy: (Math.random() - 0.8) * 360,
          life: 0.32 + Math.random() * 0.28,
        });
      }
    };

    const spawnExtinguishFlame = (x, y) => {
      const sim = simRef.current;
      if (!sim) return;

      const streaks = Array.from({ length: reducedMotion ? 3 : 6 }).map(() => ({
        angle: (-Math.PI * 0.9) + Math.random() * (Math.PI * 0.8),
        speed: 14 + Math.random() * 24,
        drift: (Math.random() - 0.5) * 10,
        size: 1.8 + Math.random() * 1.8,
      }));

      sim.extinguishFx.push({
        x,
        y,
        t: 0,
        life: reducedMotion ? 0.34 : 0.52,
        streaks,
      });
    };

    const extinguishCandle = (sim, candle) => {
      if (!candle.lit) return;
      candle.lit = false;
      spawnExtinguishFlame(candle.x, candle.y - candle.h * 0.94);
      spawnSparks(candle.x, candle.y - candle.h * 0.92);
      playTone(860, 68);
      vibrate([10, 16, 10]);

      const left = sim.candles.filter((item) => item.lit).length;
      setRemainingUI(left);

      if (left === 0 && !sim.done) {
        sim.done = true;
        setDoneUI(true);

        if (completeTimeoutRef.current) {
          clearTimeout(completeTimeoutRef.current);
        }

        completeTimeoutRef.current = setTimeout(() => {
          completeGame();
        }, COMPLETE_AUTO_DELAY_MS);
      }
    };

    const onPointerDown = (event) => {
      if (showRotateRef.current) return;
      const sim = simRef.current;
      if (!sim || sim.done) return;
      if (pointerIdRef.current != null) return;

      if (!sim.startedAt) {
        sim.startedAt = performance.now();
      }

      pointerIdRef.current = event.pointerId;
      sim.aiming = true;

      try {
        canvas.setPointerCapture(event.pointerId);
      } catch {
        // no-op
      }

      const point = pointerToCanvas(event);
      const snapped = snapToComfortZone(sim, point.x, point.y);
      sim.pull = snapped;
      sim.pullVel = { x: 0, y: 0 };

      event.preventDefault();
    };

    const onPointerMove = (event) => {
      if (showRotateRef.current) return;
      const sim = simRef.current;
      if (!sim || !sim.aiming || sim.done) return;
      if (pointerIdRef.current !== event.pointerId) return;

      const point = pointerToCanvas(event);
      sim.pull = constrainPull(sim, point.x, point.y);

      event.preventDefault();
    };

    const onPointerUpLike = (event) => {
      const sim = simRef.current;
      if (!sim || sim.done || !sim.aiming) return;
      if (pointerIdRef.current !== event.pointerId) return;

      pointerIdRef.current = null;
      sim.aiming = false;

      try {
        canvas.releasePointerCapture(event.pointerId);
      } catch {
        // no-op
      }

      const launch = computeLaunch(sim, sim.pull);
      sim.arrows.push({
        x: sim.release.x,
        y: sim.release.y,
        vx: launch.vx,
        vy: launch.vy,
        rot: launch.rot,
        alive: true,
        hitIds: new Set(),
      });

      sim.shots += 1;
      setShotsUI(sim.shots);
      sim.stringVibStart = performance.now();
      sim.stringVibAmp = 12 + clamp01(launch.pullDist / MAX_PULL_PX) * 8;

      sim.pullVel.x = 780;
      sim.pullVel.y = 0;

      playTone(530, 48);
      playTone(760, 62);
      vibrate([8, 12, 8]);
    };

    const onPointerCancel = (event) => {
      const sim = simRef.current;
      if (!sim || pointerIdRef.current !== event.pointerId) return;

      pointerIdRef.current = null;
      sim.aiming = false;
      sim.pullVel = { x: 0, y: 0 };
      sim.pull = { ...sim.release };
    };

    const listenerOptions = { passive: false };
    canvas.addEventListener("pointerdown", onPointerDown, listenerOptions);
    canvas.addEventListener("pointermove", onPointerMove, listenerOptions);
    canvas.addEventListener("pointerup", onPointerUpLike);
    canvas.addEventListener("pointercancel", onPointerCancel);
    canvas.addEventListener("pointerleave", onPointerCancel);

    const update = (dt, nowMs) => {
      const sim = simRef.current;
      if (!sim) return;

      const rect = canvas.getBoundingClientRect();
      sim.W = rect.width;
      sim.H = rect.height;

      const anchors = getStringAnchorsFromSvg();
      if (anchors) {
        sim.bowAnchors = anchors;
        sim.release = { x: anchors.pxNock.x, y: anchors.pxNock.y + RELEASE_Y_OFFSET_PX };
        if (!sim.layoutAnchored && !sim.startedAt) {
          sim.candles = buildCandleLayout(sim.W, sim.H, sim.release.x);
          sim.layoutAnchored = true;
          setRemainingUI(sim.candles.filter((item) => item.lit).length);
        }
      }

      if (
        !sim.startedAt &&
        (Math.abs(sim.W - sim.layoutW) > 18 || Math.abs(sim.H - sim.layoutH) > 18)
      ) {
        sim.layoutW = sim.W;
        sim.layoutH = sim.H;
        sim.candles = buildCandleLayout(sim.W, sim.H, sim.release.x);
        setRemainingUI(sim.candles.filter((item) => item.lit).length);
      }

      if (!sim.aiming) {
        const tx = sim.release.x;
        const ty = sim.release.y;

        const ax = -92 * (sim.pull.x - tx) - 14 * sim.pullVel.x;
        const ay = -88 * (sim.pull.y - ty) - 13 * sim.pullVel.y;

        sim.pullVel.x += ax * dt;
        sim.pullVel.y += ay * dt;
        sim.pull.x += sim.pullVel.x * dt;
        sim.pull.y += sim.pullVel.y * dt;
      }

      updateInjectedString(sim, nowMs);

      for (const candle of sim.candles) {
        if (candle.lit) candle.flamePhase += dt * 6.4;
      }

      for (const arrow of sim.arrows) {
        if (!arrow.alive) continue;

        arrow.vy += GRAVITY * dt;
        arrow.vx += sim.wind * dt * 0.16;
        arrow.vx *= (1 - ARROW_DRAG);
        arrow.vy *= (1 - ARROW_DRAG * 0.5);
        arrow.x += arrow.vx * dt;
        arrow.y += arrow.vy * dt;
        arrow.rot = Math.atan2(arrow.vy, arrow.vx);

        if (arrow.x > sim.W + 220 || arrow.y > sim.H + 280 || arrow.y < -280) {
          arrow.alive = false;
          continue;
        }

        const arrowBox = {
          x: arrow.x - 18,
          y: arrow.y - 10,
          w: 64,
          h: 20,
        };

        let hits = 0;
        for (const candle of sim.candles) {
          if (!candle.lit) continue;
          if (arrow.hitIds.has(candle.id)) continue;
          const candleBox = {
            x: candle.x - candle.w / 2,
            y: candle.y - candle.h,
            w: candle.w,
            h: candle.h,
          };

          if (rectsIntersect(arrowBox, candleBox)) {
            arrow.hitIds.add(candle.id);
            hits += 1;
            extinguishCandle(sim, candle);
          }
        }

        if (hits > 0) {
          arrow.vx *= Math.max(0.72, 1 - hits * 0.09);
          arrow.vy *= Math.max(0.72, 1 - hits * 0.07);
        }
      }

      sim.particles = sim.particles.filter((particle) => particle.life > 0);
      for (const particle of sim.particles) {
        particle.vy += GRAVITY * 0.32 * dt;
        particle.x += particle.vx * dt;
        particle.y += particle.vy * dt;
        particle.life -= dt;
      }

      sim.extinguishFx = sim.extinguishFx.filter((fx) => fx.t < fx.life);
      for (const fx of sim.extinguishFx) {
        fx.t += dt;
      }
    };

    const drawFlame = (x, y, w, h, phase) => {
      const flicker = 0.88 + 0.12 * Math.sin(phase) + 0.06 * Math.sin(phase * 2.3);
      const fw = w * 0.44 * flicker;
      const fh = h * 0.3 * flicker;

      context.save();
      context.globalAlpha = 0.19;
      context.fillStyle = "#ffc973";
      context.beginPath();
      context.ellipse(x, y, fw * 2.9, fh * 1.9, 0, 0, Math.PI * 2);
      context.fill();

      context.globalAlpha = 0.95;
      context.fillStyle = "#ffbe45";
      context.beginPath();
      context.moveTo(x, y - fh);
      context.quadraticCurveTo(x + fw, y - fh * 0.08, x, y + fh);
      context.quadraticCurveTo(x - fw, y - fh * 0.08, x, y - fh);
      context.fill();

      context.globalAlpha = 0.84;
      context.fillStyle = "#fff5cf";
      context.beginPath();
      context.ellipse(x, y - fh * 0.02, fw * 0.32, fh * 0.55, 0, 0, Math.PI * 2);
      context.fill();
      context.restore();
    };

    const drawCandles = (sim) => {
      const candleImg = assetsRef.current.candle;
      for (const candle of sim.candles) {
        if (!candle.lit) continue;

        context.save();
        context.globalAlpha = 0.2;
        context.fillStyle = "#ffcc7a";
        context.beginPath();
        context.ellipse(
          candle.x,
          candle.y - candle.h * 0.92,
          candle.w * 1.22,
          candle.h * 0.24,
          0,
          0,
          Math.PI * 2
        );
        context.fill();
        context.restore();

        if (candleImg) {
          context.drawImage(
            candleImg,
            candle.x - candle.w / 2,
            candle.y - candle.h,
            candle.w,
            candle.h
          );
        }

        drawFlame(candle.x, candle.y - candle.h * 0.94, candle.w, candle.h, candle.flamePhase);
      }
    };

    const drawNockedArrow = (sim) => {
      const arrowImg = assetsRef.current.arrow;
      if (!arrowImg) return;

      const nock = sim.aiming ? sim.pull : sim.release;
      const rot = sim.aiming
        ? Math.atan2(sim.release.y - sim.pull.y, sim.release.x - sim.pull.x)
        : 0;

      const nockX = ARROW_DRAW_W * ARROW_NOCK_X_FRAC;

      context.save();
      context.globalAlpha = sim.aiming ? 0.98 : 0.78;
      context.translate(nock.x, nock.y);
      context.rotate(rot);
      context.drawImage(arrowImg, -nockX, -ARROW_DRAW_H / 2, ARROW_DRAW_W, ARROW_DRAW_H);
      context.restore();
    };

    const drawExtinguishFx = (sim) => {
      for (const fx of sim.extinguishFx) {
        const t = clamp01(fx.t / fx.life);
        const inv = 1 - t;

        context.save();
        context.globalAlpha = 0.26 * inv;
        context.strokeStyle = "#ffd6a0";
        context.lineWidth = 1.4;
        context.beginPath();
        context.arc(fx.x, fx.y, 4 + t * 24, 0, Math.PI * 2);
        context.stroke();

        context.globalAlpha = 0.34 * inv;
        context.fillStyle = "#fff4cf";
        context.beginPath();
        context.ellipse(
          fx.x + Math.sin(t * 8) * 1.8,
          fx.y - t * 18,
          5 + t * 7,
          3 + t * 6,
          0,
          0,
          Math.PI * 2
        );
        context.fill();

        context.globalAlpha = 0.18 * inv;
        context.fillStyle = "rgba(226,226,226,1)";
        context.beginPath();
        context.ellipse(
          fx.x + Math.sin(t * 4) * 4,
          fx.y - 4 - t * 26,
          6 + t * 12,
          3 + t * 8,
          0,
          0,
          Math.PI * 2
        );
        context.fill();

        context.globalAlpha = 0.58 * inv;
        context.fillStyle = "#ffcb72";
        for (const streak of fx.streaks) {
          const sx = fx.x + Math.cos(streak.angle) * streak.speed * t + streak.drift * t;
          const sy = fx.y + Math.sin(streak.angle) * streak.speed * t - t * 4;
          const size = streak.size * inv;
          context.fillRect(sx, sy, size, size);
        }
        context.restore();
      }
    };

    const drawFlyingArrows = (sim) => {
      const arrowImg = assetsRef.current.arrow;
      if (!arrowImg) return;

      const nockX = ARROW_DRAW_W * ARROW_NOCK_X_FRAC;

      for (const arrow of sim.arrows) {
        if (!arrow.alive) continue;
        context.save();
        context.translate(arrow.x, arrow.y);
        context.rotate(arrow.rot);
        context.drawImage(arrowImg, -nockX, -ARROW_DRAW_H / 2, ARROW_DRAW_W, ARROW_DRAW_H);
        context.restore();
      }
    };

    const drawParticles = (sim) => {
      if (reducedMotion) return;
      context.save();
      context.fillStyle = "#ffd08a";
      for (const particle of sim.particles) {
        context.globalAlpha = clamp01(particle.life);
        context.fillRect(particle.x, particle.y, 2, 2);
      }
      context.restore();
    };

    const drawTrajectory = (sim) => {
      if (!sim.aiming) return;

      const launch = computeLaunch(sim, sim.pull);
      let x = sim.release.x;
      let y = sim.release.y;
      let vx = launch.vx;
      let vy = launch.vy;

      context.save();
      context.globalAlpha = 0.2;
      context.fillStyle = "rgba(246, 232, 206, 0.9)";
      for (let i = 0; i < 22; i += 1) {
        const step = 0.016;
        vy += GRAVITY * step;
        vx += sim.wind * step * 0.16;
        x += vx * step;
        y += vy * step;
        context.fillRect(x, y, 2, 2);
      }
      context.restore();
    };

    const drawBackground = (sim) => {
      context.clearRect(0, 0, sim.W, sim.H);

      const g = context.createRadialGradient(
        sim.W * 0.62,
        sim.H * 0.32,
        40,
        sim.W * 0.62,
        sim.H * 0.42,
        sim.W * 0.9
      );
      g.addColorStop(0, "rgba(255, 229, 168, 0.08)");
      g.addColorStop(1, "rgba(20, 12, 8, 0.42)");

      context.fillStyle = g;
      context.fillRect(0, 0, sim.W, sim.H);

      context.strokeStyle = "rgba(235, 215, 182, 0.26)";
      context.lineWidth = 1;
      context.strokeRect(10, 10, sim.W - 20, sim.H - 20);
    };

    const drawHud = (sim) => {
      context.save();
      context.fillStyle = "rgba(245, 234, 212, 0.92)";
      context.font = "12px Georgia, serif";
      const dir = sim.wind === 0 ? "•" : sim.wind > 0 ? "→" : "←";
      context.fillText(`Wind ${dir} ${Math.round(Math.abs(sim.wind))}`, sim.W - 108, 20);
      context.restore();
    };

    const loop = (now) => {
      const sim = simRef.current;
      if (!sim) return;

      const dt = Math.min(0.033, (now - lastTime) / 1000);
      lastTime = now;

      update(dt, now);
      drawBackground(sim);
      drawCandles(sim);
      drawExtinguishFx(sim);
      drawNockedArrow(sim);
      drawTrajectory(sim);
      drawFlyingArrows(sim);
      drawParticles(sim);
      drawHud(sim);

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resizeCanvas);

      canvas.removeEventListener("pointerdown", onPointerDown, listenerOptions);
      canvas.removeEventListener("pointermove", onPointerMove, listenerOptions);
      canvas.removeEventListener("pointerup", onPointerUpLike);
      canvas.removeEventListener("pointercancel", onPointerCancel);
      canvas.removeEventListener("pointerleave", onPointerCancel);
    };
  }, [
    buildCandleLayout,
    candleCount,
    completeGame,
    getStringAnchorsFromSvg,
    playTone,
    reducedMotion,
    vibrate,
  ]);

  useEffect(() => {
    if (showRotateOverlay) {
      pointerIdRef.current = null;
      const sim = simRef.current;
      if (sim) {
        sim.aiming = false;
      }
    }
  }, [showRotateOverlay]);

  useEffect(() => {
    return () => {
      if (completeTimeoutRef.current) {
        clearTimeout(completeTimeoutRef.current);
      }
    };
  }, []);

  const handleContinue = useCallback(() => {
    completeGame();
  }, [completeGame]);

  return (
    <div
      ref={containerRef}
      style={{
        width,
        position: "relative",
        touchAction: "none",
        userSelect: "none",
        WebkitUserSelect: "none",
      }}
    >
      <div style={hudBar}>
        <div>
          <div style={title}>Extinguish the candles</div>
          <div style={subtitle}>Draw from anywhere, release to shoot</div>
        </div>

        <div style={statusPills}>
          <span style={pill}>Shots: {shotsUI}</span>
          <span style={pill}>Left: {remainingUI}</span>
        </div>
      </div>

      <div style={arenaWrap}>
        <canvas
          ref={canvasRef}
          style={{
            width: "100%",
            height: gameHeight,
            display: "block",
            touchAction: "none",
            pointerEvents: showRotateOverlay ? "none" : "auto",
          }}
        />

        <div
          ref={bowWrapRef}
          style={{
            position: "absolute",
            left: `clamp(${BOW_LEFT_MIN_PX}px, 17vw, ${BOW_LEFT_MAX_PX}px)`,
            top: 8,
            bottom: 8,
            width: BOW_WIDTH_CSS,
            transform: `scaleX(${BOW_MIRRORED ? -1 : 1})`,
            transformOrigin: "50% 54%",
            pointerEvents: "none",
            opacity: 0.98,
            filter: "drop-shadow(0 14px 28px rgba(0,0,0,0.34))",
          }}
        >
          <div ref={bowHostRef} style={{ width: "100%", height: "100%" }} />
        </div>

        <div style={toggleWrap}>
          <TogglePill label="Sound" value={soundOn} onChange={setSoundOn} />
          <TogglePill label="Haptics" value={hapticsOn} onChange={setHapticsOn} />
        </div>

        {!assetsReady && (
          <div style={assetBadge}>
            <span>Loading assets…</span>
          </div>
        )}

        {showRotateOverlay && (
          <div style={rotateOverlay}>
            <div style={rotateCard}>
              <div style={rotateIconWrap}>
                <div style={rotateIcon} />
              </div>
              <div style={rotateText}>Rotate your phone to landscape to shoot 🎯</div>
            </div>
          </div>
        )}

        {doneUI && (
          <div style={doneOverlay}>
            <div style={doneCard}>
              <div style={doneTitle}>Candles out ✅</div>
              <button type="button" style={continueBtn} onClick={handleContinue}>
                Continue
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes rotateHint {
          0% {
            transform: rotate(0deg);
          }
          40% {
            transform: rotate(90deg);
          }
          100% {
            transform: rotate(90deg);
          }
        }
      `}</style>
    </div>
  );
}

function TogglePill({ label, value, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      aria-pressed={value}
      style={{
        appearance: "none",
        borderRadius: 999,
        border: "1px solid rgba(250, 236, 203, 0.22)",
        background: value ? "rgba(226, 184, 120, 0.3)" : "rgba(21, 15, 11, 0.4)",
        color: "#fff9ec",
        fontSize: 12,
        padding: "6px 10px",
        cursor: "pointer",
      }}
    >
      {label}: {value ? "On" : "Off"}
    </button>
  );
}

const hudBar = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: 10,
  padding: "10px 12px",
  color: "#f5e8cf",
};

const title = {
  fontSize: 15,
  fontWeight: 700,
};

const subtitle = {
  fontSize: 12,
  opacity: 0.82,
};

const statusPills = {
  display: "flex",
  gap: 8,
  alignItems: "center",
};

const pill = {
  borderRadius: 999,
  border: "1px solid rgba(248, 232, 202, 0.18)",
  background: "rgba(22, 16, 12, 0.42)",
  padding: "6px 10px",
  fontSize: 12,
  color: "#f5e8cf",
};

const arenaWrap = {
  position: "relative",
  borderRadius: 22,
  overflow: "hidden",
  border: "1px solid rgba(245, 230, 198, 0.2)",
  boxShadow: "0 20px 52px rgba(0, 0, 0, 0.42)",
  background:
    "linear-gradient(160deg, rgba(59,41,28,0.34), rgba(17,12,8,0.54)), radial-gradient(120% 120% at 50% 10%, rgba(255,226,170,0.18), rgba(0,0,0,0.24))",
};

const toggleWrap = {
  position: "absolute",
  top: 10,
  left: 10,
  zIndex: 20,
  display: "flex",
  gap: 8,
};

const assetBadge = {
  position: "absolute",
  top: 10,
  right: 10,
  zIndex: 20,
  borderRadius: 999,
  border: "1px solid rgba(248, 232, 202, 0.2)",
  background: "rgba(22, 16, 12, 0.46)",
  color: "#f6e7c6",
  fontSize: 12,
  padding: "6px 10px",
};

const rotateOverlay = {
  position: "absolute",
  inset: 0,
  zIndex: 40,
  background: "rgba(8, 6, 5, 0.84)",
  backdropFilter: "blur(2px)",
  display: "grid",
  placeItems: "center",
  padding: 16,
};

const rotateCard = {
  width: "100%",
  maxWidth: 420,
  borderRadius: 16,
  border: "1px solid rgba(246, 228, 193, 0.24)",
  background: "linear-gradient(180deg, rgba(49,35,24,0.72), rgba(23,15,11,0.78))",
  boxShadow: "0 16px 40px rgba(0,0,0,0.46)",
  padding: "18px 16px",
  textAlign: "center",
};

const rotateIconWrap = {
  width: ROTATE_ICON_SIZE,
  height: ROTATE_ICON_SIZE,
  margin: "0 auto 10px",
};

const rotateIcon = {
  width: ROTATE_ICON_SIZE,
  height: ROTATE_ICON_SIZE,
  borderRadius: 14,
  border: "2px solid rgba(247, 229, 194, 0.86)",
  position: "relative",
  boxSizing: "border-box",
  animation: "rotateHint 1.8s ease-in-out infinite",
};

const rotateText = {
  color: "#f8ead0",
  fontSize: 16,
  lineHeight: 1.35,
  fontWeight: 650,
};

const doneOverlay = {
  position: "absolute",
  inset: 0,
  zIndex: 50,
  background: "rgba(8, 6, 5, 0.56)",
  display: "grid",
  placeItems: "center",
  padding: 16,
};

const doneCard = {
  width: "100%",
  maxWidth: 360,
  borderRadius: 16,
  border: "1px solid rgba(246, 228, 193, 0.24)",
  background: "linear-gradient(180deg, rgba(49,35,24,0.8), rgba(23,15,11,0.84))",
  padding: 16,
  textAlign: "center",
  color: "#f8ead0",
};

const doneTitle = {
  fontSize: 19,
  marginBottom: 12,
  fontWeight: 700,
};

const continueBtn = {
  width: "100%",
  borderRadius: 999,
  border: "1px solid rgba(246, 228, 193, 0.3)",
  background: "linear-gradient(90deg, rgba(206, 153, 83, 0.4), rgba(246, 206, 139, 0.28))",
  color: "#fffaf0",
  fontWeight: 700,
  fontSize: 14,
  padding: "10px 12px",
  cursor: "pointer",
};
