"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import FrontCover from "./components/FrontCover";
import OrnateBirthdayCard from "./components/OrnateBirthdayCard";
import PhotoCarousel from "./components/PhotoCarousel";
import StatsCard from "./components/StatsCard";
import AmbientFX from "./components/AmbientFX";
import CardShell from "./components/CardShell";
import SectionTransition from "./components/SectionTransition";

const BREATH_BEAT_MS = 320;

export default function Page() {
  const [step, setStep] = useState("archery"); // "archery" | "earned" | "poem"
  const [result, setResult] = useState({ shots: null, timeMs: null });
  const [uiSoundOn, setUiSoundOn] = useState(false);
  const [showPoemClosing, setShowPoemClosing] = useState(false);

  const completionHandledRef = useRef(false);
  const stepTimerRef = useRef(null);
  const poemClosingTimerRef = useRef(null);
  const audioCtxRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    const loadValentineFont = async () => {
      try {
        if (typeof window === "undefined") return;
        const face = new FontFace("Valentine", "url(/fonts/valentine.otf)");
        const loadedFace = await face.load();
        if (cancelled) return;
        document.fonts.add(loadedFace);
        await document.fonts.ready;
      } catch {
        // graceful fallback to existing font stack
      }
    };

    loadValentineFont();
    return () => {
      cancelled = true;
    };
  }, []);

  const getAudioContext = useCallback(() => {
    if (typeof window === "undefined") return null;
    try {
      if (!audioCtxRef.current) {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        if (!Ctx) return null;
        audioCtxRef.current = new Ctx();
      }
      return audioCtxRef.current;
    } catch {
      return null;
    }
  }, []);

  const playUiTick = useCallback(() => {
    if (!uiSoundOn) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === "suspended") ctx.resume().catch(() => {});

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(900, now);
    osc.frequency.exponentialRampToValueAtTime(580, now + 0.08);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.018, now + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.11);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.12);
  }, [getAudioContext, uiSoundOn]);

  const playUiShimmer = useCallback(() => {
    if (!uiSoundOn) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === "suspended") ctx.resume().catch(() => {});

    const now = ctx.currentTime;

    const oscA = ctx.createOscillator();
    const oscB = ctx.createOscillator();
    const gain = ctx.createGain();

    oscA.type = "sine";
    oscB.type = "triangle";
    oscA.frequency.setValueAtTime(520, now);
    oscB.frequency.setValueAtTime(760, now);
    oscA.frequency.exponentialRampToValueAtTime(410, now + 0.22);
    oscB.frequency.exponentialRampToValueAtTime(620, now + 0.24);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.015, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);

    oscA.connect(gain);
    oscB.connect(gain);
    gain.connect(ctx.destination);

    oscA.start(now);
    oscB.start(now);
    oscA.stop(now + 0.31);
    oscB.stop(now + 0.31);
  }, [getAudioContext, uiSoundOn]);

  const queueStepChange = useCallback(
    (nextStep, delay = BREATH_BEAT_MS, cue = "tick") => {
      if (stepTimerRef.current) clearTimeout(stepTimerRef.current);
      stepTimerRef.current = setTimeout(() => {
        setStep(nextStep);
        if (cue === "shimmer") playUiShimmer();
        else playUiTick();
      }, delay);
    },
    [playUiShimmer, playUiTick]
  );

  const handleArcheryComplete = useCallback(
    (detail) => {
      if (completionHandledRef.current) return;
      completionHandledRef.current = true;

      const payload = detail || {};
      setResult({ shots: payload.shots ?? null, timeMs: payload.timeMs ?? null });
      queueStepChange("earned", BREATH_BEAT_MS, "tick");
    },
    [queueStepChange]
  );

  useEffect(() => {
    const handler = (event) => {
      handleArcheryComplete(event?.detail || {});
    };

    window.addEventListener("archery:complete", handler);
    return () => window.removeEventListener("archery:complete", handler);
  }, [handleArcheryComplete]);

  useEffect(() => {
    if (step === "archery") {
      completionHandledRef.current = false;
    }
  }, [step]);

  useEffect(() => {
    if (stepTimerRef.current) {
      return () => clearTimeout(stepTimerRef.current);
    }
  }, []);

  useEffect(() => {
    if (step !== "poem") {
      setShowPoemClosing(false);
      if (poemClosingTimerRef.current) clearTimeout(poemClosingTimerRef.current);
      return;
    }

    setShowPoemClosing(false);

    const audio = new Audio("/audio/luke-poem.mp3");
    audio.preload = "metadata";

    let scheduled = false;
    const scheduleReveal = (durationSec) => {
      if (scheduled) return;
      scheduled = true;

      const delay =
        Number.isFinite(durationSec) && durationSec > 0
          ? Math.round(Math.min(52000, Math.max(18000, durationSec * 1000 + 300)))
          : 26000;

      poemClosingTimerRef.current = setTimeout(() => {
        setShowPoemClosing(true);
        playUiShimmer();
      }, delay);
    };

    const onMeta = () => scheduleReveal(audio.duration);
    const onErr = () => scheduleReveal(NaN);

    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("error", onErr);

    try {
      audio.load();
    } catch {
      scheduleReveal(NaN);
    }

    const fallback = setTimeout(() => scheduleReveal(NaN), 2200);

    return () => {
      clearTimeout(fallback);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("error", onErr);
      if (poemClosingTimerRef.current) clearTimeout(poemClosingTimerRef.current);
    };
  }, [playUiShimmer, step]);

  const stageNode = useMemo(() => {
    if (step === "archery") {
      return (
        <FrontCover
          onComplete={handleArcheryComplete}
          onSoundChange={(enabled) => setUiSoundOn(Boolean(enabled))}
        />
      );
    }

    if (step === "earned") {
      return (
        <div style={earnedStage}>
          <div style={earnedGlowA} />
          <div style={earnedGlowB} />
          <StatsCard
            result={result}
            onReveal={playUiShimmer}
            onContinue={() => queueStepChange("poem", BREATH_BEAT_MS, "tick")}
          />
        </div>
      );
    }

    return (
      <div style={insideStage}>
        <AmbientFX variant="inside" confettiCount={8} sparkleCount={7} balloonCount={2} zIndex={1} />

        <div style={insideHeaderStrip}>
          <div style={insideBadge}>Unlocked Story</div>
          <h2 style={insideTitle} className="inside-heading-sheen">
            For Luke, Always
          </h2>
          <p style={insideSubhead}>The next pages are all yours.</p>
        </div>

        <div style={insideContentGrid}>
          <div style={photoStageWrap}>
            <div style={photoStageCornerTL} />
            <div style={photoStageCornerBR} />
            <div style={photoStageLabel} className="inside-heading-sheen">
              Memory Reel
            </div>
            <PhotoCarousel
              photos={["/photo1.jpg", "/photo2.jpg", "/photo3.jpg"]}
              captions={["Memory 1", "Memory 2", "Memory 3"]}
            />
          </div>

          <div style={poemStageWrap}>
            <div style={poemStageLabel} className="inside-heading-sheen">
              Birthday Verse
            </div>
            <div style={poemHint}>Press play if your browser blocked audio.</div>
            <div style={poemFrame}>
              <OrnateBirthdayCard
                name="Luke"
                audioUrl="/audio/luke-poem.mp3"
                autoStart={true}
                showControls={true}
              />
            </div>
          </div>
        </div>

        <div
          style={{
            ...closingCard,
            opacity: showPoemClosing ? 1 : 0,
            transform: showPoemClosing ? "translateY(0) scale(1)" : "translateY(10px) scale(0.988)",
          }}
        >
          {showPoemClosing && (
            <AmbientFX
              variant="inside"
              confettiCount={6}
              sparkleCount={5}
              balloonCount={0}
              zIndex={0}
              style={{ opacity: 0.46 }}
            />
          )}
          <div style={closingSweep} className={showPoemClosing ? "poem-closing-sweep" : undefined} />
          <div style={closingTitle}>Happy Birthday, Luke 🎂</div>
          <div style={closingSub}>
            I am blessed to have crossed paths with such an amazing guy. You really are one of a kind. May this year
            bring you all the smiles and joy that you bring to me everything we chat. You are a fucking catch, never
            forget that
          </div>
        </div>
      </div>
    );
  }, [handleArcheryComplete, playUiShimmer, queueStepChange, result, showPoemClosing, step]);

  return (
    <CardShell stepKey={step}>
      <style>{`
        .poem-closing-sweep {
          animation: poemClosingSweep 950ms cubic-bezier(.2,.72,.2,1) both;
        }

        .inside-heading-sheen {
          background-image: linear-gradient(90deg, rgba(255,255,255,0), rgba(226,184,119,0.72), rgba(255,255,255,0));
          background-size: 180% 100%;
          animation: insideHeadingSheen 7.2s linear infinite;
          -webkit-background-clip: text;
        }

        @keyframes poemClosingSweep {
          0% {
            opacity: 0;
            transform: translateX(-60%);
          }
          22% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateX(220%);
          }
        }

        @keyframes insideHeadingSheen {
          from {
            background-position: 180% 0;
          }
          to {
            background-position: -180% 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .poem-closing-sweep,
          .inside-heading-sheen {
            animation: none !important;
          }
        }
      `}</style>

      <SectionTransition transitionKey={step} showGoldenSweep={true} durationMs={440}>
        {stageNode}
      </SectionTransition>
    </CardShell>
  );
}

