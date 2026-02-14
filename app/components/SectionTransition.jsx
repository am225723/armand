"use client";

import React, { useEffect, useRef, useState } from "react";

export default function SectionTransition({
  transitionKey,
  children,
  durationMs = 420,
  showGoldenSweep = true,
}) {
  const currentKeyRef = useRef(transitionKey);
  const [currentContent, setCurrentContent] = useState(children);
  const [nextContent, setNextContent] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [showSweep, setShowSweep] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(media.matches);
    const onChange = (event) => setReducedMotion(event.matches);
    media.addEventListener?.("change", onChange);
    return () => media.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    if (transitionKey === currentKeyRef.current) {
      setCurrentContent(children);
      return;
    }

    if (reducedMotion) {
      currentKeyRef.current = transitionKey;
      setCurrentContent(children);
      setNextContent(null);
      setAnimating(false);
      return;
    }

    setNextContent(children);
    setAnimating(false);
    if (showGoldenSweep) {
      setShowSweep(true);
      setTimeout(() => setShowSweep(false), durationMs + 180);
    }

    const raf = requestAnimationFrame(() => setAnimating(true));
    const timer = setTimeout(() => {
      currentKeyRef.current = transitionKey;
      setCurrentContent(children);
      setNextContent(null);
      setAnimating(false);
    }, durationMs);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [children, durationMs, reducedMotion, showGoldenSweep, transitionKey]);

  return (
    <div style={root} className={nextContent ? "section-transition-busy" : undefined}>
      <style>{`
        .section-transition-panel {
          transition: opacity 420ms cubic-bezier(.2,.72,.2,1), transform 420ms cubic-bezier(.2,.72,.2,1);
          will-change: opacity, transform;
        }

        .section-transition-current {
          position: relative;
          grid-area: 1 / 1;
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .section-transition-next {
          position: relative;
          grid-area: 1 / 1;
          opacity: 0;
          transform: translateY(10px) scale(0.985);
          pointer-events: none;
        }

        .section-transition-current.leave {
          opacity: 0;
          transform: translateY(-8px) scale(0.986);
        }

        .section-transition-next.enter {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .section-transition-sweep {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 7;
          overflow: hidden;
        }

        .section-transition-sweep::before {
          content: "";
          position: absolute;
          top: -18%;
          bottom: -18%;
          width: 44%;
          left: -48%;
          background: linear-gradient(100deg, rgba(255,255,255,0), rgba(244,208,140,0.11), rgba(249,218,158,0.34), rgba(255,255,255,0));
          filter: blur(1px);
          animation: sectionSweep 520ms cubic-bezier(.2,.65,.15,1) forwards;
        }

        @keyframes sectionSweep {
          0% {
            transform: translateX(0);
            opacity: 0;
          }
          12% {
            opacity: 1;
          }
          100% {
            transform: translateX(340%);
            opacity: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .section-transition-panel,
          .section-transition-current.leave,
          .section-transition-next.enter,
          .section-transition-next {
            transition: opacity 220ms ease !important;
            transform: none !important;
          }

          .section-transition-sweep {
            display: none !important;
          }
        }
      `}</style>

      <div
        className={`section-transition-panel section-transition-current${nextContent && animating ? " leave" : ""}`}
      >
        {currentContent}
      </div>

      {nextContent && (
        <div
          className={`section-transition-panel section-transition-next${animating ? " enter" : ""}`}
          style={{ pointerEvents: "none" }}
        >
          {nextContent}
        </div>
      )}

      {showSweep && !reducedMotion && <div className="section-transition-sweep" />}
    </div>
  );
}

const root = {
  position: "relative",
  width: "100%",
  display: "grid",
};
