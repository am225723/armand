"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import CardInsideOrnate from "./CardInsideOrnate";

/**
 * OrnateBirthdayCard
 * - Uses your existing CardInsideOrnate visuals (fonts + SVG "ink" animation)
 * - Drives lineProgress from audio.currentTime via requestAnimationFrame
 * - Autoplay-safe overlay if blocked
 *
 * Props:
 *  - name: string
 *  - audioUrl: string
 *  - autoStart: boolean
 *  - showControls: boolean
 */
export default function OrnateBirthdayCard({
  name = "Luke",
  audioUrl = "/audio/luke-poem.mp3",
  fontUrl = "/fonts/InterSignature-q20q2.ttf",
  titleFontUrl = "/fonts/valentine.otf",
  autoStart = true,
  showControls = true,
}) {
  const audioRef = useRef(null);
  const rafRef = useRef(0);

  const [needsGesture, setNeedsGesture] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [status, setStatus] = useState("Ready ✍️");
  const [fontReady, setFontReady] = useState(false);
  const lineScheduleRef = useRef([]);

  // CardInsideOrnate expects lineProgress array (0..1 per line)
  const [lineProgress, setLineProgress] = useState([]);

  // If CardInsideOrnate exports/uses a fixed poem length, we align to it by “probing”
  // but we keep it defensive.
  const defaultLineCount = 20;

  const ensureLineCount = useMemo(() => {
    // If we already have progress, use its length, else default
    return lineProgress.length ? lineProgress.length : defaultLineCount;
  }, [lineProgress.length]);

  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  useEffect(() => {
    let cancelled = false;

    const loadScriptFont = async () => {
      try {
        if (typeof window === "undefined") return;

        const handwritingFace = new FontFace("InterSignature", `url(${fontUrl})`);
        const headingFace = new FontFace("Valentine", `url(${titleFontUrl})`);
        const [loadedHand, loadedTitle] = await Promise.all([handwritingFace.load(), headingFace.load()]);
        document.fonts.add(loadedHand);
        document.fonts.add(loadedTitle);
        await document.fonts.ready;
      } catch {
        // fall back gracefully if font loading fails
      } finally {
        if (!cancelled) setFontReady(true);
      }
    };

    loadScriptFont();
    return () => {
      cancelled = true;
    };
  }, [fontUrl, titleFontUrl]);

  function stopRaf() {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = 0;
  }

  function buildLineSchedule(duration, lineCount) {
    // Weight by line density and reserve tiny pacing buffers to avoid premature finishes.
    const characterWeights = [
      1.12, 1.1, 1.0, 1.0, 0.48, 1.08, 1.08, 1.12, 1.02, 0.5, 1.15, 1.12, 1.08, 1.08, 0.5, 1.08, 1.08, 0.5, 1.2, 1.38,
    ];
    const fallbackWeights = Array.from({ length: lineCount }).map((_, index) => 1 + (index % 5) * 0.04);
    const weights = fallbackWeights.map((base, index) => characterWeights[index] ?? base);

    const totalWeight = weights.reduce((sum, w) => sum + w, 0);
    const perWeight = duration / Math.max(0.001, totalWeight);
    let cursor = 0;

    return weights.map((weight, index) => {
      const start = cursor;
      const end = cursor + perWeight * weight;
      // Visual pacing only; audio stays clock source.
      const lineDelaySec = index === lineCount - 1 ? 0.24 : 0.12 + (index % 2) * 0.03;
      cursor = end;
      return {
        start,
        end,
        lineDelaySec,
      };
    });
  }

  function computeProgressFromAudio(t, duration, lineCount) {
    if (!Number.isFinite(duration) || duration <= 0) return new Array(lineCount).fill(0);

    if (!lineScheduleRef.current.length || lineScheduleRef.current.length !== lineCount) {
      lineScheduleRef.current = buildLineSchedule(duration, lineCount);
    }
    const schedule = lineScheduleRef.current;

    return schedule.map((slot) => {
      const delayedStart = slot.start + slot.lineDelaySec;
      return clamp((t - delayedStart) / Math.max(0.22, slot.end - delayedStart), 0, 1);
    });
  }

  function startSyncedAnimation() {
    stopRaf();
    const a = audioRef.current;
    if (!a) return;

    setIsPlaying(true);
    setStatus("Writing…");

    const tick = () => {
      const tNow = a.currentTime;
      const dur = a.duration;

      const next = computeProgressFromAudio(tNow, dur, ensureLineCount);
      setLineProgress(next);

      if (a.ended) {
        setStatus("Done 💛");
        setIsPlaying(false);
        stopRaf();
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
  }

  async function attemptAutoplay() {
    if (!fontReady) return;
    const a = audioRef.current;
    if (!a) return;

    try {
      await a.play();
      setNeedsGesture(false);
      startSyncedAnimation();
    } catch {
      setNeedsGesture(true);
      setStatus("Tap to start (sound permission)");
    }
  }

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;

    const onEnded = () => {
      setIsPlaying(false);
      setStatus("Done 💛");
      stopRaf();
    };

    a.addEventListener("ended", onEnded);
    return () => a.removeEventListener("ended", onEnded);
  }, []);

  useEffect(() => {
    if (!autoStart || !fontReady) return;

    const a = audioRef.current;
    if (!a) return;

    const onMeta = () => {
      lineScheduleRef.current = [];
      attemptAutoplay();
    };

    a.addEventListener("loadedmetadata", onMeta);
    return () => a.removeEventListener("loadedmetadata", onMeta);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoStart]);

  function handlePlayPause() {
    if (!fontReady) return;
    const a = audioRef.current;
    if (!a) return;

    if (a.paused) {
      a.play()
        .then(() => {
          setNeedsGesture(false);
          startSyncedAnimation();
        })
        .catch(() => {
          setNeedsGesture(true);
          setStatus("Tap to start (sound permission)");
        });
    } else {
      a.pause();
      setIsPlaying(false);
      setStatus("Paused");
      stopRaf();
    }
  }

  function handleReplay() {
    if (!fontReady) return;
    const a = audioRef.current;
    if (!a) return;

    a.pause();
    a.currentTime = 0;
    setStatus("Writing…");

    a.play()
      .then(() => {
        setNeedsGesture(false);
        startSyncedAnimation();
      })
      .catch(() => {
        setNeedsGesture(true);
        setStatus("Tap to start (sound permission)");
      });
  }

  return (
    <div style={{ width: "100%" }}>
      {showControls && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            gap: 10,
            padding: "10px 8px",
          }}
        >
          <div style={{ color: "rgba(255,255,255,0.78)", fontSize: 12 }}>{status}</div>

          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={handlePlayPause} style={btn("primary")} aria-label={isPlaying ? "Pause" : "Play"}>
              {isPlaying ? "⏸ Pause" : "▶ Play"}
            </button>
            <button onClick={handleReplay} style={btn()} aria-label="Replay">
              ↺ Replay
            </button>
          </div>
        </div>
      )}

      <div style={{ position: "relative" }}>
        <CardInsideOrnate name={name} lineProgress={lineProgress} />

        <audio ref={audioRef} src={audioUrl} preload="metadata" />

        {needsGesture && (
          <button
            onClick={attemptAutoplay}
            style={{
              position: "absolute",
              inset: 0,
              display: "grid",
              placeItems: "center",
              background: "rgba(0,0,0,.42)",
              backdropFilter: "blur(6px)",
              border: "none",
              cursor: "pointer",
              color: "white",
              borderRadius: 18,
            }}
          >
            <span
              style={{
                padding: "12px 18px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,.25)",
                background: "rgba(255,255,255,.10)",
                fontWeight: 900,
              }}
            >
              Tap to start with sound ▶
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

function btn(kind) {
  const base = {
    appearance: "none",
    borderRadius: 999,
    padding: "10px 12px",
    fontWeight: 900,
    letterSpacing: "0.2px",
    cursor: "pointer",
    border: "1px solid rgba(255,255,255,.16)",
    background: "rgba(0,0,0,.20)",
    color: "white",
  };

  if (kind === "primary") {
    return {
      ...base,
      border: "1px solid rgba(255,255,255,.20)",
      background: "linear-gradient(90deg, rgba(255,210,122,.22), rgba(158,231,255,.18))",
    };
  }

  return base;
}
