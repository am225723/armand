"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

const PRAISE_LINES = [
  "Performance exceeds expectations.",
  "Compliance noted.",
  "Reward approved.",
  "Good boy.",
];

const STAT_ROWS = [
  {
    key: "Strength",
    value: "▲",
    detail: "Look at dem muscles",
    icon: "arrow",
  },
  {
    key: "Discipline",
    value: "▲",
    detail: "Good Boy",
    icon: "target",
  },
  {
    key: "Focus",
    value: "▲",
    detail: "Always Focused on the prize",
    icon: "flame",
  },
  {
    key: "Obedience",
    value: "MAXED",
    detail: "Locked in with intent",
    icon: "check",
  },
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
  const [displayLine, setDisplayLine] = useState("System idle. Awaiting protocol.");
  const [lineVisible, setLineVisible] = useState(true);
  const [lineBusy, setLineBusy] = useState(false);
  const [sheenFlash, setSheenFlash] = useState(0);
  const [badgeCursor, setBadgeCursor] = useState(0);

  const timersRef = useRef([]);

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

    return () => {
      clearTimeout(revealTimer);
      for (const id of timersRef.current) clearTimeout(id);
      timersRef.current = [];
    };
  }, [onReveal]);

  useEffect(() => {
    if (badgeDeck.length <= 1) return;
    const interval = setInterval(() => {
      setBadgeCursor((prev) => (prev + 1) % badgeDeck.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [badgeDeck]);

  const triggerPulse = (statKey) => {
    const pulseId = `${statKey}-${Date.now()}`;
    setActivePulse(pulseId);
    const timer = setTimeout(() => {
      setActivePulse((current) => (current === pulseId ? "" : current));
    }, 200);
    timersRef.current.push(timer);
  };

  const runProtocol = () => {
    if (lineBusy) return;
    setLineBusy(true);
    setLineVisible(false);

    const nextIndex = (protocolIndex + 1) % PRAISE_LINES.length;

    const fadeDelay = setTimeout(() => {
      const microDelay = setTimeout(() => {
        setProtocolIndex(nextIndex);
        setDisplayLine(PRAISE_LINES[nextIndex]);
        setLineVisible(true);
        setLineBusy(false);

        if (nextIndex === PRAISE_LINES.length - 1) {
          const finalSheen = setTimeout(() => {
            setSheenFlash((n) => n + 1);
          }, 400);
          timersRef.current.push(finalSheen);
        }
      }, 160);
      timersRef.current.push(microDelay);
    }, 120);

    timersRef.current.push(fadeDelay);
  };

  const shotValue = result?.shots ?? "-";
  const seconds = result?.timeMs == null ? "-" : `${Math.max(1, Math.round(result.timeMs / 1000))}s`;

  return (
    <div style={wrap}>
      <style>{`
        .stats-card-enter {
          transition: opacity 500ms cubic-bezier(.2,.8,.25,1), transform 500ms cubic-bezier(.2,.8,.25,1);
        }

        .stats-top-sweep {
          animation: statsTopSweep 880ms cubic-bezier(.18,.66,.21,.99) both;
        }

        .stats-title-pulse {
          animation: statsTitlePulse 1100ms ease both;
        }

        .stats-heading-sheen {
          animation: statsHeadingSheen 9s linear infinite;
        }

        .stats-final-sheen {
          animation: statsCardSheen 880ms cubic-bezier(.2,.7,.2,1) both;
        }

        .stats-badge-chip {
          animation: statsBadgeFade 420ms ease;
        }

        .stats-tile {
          transition: border-color 200ms ease, box-shadow 200ms ease, transform 200ms ease;
        }

        .stats-tile-pulse {
          transform: scale(1.02);
          box-shadow: 0 0 0 1px rgba(226, 184, 119, 0.52), 0 0 18px rgba(226, 184, 119, 0.24);
        }

        .stats-terminal-line {
          transition: opacity 170ms ease;
        }

        .stats-cursor {
          display: inline-block;
          margin-left: 6px;
          opacity: 0.7;
          animation: statsCursorBlink 1s steps(2, start) infinite;
        }

        .stats-protocol-btn {
          transition: filter 200ms ease, transform 200ms ease;
        }

        .stats-protocol-btn:hover {
          filter: brightness(1.05);
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

        @keyframes statsHeadingSheen {
          0% {
            background-position: 180% 0;
          }
          100% {
            background-position: -180% 0;
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

        @keyframes statsCardSheen {
          0% {
            transform: translateX(-160%);
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

        @keyframes statsCursorBlink {
          0%,
          48% {
            opacity: 0.7;
          }
          50%,
          100% {
            opacity: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .stats-card-enter,
          .stats-top-sweep,
          .stats-title-pulse,
          .stats-heading-sheen,
          .stats-final-sheen,
          .stats-badge-chip,
          .stats-tile,
          .stats-cursor,
          .stats-terminal-line,
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
          transform: mounted ? "translateY(0)" : "translateY(36px)",
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
            <h1 style={title} className="stats-heading-sheen">
              Front Cover Complete
            </h1>
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
                  <span style={statIconWrap}>
                    <StatIcon type={item.icon} />
                  </span>
                  <span style={statLabel}>{item.key}</span>
                </div>
                <div style={statValue}>{item.value}</div>
                <div style={statDetail}>{item.detail}</div>
              </button>
            );
          })}
        </div>

        <div style={protocolWrap}>
          <div style={protocolHeader}>Praise Protocol</div>
          <div style={terminalWrap}>
            <div style={terminalPrompt}>&gt; status</div>
            <div style={terminalLine} className="stats-terminal-line">
              <span style={{ opacity: lineVisible ? 1 : 0, transition: "opacity 170ms ease" }}>
                {displayLine}
              </span>
              <span className="stats-cursor">|</span>
            </div>
          </div>
          <button type="button" style={protocolBtn} className="stats-protocol-btn" onClick={runProtocol}>
            Run Praise Protocol
          </button>
        </div>

        <div style={footerText}>Consistency looks good on you.</div>

        <button type="button" style={continueBtn} onClick={onContinue}>
          Continue
        </button>

        {sheenFlash > 0 && <div key={sheenFlash} style={cardSheenLayer} className="stats-final-sheen" />}
      </section>
    </div>
  );
}

function StatIcon({ type }) {
  const common = {
    width: 16,
    height: 16,
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "#e2b877",
    strokeWidth: 1.4,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  if (type === "arrow") {
    return (
      <svg {...common}>
        <path d="M3 11 L8 5 L13 11" />
        <path d="M8 5 L8 13" />
      </svg>
    );
  }

  if (type === "target") {
    return (
      <svg {...common}>
        <circle cx="8" cy="8" r="5" />
        <circle cx="8" cy="8" r="2.2" />
      </svg>
    );
  }

  if (type === "flame") {
    return (
      <svg {...common}>
        <path d="M8 2 C10 5, 12 6.5, 12 9.2 C12 11.5, 10.2 13.5, 8 13.5 C5.8 13.5, 4 11.6, 4 9.2 C4 7.1, 5.2 5.8, 6.8 4.2" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M3.5 8.2 L6.6 11.3 L12.5 4.8" />
    </svg>
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
  borderRadius: 23,
  overflow: "hidden",
  border: "1px solid rgba(226, 184, 119, 0.3)",
  background:
    "linear-gradient(170deg, rgba(35,25,19,0.95), rgba(28,20,16,0.94)), radial-gradient(130% 95% at 0% 0%, rgba(226,184,119,0.2), rgba(0,0,0,0))",
  boxShadow: "0 20px 48px rgba(0,0,0,.45), inset 0 1px 0 rgba(255,255,255,0.08)",
  color: "#f5e8cf",
  backdropFilter: "blur(6px)",
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
  background: "linear-gradient(90deg, rgba(255,255,255,0), rgba(226,184,119,0.95), rgba(255,255,255,0))",
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
  top: -12,
  left: -14,
  width: 184,
  height: 76,
  borderRadius: "50%",
  background: "radial-gradient(ellipse at center, rgba(226,184,119,0.36), rgba(226,184,119,0))",
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
  fontSize: "clamp(42px, 11vw, 72px)",
  lineHeight: 0.86,
  letterSpacing: "0.01em",
  color: "#f5e8cf",
  textShadow: "0 3px 16px rgba(226,184,119,0.3)",
  backgroundImage: "linear-gradient(90deg, rgba(255,255,255,0), rgba(226,184,119,0.8), rgba(255,255,255,0))",
  backgroundSize: "170% 100%",
  WebkitBackgroundClip: "text",
};

const scoreChip = {
  borderRadius: 999,
  border: "1px solid rgba(226, 184, 119, 0.28)",
  background: "linear-gradient(90deg, rgba(226,184,119,0.18), rgba(255,255,255,0.04))",
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
  border: "1px solid rgba(226, 184, 119, 0.24)",
  background: "rgba(12, 9, 8, 0.5)",
  padding: "7px 12px",
  fontSize: 12,
  color: "#f5e8cf",
};

const metaRow = {
  marginTop: 12,
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
};

const metaPill = {
  borderRadius: 999,
  border: "1px solid rgba(226, 184, 119, 0.24)",
  background: "rgba(9, 8, 7, 0.55)",
  padding: "7px 11px",
  fontWeight: 760,
  fontSize: 12,
  color: "#f5e8cf",
};

const statGrid = {
  marginTop: 14,
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 10,
};

const statTile = {
  textAlign: "left",
  borderRadius: 14,
  border: "1px solid rgba(226, 184, 119, 0.22)",
  background: "linear-gradient(180deg, rgba(255,255,255,0.045), rgba(255,255,255,0.016))",
  color: "#f5e8cf",
  padding: "11px 12px",
  cursor: "pointer",
};

const statTopRow = {
  display: "flex",
  alignItems: "center",
  gap: 8,
};

const statIconWrap = {
  width: 20,
  height: 20,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
};

const statLabel = {
  fontSize: 12,
  fontWeight: 800,
  letterSpacing: "0.05em",
  textTransform: "uppercase",
  opacity: 0.9,
};

const statValue = {
  marginTop: 8,
  fontSize: 22,
  fontWeight: 900,
  letterSpacing: "0.02em",
  color: "#f5e8cf",
};

const statDetail = {
  marginTop: 2,
  fontSize: 12,
  color: "rgba(245, 232, 207, 0.78)",
};

const protocolWrap = {
  marginTop: 14,
  borderRadius: 14,
  border: "1px solid rgba(226, 184, 119, 0.2)",
  background: "linear-gradient(180deg, rgba(8,7,8,0.64), rgba(6,5,6,0.76))",
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
  border: "1px solid rgba(226, 184, 119, 0.16)",
  background: "rgba(4, 4, 5, 0.78)",
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
  color: "rgba(245, 232, 207, 0.96)",
  minHeight: 18,
};

const protocolBtn = {
  marginTop: 10,
  width: "100%",
  borderRadius: 999,
  border: "1px solid rgba(226, 184, 119, 0.4)",
  background: "linear-gradient(90deg, rgba(226,184,119,0.38), rgba(226,184,119,0.22))",
  color: "#f5e8cf",
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
  color: "#f5e8cf",
  letterSpacing: "0.01em",
  textShadow: "0 3px 14px rgba(226,184,119,0.2)",
};

const continueBtn = {
  marginTop: 14,
  width: "100%",
  borderRadius: 999,
  border: "1px solid rgba(226, 184, 119, 0.44)",
  background: "linear-gradient(90deg, rgba(226,184,119,0.46), rgba(226,184,119,0.3))",
  color: "#f5e8cf",
  fontWeight: 900,
  fontSize: 15,
  padding: "12px 14px",
  cursor: "pointer",
};

const cardSheenLayer = {
  position: "absolute",
  top: -24,
  bottom: -24,
  left: "-46%",
  width: "42%",
  pointerEvents: "none",
  background:
    "linear-gradient(100deg, rgba(255,255,255,0), rgba(226,184,119,0.12), rgba(226,184,119,0.34), rgba(255,255,255,0))",
};
