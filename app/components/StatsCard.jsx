"use client";

import React, { useEffect, useMemo, useState } from "react";

const PRAISE_LINES = [
  "Performance exceeds expectations.",
  "Compliance noted.",
  "Reward approved.",
  "Good boy.",
];

const STAT_ROWS = [
  { key: "Strength", value: "▲", icon: "STR" },
  { key: "Discipline", value: "▲", icon: "DSC" },
  { key: "Focus", value: "▲", icon: "FCS" },
  { key: "Obedience", value: "MAXED", icon: "OBY" },
];

const BADGES = [
  "Badge: Certified Good Boy Energy",
  "Achievement: Focused. Disciplined. Iconic.",
  "Commendation: Precision under pressure.",
];

export default function StatsCard({ result, onContinue, onReveal }) {
  const [mounted, setMounted] = useState(false);
  const [activePulse, setActivePulse] = useState("");
  const [protocolIndex, setProtocolIndex] = useState(-1);
  const [badgeCursor, setBadgeCursor] = useState(0);

  const badgeDeck = useMemo(() => {
    const seed = (Number(result?.shots ?? 3) * 17 + Math.round(Number(result?.timeMs ?? 0) / 1000)) % 97;
    const rotateBy = seed % BADGES.length;
    const rotated = BADGES.map((_, index) => BADGES[(index + rotateBy) % BADGES.length]);
    const count = seed % 2 === 0 ? 2 : 3;
    return rotated.slice(0, count);
  }, [result?.shots, result?.timeMs]);

  useEffect(() => {
    const revealTimer = setTimeout(() => {
      setMounted(true);
      if (typeof onReveal === "function") {
        try {
          onReveal();
        } catch {}
      }
    }, 24);

    return () => clearTimeout(revealTimer);
  }, [onReveal]);

  useEffect(() => {
    if (badgeDeck.length <= 1) return;
    const interval = setInterval(() => {
      setBadgeCursor((prev) => (prev + 1) % badgeDeck.length);
    }, 2400);
    return () => clearInterval(interval);
  }, [badgeDeck]);

  const protocolLine = protocolIndex < 0 ? "System idle. Awaiting protocol." : PRAISE_LINES[protocolIndex];

  const triggerPulse = (statKey) => {
    const pulseId = `${statKey}-${Date.now()}`;
    setActivePulse(pulseId);
    setTimeout(() => {
      setActivePulse((current) => (current === pulseId ? "" : current));
    }, 330);
  };

  const runProtocol = () => {
    setProtocolIndex((prev) => (prev + 1) % PRAISE_LINES.length);
  };

  const shotValue = result?.shots ?? "-";
  const seconds = result?.timeMs == null ? "-" : `${Math.max(1, Math.round(result.timeMs / 1000))}s`;

  return (
    <div style={wrap}>
      <style>{`
        .stats-card-enter {
          transition: opacity 320ms ease, transform 460ms cubic-bezier(.2,.8,.25,1);
        }

        .stats-top-sweep {
          animation: statsTopSweep 880ms cubic-bezier(.18,.66,.21,.99) both;
        }

        .stats-title-pulse {
          animation: statsTitlePulse 1100ms ease both;
        }

        .stats-tile {
          transition: border-color 220ms ease, box-shadow 220ms ease, transform 220ms ease;
        }

        .stats-tile-pulse {
          animation: statsTilePulse 330ms ease;
        }

        .stats-badge-chip {
          animation: statsBadgeFade 420ms ease;
        }

        .stats-protocol-btn {
          transition: filter 200ms ease, transform 200ms ease;
        }

        .stats-protocol-btn:hover {
          filter: brightness(1.06);
        }

        .stats-protocol-btn:active {
          transform: translateY(1px);
        }

        @keyframes statsTopSweep {
          0% {
            transform: translateX(-130%);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            transform: translateX(220%);
            opacity: 0;
          }
        }

        @keyframes statsTitlePulse {
          0% {
            opacity: 0;
            transform: scale(0.96);
          }
          45% {
            opacity: 0.9;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(1.05);
          }
        }

        @keyframes statsTilePulse {
          0% {
            transform: scale(1);
            box-shadow: 0 0 0 rgba(244, 206, 138, 0);
          }
          45% {
            transform: scale(1.012);
            box-shadow: 0 0 0 1px rgba(244, 206, 138, 0.52), 0 0 26px rgba(244, 206, 138, 0.25);
          }
          100% {
            transform: scale(1);
            box-shadow: 0 0 0 rgba(244, 206, 138, 0);
          }
        }

        @keyframes statsBadgeFade {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .stats-card-enter,
          .stats-top-sweep,
          .stats-title-pulse,
          .stats-tile,
          .stats-tile-pulse,
          .stats-badge-chip,
          .stats-protocol-btn {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>

      <section
        aria-label="Stats summary"
        style={{
          ...card,
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(34px)",
        }}
        className="stats-card-enter"
      >
        <div style={topSweepClip} aria-hidden="true">
          {mounted && <span style={topSweepLine} className="stats-top-sweep" />}
        </div>

        <header style={headRow}>
          <div style={titleWrap}>
            {mounted && <span style={titleGlow} className="stats-title-pulse" />}
            <div style={kicker}>Performance Summary</div>
            <h1 style={title}>Front Cover Complete</h1>
          </div>
          <div style={scoreChip}>Premium Session</div>
        </header>

        <div style={badgeRow}>
          <span className="stats-badge-chip" style={badgeChip}>
            {badgeDeck[badgeCursor]}
          </span>
        </div>

        <div style={metaRow}>
          <span style={metaPill}>Shots {shotValue}</span>
          <span style={metaPill}>Time {seconds}</span>
        </div>

        <div style={statGrid}>
          {STAT_ROWS.map((item) => {
            const isPulsing = activePulse.startsWith(`${item.key}-`);
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => triggerPulse(item.key)}
                style={statTile}
                className={`stats-tile${isPulsing ? " stats-tile-pulse" : ""}`}
              >
                <div style={statTopRow}>
                  <span style={statIcon}>{item.icon}</span>
                  <span style={statLabel}>{item.key}</span>
                </div>
                <div style={statValue}>{item.value}</div>
              </button>
            );
          })}
        </div>

        <div style={protocolWrap}>
          <div style={protocolHeader}>Praise Protocol</div>
          <div style={terminalWrap}>
            <div style={terminalPrompt}>&gt; status</div>
            <div style={terminalLine}>{protocolLine}</div>
          </div>
          <button type="button" style={protocolBtn} className="stats-protocol-btn" onClick={runProtocol}>
            Run Praise Protocol
          </button>
        </div>

        <div style={footerText}>Consistency looks good on you.</div>

        <button type="button" style={continueBtn} onClick={onContinue}>
          Continue
        </button>
      </section>
    </div>
  );
}

const wrap = {
  width: "100%",
  maxWidth: 1000,
  margin: "0 auto",
  paddingTop: 14,
  display: "grid",
  placeItems: "center",
};

const card = {
  position: "relative",
  width: "100%",
  borderRadius: 28,
  overflow: "hidden",
  border: "1px solid rgba(245, 218, 170, 0.32)",
  background:
    "linear-gradient(170deg, rgba(34,27,22,0.95), rgba(17,14,12,0.94)), radial-gradient(130% 95% at 0% 0%, rgba(236,188,108,0.24), rgba(0,0,0,0))",
  boxShadow: "0 28px 70px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.09)",
  color: "#f7e8cd",
  padding: "18px 16px 16px",
};

const topSweepClip = {
  position: "absolute",
  inset: "0 0 auto",
  height: 4,
  overflow: "hidden",
  pointerEvents: "none",
};

const topSweepLine = {
  position: "absolute",
  top: 0,
  left: "-52%",
  width: "44%",
  height: "100%",
  background: "linear-gradient(90deg, rgba(255,255,255,0), rgba(250,220,165,0.95), rgba(255,255,255,0))",
};

const headRow = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: 12,
};

const titleWrap = {
  position: "relative",
};

const titleGlow = {
  position: "absolute",
  top: -14,
  left: -18,
  width: 190,
  height: 84,
  borderRadius: "50%",
  background: "radial-gradient(ellipse at center, rgba(246,204,126,0.42), rgba(246,204,126,0))",
  pointerEvents: "none",
};

const kicker = {
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: "0.14em",
  opacity: 0.74,
  fontWeight: 780,
};

const title = {
  margin: "6px 0 0",
  fontFamily: "var(--font-script)",
  fontSize: "clamp(42px, 11vw, 74px)",
  lineHeight: 0.86,
  letterSpacing: "0.01em",
  color: "#fff0d1",
  textShadow: "0 3px 16px rgba(240, 193, 113, 0.34)",
};

const scoreChip = {
  borderRadius: 999,
  border: "1px solid rgba(246, 219, 176, 0.26)",
  background: "linear-gradient(90deg, rgba(244, 204, 136, 0.2), rgba(255,255,255,0.05))",
  fontSize: 11,
  padding: "6px 10px",
  fontWeight: 800,
  whiteSpace: "nowrap",
  marginTop: 2,
};

const badgeRow = {
  marginTop: 12,
  minHeight: 30,
};

const badgeChip = {
  display: "inline-block",
  borderRadius: 999,
  border: "1px solid rgba(246, 221, 186, 0.24)",
  background: "rgba(13, 9, 7, 0.52)",
  padding: "7px 12px",
  fontSize: 12,
  color: "#f5e7ca",
};

const metaRow = {
  marginTop: 12,
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
};

const metaPill = {
  borderRadius: 999,
  border: "1px solid rgba(247, 222, 182, 0.22)",
  background: "rgba(10, 8, 7, 0.54)",
  padding: "7px 11px",
  fontWeight: 760,
  fontSize: 12,
  color: "#f4e4c6",
};

const statGrid = {
  marginTop: 14,
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 10,
};

const statTile = {
  textAlign: "left",
  borderRadius: 15,
  border: "1px solid rgba(247, 224, 184, 0.22)",
  background: "linear-gradient(180deg, rgba(255,255,255,0.045), rgba(255,255,255,0.018))",
  color: "#f9ebd1",
  padding: "11px 12px",
  cursor: "pointer",
};

const statTopRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 8,
};

const statIcon = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: 34,
  height: 20,
  borderRadius: 999,
  background: "rgba(243, 204, 133, 0.16)",
  border: "1px solid rgba(243, 204, 133, 0.34)",
  color: "#f2c57b",
  fontSize: 10,
  fontWeight: 860,
  letterSpacing: "0.08em",
};

const statLabel = {
  fontSize: 12,
  fontWeight: 800,
  letterSpacing: "0.05em",
  textTransform: "uppercase",
  opacity: 0.86,
};

const statValue = {
  marginTop: 9,
  fontSize: 22,
  fontWeight: 900,
  letterSpacing: "0.02em",
  color: "#ffefcf",
};

const protocolWrap = {
  marginTop: 14,
  borderRadius: 14,
  border: "1px solid rgba(247, 224, 184, 0.2)",
  background: "linear-gradient(180deg, rgba(8,7,8,0.6), rgba(6,5,6,0.72))",
  padding: "12px",
};

const protocolHeader = {
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: "0.13em",
  fontWeight: 800,
  opacity: 0.74,
};

const terminalWrap = {
  marginTop: 8,
  borderRadius: 10,
  border: "1px solid rgba(247, 224, 184, 0.16)",
  background: "rgba(4, 4, 5, 0.74)",
  padding: "9px 10px",
  minHeight: 58,
};

const terminalPrompt = {
  fontFamily:
    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  fontSize: 11,
  opacity: 0.62,
};

const terminalLine = {
  marginTop: 6,
  fontFamily:
    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  fontSize: 13,
  lineHeight: 1.35,
  color: "rgba(243, 235, 220, 0.96)",
  minHeight: 18,
};

const protocolBtn = {
  marginTop: 10,
  width: "100%",
  borderRadius: 999,
  border: "1px solid rgba(248, 224, 178, 0.36)",
  background: "linear-gradient(90deg, rgba(208, 156, 80, 0.42), rgba(244, 205, 136, 0.28))",
  color: "#fff8e9",
  fontSize: 14,
  fontWeight: 840,
  padding: "10px 12px",
  cursor: "pointer",
};

const footerText = {
  marginTop: 12,
  fontFamily: "var(--font-script)",
  fontSize: "clamp(26px, 6.4vw, 38px)",
  lineHeight: 0.94,
  color: "#ffeed2",
  letterSpacing: "0.01em",
  textShadow: "0 3px 14px rgba(235, 186, 103, 0.25)",
};

const continueBtn = {
  marginTop: 14,
  width: "100%",
  borderRadius: 999,
  border: "1px solid rgba(248, 224, 178, 0.44)",
  background: "linear-gradient(90deg, rgba(213, 164, 91, 0.5), rgba(247, 210, 142, 0.36))",
  color: "#fff7e7",
  fontWeight: 900,
  fontSize: 15,
  padding: "12px 14px",
  cursor: "pointer",
};
