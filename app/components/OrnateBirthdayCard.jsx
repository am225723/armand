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
  autoStart = true,
  showControls = true,
}) {
  const audioRef = useRef(null);
  const rafRef = useRef(0);

  const [needsGesture, setNeedsGesture] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [status, setStatus] = useState("Ready ✍️");
  const [fontReady, setFontReady] = useState(false);

  // CardInsideOrnate expects lineProgress array (0..1 per line)
  const [lineProgress, setLineProgress] = useState([]);

  // If CardInsideOrnate exports/uses a fixed poem length, we align to it by “probing”
  // but we keep it defensive: start with 24 lines and adapt if needed.
  const defaultLineCount = 24;

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

        const face = new FontFace("InterSignature", `url(${fontUrl})`);
        const loaded = await face.load();
        document.fonts.add(loaded);
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
  }, [fontUrl]);

  function stopRaf() {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = 0;
  }

  // Simple, even timing if you don’t pass a custom schedule into CardInsideOrnate
  // (CardInsideOrnate may have its own more accurate timings; this just drives progress smoothly.)
  function computeProgressFromAudio(t, duration, lineCount) {
    if (!Number.isFinite(duration) || duration <= 0) return new Array(lineCount).fill(0);

    // Allocate time proportionally but gently: line i starts at i/lineCount of the audio.
    const per = duration / lineCount;
    const out = new Array(lineCount).fill(0);

    for (let i = 0; i < lineCount; i++) {
      const t0 = i * per;
      const t1 = (i + 1) * per;
      const p = clamp((t - t0) / Math.max(0.22, t1 - t0), 0, 1);
      out[i] = p;
    }
    return out;
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
