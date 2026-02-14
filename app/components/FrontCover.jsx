"use client";

import React, { useEffect, useMemo, useState } from "react";
import ArcheryGame from "./ArcheryGame";

const COVER_HEADLINE_STACK = '"Valentine", "HawaiiLover", ui-serif, Georgia, "Times New Roman", Times, serif';

const BALLOON_CONFIG = [
  { left: "-9%", top: "8%", color: "#2d2326", scale: 1.04, duration: 11.8, delay: -3.1, ampX: 12, ampY: 16, tilt: 1.8, phase: -8 },
  { left: "5%", top: "3%", color: "#221b1f", scale: 0.95, duration: 9.7, delay: -1.4, ampX: 10, ampY: 14, tilt: 1.4, phase: 6 },
  { left: "80%", top: "4%", color: "#2a2427", scale: 0.96, duration: 15.1, delay: -6.2, ampX: 11, ampY: 13, tilt: 1.5, phase: 2 },
  { left: "91%", top: "12%", color: "#30272a", scale: 1.02, duration: 13.4, delay: -2.7, ampX: 9, ampY: 12, tilt: 1.3, phase: -4 },
  { left: "-7%", top: "56%", color: "#1f191c", scale: 0.92, duration: 17.2, delay: -4.8, ampX: 13, ampY: 15, tilt: 1.6, phase: 10 },
  { left: "87%", top: "58%", color: "#292126", scale: 0.94, duration: 12.7, delay: -8.3, ampX: 12, ampY: 14, tilt: 1.7, phase: -12 },
];

const CONFETTI_SVG_FILES = [
  "/game/con1.svg",
  "/game/con2.svg",
  "/game/con3.svg",
  "/game/con4.svg",
  "/game/con5.svg",
  "/game/con6.svg",
];

const CONFETTI_COLORS = [
  "#e2b877",
  "#f5e8cf",
  "#c9a46a",
  "#7a5c99",
  "#2f6b5a",
  "#b45b6a",
  "#4a78a6",
];

const SPARKLES = [
  { left: "18%", top: "14%", size: 15, duration: 5.4, delay: -1.8 },
  { left: "74%", top: "17%", size: 12, duration: 4.8, delay: -2.2 },
  { left: "29%", top: "26%", size: 10, duration: 5.8, delay: -0.8 },
  { left: "67%", top: "30%", size: 13, duration: 4.9, delay: -3.4 },
  { left: "50%", top: "20%", size: 11, duration: 6.1, delay: -2.9 },
];

