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
const ARROW_NOCK_X_FRAC = 0.03; // near rear notch so string follows arrow end
const RELEASE_Y_OFFSET_PX = -60;

const BOW_MIRRORED = false;

const BOW_LEFT_MIN_PX = 84;
const BOW_LEFT_MAX_PX = 184;
const BOW_WIDTH_CSS = "clamp(220px, 26vw, 320px)";
const BOW_STRING_X_FRAC = 0.255;
const BOW_STRING_TOP_Y_FRAC = 0.12;
const BOW_STRING_BOTTOM_Y_FRAC = 0.89;

const MAX_PULL_PX = 325;
const MIN_PULL_PX = 18;
const MAX_VERTICAL_AIM_PX = 130;
const CENTER_MAGNET_BASE = 0.18;
const CENTER_MAGNET_PULL = 0.48;
const COMFORT_PULL_PX = 210;

const STRING_VIBRATION_MS = 320;
const COMPLETE_AUTO_DELAY_MS = 420;

const CANDLE_REGION_START_PCT = 0.53;
const CANDLE_REGION_END_PAD_PX = 28;
const CANDLE_HITBOX_SCALE = 0.72;
const CANDLE_DRIFT_SPEED_MIN = 0.75;
const CANDLE_DRIFT_SPEED_MAX = 1.45;

const GRAVITY = 1220;
const MIN_SPEED = 560;
const MAX_SPEED = 1980;
const ARROW_DRAG = 0.0015;

