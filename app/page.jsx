"use client";

import React, { useMemo, useState } from "react";
import ArcheryGame from "./components/ArcheryGame";
import BirthdayCard from "./components/BirthdayCard";

export default function Page() {
  const [step, setStep] = useState("archery"); // "archery" | "earned" | "poem"
  const [result, setResult] = useState({ shots: null, timeMs: null });

  const earnedCopy = useMemo(() => {
    // Light “earned” framing: performance -> praise -> permission -> poem
    return {
      title: "You earned what comes next.",
      stats: [
        ["Strength", "▲"],
        ["Discipline", "▲"],
        ["Focus", "▲"],
        ["Good boy energy", "MAXED"],
      ],
      agentLines: [
        "BirthdayAgent v1.0",
        "Status: ONLINE",
        "",
        "✓ Candles extinguished",
        "✓ Form verified",
        "✓ Reward authorized",
      ],
    };
  }, []);

  return (
    <div style={shell}>
      <div style={chrome}>
        <div style={brand}>LUKE MODE</div>
        <div style={sub}>Mobile-first birthday quest</div>
      </div>

      {step === "archery" && (
        <div style={{ width: "100%" }}>
          <div style={headerBlock}>
            <div style={kicker}>Step 1</div>
            <h1 style={h1}>Extinguish the candles.</h1>
            <p style={p}>
              Drag to aim. Release to shoot. Precision first.
            </p>
          </div>

          <ArcheryGame
            candleCount={7}
            height={420}
            onComplete={({ shots, timeMs }) => {
              setResult({ shots, timeMs });
              setStep("earned");
            }}
          />
        </div>
      )}

      {step === "earned" && (
        <div style={earnedWrap}>
          <div style={card}>
            <div style={kicker}>Unlocked</div>
            <h1 style={{ ...h1, marginTop: 6 }}>{earnedCopy.title}</h1>

            <div style={statGrid}>
              {earnedCopy.stats.map(([k, v]) => (
                <div key={k} style={statItem}>
                  <div style={statKey}>{k}</div>
                  <div style={statVal}>{v}</div>
                </div>
              ))}
            </div>

            <div style={tinyRow}>
              <div style={pill}>Shots: {result.shots ?? "—"}</div>
              <div style={pill}>
                Time:{" "}
                {result.timeMs == null ? "—" : `${Math.round(result.timeMs / 1000)}s`}
              </div>
            </div>

            <div style={terminal}>
              {earnedCopy.agentLines.map((ln, i) => (
                <div key={i} style={{ whiteSpace: "pre-wrap" }}>
                  {ln}
                </div>
              ))}
            </div>

            <button style={primaryBtn} onClick={() => setStep("poem")}>
              Continue
            </button>

            <div style={finePrint}>
              Tip: tap play if your phone blocks auto-audio.
            </div>
          </div>
        </div>
      )}

      {step === "poem" && (
        <div style={{ width: "100%" }}>
          <BirthdayCard
            toName="Luke"
            photos={["/photo1.jpg", "/photo2.jpg", "/photo3.jpg"]}
            fontUrl="/fonts/InterSignature-q20q2.ttf"
            audioUrl="/audio/luke-poem.mp3"
            autoStart={true}
          />
        </div>
      )}
    </div>
  );
}

const shell = {
  minHeight: "100dvh",
  padding: "18px 14px 32px",
  color: "white",
  background:
    "radial-gradient(120% 120% at 50% 0%, rgba(255,210,122,.14), rgba(0,0,0,.92))",
};

const chrome = {
  width: "100%",
  maxWidth: 980,
  margin: "0 auto 10px",
  display: "flex",
  alignItems: "baseline",
  justifyContent: "space-between",
  gap: 12,
};

const brand = {
  fontWeight: 950,
  letterSpacing: "0.9px",
  opacity: 0.9,
};

const sub = {
  opacity: 0.65,
  fontSize: 13,
};

const headerBlock = {
  width: "100%",
  maxWidth: 980,
  margin: "0 auto 10px",
  padding: "10px 6px 6px",
};

const kicker = {
  fontWeight: 900,
  letterSpacing: "0.4px",
  opacity: 0.75,
  textTransform: "uppercase",
  fontSize: 12,
};

const h1 = {
  margin: "8px 0 6px",
  fontSize: 28,
  lineHeight: 1.05,
  fontWeight: 950,
  letterSpacing: "-0.4px",
};

const p = {
  margin: 0,
  opacity: 0.8,
  lineHeight: 1.4,
};

const earnedWrap = {
  width: "100%",
  maxWidth: 980,
  margin: "0 auto",
  display: "grid",
  placeItems: "center",
  paddingTop: 16,
};

const card = {
  width: "100%",
  borderRadius: 20,
  border: "1px solid rgba(255,255,255,.14)",
  background: "rgba(0,0,0,.28)",
  boxShadow: "0 20px 70px rgba(0,0,0,.35)",
  padding: "16px 14px",
};

const statGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 10,
  marginTop: 14,
};

const statItem = {
  borderRadius: 16,
  border: "1px solid rgba(255,255,255,.12)",
  background: "rgba(0,0,0,.18)",
  padding: "12px 12px",
};

const statKey = {
  opacity: 0.75,
  fontSize: 12,
  fontWeight: 850,
  letterSpacing: "0.3px",
  textTransform: "uppercase",
};

const statVal = {
  marginTop: 8,
  fontSize: 18,
  fontWeight: 950,
};

const tinyRow = {
  display: "flex",
  gap: 10,
  marginTop: 12,
};

const pill = {
  borderRadius: 999,
  padding: "10px 12px",
  fontWeight: 850,
  border: "1px solid rgba(255,255,255,.12)",
  background: "rgba(0,0,0,.18)",
};

const terminal = {
  marginTop: 12,
  borderRadius: 16,
  border: "1px solid rgba(255,255,255,.12)",
  background: "rgba(0,0,0,.24)",
  padding: "12px 12px",
  fontFamily:
    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  fontSize: 12,
  opacity: 0.9,
};

const primaryBtn = {
  marginTop: 14,
  width: "100%",
  borderRadius: 999,
  padding: "12px 14px",
  fontWeight: 950,
  border: "1px solid rgba(255,255,255,.18)",
  background:
    "linear-gradient(90deg, rgba(255,210,122,.25), rgba(158,231,255,.18))",
  color: "white",
  cursor: "pointer",
};

const finePrint = {
  marginTop: 10,
  fontSize: 12,
  opacity: 0.65,
  textAlign: "center",
};