export default function FrontCover({ onComplete, onSoundChange }) {
  const [confettiMasks, setConfettiMasks] = useState([]);

  useEffect(() => {
    let mounted = true;
    let urls = [];

    const loadMasks = async () => {
      try {
        const loaded = await Promise.all(
          CONFETTI_SVG_FILES.map(async (file) => {
            const response = await fetch(file, { cache: "force-cache" });
            if (!response.ok) throw new Error(`Failed to load ${file}`);
            const svgText = await response.text();
            const blobUrl = URL.createObjectURL(
              new Blob([svgText], { type: "image/svg+xml" })
            );
            return blobUrl;
          })
        );

        if (!mounted) {
          loaded.forEach((url) => URL.revokeObjectURL(url));
          return;
        }

        urls = loaded;
        setConfettiMasks(loaded);
      } catch {
        if (mounted) setConfettiMasks([]);
      }
    };

    loadMasks();

    return () => {
      mounted = false;
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  const confettiPieces = useMemo(() => {
    if (!confettiMasks.length) return [];

    return Array.from({ length: 46 }).map((_, index) => {
      const size = 10 + (index % 4) * 3;
      return {
        id: index,
        left: `${2 + ((index * 3.7) % 95)}%`,
        duration: 13 + (index % 6) * 1.3,
        delay: -(index % 10) * 1.25,
        swayA: -14 + (index % 7) * 4,
        swayB: -20 + (index % 9) * 5,
        rotA: -18 + (index % 8) * 4,
        rotB: 14 + (index % 7) * 5,
        width: size,
        height: Math.round(size * 1.16),
        color: CONFETTI_COLORS[(index * 3 + 2) % CONFETTI_COLORS.length],
        opacity: 0.38 + (index % 5) * 0.075,
        maskUrl: confettiMasks[index % confettiMasks.length],
      };
    });
  }, [confettiMasks]);

  return (
    <div style={frontWrap}>
      <style>{`
        .front-golden-sweep {
          animation: frontGoldenSweep 16s ease-in-out infinite;
        }

        .front-headline-pulse {
          animation: frontHeadlinePulse 7s ease-in-out infinite;
        }

        .front-headline-sheen {
          background-image: linear-gradient(90deg, rgba(255,255,255,0), rgba(214,109,110,0.78), rgba(255,255,255,0));
          background-size: 180% 100%;
          -webkit-background-clip: text;
          animation: frontHeadlineSheen 7s linear infinite;
        }

        .front-headline-halo {
          animation: frontHeadlineHalo 8s ease-in-out infinite;
          transform-origin: 50% 44%;
        }

        .front-balloon {
          --balloon-color: #e8c07a;
          --balloon-scale: 1;
          --balloon-amp-x: 12px;
          --balloon-amp-y: 14px;
          --balloon-tilt: 1.5;
          --balloon-phase: 0;
          position: absolute;
          width: clamp(58px, 13vw, 94px);
          aspect-ratio: 0.82;
          border-radius: 52% 48% 49% 51% / 58% 58% 42% 42%;
          background:
            radial-gradient(35% 35% at 30% 30%, rgba(255,255,255,0.55), rgba(255,255,255,0)),
            linear-gradient(145deg, rgba(255,255,255,0.18), rgba(0,0,0,0.16)),
            var(--balloon-color);
          box-shadow: 0 14px 24px rgba(46, 30, 16, 0.16), inset -7px -10px 15px rgba(0, 0, 0, 0.12);
          transform-origin: 50% 70%;
          animation: frontBalloonWander ease-in-out infinite;
          will-change: transform;
        }

        .front-balloon-gloss {
          position: absolute;
          left: 18%;
          top: 18%;
          width: 26%;
          height: 34%;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.4);
          transform: rotate(-18deg);
        }

        .front-balloon-knot {
          position: absolute;
          left: 50%;
          bottom: -7px;
          width: 12px;
          height: 10px;
          border-radius: 2px 2px 8px 8px;
          background: rgba(120, 85, 52, 0.66);
          transform: translateX(-50%);
        }

        .front-balloon-string {
          position: absolute;
          top: calc(100% + 2px);
          left: 50%;
          width: 1.2px;
          height: clamp(52px, 7vh, 78px);
          background: linear-gradient(180deg, rgba(124, 86, 52, 0.6), rgba(124, 86, 52, 0.06));
          transform: translateX(-50%);
        }

        .front-confetti-svg {
          position: absolute;
          animation: frontConfettiFall linear infinite;
          will-change: transform, opacity;
          pointer-events: none;
        }

        .front-confetti-ink {
          position: absolute;
          inset: 0;
          -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
          -webkit-mask-position: center;
          mask-position: center;
          -webkit-mask-size: contain;
          mask-size: contain;
          filter: contrast(1.08) brightness(0.82) saturate(0.95) drop-shadow(0 2px 2px rgba(0,0,0,0.2));
          mix-blend-mode: multiply;
          opacity: 0.92;
        }

        .front-sparkle {
          position: absolute;
          color: rgba(255, 238, 188, 0.88);
          text-shadow: 0 0 8px rgba(253, 223, 145, 0.42);
          animation: frontSparkle 5s ease-in-out infinite;
          transform-origin: center;
        }

        @keyframes frontGoldenSweep {
          0%,
          100% {
            opacity: 0.18;
            transform: translate3d(-12%, 0, 0);
          }
          50% {
            opacity: 0.34;
            transform: translate3d(14%, 0, 0);
          }
        }

        @keyframes frontHeadlineHalo {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(0.98);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.02);
          }
        }

        @keyframes frontHeadlinePulse {
          0%,
          100% {
            text-shadow: 0 0 16px rgba(181, 65, 67, 0.22), 0 2px 3px rgba(44, 28, 30, 0.42);
          }
          50% {
            text-shadow: 0 0 28px rgba(187, 63, 66, 0.5), 0 2px 3px rgba(44, 28, 30, 0.5);
          }
        }

        @keyframes frontHeadlineSheen {
          from {
            background-position: 180% 0;
          }
          to {
            background-position: -180% 0;
          }
        }

        @keyframes frontBalloonWander {
          0%,
          100% {
            transform: translate3d(calc(var(--balloon-phase) * 1px), 0, 0)
              rotate(calc(var(--balloon-tilt) * -0.24deg))
              scale(var(--balloon-scale));
          }
          25% {
            transform: translate3d(calc(var(--balloon-amp-x) * 0.66), calc(var(--balloon-amp-y) * -0.52), 0)
              rotate(calc(var(--balloon-tilt) * 0.34deg))
              scale(var(--balloon-scale));
          }
          50% {
            transform: translate3d(calc(var(--balloon-amp-x) * 0.12), calc(var(--balloon-amp-y) * -1), 0)
              rotate(calc(var(--balloon-tilt) * -0.2deg))
              scale(var(--balloon-scale));
          }
          75% {
            transform: translate3d(calc(var(--balloon-amp-x) * -0.58), calc(var(--balloon-amp-y) * -0.46), 0)
              rotate(calc(var(--balloon-tilt) * 0.24deg))
              scale(var(--balloon-scale));
          }
        }

        @keyframes frontConfettiFall {
          0% {
            transform: translate3d(0, -16%, 0) rotate(var(--confetti-rot-a));
            opacity: 0;
          }
          10% {
            opacity: var(--confetti-opacity);
          }
          52% {
            transform: translate3d(var(--confetti-sway-a), 56vh, 0) rotate(var(--confetti-rot-b));
          }
          100% {
            transform: translate3d(var(--confetti-sway-b), 115vh, 0)
              rotate(calc(var(--confetti-rot-b) + 28deg));
            opacity: 0;
          }
        }

        @keyframes frontSparkle {
          0%,
          100% {
            opacity: 0.2;
            transform: scale(0.82);
          }
          48% {
            opacity: 0.88;
            transform: scale(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .front-golden-sweep,
          .front-headline-halo,
          .front-headline-pulse,
          .front-headline-sheen,
          .front-balloon,
          .front-confetti-svg,
          .front-sparkle {
            animation: none !important;
          }

          .front-confetti-svg {
            display: none;
          }
        }
      `}</style>

      <section style={frontCard} aria-label="Birthday front cover">
        <div style={frontPaperTint} />
        <div style={frontCrimsonPulse} />
        <div style={frontGoldGlowTop} />
        <div style={frontGoldGlowCenter} />
        <div style={frontGoldSweep} className="front-golden-sweep" />
        <div style={frontInnerBorderA} />
        <div style={frontInnerBorderB} />

        <div style={frontBalloonLayer} aria-hidden="true">
          {BALLOON_CONFIG.map((balloon, index) => (
            <span
              key={`balloon-${index}`}
              className="front-balloon"
              style={{
                left: balloon.left,
                top: balloon.top,
                animationDuration: `${balloon.duration}s`,
                animationDelay: `${balloon.delay}s`,
                "--balloon-color": balloon.color,
                "--balloon-scale": `${balloon.scale}`,
                "--balloon-amp-x": `${balloon.ampX}px`,
                "--balloon-amp-y": `${balloon.ampY}px`,
                "--balloon-tilt": `${balloon.tilt}`,
                "--balloon-phase": `${balloon.phase}`,
              }}
            >
              <span className="front-balloon-gloss" />
              <span className="front-balloon-knot" />
              <span className="front-balloon-string" />
            </span>
          ))}
        </div>

        <div style={frontConfettiLayer} aria-hidden="true">
          {confettiPieces.map((piece) => (
            <span
              key={`confetti-${piece.id}`}
              className="front-confetti-svg"
              style={{
                left: piece.left,
                top: "-10%",
                width: piece.width,
                height: piece.height,
                opacity: piece.opacity,
                animationDuration: `${piece.duration}s`,
                animationDelay: `${piece.delay}s`,
                "--confetti-sway-a": `${piece.swayA}px`,
                "--confetti-sway-b": `${piece.swayB}px`,
                "--confetti-rot-a": `${piece.rotA}deg`,
                "--confetti-rot-b": `${piece.rotB}deg`,
                "--confetti-opacity": `${piece.opacity}`,
              }}
            >
              <span
                className="front-confetti-ink"
                style={{
                  backgroundColor: piece.color,
                  WebkitMaskImage: `url("${piece.maskUrl}")`,
                  maskImage: `url("${piece.maskUrl}")`,
                }}
              />
            </span>
          ))}
        </div>

        <div style={frontHeader}>
          <div style={frontHeadlineHalo} className="front-headline-halo" aria-hidden="true" />
          <div style={frontKicker}>Front Cover Challenge</div>

          <h1 style={frontHeading} className="front-headline-pulse">
            <span style={frontHeadingTop} className="front-headline-sheen">
              Happy Birthday
            </span>
            <span style={frontHeadingName} className="front-headline-sheen">
              Luke
            </span>
          </h1>

          <p style={frontSubtitle}>Extinguish every candle to unlock your card.</p>
        </div>

        <div style={frontStageWrap}>
          <div style={frontStageGlow} />

          <div style={frontGamePanel}>
            <ArcheryGame
              candleCount={14}
              height={420}
              onComplete={onComplete}
              onSoundChange={onSoundChange}
            />
          </div>
        </div>

        <div style={frontInstructionWrap}>
          <div style={frontInstructionLabel}>Pull the arrow back to extinguish the candles.</div>
        </div>

        <div style={frontSparkleLayer} aria-hidden="true">
          {SPARKLES.map((sparkle, index) => (
            <span
              key={`sparkle-${index}`}
              className="front-sparkle"
              style={{
                left: sparkle.left,
                top: sparkle.top,
                fontSize: sparkle.size,
                animationDuration: `${sparkle.duration}s`,
                animationDelay: `${sparkle.delay}s`,
              }}
            >
              ✦
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}

const frontWrap = {
  width: "100%",
  maxWidth: 1040,
  margin: "0 auto",
};

const frontCard = {
  position: "relative",
  borderRadius: 32,
  overflow: "hidden",
  border: "1px solid rgba(186, 143, 88, 0.36)",
  boxShadow: "0 30px 80px rgba(20, 12, 7, 0.48)",
  background:
    "linear-gradient(180deg, rgba(237,228,210,0.98), rgba(224,210,186,0.96)), radial-gradient(110% 100% at 50% -20%, rgba(255,244,216,0.54), rgba(0,0,0,0))",
};

const frontPaperTint = {
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
  backgroundImage:
    "radial-gradient(circle at 18% 10%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 52%), radial-gradient(circle at 82% 18%, rgba(244,225,181,0.24) 0%, rgba(255,255,255,0) 56%), repeating-linear-gradient(0deg, rgba(66,45,24,0.04) 0px, rgba(66,45,24,0.04) 1px, transparent 1px, transparent 34px), repeating-linear-gradient(90deg, rgba(66,45,24,0.03) 0px, rgba(66,45,24,0.03) 1px, transparent 1px, transparent 34px)",
};

const frontGoldGlowTop = {
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
  background: "radial-gradient(72% 48% at 50% 6%, rgba(214, 109, 110, 0.26), rgba(255,255,255,0))",
};

const frontGoldGlowCenter = {
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
  background: "radial-gradient(42% 28% at 50% 33%, rgba(222, 126, 95, 0.18), rgba(255,255,255,0))",
};

const frontCrimsonPulse = {
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
  background:
    "radial-gradient(42% 24% at 50% 18%, rgba(176, 50, 52, 0.34), rgba(176, 50, 52, 0) 72%), radial-gradient(60% 24% at 50% 0%, rgba(96, 26, 28, 0.2), rgba(96,26,28,0))",
};

const frontGoldSweep = {
  position: "absolute",
  inset: "2% -28% auto",
  height: 220,
  pointerEvents: "none",
  background:
    "linear-gradient(96deg, rgba(255,255,255,0), rgba(249,214,145,0.06) 34%, rgba(250,218,154,0.26) 50%, rgba(255,255,255,0) 66%)",
  mixBlendMode: "screen",
};

const frontInnerBorderA = {
  position: "absolute",
  inset: 16,
  borderRadius: 26,
  border: "1px solid rgba(165, 122, 72, 0.34)",
  pointerEvents: "none",
};

const frontInnerBorderB = {
  position: "absolute",
  inset: 24,
  borderRadius: 22,
  border: "1px solid rgba(98, 74, 50, 0.2)",
  pointerEvents: "none",
};

const frontBalloonLayer = {
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
  zIndex: 1,
};

const frontConfettiLayer = {
  position: "absolute",
  inset: 0,
  overflow: "hidden",
  pointerEvents: "none",
  zIndex: 1,
};

const frontHeader = {
  position: "relative",
  zIndex: 2,
  textAlign: "center",
  color: "#4f3522",
  padding: "26px 20px 8px",
};

const frontHeadlineHalo = {
  position: "absolute",
  left: "50%",
  top: 2,
  width: "min(74vw, 560px)",
  height: "min(34vw, 240px)",
  transform: "translateX(-50%)",
  borderRadius: "50%",
  background:
    "radial-gradient(closest-side, rgba(232, 190, 115, 0.26), rgba(232, 190, 115, 0.08) 52%, rgba(232, 190, 115, 0))",
  filter: "blur(0.6px)",
  pointerEvents: "none",
};

const frontKicker = {
  fontSize: 12,
  textTransform: "uppercase",
  letterSpacing: "0.16em",
  fontWeight: 760,
  color: "rgba(87, 58, 34, 0.7)",
};

const frontHeading = {
  margin: "6px 0 0",
  display: "grid",
  justifyItems: "center",
  gap: 2,
  lineHeight: 0.9,
  textShadow: "0 3px 16px rgba(201, 98, 92, 0.4), 0 2px 3px rgba(48, 30, 30, 0.3)",
};

const frontHeadingTop = {
  fontFamily: COVER_HEADLINE_STACK,
  fontSize: "clamp(52px, 15.2vw, 122px)",
  letterSpacing: "-0.012em",
  fontWeight: 620,
  color: "#6f2f35",
};

const frontHeadingName = {
  marginTop: -4,
  fontFamily: COVER_HEADLINE_STACK,
  fontSize: "clamp(66px, 19.6vw, 156px)",
  letterSpacing: "-0.01em",
  fontWeight: 700,
  color: "#802f35",
};

const frontSubtitle = {
  margin: "2px auto 0",
  maxWidth: 420,
  fontSize: "clamp(14px, 3.4vw, 18px)",
  lineHeight: 1.32,
  color: "rgba(88, 58, 31, 0.9)",
  textShadow: "0 1px 0 rgba(255,255,255,0.42)",
};

const frontStageWrap = {
  position: "relative",
  zIndex: 2,
  padding: "8px 14px 0",
};

const frontStageGlow = {
  position: "absolute",
  inset: "-14px 8px 0",
  borderRadius: 28,
  pointerEvents: "none",
  background: "radial-gradient(80% 100% at 50% 0%, rgba(251, 210, 132, 0.22), rgba(255,255,255,0))",
};

const frontGamePanel = {
  position: "relative",
  borderRadius: 26,
  padding: 10,
  border: "1px solid rgba(170, 127, 73, 0.28)",
  background:
    "linear-gradient(180deg, rgba(252,246,236,0.55), rgba(241,227,201,0.34)), radial-gradient(120% 100% at 50% 0%, rgba(255,225,160,0.24), rgba(0,0,0,0))",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.56), 0 18px 36px rgba(36, 22, 12, 0.18)",
};

const frontInstructionWrap = {
  position: "relative",
  zIndex: 2,
  padding: "12px 14px 18px",
};

const frontInstructionLabel = {
  fontFamily: "var(--font-script)",
  borderRadius: 999,
  border: "1px solid rgba(171, 127, 74, 0.32)",
  background: "linear-gradient(90deg, rgba(255,249,237,0.66), rgba(246,232,205,0.58))",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.72)",
  color: "#664021",
  textAlign: "center",
  fontSize: "clamp(16px, 4.2vw, 22px)",
  fontWeight: 500,
  lineHeight: 1.35,
  padding: "9px 12px",
};

const frontSparkleLayer = {
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
  zIndex: 3,
};
