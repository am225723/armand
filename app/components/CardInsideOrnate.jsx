"use client";
import React, { useEffect, useState } from "react";

export default function CardInsideOrnate({ name = "Luke", lineProgress = [], emphasisWords = [] }) {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      const adelia = new FontFace("Adelia", "url(/fonts/Adelia.ttf)");
      const mayonice = new FontFace("Mayonice", "url(/fonts/Mayonice.ttf)");
      try {
        const [f1, f2] = await Promise.all([adelia.load(), mayonice.load()]);
        document.fonts.add(f1);
        document.fonts.add(f2);
        setFontsLoaded(true);
      } catch (e) {
        console.error("Font load error:", e);
        setFontsLoaded(true);
      }
    };
    loadFonts();
  }, []);
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
    ``,
    `The greatest gift of all Dear ${name},`,
    `Is To Be Known`,
  ];

  const topPad = 270;
  const poemFontSize = 40;
  const lineGap = 50;
  const stanzaGapExtra = 18;

  let currentY = topPad;
  const dividerYs = [];
  const linePositions = [];
  
  poemLines.forEach((line, i) => {
    const isBlank = line.trim() === "";
    const dy = i === 0 ? 0 : isBlank ? lineGap + stanzaGapExtra : lineGap;
    if (isBlank && i !== 0) dividerYs.push(currentY + (lineGap + stanzaGapExtra) * 0.55);
    currentY += dy;
    linePositions.push({ y: currentY, line, isBlank });
  });

  const secondToLastLineY = 1080;
  const finalLineY = 1180;
  const secondToLastIndex = poemLines.length - 2;
  const finalLineIndex = poemLines.length - 1;
  const finalProgress = lineProgress[finalLineIndex] ?? 0;

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
          <stop offset="0%" stopColor="#f5e6c8" />
          <stop offset="30%" stopColor="#ecdbb4" />
          <stop offset="70%" stopColor="#e4cea0" />
          <stop offset="100%" stopColor="#d8bf8a" />
        </linearGradient>

        <radialGradient id="vignette" cx="50%" cy="40%" r="75%">
          <stop offset="40%" stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor="rgba(60,40,20,0.25)" />
        </radialGradient>
        
        <radialGradient id="edgeWear" cx="50%" cy="50%" r="70%">
          <stop offset="60%" stopColor="rgba(0,0,0,0)" />
          <stop offset="90%" stopColor="rgba(80,50,20,0.08)" />
          <stop offset="100%" stopColor="rgba(60,30,10,0.15)" />
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

        <mask id="revealMask">
          <rect x="0" y="0" width="100%" height="100%" fill="white" />
        </mask>
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
        <rect x="26" y="26" width={VB_W - 52} height={VB_H - 52} rx="30" fill="url(#edgeWear)" opacity="0.7" />
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

      {(() => {
        const headerText = `To ${name},`;
        const headerProgress = lineProgress[0] ?? 0;
        const chars = headerText.split("");
        const charsRevealed = headerProgress * chars.length;
        
        return (
          <text
            x="120"
            y="165"
            fontFamily="'Mayonice', cursive"
            fontSize="72"
            style={{ textRendering: "geometricPrecision" }}
          >
            {chars.map((char, ci) => {
              const charProgress = ci < charsRevealed ? 1 : 
                ci < charsRevealed + 1 ? (charsRevealed % 1) : 0;
              
              if (charProgress === 0) {
                return <tspan key={ci} fill="transparent" stroke="transparent">{char}</tspan>;
              }
              
              const strokeLen = 120;
              const strokeOffset = strokeLen * (1 - charProgress);
              const fillOpacity = charProgress > 0.6 ? (charProgress - 0.6) / 0.4 : 0;
              
              return (
                <tspan
                  key={ci}
                  fill={`rgba(26, 20, 16, ${fillOpacity})`}
                  stroke="#1a1410"
                  strokeWidth="1"
                  strokeDasharray={strokeLen}
                  strokeDashoffset={strokeOffset}
                >
                  {char}
                </tspan>
              );
            })}
          </text>
        );
      })()}

      <g opacity="0.65" stroke="url(#goldFoil)" strokeWidth="2" fill="none">
        <path d={`M110 215 C240 205, 580 205, 710 215`} />
        <circle cx="410" cy="212" r="3.5" fill="#caa24b" opacity="0.45" />
      </g>

      <text
        x="50%"
        y="710"
        textAnchor="middle"
        fontFamily="'Adelia', cursive"
        fontSize="340"
        fill="#000000"
        opacity="0.035"
        style={{ userSelect: "none" }}
      >
        {name.slice(0, 1).toUpperCase()}
      </text>

      {linePositions.slice(0, -1).map((pos, i) => {
        if (pos.isBlank) return null;
        const progress = lineProgress[i] ?? 0;
        const chars = pos.line.split("");
        const totalChars = chars.length;
        const charsRevealed = progress * totalChars;
        const words = pos.line.split(/\s+/);
        
        return (
          <text
            key={i}
            x="50%"
            y={pos.y}
            textAnchor="middle"
            fontFamily="'Adelia', cursive"
            fontSize={32}
            style={{ textRendering: "geometricPrecision" }}
          >
            {(() => {
              let wordIdx = 0;
              return chars.map((char, ci) => {
                if (char === " ") wordIdx++;
                const currentWord = words[wordIdx] || "";
                const cleanWord = currentWord.replace(/[^a-zA-Z]/g, "");
                const isEmphasis = emphasisWords.some(ew => cleanWord.toLowerCase() === ew.toLowerCase());
                
                const charProgress = ci < charsRevealed ? 1 : 
                  ci < charsRevealed + 1 ? (charsRevealed % 1) : 0;
                
                // Hide characters that haven't started yet
                if (charProgress === 0) {
                  return <tspan key={ci} fill="transparent" stroke="transparent">{char}</tspan>;
                }
                
                const strokeLen = 80;
                const strokeOffset = strokeLen * (1 - charProgress);
                const fillOpacity = charProgress > 0.7 ? (charProgress - 0.7) / 0.3 : 0;
                
                return (
                  <tspan
                    key={ci}
                    fill={isEmphasis ? `rgba(10, 6, 4, ${fillOpacity})` : `rgba(29, 23, 20, ${fillOpacity})`}
                    stroke={isEmphasis ? "#0a0604" : "#1d1714"}
                    strokeWidth={isEmphasis ? "1" : "0.7"}
                    strokeDasharray={strokeLen}
                    strokeDashoffset={strokeOffset}
                    style={{ fontWeight: isEmphasis ? "bold" : "normal" }}
                  >
                    {char}
                  </tspan>
                );
              });
            })()}
          </text>
        );
      })}

      {dividerYs.map((yy, idx) => {
        const dividerLineIndex = [4, 9, 14][idx];
        const prevProgress = lineProgress[dividerLineIndex - 1] ?? 0;
        return (
          <g 
            key={idx} 
            opacity={prevProgress > 0.8 ? 0.55 : 0} 
            fill="none" 
            stroke="url(#goldFoil)" 
            strokeWidth="2"
            style={{ transition: "opacity 0.5s ease" }}
          >
            <path d={`M${VB_W / 2 - 220} ${yy} C${VB_W / 2 - 120} ${yy - 22}, ${VB_W / 2 + 120} ${yy - 22}, ${VB_W / 2 + 220} ${yy}`} />
            <path d={`M${VB_W / 2 - 110} ${yy + 4} C${VB_W / 2 - 55} ${yy - 8}, ${VB_W / 2 + 55} ${yy - 8}, ${VB_W / 2 + 110} ${yy + 4}`} opacity="0.45" />
            <circle cx={VB_W / 2} cy={yy - 4} r="4" fill="#caa24b" opacity="0.35" />
          </g>
        );
      })}

      {(() => {
        const secondLine = `The greatest gift of all Dear ${name},`;
        const chars = secondLine.split("");
        const secondProgress = lineProgress[secondToLastIndex] ?? 0;
        const charsRevealed = secondProgress * chars.length;
        const words = secondLine.split(/\s+/);
        
        return (
          <text
            x="50%"
            y={secondToLastLineY}
            textAnchor="middle"
            fontFamily="'Adelia', cursive"
            fontSize="38"
            style={{ textRendering: "geometricPrecision" }}
          >
            {(() => {
              let wordIdx = 0;
              return chars.map((char, ci) => {
                if (char === " ") wordIdx++;
                const currentWord = words[wordIdx] || "";
                const cleanWord = currentWord.replace(/[^a-zA-Z]/g, "");
                const isEmphasis = emphasisWords.some(ew => cleanWord.toLowerCase() === ew.toLowerCase());
                
                const charProgress = ci < charsRevealed ? 1 : 
                  ci < charsRevealed + 1 ? (charsRevealed % 1) : 0;
                
                if (charProgress === 0) {
                  return <tspan key={ci} fill="transparent" stroke="transparent">{char}</tspan>;
                }
                
                const strokeLen = 100;
                const strokeOffset = strokeLen * (1 - charProgress);
                const fillOpacity = charProgress > 0.7 ? (charProgress - 0.7) / 0.3 : 0;
                
                return (
                  <tspan
                    key={ci}
                    fill={isEmphasis ? `rgba(10, 6, 4, ${fillOpacity})` : `rgba(29, 23, 20, ${fillOpacity})`}
                    stroke={isEmphasis ? "#0a0604" : "#1d1714"}
                    strokeWidth={isEmphasis ? "1" : "0.8"}
                    strokeDasharray={strokeLen}
                    strokeDashoffset={strokeOffset}
                    style={{ fontWeight: isEmphasis ? "bold" : "normal" }}
                  >
                    {char}
                  </tspan>
                );
              });
            })()}
          </text>
        );
      })()}

      <g opacity={finalProgress > 0 ? finalProgress : 0} style={{ transition: "opacity 0.5s ease" }}>
        <g opacity={finalProgress > 0.3 ? 0.75 : 0} stroke="url(#goldFoil)" strokeWidth="2" fill="none" style={{ transition: "opacity 0.3s ease" }}>
          <path d={`M${VB_W / 2 - 260} ${finalLineY - 55} C${VB_W / 2 - 140} ${finalLineY - 90}, ${VB_W / 2 + 140} ${finalLineY - 90}, ${VB_W / 2 + 260} ${finalLineY - 55}`} />
          <path d={`M${VB_W / 2 - 170} ${finalLineY - 60} C${VB_W / 2 - 90} ${finalLineY - 80}, ${VB_W / 2 + 90} ${finalLineY - 80}, ${VB_W / 2 + 170} ${finalLineY - 60}`} opacity="0.55" />
        </g>

        {(() => {
          const finalText = "Is To Be Known";
          const chars = finalText.split("");
          const charsRevealed = finalProgress * chars.length;
          
          return (
            <text
              x="50%"
              y={finalLineY}
              textAnchor="middle"
              fontFamily="'Mayonice', cursive"
              fontSize="80"
              style={{ textRendering: "geometricPrecision" }}
            >
              {chars.map((char, ci) => {
                const charProgress = ci < charsRevealed ? 1 : 
                  ci < charsRevealed + 1 ? (charsRevealed % 1) : 0;
                
                if (charProgress === 0) {
                  return <tspan key={ci} fill="transparent" stroke="transparent">{char}</tspan>;
                }
                
                const strokeLen = 150;
                const strokeOffset = strokeLen * (1 - charProgress);
                const fillOpacity = charProgress > 0.6 ? (charProgress - 0.6) / 0.4 : 0;
                
                return (
                  <tspan
                    key={ci}
                    fill={`rgba(20, 16, 14, ${fillOpacity})`}
                    stroke="#14100e"
                    strokeWidth="1.2"
                    strokeDasharray={strokeLen}
                    strokeDashoffset={strokeOffset}
                  >
                    {char}
                  </tspan>
                );
              })}
            </text>
          );
        })()}

        <g opacity={finalProgress > 0.8 ? 0.75 : 0} stroke="url(#goldFoil)" strokeWidth="2" fill="none" style={{ transition: "opacity 0.3s ease" }}>
          <path d={`M${VB_W / 2 - 280} ${finalLineY + 45} C${VB_W / 2 - 150} ${finalLineY + 95}, ${VB_W / 2 + 150} ${finalLineY + 95}, ${VB_W / 2 + 280} ${finalLineY + 45}`} />
          <circle cx={VB_W / 2 - 310} cy={finalLineY + 46} r="4" />
          <circle cx={VB_W / 2 + 310} cy={finalLineY + 46} r="4" />
        </g>
      </g>

      {/* Ink drops and stains for aged paper look */}
      <g opacity="0.35">
        {/* Large ink blots */}
        <ellipse cx="95" cy="180" rx="8" ry="6" fill="#2a1810" opacity="0.15" />
        <ellipse cx={VB_W - 85} cy="280" rx="10" ry="7" fill="#1a1008" opacity="0.12" />
        <ellipse cx="140" cy="1150" rx="12" ry="8" fill="#2a1810" opacity="0.1" />
        <ellipse cx={VB_W - 130} cy="1050" rx="9" ry="6" fill="#1a1008" opacity="0.12" />
        
        {/* Small ink specks */}
        <circle cx="88" cy="320" r="2.5" fill="#1a1008" opacity="0.25" />
        <circle cx="105" cy="380" r="1.5" fill="#2a1810" opacity="0.3" />
        <circle cx="72" cy="450" r="2" fill="#1a1008" opacity="0.2" />
        <circle cx="118" cy="580" r="1.8" fill="#2a1810" opacity="0.28" />
        <circle cx="85" cy="720" r="2.2" fill="#1a1008" opacity="0.22" />
        <circle cx="95" cy="850" r="1.5" fill="#2a1810" opacity="0.25" />
        <circle cx="110" cy="950" r="2" fill="#1a1008" opacity="0.2" />
        
        <circle cx={VB_W - 92} r="2" cy="350" fill="#2a1810" opacity="0.25" />
        <circle cx={VB_W - 78} r="1.8" cy="480" fill="#1a1008" opacity="0.22" />
        <circle cx={VB_W - 115} r="2.2" cy="620" fill="#2a1810" opacity="0.28" />
        <circle cx={VB_W - 88} r="1.5" cy="780" fill="#1a1008" opacity="0.25" />
        <circle cx={VB_W - 105} r="2" cy="900" fill="#2a1810" opacity="0.2" />
        <circle cx={VB_W - 95} r="1.8" cy="1000" fill="#1a1008" opacity="0.22" />
        
        {/* Scattered tiny dots */}
        <circle cx="200" cy="240" r="1" fill="#2a1810" opacity="0.18" />
        <circle cx="350" cy="160" r="0.8" fill="#1a1008" opacity="0.15" />
        <circle cx="520" cy="200" r="1.2" fill="#2a1810" opacity="0.12" />
        <circle cx="650" cy="180" r="0.8" fill="#1a1008" opacity="0.15" />
        <circle cx="280" cy="1200" r="1" fill="#2a1810" opacity="0.15" />
        <circle cx="450" cy="1240" r="1.2" fill="#1a1008" opacity="0.12" />
        <circle cx="580" cy="1180" r="0.8" fill="#2a1810" opacity="0.18" />
      </g>
      
      {/* Gold diamond accents */}
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