const earnedStage = {
  width: "100%",
  maxWidth: 1020,
  margin: "0 auto",
  position: "relative",
};

const earnedGlowA = {
  position: "absolute",
  inset: "0 -4px -2px",
  pointerEvents: "none",
  borderRadius: 26,
  background: "radial-gradient(70% 70% at 10% 0%, rgba(235,191,114,0.24), rgba(0,0,0,0))",
};

const earnedGlowB = {
  position: "absolute",
  inset: "0 -4px -2px",
  pointerEvents: "none",
  borderRadius: 26,
  background: "radial-gradient(70% 80% at 90% 0%, rgba(255, 233, 191, 0.15), rgba(0,0,0,0))",
};

const insideStage = {
  position: "relative",
  width: "100%",
  maxWidth: 1020,
  margin: "0 auto",
  display: "grid",
  gap: 14,
};

const insideHeaderStrip = {
  position: "relative",
  zIndex: 3,
  borderRadius: 18,
  border: "1px solid rgba(153, 111, 66, 0.34)",
  background:
    "linear-gradient(170deg, rgba(252,244,230,0.8), rgba(238,222,193,0.72)), radial-gradient(120% 80% at 50% 0%, rgba(247,210,141,0.32), rgba(255,255,255,0))",
  color: "#533622",
  textAlign: "center",
  padding: "12px 10px",
};

