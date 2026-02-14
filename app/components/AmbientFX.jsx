"use client";

import React, { useMemo } from "react";

const CONFETTI_COLORS = ["#efc784", "#e8aea2", "#bdd0a6", "#a6c6cf", "#cfb2c6"];
const BALLOON_COLORS = ["#e8bf7e", "#c8d8b2", "#b4ced8", "#dfb2c2"];

export default function AmbientFX({
  variant = "inside",
  className,
  style,
  zIndex = 0,
  confettiCount,
  sparkleCount,
  balloonCount,
}) {
  const isInside = variant !== "cover";
  const baseConfetti = confettiCount ?? (isInside ? 10 : 20);
  const config =
    !isInside
      ? {
          confetti: Math.max(16, Math.round(baseConfetti * 2.2)),
          sparkles: sparkleCount ?? 10,
          balloons: balloonCount ?? 6,
        }
      : {
          confetti: Math.max(14, Math.round(baseConfetti * 2.6)),
          sparkles: sparkleCount ?? 8,
          balloons: balloonCount ?? 3,
        };

  const confetti = useMemo(
    () =>
      Array.from({ length: config.confetti }).map((_, index) => {
        const depthRoll = Math.random();
        const sizeRoll = Math.random();
        const isFar = depthRoll < 0.28;
        const isNear = depthRoll > 0.8;
        const baseSize =
          sizeRoll < 0.3
            ? 9.5 + Math.random() * 3.4
            : sizeRoll < 0.76
              ? 13.8 + Math.random() * 4.7
              : 19.4 + Math.random() * 6.3;
        const opacityBase = isInside
          ? isNear
            ? 0.86
            : isFar
              ? 0.64
              : 0.76
          : isNear
            ? 0.94
            : isFar
              ? 0.72
              : 0.84;

        return {
          id: index,
          left: `${3 + ((index * 8.1) % 94)}%`,
          top: `${4 + ((index * 11.6) % 92)}%`,
          width: baseSize,
          height: baseSize * (0.76 + Math.random() * 0.4),
          drift: 22 + Math.random() * 34,
          crossDrift: -9 + Math.random() * 18,
          rotateStart: -28 + Math.random() * 56,
          rotateEnd: 64 + Math.random() * 84,
          duration: (isInside ? 20 : 14) + Math.random() * 8 + (isFar ? 4.6 : 0),
          delay: -Math.random() * (isInside ? 14 : 11),
          opacity: opacityBase,
          color: CONFETTI_COLORS[index % CONFETTI_COLORS.length],
          blur: isFar ? 0.3 + Math.random() * 0.7 : 0,
        };
      }),
    [config.confetti, isInside]
  );

  const sparkles = useMemo(
    () =>
      Array.from({ length: config.sparkles }).map((_, index) => ({
        id: index,
        left: `${8 + ((index * 11.4) % 84)}%`,
        top: `${5 + ((index * 13.2) % 62)}%`,
        size: 8 + (index % 4) * 2,
        duration: 5 + (index % 4) * 1.1,
        delay: -index * 0.9,
        opacity: index % 2 === 0 ? 0.34 : 0.22,
      })),
    [config.sparkles]
  );

  const balloons = useMemo(
    () =>
      Array.from({ length: config.balloons }).map((_, index) => ({
        id: index,
        left: `${index % 2 === 0 ? 2 + index * 8 : 84 - index * 7}%`,
        top: `${12 + (index % 3) * 20}%`,
        scale: 0.84 + (index % 3) * 0.08,
        sway: 9 + (index % 4) * 4,
        bob: 10 + (index % 3) * 3,
        drift: 2 + (index % 3) * 1.2,
        duration: 15 + (index % 4) * 1.9,
        delay: -index * 2.3,
        color: BALLOON_COLORS[index % BALLOON_COLORS.length],
        opacity: isInside ? 0.28 : 0.33,
      })),
    [config.balloons, isInside]
  );

  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
        zIndex,
        ...style,
      }}
    >
      <style>{`
        .afx-confetti {
          --afx-drift: 14px;
          --afx-cross-drift: 6px;
          --afx-rot-start: 8deg;
          --afx-rot-end: 68deg;
          --afx-opacity: 0.8;
          position: absolute;
          border-radius: 3px;
          animation: afxConfettiFall linear infinite;
          will-change: transform, opacity, filter;
        }

        .afx-bokeh {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle at 40% 40%, rgba(255,255,255,0.5), rgba(255,255,255,0));
          animation: afxBreathe ease-in-out infinite;
          will-change: transform, opacity;
        }

        .afx-sparkle {
          position: absolute;
          color: rgba(249, 225, 173, 0.74);
          text-shadow: 0 0 8px rgba(245, 207, 133, 0.42);
          animation: afxTwinkle ease-in-out infinite;
          will-change: transform, opacity;
        }

        .afx-balloon {
          --afx-balloon-scale: 1;
          --afx-balloon-sway: 10px;
          --afx-balloon-bob: 10px;
          --afx-balloon-drift: 2px;
          position: absolute;
          width: clamp(42px, 7.4vw, 60px);
          aspect-ratio: 0.82;
          border-radius: 52% 48% 49% 51% / 58% 58% 42% 42%;
          background:
            radial-gradient(35% 35% at 28% 28%, rgba(255,255,255,0.5), rgba(255,255,255,0)),
            linear-gradient(150deg, rgba(255,255,255,0.16), rgba(0,0,0,0.15)),
            var(--afx-balloon-color);
          box-shadow: 0 10px 18px rgba(30, 16, 10, 0.12), inset -5px -7px 12px rgba(0,0,0,0.1);
          transform-origin: 50% 70%;
          animation: afxBalloonFloat ease-in-out infinite;
          will-change: transform;
        }

        .afx-balloon::after {
          content: "";
          position: absolute;
          left: 50%;
          top: calc(100% + 2px);
          width: 1px;
          height: 44px;
          transform: translateX(-50%);
          background: linear-gradient(180deg, rgba(113, 80, 50, 0.4), rgba(113, 80, 50, 0.04));
        }

        .afx-vignette {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(130% 120% at 50% 55%, rgba(0,0,0,0), rgba(8,4,6,0.34)),
            radial-gradient(80% 45% at 50% 0%, rgba(255,233,194,0.09), rgba(255,255,255,0));
        }

        @keyframes afxConfettiFall {
          0% {
            transform: translate3d(calc(var(--afx-cross-drift) * -0.4), -22vh, 0)
              rotate(calc(var(--afx-rot-start) - 14deg));
            opacity: 0;
          }
          10% {
            opacity: calc(var(--afx-opacity) * 0.9);
          }
          36% {
            opacity: calc(var(--afx-opacity) * 1.02);
          }
          58% {
            transform: translate3d(calc(var(--afx-drift) + var(--afx-cross-drift)), 46vh, 0)
              rotate(calc(var(--afx-rot-start) + 24deg));
            opacity: calc(var(--afx-opacity) * 0.84);
          }
          100% {
            transform: translate3d(calc(var(--afx-drift) * -0.65), 114vh, 0) rotate(var(--afx-rot-end));
            opacity: 0;
          }
        }

        @keyframes afxTwinkle {
          0%,
          100% {
            opacity: 0.1;
            transform: scale(0.82);
          }
          48% {
            opacity: 0.82;
            transform: scale(1);
          }
        }

        @keyframes afxBreathe {
          0%,
          100% {
            transform: translate3d(0, 0, 0) scale(1);
            opacity: 0.14;
          }
          50% {
            transform: translate3d(0, -6px, 0) scale(1.08);
            opacity: 0.32;
          }
        }

        @keyframes afxBalloonFloat {
          0%,
          100% {
            transform: translate3d(0, 0, 0) rotate(-0.7deg) scale(var(--afx-balloon-scale));
          }
          26% {
            transform: translate3d(
                calc(var(--afx-balloon-sway) * 0.42 + var(--afx-balloon-drift)),
                calc(var(--afx-balloon-bob) * -0.55),
                0
              )
              rotate(0.65deg) scale(var(--afx-balloon-scale));
          }
          52% {
            transform: translate3d(var(--afx-balloon-sway), calc(var(--afx-balloon-bob) * -1), 0) rotate(1.1deg)
              scale(var(--afx-balloon-scale));
          }
          78% {
            transform: translate3d(calc(var(--afx-balloon-sway) * -0.36), calc(var(--afx-balloon-bob) * -0.42), 0)
              rotate(0.3deg)
              scale(var(--afx-balloon-scale));
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .afx-confetti,
          .afx-bokeh,
          .afx-sparkle,
          .afx-balloon {
            animation: none !important;
          }
        }
      `}</style>

      {confetti.map((piece) => (
        <span
          key={`confetti-${piece.id}`}
          className="afx-confetti"
          style={{
            left: piece.left,
            top: piece.top,
            width: piece.width,
            height: piece.height,
            background: piece.color,
            opacity: piece.opacity,
            animationDuration: `${piece.duration}s`,
            animationDelay: `${piece.delay}s`,
            "--afx-drift": `${piece.drift}px`,
            "--afx-cross-drift": `${piece.crossDrift}px`,
            "--afx-rot-start": `${piece.rotateStart}deg`,
            "--afx-rot-end": `${piece.rotateEnd}deg`,
            "--afx-opacity": `${piece.opacity}`,
            filter: `blur(${piece.blur.toFixed(2)}px) drop-shadow(0 2px 2px rgba(0,0,0,0.25)) contrast(1.1) saturate(1.1) brightness(0.9)`,
          }}
        />
      ))}

      {sparkles.map((sparkle) => (
        <span
          key={`sparkle-${sparkle.id}`}
          className="afx-sparkle"
          style={{
            left: sparkle.left,
            top: sparkle.top,
            fontSize: sparkle.size,
            opacity: sparkle.opacity,
            animationDuration: `${sparkle.duration}s`,
            animationDelay: `${sparkle.delay}s`,
          }}
        >
          ✦
        </span>
      ))}

      {sparkles.slice(0, 4).map((sparkle) => (
        <span
          key={`bokeh-${sparkle.id}`}
          className="afx-bokeh"
          style={{
            left: `calc(${sparkle.left} - 12px)`,
            top: `calc(${sparkle.top} - 8px)`,
            width: 26,
            height: 26,
            animationDuration: `${sparkle.duration + 1.4}s`,
            animationDelay: `${sparkle.delay - 0.3}s`,
          }}
        />
      ))}

      {balloons.map((balloon) => (
        <span
          key={`balloon-${balloon.id}`}
          className="afx-balloon"
          style={{
            left: balloon.left,
            top: balloon.top,
            opacity: balloon.opacity,
            animationDuration: `${balloon.duration}s`,
            animationDelay: `${balloon.delay}s`,
            "--afx-balloon-scale": `${balloon.scale}`,
            "--afx-balloon-sway": `${balloon.sway}px`,
            "--afx-balloon-bob": `${balloon.bob}px`,
            "--afx-balloon-drift": `${balloon.drift}px`,
            "--afx-balloon-color": balloon.color,
          }}
        />
      ))}

      <div className="afx-vignette" />
    </div>
  );
}
