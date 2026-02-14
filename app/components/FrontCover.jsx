"use client";

import React, { useMemo } from "react";
import ArcheryGame from "./ArcheryGame";

const BALLOON_CONFIG = [
  { left: "-9%", top: "8%", color: "#e9a8a0", sway: 18, scale: 1.06, duration: 18, delay: -5.2 },
  { left: "5%", top: "3%", color: "#e8c07a", sway: 14, scale: 0.95, duration: 15, delay: -2.4 },
  { left: "80%", top: "4%", color: "#9ec5d0", sway: 16, scale: 0.96, duration: 17, delay: -8.1 },
  { left: "91%", top: "12%", color: "#dab0cc", sway: 14, scale: 1.02, duration: 19, delay: -3.4 },
  { left: "-7%", top: "56%", color: "#b6c7a2", sway: 12, scale: 0.92, duration: 16, delay: -6.2 },
  { left: "87%", top: "58%", color: "#edb7a1", sway: 18, scale: 0.94, duration: 18, delay: -11.4 },
];

const CONFETTI_COLORS = ["#f0c379", "#e8a7a0", "#c4d4ae", "#9ec4d0", "#d2b2cb"];

const SPARKLES = [
  { left: "18%", top: "14%", size: 15, duration: 5.4, delay: -1.8 },
  { left: "74%", top: "17%", size: 12, duration: 4.8, delay: -2.2 },
  { left: "29%", top: "26%", size: 10, duration: 5.8, delay: -0.8 },
  { left: "67%", top: "30%", size: 13, duration: 4.9, delay: -3.4 },
  { left: "50%", top: "20%", size: 11, duration: 6.1, delay: -2.9 },
];

export default function FrontCover({ onComplete }) {
  const confettiPieces = useMemo(
    () =>
      Array.from({ length: 18 }).map((_, index) => {
        const size = index % 4 === 0 ? 5 : 4;
        return {
          id: index,
          left: `${4 + (index * 5.1) % 92}%`,
          duration: 12 + (index % 6) * 1.7,
          delay: -(index % 7) * 1.35,
          drift: 14 + (index % 5) * 6,
          rotation: -24 + index * 13,
          width: size,
          height: size + (index % 3),
          color: CONFETTI_COLORS[index % CONFETTI_COLORS.length],
          opacity: index % 3 === 0 ? 0.45 : 0.32,
        };
      }),
    []
  );

  return (
    <div style={frontWrap}>
      <style>{`
        @font-face {
          font-family: "InterSignature";
          src: url("/fonts/InterSignature-q20q2.ttf") format("truetype");
          font-display: swap;
        }

        .front-golden-sweep {
          animation: frontGoldenSweep 16s ease-in-out infinite;
        }

        .front-balloon {
          --balloon-color: #e8c07a;
          --balloon-scale: 1;
          --balloon-sway: 16px;
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
          animation: frontBalloonFloat 17s ease-in-out infinite;
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
          background: color-mix(in srgb, var(--balloon-color) 72%, #8a6038 28%);
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

        .front-confetti {
          --confetti-drift: 18px;
          --confetti-rot: 12deg;
          position: absolute;
          border-radius: 2px;
          animation: frontConfettiDrift 14s linear infinite;
          filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.14));
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

        @keyframes frontBalloonFloat {
          0%,
          100% {
            transform: translate3d(0, 0, 0) rotate(-1.3deg) scale(var(--balloon-scale));
          }
          50% {
            transform: translate3d(var(--balloon-sway), -16px, 0) rotate(1.4deg) scale(var(--balloon-scale));
          }
        }

        @keyframes frontConfettiDrift {
          0% {
            transform: translate3d(0, -14%, 0) rotate(calc(var(--confetti-rot) - 15deg));
            opacity: 0;
          }
          12% {
            opacity: 0.62;
          }
          54% {
            transform: translate3d(var(--confetti-drift), 58%, 0) rotate(calc(var(--confetti-rot) + 24deg));
          }
          100% {
            transform: translate3d(calc(var(--confetti-drift) * -0.78), 126%, 0)
              rotate(calc(var(--confetti-rot) + 52deg));
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
          .front-balloon,
          .front-confetti,
          .front-sparkle {
            animation: none !important;
          }

          .front-confetti {
            opacity: 0.22;
          }
        }
      `}</style>

      <section style={frontCard} aria-label="Birthday front cover">
        <div style={frontPaperTint} />
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
                "--balloon-sway": `${balloon.sway}px`,
                "--balloon-scale": `${balloon.scale}`,
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
              key={piece.id}
              className="front-confetti"
              style={{
                left: piece.left,
                top: "-8%",
                width: piece.width,
                height: piece.height,
                opacity: piece.opacity,
                background: piece.color,
                animationDuration: `${piece.duration}s`,
                animationDelay: `${piece.delay}s`,
                "--confetti-drift": `${piece.drift}px`,
                "--confetti-rot": `${piece.rotation}deg`,
              }}
            />
          ))}
        </div>

        <div style={frontHeader}>
          <div style={frontKicker}>Front Cover Challenge</div>

          <h1 style={frontHeading}>
            <span style={frontHeadingTop}>Happy Birthday</span>
            <span style={frontHeadingName}>Luke</span>
          </h1>

          <p style={frontSubtitle}>Extinguish every candle to unlock your card.</p>
        </div>

        <div style={frontStageWrap}>
          <div style={frontStageGlow} />

          <div style={frontGamePanel}>
            <ArcheryGame candleCount={14} height={420} onComplete={onComplete} />
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
  background: "radial-gradient(72% 48% at 50% 6%, rgba(244, 200, 118, 0.34), rgba(255,255,255,0))",
};

const frontGoldGlowCenter = {
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
  background: "radial-gradient(42% 28% at 50% 33%, rgba(255, 214, 139, 0.18), rgba(255,255,255,0))",
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
  textShadow: "0 3px 16px rgba(255, 236, 193, 0.64), 0 2px 3px rgba(87, 54, 28, 0.28)",
};

const frontHeadingTop = {
  fontFamily: '"InterSignature", "Adelia", "Mayonice", "Brush Script MT", cursive',
  fontSize: "clamp(52px, 15.2vw, 122px)",
  letterSpacing: "0.01em",
  color: "#6a4020",
};

const frontHeadingName = {
  marginTop: -4,
  fontFamily: '"InterSignature", "Adelia", "Mayonice", "Brush Script MT", cursive',
  fontSize: "clamp(66px, 19.6vw, 156px)",
  letterSpacing: "0.01em",
  color: "#7f4b21",
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
  borderRadius: 999,
  border: "1px solid rgba(171, 127, 74, 0.32)",
  background: "linear-gradient(90deg, rgba(255,249,237,0.66), rgba(246,232,205,0.58))",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.72)",
  color: "#664021",
  textAlign: "center",
  fontSize: "clamp(12px, 3.1vw, 14px)",
  fontWeight: 700,
  lineHeight: 1.35,
  padding: "9px 12px",
};

const frontSparkleLayer = {
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
  zIndex: 3,
};