const valentineTitleStack = '"Valentine", "HawaiiLover", "InterSignature", cursive';

const insideBadge = {
  display: "inline-block",
  borderRadius: 999,
  border: "1px solid rgba(165, 121, 70, 0.34)",
  background: "rgba(245, 208, 141, 0.34)",
  padding: "5px 10px",
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: "0.12em",
  fontWeight: 800,
};

const insideTitle = {
  margin: "8px 0 0",
  fontFamily: valentineTitleStack,
  fontSize: "clamp(44px, 12vw, 72px)",
  lineHeight: 0.86,
  color: "#603a1f",
  textShadow: "0 2px 12px rgba(248, 214, 144, 0.45)",
};

const insideSubhead = {
  margin: "2px 0 0",
  fontSize: 13,
  color: "rgba(88, 56, 33, 0.88)",
};

const insideContentGrid = {
  position: "relative",
  zIndex: 3,
  display: "grid",
  gap: 14,
};

const photoStageWrap = {
  position: "relative",
  borderRadius: 20,
  border: "1px solid rgba(160, 116, 69, 0.32)",
  background:
    "linear-gradient(180deg, rgba(251,246,238,0.68), rgba(237,225,203,0.54)), radial-gradient(130% 90% at 50% 0%, rgba(247,206,132,0.28), rgba(255,255,255,0))",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.66), 0 16px 34px rgba(38, 22, 12, 0.16)",
  padding: "14px 12px 12px",
};

