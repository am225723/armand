"use client";

import React, { useEffect, useMemo, useState } from "react";
import ArcheryGame from "./components/ArcheryGame";
import OrnateBirthdayCard from "./components/OrnateBirthdayCard";
import PhotoCarousel from "./components/PhotoCarousel";
import StatsCard from "./components/StatsCard";

export default function Page() {
  const [step, setStep] = useState("archery"); // "archery" | "earned" | "poem"
  const [result, setResult] = useState({ shots: null, timeMs: null });

  useEffect(() => {
    const handler = (event) => {
      const detail = event?.detail || {};
      if (detail.shots == null && detail.timeMs == null) return;
      setResult({ shots: detail.shots ?? null, timeMs: detail.timeMs ?? null });
      setStep("poem");
    };

    window.addEventListener("archery:complete", handler);
    return () => {
      window.removeEventListener("archery:complete", handler);
    };
  }, []);

  const confettiDots = useMemo(
    () =>
      Array.from({ length: 18 }).map((_, i) => ({
        id: i,
        left: `${4 + i * 5.2}%`,
        delay: `${(i % 7) * 0.42}s`,
        duration: `${6 + (i % 5) * 1.2}s`,
      })),
    []
  );

  return (
    <div style={shell}>
      <style>{`
        .front-shimmer {
          background: linear-gradient(90deg, rgba(255,255,255,0), rgba(236,201,137,0.48), rgba(255,255,255,0));
          background-size: 200% 100%;
          animation: frontShimmer 3s linear infinite;
        }

        .inside-spark {
          animation: insideSpark 2.6s ease-in-out infinite;
        }

        .inside-confetti {
          animation-name: insideConfettiFall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        @keyframes frontShimmer {
          from { background-position: 200% 0; }
          to { background-position: -200% 0; }
        }

        @keyframes insideSpark {
          0%,
          100% { transform: translateX(0); opacity: 0.4; }
          50% { transform: translateX(14px); opacity: 0.95; }
        }

        @keyframes insideConfettiFall {
          from {
            transform: translateY(-10px);
            opacity: 0;
          }
          12% {
            opacity: 0.45;
          }
          to {
            transform: translateY(86px);
            opacity: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .front-shimmer,
          .inside-spark,
          .inside-confetti {
            animation: none !important;
          }
        }
      `}</style>

      {step === "archery" && (
        <div style={frontWrap}>
          <div style={frontCard}>
            <div style={frontPaperTint} />
            <div style={frontInnerBorderA} />
            <div style={frontInnerBorderB} />

            <div style={frontHeader}>
              <div style={frontKicker}>Front Cover Challenge</div>
              <h1 style={frontTitle}>Happy Birthday Luke</h1>
              <div style={frontDividerWrap}>
                <span style={frontDivider} className="front-shimmer" />
              </div>
              <p style={frontSubtitle}>Extinguish the candles.</p>
            </div>

            <div style={frontGameWrap}>
              <ArcheryGame
                candleCount={14}
                height={420}
                onComplete={({ shots, timeMs }) => {
                  setResult({ shots, timeMs });
                  setStep("poem");
                }}
              />
            </div>
          </div>
        </div>
      )}

      {step === "earned" && (
        <div style={earnedStage}>
          <div style={earnedGlowA} />
          <div style={earnedGlowB} />
          <StatsCard result={result} onContinue={() => setStep("poem")} />
        </div>
      )}

      {step === "poem" && (
        <div style={insideStage}>
          <div style={insideHeaderStrip}>
            <div style={insideHeaderLeft}>
              <span style={insideBadge}>Unlocked</span>
              <span style={insideHeaderText}>For Luke</span>
            </div>
            <div style={insideHeaderLineWrap}>
              <span style={insideHeaderLine} />
              <span style={insideSpark} className="inside-spark">
                ✦
              </span>
            </div>
          </div>

          <div style={insideContentGrid}>
            <PhotoCarousel
              photos={["/photo1.jpg", "/photo2.jpg", "/photo3.jpg"]}
              captions={["Memory 1", "Memory 2", "Memory 3"]}
            />

            <div style={poemFrame}>
              <OrnateBirthdayCard
                name="Luke"
                audioUrl="/audio/luke-poem.mp3"
                autoStart={true}
                showControls={true}
              />
            </div>
          </div>

          <div style={insideFooter}>
            <div style={insideFooterLine}>Happy Birthday, Luke 🎂</div>
            <div style={insideFooterSub}>Always proud of the way you show up.</div>
            <div style={insideConfettiLayer}>
              {confettiDots.map((dot) => (
                <span
                  key={dot.id}
                  className="inside-confetti"
                  style={{
                    ...insideConfettiDot,
                    left: dot.left,
                    animationDelay: dot.delay,
                    animationDuration: dot.duration,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const shell = {
  minHeight: "100dvh",
  padding: "18px 14px 36px",
  color: "white",
  background:
    "radial-gradient(130% 120% at 50% 0%, rgba(255,209,122,0.16), rgba(0,0,0,0.94))",
};

const frontWrap = {
  width: "100%",
  maxWidth: 1040,
  margin: "0 auto",
};

const frontCard = {
  position: "relative",
  borderRadius: 26,
  overflow: "hidden",
  border: "1px solid rgba(233, 208, 160, 0.32)",
  boxShadow: "0 26px 60px rgba(0, 0, 0, 0.46)",
  background:
    "linear-gradient(180deg, rgba(231,219,197,0.96), rgba(214,198,168,0.93)), radial-gradient(110% 120% at 50% 0%, rgba(255,243,219,0.5), rgba(0,0,0,0))",
};

const frontPaperTint = {
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
  opacity: 0.35,
  backgroundImage:
    "repeating-linear-gradient(0deg, rgba(72,48,22,0.04) 0 1px, transparent 1px 42px), repeating-linear-gradient(90deg, rgba(72,48,22,0.03) 0 1px, transparent 1px 42px)",
};

const frontInnerBorderA = {
  position: "absolute",
  inset: 18,
  borderRadius: 20,
  border: "1px solid rgba(172, 136, 86, 0.34)",
  pointerEvents: "none",
};

const frontInnerBorderB = {
  position: "absolute",
  inset: 28,
  borderRadius: 16,
  border: "1px solid rgba(88, 63, 37, 0.14)",
  pointerEvents: "none",
};

const frontHeader = {
  position: "relative",
  zIndex: 1,
  textAlign: "center",
  color: "#3f2c1d",
  padding: "24px 18px 8px",
};

const frontKicker = {
  fontSize: 12,
  textTransform: "uppercase",
  letterSpacing: "0.45px",
  opacity: 0.72,
  fontWeight: 800,
};

const frontTitle = {
  margin: "8px 0 8px",
  fontSize: "clamp(30px, 5vw, 54px)",
  lineHeight: 1,
  fontWeight: 760,
  letterSpacing: "0.3px",
};

const frontDividerWrap = {
  margin: "0 auto",
  width: "min(420px, 78%)",
  borderRadius: 999,
  overflow: "hidden",
  border: "1px solid rgba(153, 119, 73, 0.2)",
  background: "rgba(255,255,255,0.2)",
};

const frontDivider = {
  display: "block",
  height: 2,
  width: "100%",
};

const frontSubtitle = {
  margin: "10px 0 8px",
  color: "rgba(73, 48, 28, 0.86)",
  fontWeight: 650,
};

const frontGameWrap = {
  position: "relative",
  zIndex: 1,
  padding: "2px 18px 18px",
};

const earnedStage = {
  width: "100%",
  maxWidth: 1040,
  margin: "0 auto",
  position: "relative",
};

const earnedGlowA = {
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
  borderRadius: 24,
  background: "radial-gradient(70% 70% at 15% 0%, rgba(235,191,114,0.22), rgba(0,0,0,0))",
};

const earnedGlowB = {
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
  borderRadius: 24,
  background: "radial-gradient(70% 80% at 90% 0%, rgba(255, 233, 191, 0.14), rgba(0,0,0,0))",
};

const insideStage = {
  width: "100%",
  maxWidth: 1040,
  margin: "0 auto",
  display: "grid",
  gap: 14,
};

const insideHeaderStrip = {
  borderRadius: 18,
  border: "1px solid rgba(244, 221, 179, 0.24)",
  background:
    "linear-gradient(165deg, rgba(49,36,25,0.86), rgba(21,15,11,0.88)), radial-gradient(120% 120% at 10% 0%, rgba(241,196,121,0.2), rgba(0,0,0,0))",
  padding: "11px 12px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 10,
};

const insideHeaderLeft = {
  display: "flex",
  alignItems: "center",
  gap: 8,
};

const insideBadge = {
  borderRadius: 999,
  border: "1px solid rgba(246, 224, 184, 0.3)",
  background: "rgba(232, 188, 112, 0.25)",
  color: "#fff3d8",
  fontSize: 12,
  fontWeight: 760,
  padding: "5px 10px",
};

const insideHeaderText = {
  fontWeight: 700,
  color: "#f8ebd2",
};

const insideHeaderLineWrap = {
  position: "relative",
  width: 130,
  height: 10,
};

const insideHeaderLine = {
  position: "absolute",
  left: 0,
  right: 0,
  top: 4,
  height: 1,
  background: "linear-gradient(90deg, rgba(255,216,145,0.95), rgba(255,255,255,0.3))",
};

const insideSpark = {
  position: "absolute",
  top: -2,
  left: 68,
  color: "#ffe4af",
  fontSize: 11,
};

const insideContentGrid = {
  display: "grid",
  gap: 14,
};

const poemFrame = {
  borderRadius: 18,
  border: "1px solid rgba(246, 224, 184, 0.18)",
  background: "rgba(12, 10, 9, 0.22)",
  padding: 10,
};

const insideFooter = {
  position: "relative",
  borderRadius: 16,
  border: "1px solid rgba(244, 221, 179, 0.2)",
  background:
    "linear-gradient(180deg, rgba(38,28,19,0.72), rgba(18,13,10,0.8)), radial-gradient(130% 90% at 50% 0%, rgba(250,210,132,0.2), rgba(0,0,0,0))",
  padding: "12px 12px 18px",
  textAlign: "center",
  color: "#f8ebd2",
  overflow: "hidden",
};

const insideFooterLine = {
  fontSize: 20,
  fontWeight: 740,
};

const insideFooterSub = {
  marginTop: 6,
  fontSize: 12,
  opacity: 0.72,
};

const insideConfettiLayer = {
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
  overflow: "hidden",
};

const insideConfettiDot = {
  position: "absolute",
  top: -4,
  width: 4,
  height: 4,
  borderRadius: 999,
  background: "rgba(248, 223, 173, 0.62)",
};
