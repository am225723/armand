"use client";

import React, { useEffect, useMemo, useState } from "react";

const PRAISE_LINES = [
  "Performance exceeds expectations.",
  "Compliance noted.",
  "Reward approved.",
  "Good boy.",
];

const STAT_ROWS = [
  { key: "Strength", value: "▲", icon: "▣" },
  { key: "Discipline", value: "▲", icon: "◈" },
  { key: "Focus", value: "▲", icon: "◎" },
  { key: "Obedience", value: "MAXED", icon: "✶" },
];

export default function StatsCard({ result, onContinue }) {
  const [mounted, setMounted] = useState(false);
  const [activeKey, setActiveKey] = useState(null);
  const [protocolIndex, setProtocolIndex] = useState(-1);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 24);
    return () => clearTimeout(t);
  }, []);

  const protocolLine = useMemo(() => {
    if (protocolIndex < 0) return "System idle. Awaiting protocol.";
    return PRAISE_LINES[protocolIndex];
  }, [protocolIndex]);

  const runProtocol = () => {
    setProtocolIndex((prev) => {
      const next = (prev + 1) % PRAISE_LINES.length;
      return next;
    });
  };

  return (
    <div style={wrap}>
      <style>{`
        .stats-shimmer {
          background: linear-gradient(90deg, rgba(255,255,255,0), rgba(244,214,157,0.5), rgba(255,255,255,0));
          background-size: 200% 100%;
          animation: statsShimmer 2.8s linear infinite;
        }

        .stats-float {
          animation: statsFloat 3.8s ease-in-out infinite;
        }

        @keyframes statsShimmer {
          from { background-position: 200% 0; }
          to { background-position: -200% 0; }
        }

        @keyframes statsFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }

        @media (prefers-reduced-motion: reduce) {
          .stats-shimmer,
          .stats-float {
            animation: none !important;
          }
        }
      `}</style>

      <div
        style={{
          ...card,
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(28px)",
        }}
      >
        <div style={kicker}>Unlocked</div>
        <h1 style={title}>You earned what comes next.</h1>

        <div style={dividerWrap}>
          <span style={dividerGlow} className="stats-shimmer" />
        </div>

        <div style={statGrid}>
          {STAT_ROWS.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => {
                setActiveKey(item.key);
                setTimeout(() => {
                  setActiveKey((prev) => (prev === item.key ? null : prev));
                }, 280);
              }}
              style={{
                ...statItem,
                boxShadow:
                  activeKey === item.key
                    ? "0 0 0 1px rgba(241,207,149,0.48), 0 0 20px rgba(240,188,102,0.24)"
                    : "none",
              }}
            >
              <div style={statKeyRow}>
                <span style={statIcon} className="stats-float">
                  {item.icon}
                </span>
                <span style={statKey}>{item.key}</span>
              </div>
              <div style={statVal}>{item.value}</div>
            </button>
          ))}
        </div>

        <div style={tinyRow}>
          <div style={pill}>Shots: {result?.shots ?? "—"}</div>
          <div style={pill}>Time: {result?.timeMs == null ? "—" : `${Math.round(result.timeMs / 1000)}s`}</div>
        </div>

        <div style={protocolBox}>
          <div style={protocolHeader}>Praise Protocol</div>
          <div style={terminalText}>{protocolLine}</div>
          <button type="button" style={protocolBtn} onClick={runProtocol}>
            Run Praise Protocol
          </button>
        </div>

        <div style={footerText}>Consistency looks good on you.</div>

        <button type="button" style={continueBtn} onClick={onContinue}>
          Continue
        </button>
      </div>
    </div>
  );
}

const wrap = {
  width: "100%",
  maxWidth: 980,
  margin: "0 auto",
  display: "grid",
  placeItems: "center",
  paddingTop: 18,
};

