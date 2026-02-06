"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import CardInsideOrnate from "./CardInsideOrnate";

/**
 * OrnateBirthdayCard
 * - Uses your existing CardInsideOrnate visuals (fonts + SVG "ink" animation)
 * - Drives lineProgress from audio.currentTime via requestAnimationFrame (mobile-stable)
 * - Does NOT modify CardInsideOrnate at all
 */
function clamp01(x) {
  return Math.max(0, Math.min(1, x));
}

function buildLineSchedule(lines, duration, opts = {}) {
  const leadIn = opts.leadIn ?? 0.2;
  const tailOut = opts.tailOut ?? 0.1;
  const blankPause = opts.blankPause ?? 0.5;
  const minLine = opts.minLine ?? 0.25;

  const usable = Math.max(0.5, duration - leadIn - tailOut);

  const weights = lines.map((ln) => (ln.trim() ? Math.max(1, ln.length) : 0));
  const totalWeight = weights.reduce((a, b) => a + b, 0) || 1;

  const rawTimes = weights.map((w, i) => {
    if (!lines[i].trim()) return 0;
    return Math.max(minLine, (usable * w) / totalWeight);
  });

  const blankCount = lines.filter((l) => !l.trim()).length;
  const totalBlankPause = blankCount * blankPause;

  const nonBlankTotal = rawTimes.reduce((a, b) => a + b, 0) || 1;
  const scale = (usable - totalBlankPause) / Math.max(0.001, nonBlankTotal);
  const times = rawTimes.map((t) => t * scale);

  const schedule = [];
  let t = leadIn;

  for (let i = 0; i < lines.length; i++) {
    if (!lines[i].trim()) {
      schedule.push({ start: t, end: t }); // blank
      t += blankPause;
      continue;
    }
    const start = t;
    const end = t + times[i];
    schedule.push({ start, end });
    t = end;
  }

  return schedule;
}

export default function OrnateBirthdayCard({
  name = "Luke",
  audioUrl = "/audio/luke-poem.mp3",
  autoStart = false,
  showControls = true,
}) {
  const audioRef = useRef(null);
  const [lineProgress, setLineProgress] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);

  // Keep these lines EXACTLY matching CardInsideOrnate’s poemLines.
  const lines = useMemo(() => {
    // Duplicate here intentionally so we don’t touch CardInsideOrnate.
    // (If you later export poemLines, we can import it instead.)
    return [
      `The world became a brighter place...`,
      `The moment ${name} arrived,`,
      `With kindness written on his face`,
      `And a spirit meant to thrive.`,
      ``,
      `Through every year and every mile,`,
      `A soul grows in heart and mind,`,
      `With a steady hand and a ready smile,`,
      `The rarest sort to find.`,
      ``,
      `May this day be filled with all that's loved,`,
      `With laughter, warmth, and light,`,
      `And may the year ahead unfold...`,
      `To be exceptionally bright..`,
      ``,
      `So here's to ${name}, for all he is,`,
      `And the light he's always shown,`,
      ``,
      `The greatest gift of all Dear ${name},`,
      `Is To Be - Known`,
    ];
  }, [name]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    let raf = 0;
    let schedule = null;

    const tick = () => {
      // If audio isn't ready, keep polling (prevents NaNs on iOS)
      if (!schedule || audio.readyState < 2) {
        raf = requestAnimationFrame(tick);
        return;
      }

      const t = audio.currentTime || 0;

      const next = schedule.map((seg, i) => {
        if (!lines[i].trim()) return 0;
        const denom = Math.max(0.0001, seg.end - seg.start);
        return clamp01((t - seg.start) / denom);
      });

      setLineProgress(next);
      raf = requestAnimationFrame(tick);
    };

    const onMeta = () => {
      // Prefer duration-based schedule. If duration is missing, fall back later.
      const dur = Number.isFinite(audio.duration) ? audio.duration : 30;
      schedule = buildLineSchedule(lines, dur, {
        leadIn: 0.2,
        tailOut: 0.1,
        blankPause: 0.55,
        minLine: 0.25,
      });
    };

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);

    // Build schedule asap if metadata already available
    if (audio.readyState >= 1) onMeta();

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
    };
  }, [lines]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !autoStart) return;

    // Autoplay-safe: only attempt if already allowed; otherwise user taps play.
    audio.play().catch(() => {});
  }, [autoStart]);

  return (
    <div style={{ width: "100%", maxWidth: 520, margin: "0 auto" }}>
      <audio
        ref={audioRef}
        src={audioUrl}
        preload="auto"
        playsInline
        controls={showControls}
        style={{ width: "100%", marginBottom: 10 }}
      />
      <CardInsideOrnate name={name} lineProgress={lineProgress} />
    </div>
  );
}
