"use client";
import React from "react";

export default function CardInsideOrnate({ name = "Luke" }) {
  const VB_W = 820;
  const VB_H = 1320;

  const poemLines = [
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
  ];

  const topPad = 270;
  const poemFontSize = 40;
  const lineGap = 50;
  const stanzaGapExtra = 18;

  let currentY = topPad;
  const dividerYs = [];
  const tspans = poemLines.map((line, i) => {
    const isBlank = line.trim() === "";
    const dy = i === 0 ? 0 : isBlank ? lineGap + stanzaGapExtra : lineGap;

    if (isBlank && i !== 0) dividerYs.push(currentY + (lineGap + stanzaGapExtra) * 0.55);

    currentY += dy;
    return (
      <tspan key={i} x="50%" dy={dy}>
        {line}
      </tspan>
    );
  });

  const finalLineY = 1160;

  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      width="100%"
      height="100%"
      role="img"
      aria-label="Ornate birthday card inside"
      style={{ display: "block" }}
    >
      <defs>
        <linearGradient id="paperGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fbf4e6" />
          <stop offset="55%" stopColor="#f6ecd8" />
          <stop offset="100%" stopColor="#f2e1c4" />
        </linearGradient>

        <radialGradient id="vignette" cx="50%" cy="40%" r="75%">
          <stop offset="55%" stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.12)" />
        </radialGradient>

        <filter id="paperNoise" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix
            type="matrix"
            values="
              1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0 0 0 0.10 0"
          />
        </filter>

        <filter id="softShadow" x="-25%" y="-25%" width="150%" height="150%">
          <feDropShadow dx="0" dy="10" stdDeviation="14" floodColor="rgba(0,0,0,0.18)" />
        </filter>

        <linearGradient id="goldFoil" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f1d58a" stopOpacity="0.75" />
          <stop offset="35%" stopColor="#caa24b" stopOpacity="0.65" />
          <stop offset="70%" stopColor="#a77c24" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#f1d58a" stopOpacity="0.75" />
        </linearGradient>

        <pattern id="filigreePattern" width="120" height="120" patternUnits="userSpaceOnUse">
          <g opacity="0.06" stroke="url(#goldFoil)" strokeWidth="2" fill="none">
            <path d="M20 62 C40 40, 80 40, 100 62" />
            <path d="M20 58 C40 80, 80 80, 100 58" />
            <circle cx="60" cy="60" r="3" />
          </g>
        </pattern>
      </defs>

      <g filter="url(#softShadow)">
        <rect x="26" y="26" width={VB_W - 52} height={VB_H - 52} rx="30" fill="url(#paperGrad)" />
        <rect
          x="26"
          y="26"
          width={VB_W - 52}
          height={VB_H - 52}
          rx="30"
          fill="#ffffff"
          opacity="0.26"
          filter="url(#paperNoise)"
        />
        <rect x="26" y="26" width={VB_W - 52} height={VB_H - 52} rx="30" fill="url(#vignette)" opacity="0.55" />
        <rect
          x="26"
          y="26"
          width={VB_W - 52}
          height={VB_H - 52}
          rx="30"
          fill="url(#filigreePattern)"
          opacity="1"
        />

        <rect
          x="54"
          y="54"
          width={VB_W - 108}
          height={VB_H - 108}
          rx="24"
          fill="none"
          stroke="url(#goldFoil)"
          strokeWidth="2.4"
          opacity="0.85"
        />
        <rect
          x="70"
          y="70"
          width={VB_W - 140}
          height={VB_H - 140}
          rx="20"
          fill="none"
          stroke="rgba(20,20,20,0.12)"
          strokeWidth="1.2"
        />
      </g>

      <g opacity="0.55" stroke="url(#goldFoil)" strokeWidth="2" fill="none">
        <path d="M92 132 C110 95, 160 88, 195 110" />
        <path d="M92 132 C130 150, 160 175, 175 205" opacity="0.55" />
        <path d="M120 118 C140 110, 158 110, 178 120" opacity="0.55" />
        <path d={`M${VB_W - 92} 132 C${VB_W - 110} 95, ${VB_W - 160} 88, ${VB_W - 195} 110`} />
        <path d={`M${VB_W - 92} 132 C${VB_W - 130} 150, ${VB_W - 160} 175, ${VB_W - 175} 205`} opacity="0.55" />
        <path d={`M${VB_W - 120} 118 C${VB_W - 140} 110, ${VB_W - 158} 110, ${VB_W - 178} 120`} opacity="0.55" />
        <path d={`M92 ${VB_H - 132} C110 ${VB_H - 95}, 160 ${VB_H - 88}, 195 ${VB_H - 110}`} />
        <path d={`M92 ${VB_H - 132} C130 ${VB_H - 150}, 160 ${VB_H - 175}, 175 ${VB_H - 205}`} opacity="0.55" />
        <path d={`M${VB_W - 92} ${VB_H - 132} C${VB_W - 110} ${VB_H - 95}, ${VB_W - 160} ${VB_H - 88}, ${VB_W - 195} ${VB_H - 110}`} />
        <path d={`M${VB_W - 92} ${VB_H - 132} C${VB_W - 130} ${VB_H - 150}, ${VB_W - 160} ${VB_H - 175}, ${VB_W - 175} ${VB_H - 205}`} opacity="0.55" />
      </g>

      <text
        x="120"
        y="165"
        textAnchor="start"
        fontFamily="'Imperial Script', cursive"
        fontSize="86"
        fill="#1a1410"
        style={{
          fontKerning: "normal",
          fontVariantLigatures: "common-ligatures",
          fontFeatureSettings: '"kern" 1, "liga" 1',
          textRendering: "geometricPrecision",
        }}
      >
        {`To ${name},`}
      </text>

      <g opacity="0.65" stroke="url(#goldFoil)" strokeWidth="2" fill="none">
        <path d={`M110 215 C240 205, 580 205, 710 215`} />
        <circle cx="410" cy="212" r="3.5" fill="#caa24b" opacity="0.45" />
      </g>

      <text
        x="50%"
        y="710"
        textAnchor="middle"
        fontFamily="'Imperial Script', cursive"
        fontSize="360"
        fill="#000000"
        opacity="0.035"
        style={{ userSelect: "none" }}
      >
        {name.slice(0, 1).toUpperCase()}
      </text>

      <text
        x="50%"
        y={topPad}
        textAnchor="middle"
        fontFamily="'Pinyon Script', serif"
        fontSize={poemFontSize}
        fill="#1d1714"
        style={{
          fontKerning: "normal",
          fontVariantLigatures: "common-ligatures",
          fontFeatureSettings: '"kern" 1, "liga" 1',
          textRendering: "geometricPrecision",
        }}
      >
        {tspans}
      </text>

      {dividerYs.map((yy, idx) => (
        <g key={idx} opacity="0.55" fill="none" stroke="url(#goldFoil)" strokeWidth="2">
          <path d={`M${VB_W / 2 - 220} ${yy} C${VB_W / 2 - 120} ${yy - 22}, ${VB_W / 2 + 120} ${yy - 22}, ${VB_W / 2 + 220} ${yy}`} />
          <path d={`M${VB_W / 2 - 110} ${yy + 4} C${VB_W / 2 - 55} ${yy - 8}, ${VB_W / 2 + 55} ${yy - 8}, ${VB_W / 2 + 110} ${yy + 4}`} opacity="0.45" />
          <circle cx={VB_W / 2} cy={yy - 4} r="4" fill="#caa24b" opacity="0.35" />
        </g>
      ))}

      <g>
        <g opacity="0.75" stroke="url(#goldFoil)" strokeWidth="2" fill="none">
          <path d={`M${VB_W / 2 - 260} ${finalLineY - 95} C${VB_W / 2 - 140} ${finalLineY - 140}, ${VB_W / 2 + 140} ${finalLineY - 140}, ${VB_W / 2 + 260} ${finalLineY - 95}`} />
          <path d={`M${VB_W / 2 - 170} ${finalLineY - 100} C${VB_W / 2 - 90} ${finalLineY - 125}, ${VB_W / 2 + 90} ${finalLineY - 125}, ${VB_W / 2 + 170} ${finalLineY - 100}`} opacity="0.55" />
        </g>

        <text
          x="50%"
          y={finalLineY}
          textAnchor="middle"
          fontFamily="'Imperial Script', cursive"
          fontSize="104"
          fill="#14100e"
          style={{
            fontKerning: "normal",
            fontVariantLigatures: "common-ligatures",
            fontFeatureSettings: '"kern" 1, "liga" 1',
            textRendering: "geometricPrecision",
          }}
        >
          Is To Be Known
        </text>

        <g opacity="0.75" stroke="url(#goldFoil)" strokeWidth="2" fill="none">
          <path d={`M${VB_W / 2 - 280} ${finalLineY + 45} C${VB_W / 2 - 150} ${finalLineY + 95}, ${VB_W / 2 + 150} ${finalLineY + 95}, ${VB_W / 2 + 280} ${finalLineY + 45}`} />
          <circle cx={VB_W / 2 - 310} cy={finalLineY + 46} r="4" />
          <circle cx={VB_W / 2 + 310} cy={finalLineY + 46} r="4" />
        </g>
      </g>

      <g opacity="0.18" fill="#caa24b">
        <path d="M90 340 l6 6 -6 6 -6 -6 z" />
        <path d="M110 520 l4 4 -4 4 -4 -4 z" />
        <path d="M95 920 l5 5 -5 5 -5 -5 z" />
        <path d={`M${VB_W - 90} 410 l6 6 -6 6 -6 -6 z`} />
        <path d={`M${VB_W - 110} 650 l4 4 -4 4 -4 -4 z`} />
        <path d={`M${VB_W - 95} 980 l5 5 -5 5 -5 -5 z`} />
      </g>
    </svg>
  );
}