const card = {
  width: "100%",
  borderRadius: 24,
  border: "1px solid rgba(248, 225, 181, 0.2)",
  background:
    "linear-gradient(172deg, rgba(20,19,22,0.92), rgba(33,30,28,0.9)), radial-gradient(140% 120% at 10% 0%, rgba(237,194,123,0.18), rgba(0,0,0,0))",
  boxShadow: "0 26px 64px rgba(0, 0, 0, 0.46)",
  padding: "18px 16px 16px",
  transition: "opacity 320ms ease, transform 420ms cubic-bezier(.2,.7,.2,1)",
};

const kicker = {
  fontWeight: 800,
  letterSpacing: "0.5px",
  textTransform: "uppercase",
  fontSize: 12,
  opacity: 0.74,
};

const title = {
  margin: "8px 0 0",
  fontSize: 30,
  lineHeight: 1.02,
  letterSpacing: "-0.45px",
};

const dividerWrap = {
  marginTop: 12,
  borderRadius: 999,
  overflow: "hidden",
  border: "1px solid rgba(255, 230, 187, 0.16)",
  background: "rgba(255,255,255,0.04)",
};

const dividerGlow = {
  display: "block",
  width: "100%",
  height: 2,
};

const statGrid = {
  marginTop: 14,
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 10,
};

const statItem = {
  textAlign: "left",
  borderRadius: 14,
  border: "1px solid rgba(252, 232, 196, 0.16)",
  background: "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
  padding: "12px 12px",
  color: "#f9ebd2",
  cursor: "pointer",
  transition: "box-shadow 260ms ease, transform 260ms ease",
};

const statKeyRow = {
  display: "flex",
  alignItems: "center",
  gap: 7,
};

const statIcon = {
  color: "#f1ca8a",
  fontSize: 14,
  opacity: 0.92,
};

const statKey = {
  opacity: 0.76,
  fontSize: 12,
  fontWeight: 800,
  letterSpacing: "0.34px",
  textTransform: "uppercase",
};

const statVal = {
  marginTop: 8,
  fontSize: 18,
  fontWeight: 900,
};

const tinyRow = {
  marginTop: 12,
  display: "flex",
  gap: 10,
};

const pill = {
  borderRadius: 999,
  padding: "9px 12px",
  fontWeight: 800,
  border: "1px solid rgba(255,255,255,.12)",
  background: "rgba(0,0,0,.22)",
  fontSize: 13,
};

const protocolBox = {
  marginTop: 14,
  borderRadius: 14,
  border: "1px solid rgba(249, 224, 176, 0.18)",
  background: "rgba(7, 6, 8, 0.42)",
  padding: "12px 12px",
};

const protocolHeader = {
  fontSize: 12,
  textTransform: "uppercase",
  letterSpacing: "0.34px",
  opacity: 0.72,
  fontWeight: 800,
};

const terminalText = {
  marginTop: 8,
  minHeight: 24,
  borderRadius: 10,
  border: "1px solid rgba(255,255,255,.12)",
  background: "rgba(0,0,0,.35)",
  padding: "8px 10px",
  fontSize: 12,
  lineHeight: 1.4,
  fontFamily:
    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  color: "rgba(245,238,224,0.92)",
};

const protocolBtn = {
  marginTop: 10,
  width: "100%",
  borderRadius: 999,
  border: "1px solid rgba(248, 226, 182, 0.3)",
  background: "linear-gradient(90deg, rgba(210,161,86,0.34), rgba(245,206,137,0.24))",
  color: "#fff8eb",
  fontWeight: 820,
  fontSize: 14,
  padding: "10px 12px",
  cursor: "pointer",
};

const footerText = {
  marginTop: 12,
  fontSize: 13,
  opacity: 0.74,
};

const continueBtn = {
  marginTop: 14,
  width: "100%",
  borderRadius: 999,
  border: "1px solid rgba(248, 226, 182, 0.36)",
  background: "linear-gradient(90deg, rgba(210,161,86,0.46), rgba(245,206,137,0.36))",
  color: "#fff8eb",
  fontWeight: 900,
  fontSize: 15,
  padding: "12px 14px",
  cursor: "pointer",
};