const WORLD_WIDTH_MOBILE_PORTRAIT_MULT = 2.25;
const WORLD_WIDTH_MOBILE_LANDSCAPE_MULT = 1.85;
const WORLD_WIDTH_DESKTOP_MULT = 1.45;

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
  const stringPrimaryRef = useRef(null);
  const stringSecondaryRef = useRef(null);

  const assetsRef = useRef({ arrow: null, candle: null, ready: false });
  const simRef = useRef(null);

  const pointerIdRef = useRef(null);
  const completeOnceRef = useRef(false);
  const completeTimeoutRef = useRef(null);

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
  const cameraFollowMode = isCoarsePointer;
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
    const wrap = bowWrapRef.current;
    const container = containerRef.current;
    if (!svg || !wrap || !container) return null;

    const vb = svg.viewBox?.baseVal;
    const vbX = vb?.x || 0;
    const vbY = vb?.y || 0;
    const vbW = vb?.width || 1;
    const vbH = vb?.height || 1;

    const wrapRect = wrap.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    let vbTop = null;
    let vbBottom = null;

    // Prefer detected string bounds only when they're plausibly the full bowstring.
    const stringEl = bowStringRef.current;
    if (stringEl) {
      try {
        const bb = stringEl.getBBox();
        const looksValid =
          bb &&
          bb.height >= vbH * 0.42 &&
          bb.width <= vbW * 0.36 &&
          bb.y >= vbY &&
          bb.y + bb.height <= vbY + vbH;
        if (looksValid) {
          vbTop = { x: bb.x + bb.width * 0.5, y: bb.y };
          vbBottom = { x: bb.x + bb.width * 0.5, y: bb.y + bb.height };
        }
      } catch {
        // no-op
      }
    }

    // Fallback calibration for heavily flattened SVGs (this bow asset).
    if (!vbTop || !vbBottom) {
      const xFrac = BOW_MIRRORED ? 1 - BOW_STRING_X_FRAC : BOW_STRING_X_FRAC;
      vbTop = { x: vbX + vbW * xFrac, y: vbY + vbH * BOW_STRING_TOP_Y_FRAC };
      vbBottom = { x: vbX + vbW * xFrac, y: vbY + vbH * BOW_STRING_BOTTOM_Y_FRAC };
    }

    const vbNock = {
      x: vbTop.x,
      y: lerp(vbTop.y, vbBottom.y, STRING_NOCK_Y_FRAC),
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

    if (!stringPrimaryRef.current || !stringSecondaryRef.current) {
      const makePath = (role) => {
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("fill", "none");
        path.setAttribute("stroke", "rgba(44, 36, 26, 0.98)");
        path.setAttribute("stroke-width", "1.35");
        path.setAttribute("stroke-linecap", "round");
        path.setAttribute("vector-effect", "non-scaling-stroke");
        path.setAttribute("data-role", role);
        path.style.pointerEvents = "none";
        path.style.mixBlendMode = "multiply";
        svg.appendChild(path);
        return path;
      };

      stringPrimaryRef.current = makePath("injected-bow-string-top");
      stringSecondaryRef.current = makePath("injected-bow-string-bottom");
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
          stringEl.style.opacity = "0.75";
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

  const buildCandleLayout = useCallback((W, H, releaseX, worldW) => {
    const candles = [];

    const regionStart = Math.max(worldW * CANDLE_REGION_START_PCT, releaseX + W * 0.86);
    const regionEnd = Math.max(regionStart + 260, worldW - CANDLE_REGION_END_PAD_PX - 32);
    const regionWidth = Math.max(120, regionEnd - regionStart);

    const candleH = clamp(H * 0.24, 70, 118);
    const candleW = candleH * (546 / 1208);

    for (let i = 0; i < candleCount; i += 1) {
      const t = candleCount <= 1 ? 0 : i / (candleCount - 1);
      const lane = i % 3;
      const serp = Math.sin(i * 1.11) * 34;
      const zig = (i % 2 === 0 ? -1 : 1) * 22;
      const x = clamp(
        lerp(regionStart + 24, regionEnd - 24, t) + serp + zig,
        regionStart + 8,
        regionEnd - 8
      );
      const y =
        H * 0.74 -
        lane * clamp(candleH * 0.72, 52, 78) +
        Math.cos(i * 0.9) * 20 -
        (i % 4 === 0 ? 16 : 0);

      candles.push({
        id: i,
        x,
        y,
        baseX: x,
        baseY: y,
        w: candleW,
        h: candleH,
        lit: true,
        flamePhase: Math.random() * Math.PI * 2,
        driftPhase: Math.random() * Math.PI * 2,
        driftSpeed:
          CANDLE_DRIFT_SPEED_MIN +
          Math.random() * (CANDLE_DRIFT_SPEED_MAX - CANDLE_DRIFT_SPEED_MIN),
        driftAmpX: 10 + Math.random() * 20,
        driftAmpY: 6 + Math.random() * 14,
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
      const worldW = Math.max(
        W + 260,
        Math.round(
          W *
            (cameraFollowMode
              ? isPortrait
                ? WORLD_WIDTH_MOBILE_PORTRAIT_MULT
                : WORLD_WIDTH_MOBILE_LANDSCAPE_MULT
              : WORLD_WIDTH_DESKTOP_MULT)
        )
      );

      const defaultRelease = {
        x: Math.max(140, W * 0.24),
        y: H * 0.53 + RELEASE_Y_OFFSET_PX,
      };
      const candles = buildCandleLayout(W, H, defaultRelease.x, worldW);

      simRef.current = {
        W,
        H,
        worldW,
        cameraX: 0,
        cameraV: 0,
        wind: reducedMotion ? 0 : (Math.random() * 2 - 1) * 22,

        release: defaultRelease,
        pull: { ...defaultRelease },
        pullVel: { x: 0, y: 0 },

        aiming: false,
        done: false,

        bowAnchors: null,
        stringVibStart: 0,
        stringVibAmp: 0,
        bowRecoil: 0,
        bowPulse: Math.random() * Math.PI * 2,
        hasReleasedShot: false,

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
      const pathTop = stringPrimaryRef.current;
      const pathBottom = stringSecondaryRef.current;
      const anchors = sim.bowAnchors;
      if (!pathTop || !pathBottom || !anchors) return;

      const wrap = bowWrapRef.current;
      const containerRect = container.getBoundingClientRect();
      const wrapRect = wrap?.getBoundingClientRect();
      if (!wrapRect) return;

      const screenPullX = sim.pull.x;
      const screenPullY = sim.pull.y;
      let nx = (screenPullX - (wrapRect.left - containerRect.left)) / wrapRect.width;
      let ny = (screenPullY - (wrapRect.top - containerRect.top)) / wrapRect.height;
      nx = clamp(nx, -0.85, 0.98);
      ny = clamp(ny, -0.2, 1.2);
      if (BOW_MIRRORED) nx = 1 - nx;

      const pullVB = {
        x: anchors.vbX + nx * anchors.vbW,
        y: anchors.vbY + ny * anchors.vbH,
      };

      const dx = pullVB.x - anchors.vbNock.x;
      const dy = pullVB.y - anchors.vbNock.y;
      const pullT = clamp01(Math.abs(dx) / (MAX_PULL_PX * 0.8));
      const bendT = sim.aiming ? clamp01(pullT * 1.06) : 0;

      const vibrateProgress = clamp01((nowMs - sim.stringVibStart) / STRING_VIBRATION_MS);
      const vibEnv = 1 - vibrateProgress;
      const vibrationActive = sim.stringVibAmp > 0 && vibrateProgress < 1;
      const vib =
        vibrationActive
          ? Math.sin(vibrateProgress * Math.PI * 20) * sim.stringVibAmp * vibEnv
          : 0;

      // Simulate limb tips bending toward the bow centerline while keeping bow position fixed.
      const towardCenterDir = BOW_MIRRORED ? -1 : 1;
      const tipShiftX = towardCenterDir * (8 + bendT * 16);
      const tipShiftY = 12 + bendT * 18;
      const topTip = {
        x: anchors.vbTop.x + tipShiftX * bendT,
        y: anchors.vbTop.y + tipShiftY * bendT,
      };
      const bottomTip = {
        x: anchors.vbBottom.x + tipShiftX * bendT,
        y: anchors.vbBottom.y - tipShiftY * bendT,
      };

      const nockX = anchors.vbNock.x + dx + vib;
      const nockY = anchors.vbNock.y + dy;
      const topCtrlX = lerp(topTip.x, nockX, 0.46) - 52 * pullT + vib * 0.42;
      const topCtrlY = lerp(topTip.y, nockY, 0.44);
      const botCtrlX = lerp(nockX, bottomTip.x, 0.54) - 52 * pullT + vib * 0.42;
      const botCtrlY = lerp(nockY, bottomTip.y, 0.56);
      pathTop.setAttribute(
        "d",
        `M ${topTip.x} ${topTip.y} Q ${topCtrlX} ${topCtrlY} ${nockX} ${nockY}`
      );
      pathBottom.setAttribute(
        "d",
        `M ${nockX} ${nockY} Q ${botCtrlX} ${botCtrlY} ${bottomTip.x} ${bottomTip.y}`
      );

      const activeT = sim.aiming ? 1 : vibrationActive ? 0.6 : 0;
      const opacity = (0.7 + pullT * 0.24) * activeT;
      pathTop.setAttribute("stroke-opacity", String(opacity));
      pathBottom.setAttribute("stroke-opacity", String(opacity));
      const dynamicStroke = String(1.45 + pullT * 0.9);
      pathTop.setAttribute("stroke-width", dynamicStroke);
      pathBottom.setAttribute("stroke-width", dynamicStroke);

      if (wrap) {
        // Hard lock bow world position; only string geometry reacts.
        const glow = sim.aiming ? 3 + bendT * 10 : 2;
        const glowAlpha = sim.aiming ? 0.2 + bendT * 0.22 : 0.12;
        wrap.style.transform = `scaleX(${BOW_MIRRORED ? -1 : 1})`;
        wrap.style.filter = `drop-shadow(0 14px 28px rgba(0,0,0,0.36)) drop-shadow(0 0 ${glow}px rgba(255, 214, 132, ${glowAlpha}))`;
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
      const sim = simRef.current;
      if (!sim || sim.done) return;
      if (pointerIdRef.current != null) return;
      if (cameraFollowMode) {
        const hasLiveArrow = sim.arrows.some((arrow) => arrow.alive);
        if (hasLiveArrow || sim.hasReleasedShot || sim.cameraX > 6) return;
      }

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
        x: sim.release.x + sim.cameraX,
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
      sim.bowRecoil = 0;
      sim.bowPulse = 0;
      sim.hasReleasedShot = true;

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
        sim.release = {
          x: anchors.pxNock.x,
          y: anchors.pxNock.y + RELEASE_Y_OFFSET_PX,
        };
        if (!sim.layoutAnchored && !sim.startedAt) {
          sim.candles = buildCandleLayout(sim.W, sim.H, sim.release.x, sim.worldW);
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
        sim.worldW = Math.max(
          sim.W + 260,
          Math.round(
            sim.W *
              (cameraFollowMode
                ? isPortrait
                  ? WORLD_WIDTH_MOBILE_PORTRAIT_MULT
                  : WORLD_WIDTH_MOBILE_LANDSCAPE_MULT
                : WORLD_WIDTH_DESKTOP_MULT)
          )
        );
        sim.cameraX = clamp(sim.cameraX, 0, Math.max(0, sim.worldW - sim.W));
        sim.candles = buildCandleLayout(sim.W, sim.H, sim.release.x, sim.worldW);
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
        candle.flamePhase += dt * 6.4;
        if (!cameraFollowMode && !sim.done) {
          candle.driftPhase += dt * candle.driftSpeed;
          candle.x = candle.baseX + Math.sin(candle.driftPhase) * candle.driftAmpX;
          candle.y = candle.baseY + Math.cos(candle.driftPhase * 0.9) * candle.driftAmpY;
        } else {
          candle.x = candle.baseX;
          candle.y = candle.baseY;
        }
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

        if (!reducedMotion && sim.particles.length < 360) {
          sim.particles.push({
            x: arrow.x - Math.cos(arrow.rot) * 14 + (Math.random() - 0.5) * 3,
            y: arrow.y - Math.sin(arrow.rot) * 14 + (Math.random() - 0.5) * 3,
            vx: -arrow.vx * 0.08 + (Math.random() - 0.5) * 34,
            vy: -arrow.vy * 0.08 + (Math.random() - 0.5) * 34,
            life: 0.11 + Math.random() * 0.09,
            color: "trail",
          });
        }

        if (arrow.x > sim.W + 420 || arrow.y > sim.H + 340 || arrow.y < -320) {
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
            x: candle.x - (candle.w * CANDLE_HITBOX_SCALE) / 2,
            y: candle.y - candle.h,
            w: candle.w * CANDLE_HITBOX_SCALE,
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

      if (cameraFollowMode) {
        const leadArrow = sim.arrows.filter((a) => a.alive).sort((a, b) => b.x - a.x)[0] || null;
        const maxCam = Math.max(0, sim.worldW - sim.W);
        let targetCam = 0;
        if (sim.aiming) {
          targetCam = 0;
        } else if (leadArrow) {
          targetCam = clamp(leadArrow.x - sim.W * 0.34, 0, maxCam);
        } else if (sim.hasReleasedShot) {
          targetCam = 0;
        }
        const cameraDelta = targetCam - sim.cameraX;
        sim.cameraV = sim.cameraV * 0.84 + cameraDelta * dt * 10;
        sim.cameraX = clamp(sim.cameraX + sim.cameraV * dt * 46, 0, maxCam);

        if (!leadArrow && sim.hasReleasedShot && sim.cameraX < 1.4 && Math.abs(sim.cameraV) < 0.4) {
          sim.hasReleasedShot = false;
          sim.cameraX = 0;
          sim.cameraV = 0;
        }
      } else {
        sim.cameraX = 0;
        sim.cameraV = 0;
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
        const sx = candle.x - sim.cameraX;
        if (sx < -candle.w * 1.6 || sx > sim.W + candle.w * 1.6) continue;

        context.save();
        context.globalAlpha = 0.2;
        context.fillStyle = "#ffcc7a";
        context.beginPath();
        context.ellipse(
          sx,
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
            sx - candle.w / 2,
            candle.y - candle.h,
            candle.w,
            candle.h
          );
        }

        drawFlame(sx, candle.y - candle.h * 0.94, candle.w, candle.h, candle.flamePhase);
      }
    };

    const drawNockedArrow = (sim) => {
      const arrowImg = assetsRef.current.arrow;
      if (!arrowImg) return;
      if (cameraFollowMode && !sim.aiming) {
        const hasLiveArrow = sim.arrows.some((arrow) => arrow.alive);
        if (hasLiveArrow || sim.hasReleasedShot || sim.cameraX > 4) {
          return;
        }
      }

      const nock = sim.aiming ? sim.pull : sim.release;
      const rot = sim.aiming
        ? Math.atan2(sim.release.y - sim.pull.y, sim.release.x - sim.pull.x)
        : 0;
      const sx = nock.x;

      const nockX = ARROW_DRAW_W * ARROW_NOCK_X_FRAC;

      context.save();
      context.globalAlpha = sim.aiming ? 0.98 : 0.78;
      context.translate(sx, nock.y);
      context.rotate(rot);
      context.drawImage(arrowImg, -nockX, -ARROW_DRAW_H / 2, ARROW_DRAW_W, ARROW_DRAW_H);
      context.restore();
    };

    const drawExtinguishFx = (sim) => {
      for (const fx of sim.extinguishFx) {
        const t = clamp01(fx.t / fx.life);
        const inv = 1 - t;
        const sx = fx.x - sim.cameraX;

        context.save();
        context.globalAlpha = 0.26 * inv;
        context.strokeStyle = "#ffd6a0";
        context.lineWidth = 1.4;
        context.beginPath();
        context.arc(sx, fx.y, 4 + t * 24, 0, Math.PI * 2);
        context.stroke();

        context.globalAlpha = 0.34 * inv;
        context.fillStyle = "#fff4cf";
        context.beginPath();
        context.ellipse(
          sx + Math.sin(t * 8) * 1.8,
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
          sx + Math.sin(t * 4) * 4,
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
          const px = sx + Math.cos(streak.angle) * streak.speed * t + streak.drift * t;
          const sy = fx.y + Math.sin(streak.angle) * streak.speed * t - t * 4;
          const size = streak.size * inv;
          context.fillRect(px, sy, size, size);
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
        const sx = arrow.x - sim.cameraX;
        if (sx < -ARROW_DRAW_W * 0.8 || sx > sim.W + ARROW_DRAW_W) continue;
        context.save();
        context.translate(sx, arrow.y);
        context.rotate(arrow.rot);
        context.drawImage(arrowImg, -nockX, -ARROW_DRAW_H / 2, ARROW_DRAW_W, ARROW_DRAW_H);
        context.restore();
      }
    };

    const drawParticles = (sim) => {
      if (reducedMotion) return;
      for (const particle of sim.particles) {
        const sx = particle.x - sim.cameraX;
        if (sx < -6 || sx > sim.W + 6) continue;
        context.save();
        context.globalAlpha = clamp01(particle.life);
        context.fillStyle = particle.color === "trail" ? "#ffe8bc" : "#ffd08a";
        context.fillRect(sx, particle.y, 2, 2);
        context.restore();
      }
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
        context.fillRect(x - sim.cameraX, y, 2, 2);
      }
      context.restore();
    };

    const drawBackground = (sim) => {
      context.clearRect(0, 0, sim.W, sim.H);

      const camT = sim.worldW > sim.W ? clamp01(sim.cameraX / (sim.worldW - sim.W)) : 0;
      const g = context.createRadialGradient(
        sim.W * (0.52 + camT * 0.3),
        sim.H * 0.32,
        40,
        sim.W * (0.52 + camT * 0.3),
        sim.H * 0.42,
        sim.W * 0.9
      );
      g.addColorStop(0, "rgba(255, 229, 168, 0.08)");
      g.addColorStop(1, "rgba(20, 12, 8, 0.42)");

      context.fillStyle = g;
      context.fillRect(0, 0, sim.W, sim.H);

      context.save();
      context.globalAlpha = 0.12;
      context.strokeStyle = "rgba(255,223,166,0.6)";
      context.lineWidth = 1;
      const gridOffset = (sim.cameraX * 0.2) % 34;
      for (let x = -gridOffset; x < sim.W; x += 34) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, sim.H);
        context.stroke();
      }
      context.restore();

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
    cameraFollowMode,
    completeGame,
    getStringAnchorsFromSvg,
    isPortrait,
    playTone,
    reducedMotion,
    vibrate,
  ]);

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
          <div style={subtitle}>
            {cameraFollowMode
              ? "Mobile mode: pull to bend bow, release to follow arrow, then reset to bow"
              : "Draw from anywhere, release to shoot"}
          </div>
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
            pointerEvents: "auto",
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
            opacity: 0.99,
            filter:
              "drop-shadow(0 14px 28px rgba(0,0,0,0.36)) drop-shadow(0 0 2px rgba(255, 226, 170, 0.14))",
          }}
        >
          <div
            ref={bowHostRef}
            style={{
              width: "100%",
              height: "100%",
              filter: "contrast(1.1) saturate(1.12) brightness(1.04)",
            }}
          />
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
