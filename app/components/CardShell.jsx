"use client";

import React, { useEffect, useState } from "react";
import AmbientFX from "./AmbientFX";

export default function CardShell({ children, stepKey }) {
  const [scrollY, setScrollY] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(media.matches);
    const onChange = (event) => setReducedMotion(event.matches);
    media.addEventListener?.("change", onChange);

    if (media.matches) {
      return () => media.removeEventListener?.("change", onChange);
    }

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const next = window.scrollY || 0;
        setScrollY(next);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      media.removeEventListener?.("change", onChange);
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div style={shell} data-step={stepKey}>
      <style>{`
        .cardshell-glow {
          animation: cardshellGlow 14s ease-in-out infinite;
        }

        .cardshell-breathe {
          animation: cardshellBreathe 6s ease-in-out infinite;
          transform-origin: 50% 32%;
        }

        @keyframes cardshellGlow {
          0%,
          100% {
            opacity: 0.18;
          }
          50% {
            opacity: 0.34;
          }
        }

        @keyframes cardshellBreathe {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.005);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .cardshell-glow,
          .cardshell-breathe {
            animation: none !important;
          }
        }
      `}</style>

      <div style={shellBackdrop} />

      <div style={frameWrap}>
        <div
          style={{
            ...parallaxBackLayer,
            transform: reducedMotion
              ? "none"
              : `translate3d(0, ${clampParallax(scrollY * 0.02)}px, 0)`,
          }}
        />

        <div
          style={{
            ...parallaxMidLayer,
            transform: reducedMotion
              ? "none"
              : `translate3d(0, ${clampParallax(scrollY * 0.04)}px, 0)`,
          }}
        />

        <div
          style={{
            ...parallaxFrontGlow,
            transform: reducedMotion
              ? "none"
              : `translate3d(0, ${clampParallax(scrollY * 0.06)}px, 0)`,
          }}
        />

        <section style={frame} className="cardshell-breathe">
          <div style={innerBorderA} />
          <div style={innerBorderB} />
          <div style={paperTexture} />
          <div style={topGlow} className="cardshell-glow" />

          <AmbientFX variant="inside" zIndex={1} confettiCount={10} sparkleCount={7} balloonCount={3} />

          <div style={contentWrap}>{children}</div>
        </section>
      </div>
    </div>
  );
}

const shell = {
  minHeight: "100dvh",
  padding: "14px 12px 28px",
  position: "relative",
  isolation: "isolate",
};

const shellBackdrop = {
  position: "absolute",
  inset: 0,
  zIndex: -3,
  background:
    "radial-gradient(140% 120% at 50% 0%, rgba(243,199,120,0.2), rgba(23,11,15,0.94) 62%), radial-gradient(90% 70% at 0% 100%, rgba(64,32,45,0.34), rgba(0,0,0,0))",
};

const frameWrap = {
  width: "100%",
  maxWidth: 1040,
  margin: "0 auto",
  position: "relative",
};

const parallaxBackLayer = {
  position: "absolute",
  inset: "-16px -20px -2px",
  borderRadius: 38,
  pointerEvents: "none",
  background:
    "radial-gradient(95% 44% at 50% 0%, rgba(226, 184, 119, 0.08), rgba(255,255,255,0)), repeating-linear-gradient(120deg, rgba(180, 128, 66, 0.04) 0 12px, rgba(180, 128, 66, 0) 12px 26px)",
};

const parallaxMidLayer = {
  position: "absolute",
  inset: "-12px -14px 0",
  borderRadius: 34,
  pointerEvents: "none",
  background:
    "radial-gradient(75% 36% at 50% 0%, rgba(244,208,139,0.2), rgba(255,255,255,0)), radial-gradient(80% 70% at 50% 100%, rgba(44,20,34,0.24), rgba(0,0,0,0))",
  filter: "blur(0.4px)",
};

const parallaxFrontGlow = {
  position: "absolute",
  inset: "-6px -6px 8px",
  borderRadius: 30,
  pointerEvents: "none",
  background:
    "radial-gradient(84% 36% at 50% 2%, rgba(235, 191, 111, 0.14), rgba(255,255,255,0)), radial-gradient(120% 100% at 50% 100%, rgba(28, 18, 15, 0.12), rgba(0,0,0,0))",
};

const frame = {
  position: "relative",
  borderRadius: 30,
  overflow: "hidden",
  border: "1px solid rgba(236, 203, 151, 0.3)",
  background:
    "linear-gradient(170deg, rgba(236,224,203,0.93), rgba(220,204,176,0.9)), radial-gradient(120% 100% at 0% 0%, rgba(255,241,209,0.38), rgba(255,255,255,0))",
  boxShadow: "0 26px 76px rgba(0, 0, 0, 0.5)",
};

const innerBorderA = {
  position: "absolute",
  inset: 14,
  borderRadius: 24,
  border: "1px solid rgba(160, 121, 74, 0.3)",
  pointerEvents: "none",
  zIndex: 3,
};

const innerBorderB = {
  position: "absolute",
  inset: 24,
  borderRadius: 20,
  border: "1px solid rgba(88, 58, 38, 0.16)",
  pointerEvents: "none",
  zIndex: 3,
};

const paperTexture = {
  position: "absolute",
  inset: 0,
  zIndex: 0,
  pointerEvents: "none",
  backgroundImage:
    "radial-gradient(circle at 12% 8%, rgba(255,255,255,0.36), rgba(255,255,255,0) 48%), radial-gradient(circle at 86% 16%, rgba(246,226,182,0.22), rgba(255,255,255,0) 58%), repeating-linear-gradient(0deg, rgba(67,44,23,0.03) 0px, rgba(67,44,23,0.03) 1px, transparent 1px, transparent 36px), repeating-linear-gradient(90deg, rgba(67,44,23,0.025) 0px, rgba(67,44,23,0.025) 1px, transparent 1px, transparent 36px)",
};

const topGlow = {
  position: "absolute",
  inset: 0,
  zIndex: 2,
  pointerEvents: "none",
  background: "radial-gradient(82% 42% at 50% 0%, rgba(247,208,131,0.22), rgba(255,255,255,0))",
};

const contentWrap = {
  position: "relative",
  zIndex: 5,
  padding: "12px",
};

function clampParallax(value) {
  return Math.max(-4, Math.min(4, value));
}