const photoStageCornerTL = {
  position: "absolute",
  left: 10,
  top: 10,
  width: 16,
  height: 16,
  borderLeft: "2px solid rgba(222, 179, 103, 0.8)",
  borderTop: "2px solid rgba(222, 179, 103, 0.8)",
  borderTopLeftRadius: 5,
};

const photoStageCornerBR = {
  position: "absolute",
  right: 10,
  bottom: 10,
  width: 16,
  height: 16,
  borderRight: "2px solid rgba(222, 179, 103, 0.8)",
  borderBottom: "2px solid rgba(222, 179, 103, 0.8)",
  borderBottomRightRadius: 5,
};

const photoStageLabel = {
  marginBottom: 9,
  fontFamily: valentineTitleStack,
  fontSize: "clamp(22px, 6.4vw, 34px)",
  lineHeight: 0.9,
  color: "#6b4120",
  textAlign: "center",
};

const poemStageWrap = {
  borderRadius: 20,
  border: "1px solid rgba(160, 116, 69, 0.32)",
  background:
    "linear-gradient(180deg, rgba(251,246,238,0.68), rgba(237,225,203,0.54)), radial-gradient(130% 90% at 50% 0%, rgba(247,206,132,0.28), rgba(255,255,255,0))",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.66), 0 16px 34px rgba(38, 22, 12, 0.16)",
  padding: "12px 10px 10px",
};

const poemStageLabel = {
  fontFamily: valentineTitleStack,
  fontSize: "clamp(24px, 7vw, 36px)",
  lineHeight: 0.92,
  color: "#6b4120",
  textAlign: "center",
};

const poemHint = {
  marginTop: 3,
  textAlign: "center",
  fontSize: 12,
  color: "rgba(85, 55, 32, 0.76)",
};

const poemFrame = {
  marginTop: 10,
  borderRadius: 16,
  border: "1px solid rgba(164, 121, 74, 0.2)",
  background: "rgba(14, 10, 8, 0.18)",
  padding: 10,
};

const closingCard = {
  position: "relative",
  overflow: "hidden",
  zIndex: 4,
  borderRadius: 18,
  border: "1px solid rgba(166, 123, 75, 0.34)",
  background:
    "linear-gradient(180deg, rgba(250,244,233,0.78), rgba(236,224,200,0.7)), radial-gradient(130% 100% at 50% 0%, rgba(247,207,136,0.34), rgba(255,255,255,0))",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.68), 0 14px 30px rgba(28, 16, 12, 0.18)",
  padding: "16px 12px 14px",
  textAlign: "center",
  transition: "opacity 520ms ease, transform 520ms cubic-bezier(.2,.72,.2,1)",
};

const closingSweep = {
  position: "absolute",
  inset: "0 auto 0 -50%",
  width: "42%",
  background:
    "linear-gradient(100deg, rgba(255,255,255,0), rgba(246,208,139,0.14), rgba(246,208,139,0.36), rgba(255,255,255,0))",
  pointerEvents: "none",
};

const closingTitle = {
  position: "relative",
  zIndex: 2,
  fontFamily: "var(--font-script)",
  fontSize: "clamp(42px, 11.8vw, 66px)",
  lineHeight: 0.9,
  color: "#643d20",
  textShadow: "0 2px 12px rgba(248, 214, 144, 0.45)",
};

const closingSub = {
  position: "relative",
  zIndex: 2,
  marginTop: 4,
  fontSize: 13,
  color: "rgba(84, 52, 31, 0.88)",
};
