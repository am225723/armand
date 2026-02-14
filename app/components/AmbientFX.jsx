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
  const config =
    !isInside
      ? { confetti: confettiCount ?? 20, sparkles: sparkleCount ?? 10, balloons: balloonCount ?? 6 }
      : { confetti: confettiCount ?? 10, sparkles: sparkleCount ?? 8, balloons: balloonCount ?? 3 };

  const confetti = useMemo(
    () =>
      Array.from({ length: config.confetti }).map((_, index) => ({
        id: index,
        left: `${3 + ((index * 8.1) % 94)}%`,
        size: index % 3 === 0 ? 6 : 4,
        drift: 10 + (index % 5) * 6,
        rotate: -26 + index * 11,
        duration: (isInside ? 24 : 16) + (index % 6) * 2,
        delay: -(index % 8) * 1.5,
        opacity: isInside ? (index % 2 === 0 ? 0.11 : 0.07) : index % 2 === 0 ? 0.24 : 0.17,
        color: CONFETTI_COLORS[index % CONFETTI_COLORS.length],
      })),
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
        sway: 8 + (index % 4) * 3,
        duration: 21 + (index % 4) * 2,
        delay: -index * 2.3,
        color: BALLOON_COLORS[index % BALLOON_COLORS.length],
        opacity: 0.2,
      })),
    [config.balloons]
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
          --afx-rot: 10deg;
          position: absolute;
          border-radius: 2px;
          animation: afxConfettiFall linear infinite;
          will-change: transform, opacity;
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
            transform: translate3d(0, -12vh, 0) rotate(calc(var(--afx-rot) - 12deg));
            opacity: 0;
          }
          12% {
            opacity: 0.66;
          }
          60% {
            transform: translate3d(var(--afx-drift), 54vh, 0) rotate(calc(var(--afx-rot) + 24deg));
          }
          100% {
            transform: translate3d(calc(var(--afx-drift) * -0.75), 112vh, 0) rotate(calc(var(--afx-rot) + 56deg));
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
          50% {
            transform: translate3d(var(--afx-balloon-sway), -10px, 0) rotate(1.1deg)
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
            top: "-10%",
            width: piece.size,
            height: piece.size + 1,
            background: piece.color,
            opacity: piece.opacity,
            animationDuration: `${piece.duration}s`,
            animationDelay: `${piece.delay}s`,
            "--afx-drift": `${piece.drift}px`,
            "--afx-rot": `${piece.rotate}deg`,
            filter: isInside ? "blur(0.6px)" : "none",
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
            "--afx-balloon-color": balloon.color,
          }}
        />
      ))}

      <div className="afx-vignette" />
    </div>
  );
}
