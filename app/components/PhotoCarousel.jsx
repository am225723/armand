"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";

const MEMORY_CHIPS = ["Session #1", "Milestone", "Victory Lap", "Prime Focus"];
const MEMORY_TITLES = [
  "Memory #1: Locked In",
  "Memory #2: Momentum",
  "Memory #3: Precision",
  "Memory #4: Night Shift",
];
const MEMORY_NOTES = [
  "You stayed calm, focused, and fully in command.",
  "Every step felt intentional, steady, and sharp.",
  "Your patience made the result feel effortless.",
  "Confidence looked natural on you that night.",
];

export default function PhotoCarousel({ photos = [], captions = [] }) {
  const [i, setI] = useState(0);
  const [activeMemory, setActiveMemory] = useState(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [slideDir, setSlideDir] = useState(1);
  const [slideTick, setSlideTick] = useState(0);

  const safePhotos = useMemo(() => (photos || []).filter(Boolean), [photos]);
  const frameRef = useRef(null);
  const tiltRafRef = useRef(0);
  const pendingTiltRef = useRef({ x: 0, y: 0 });

  const count = safePhotos.length || 1;

  const src = safePhotos[i] || safePhotos[0] || "";
  const cap = captions?.[i] ?? `Memory ${i + 1}`;
  const memoryLabel = `Memory ${String(i + 1).padStart(2, "0")}`;
  const memorySubtitle = cap || "A favorite moment";
  const memoryChip = MEMORY_CHIPS[i % MEMORY_CHIPS.length];
  const memoryTitle = MEMORY_TITLES[i % MEMORY_TITLES.length];
  const memoryNote = MEMORY_NOTES[i % MEMORY_NOTES.length];

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(media.matches);
    const onChange = (event) => setReducedMotion(event.matches);
    media.addEventListener?.("change", onChange);
    return () => media.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    return () => {
      if (tiltRafRef.current) cancelAnimationFrame(tiltRafRef.current);
    };
  }, []);

  const applyTilt = () => {
    tiltRafRef.current = 0;
    const node = frameRef.current;
    if (!node) return;
    const { x, y } = pendingTiltRef.current;
    node.style.setProperty("--tilt-x", `${x.toFixed(2)}deg`);
    node.style.setProperty("--tilt-y", `${y.toFixed(2)}deg`);
  };

  const onPointerMove = (event) => {
    if (reducedMotion || !frameRef.current) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const py = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    pendingTiltRef.current = {
      x: Math.max(-3, Math.min(3, py * -3)),
      y: Math.max(-3, Math.min(3, px * 3)),
    };
    if (!tiltRafRef.current) tiltRafRef.current = requestAnimationFrame(applyTilt);
  };

  const resetTilt = () => {
    pendingTiltRef.current = { x: 0, y: 0 };
    if (!tiltRafRef.current) tiltRafRef.current = requestAnimationFrame(applyTilt);
  };

  const changeBy = (delta) => {
    setSlideDir(delta >= 0 ? 1 : -1);
    setSlideTick((v) => v + 1);
    setI((v) => (v + delta + count) % count);
  };

  const jumpTo = (nextIndex) => {
    setI((current) => {
      const normalized = ((nextIndex % count) + count) % count;
      if (normalized === current) return current;

      const direct = normalized - current;
      const wrapped = direct > 0 ? direct - count : direct + count;
      const shortest = Math.abs(direct) <= Math.abs(wrapped) ? direct : wrapped;

      setSlideDir(shortest >= 0 ? 1 : -1);
      setSlideTick((v) => v + 1);
      return normalized;
    });
  };

  const prev = () => changeBy(-1);
  const next = () => changeBy(1);

  return (
    <div
      style={{
        width: "100%",
        borderRadius: 22,
        border: "1px solid rgba(170, 125, 77, 0.34)",
        background:
          "linear-gradient(170deg, rgba(250,245,236,0.96), rgba(233,221,199,0.92)), radial-gradient(130% 100% at 50% 0%, rgba(242,203,129,0.26), rgba(255,255,255,0))",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.72), 0 18px 40px rgba(29, 17, 10, 0.22)",
        padding: 10,
        position: "relative",
      }}
    >
      <style>{`
        .memory-frame {
          --tilt-x: 0deg;
          --tilt-y: 0deg;
          transform: perspective(900px) rotateX(var(--tilt-x)) rotateY(var(--tilt-y));
          transition: transform 240ms cubic-bezier(.2,.72,.2,1);
        }

        .memory-slide {
          animation: memorySlideIn 320ms cubic-bezier(.2,.72,.2,1) both;
        }

        .memory-caption {
          animation: memoryCaptionIn 280ms ease both;
        }

        .memory-modal {
          animation: memoryModalIn 340ms cubic-bezier(.2,.72,.2,1) both;
        }

        .memory-backdrop {
          animation: memoryBackdropIn 220ms ease both;
        }

        .memory-grain {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 25% 20%, rgba(255,255,255,0.1), rgba(255,255,255,0) 42%),
            radial-gradient(circle at 70% 65%, rgba(255,255,255,0.08), rgba(255,255,255,0) 35%),
            repeating-linear-gradient(0deg, rgba(255,255,255,0.02) 0 1px, transparent 1px 3px);
          mix-blend-mode: soft-light;
          opacity: 0.18;
          pointer-events: none;
        }

        @keyframes memorySlideIn {
          from {
            opacity: 0;
            transform: translate3d(var(--slide-shift, 4px), 0, 0) scale(1.01);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
          }
        }

        @keyframes memoryCaptionIn {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes memoryModalIn {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes memoryBackdropIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .memory-frame {
            transform: none !important;
            transition: none !important;
          }
          .memory-slide,
          .memory-caption,
          .memory-modal,
          .memory-backdrop {
            animation: none !important;
          }
        }
      `}</style>

      <div style={goldCornerTL} />
      <div style={goldCornerBR} />

      <div
        ref={frameRef}
        className="memory-frame"
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16 / 9",
          borderRadius: 16,
          overflow: "hidden",
          border: "1px solid rgba(164, 121, 72, 0.3)",
          boxShadow: "0 14px 30px rgba(0,0,0,0.24)",
          touchAction: "pan-y",
        }}
        onPointerMove={onPointerMove}
        onPointerLeave={resetTilt}
        onPointerCancel={resetTilt}
      >
        {src ? (
          <div
            key={`${src}-${slideTick}`}
            className="memory-slide"
            style={{
              width: "100%",
              height: "100%",
              "--slide-shift": `${slideDir * 6}px`,
            }}
          >
            <img
              src={src}
              alt={cap || `Photo ${i + 1}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                cursor: "zoom-in",
              }}
              onClick={() =>
                setActiveMemory({
                  title: memoryTitle,
                  caption: cap,
                  chip: memoryChip,
                  note: memoryNote,
                  src,
                })
              }
            />
          </div>
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "grid",
              placeItems: "center",
              color: "rgba(255,255,255,.7)",
            }}
          >
            No photos found
          </div>
        )}

        <div className="memory-grain" />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(18,12,8,.72), rgba(18,12,8,0) 58%)",
          }}
        />

        <div
          key={`caption-${i}`}
          className="memory-caption"
          style={{
            position: "absolute",
            left: 12,
            right: 12,
            bottom: 10,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div>
            <div style={memoryMetaTitle}>{memoryLabel}</div>
            <div style={memoryMetaSub}>{memorySubtitle}</div>
            <span style={chipOverlay}>{memoryChip}</span>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={prev} style={pillBtn()} aria-label="Previous photo">
              ‹
            </button>
            <button onClick={next} style={pillBtn()} aria-label="Next photo">
              ›
            </button>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 6, padding: "10px 12px", justifyContent: "center", alignItems: "center" }}>
        {Array.from({ length: count }).map((_, idx) => (
          <span
            key={idx}
            onClick={() => jumpTo(idx)}
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              cursor: "pointer",
              background: idx === i ? "rgba(226,184,119,.95)" : "rgba(120,85,54,.22)",
              boxShadow: idx === i ? "0 0 16px rgba(226,184,119,.45)" : "none",
            }}
          />
        ))}
      </div>

      {activeMemory && (
        <div
          role="button"
          tabIndex={0}
          aria-label="Close memory modal"
          onClick={() => setActiveMemory(null)}
          onKeyDown={(event) => {
            if (event.key === "Escape" || event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              setActiveMemory(null);
            }
          }}
          style={modalBackdrop}
          className="memory-backdrop"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={activeMemory.title}
            onClick={(event) => event.stopPropagation()}
            style={modalCard}
            className="memory-modal"
          >
            <button
              type="button"
              style={modalClose}
              onClick={() => setActiveMemory(null)}
              aria-label="Close"
            >
              ✕
            </button>

            <div style={modalHeader}>Memories</div>
            <h3 style={modalTitle}>{activeMemory.title}</h3>
            <div style={modalChip}>{activeMemory.chip}</div>
            <p style={modalNote}>{activeMemory.note}</p>
            <div style={modalCaption}>{activeMemory.caption}</div>
          </div>
        </div>
      )}
    </div>
  );
}

function pillBtn() {
  return {
    appearance: "none",
    width: 38,
    height: 38,
    borderRadius: 999,
    border: "1px solid rgba(255,235,201,.3)",
    background: "rgba(29,19,14,.42)",
    color: "#fff2d6",
    fontWeight: 900,
    fontSize: 18,
    lineHeight: "18px",
    cursor: "pointer",
    backdropFilter: "blur(8px)",
  };
}

const goldCornerTL = {
  position: "absolute",
  left: 9,
  top: 9,
  width: 14,
  height: 14,
  borderTop: "2px solid rgba(226,184,119,0.86)",
  borderLeft: "2px solid rgba(226,184,119,0.86)",
  borderTopLeftRadius: 3,
  pointerEvents: "none",
};

const goldCornerBR = {
  position: "absolute",
  right: 9,
  bottom: 9,
  width: 14,
  height: 14,
  borderBottom: "2px solid rgba(226,184,119,0.86)",
  borderRight: "2px solid rgba(226,184,119,0.86)",
  borderBottomRightRadius: 3,
  pointerEvents: "none",
};

const memoryMetaTitle = {
  color: "rgba(255, 241, 214, 0.96)",
  fontWeight: 860,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  fontSize: 11,
  textShadow: "0 2px 16px rgba(0,0,0,.7)",
};

const memoryMetaSub = {
  marginTop: 2,
  color: "rgba(245, 232, 207, 0.9)",
  fontWeight: 700,
  fontSize: 13,
  textShadow: "0 2px 14px rgba(0,0,0,.66)",
};

const chipOverlay = {
  display: "inline-block",
  marginTop: 4,
  borderRadius: 999,
  border: "1px solid rgba(226,184,119,0.36)",
  background: "rgba(18,12,8,0.58)",
  color: "rgba(245,232,207,0.95)",
  padding: "3px 8px",
  fontSize: 11,
  letterSpacing: "0.03em",
};

const modalBackdrop = {
  position: "fixed",
  inset: 0,
  border: "none",
  margin: 0,
  padding: 14,
  background: "rgba(10, 7, 5, 0.6)",
  backdropFilter: "blur(4px)",
  display: "grid",
  placeItems: "center",
  zIndex: 40,
  cursor: "pointer",
};

const modalCard = {
  width: "min(92vw, 430px)",
  borderRadius: 20,
  border: "1px solid rgba(226, 184, 119, 0.32)",
  background:
    "linear-gradient(170deg, rgba(34,24,19,0.96), rgba(25,18,14,0.94)), radial-gradient(120% 100% at 50% 0%, rgba(226,184,119,0.22), rgba(0,0,0,0))",
  boxShadow: "0 20px 46px rgba(0, 0, 0, 0.55)",
  textAlign: "left",
  color: "#f5e8cf",
  padding: "16px 14px 14px",
  cursor: "default",
  position: "relative",
};

const modalClose = {
  appearance: "none",
  border: "1px solid rgba(226,184,119,0.34)",
  background: "rgba(255,255,255,0.05)",
  color: "#f5e8cf",
  width: 30,
  height: 30,
  borderRadius: 999,
  fontWeight: 900,
  cursor: "pointer",
  position: "absolute",
  right: 10,
  top: 10,
};

const modalHeader = {
  fontSize: 11,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  opacity: 0.72,
  fontWeight: 800,
};

const modalTitle = {
  margin: "8px 0 0",
  fontFamily: "var(--font-script)",
  fontSize: "clamp(30px, 8.2vw, 44px)",
  lineHeight: 0.9,
  color: "#f5e8cf",
};

const modalChip = {
  marginTop: 8,
  display: "inline-block",
  borderRadius: 999,
  border: "1px solid rgba(226,184,119,0.28)",
  background: "rgba(226,184,119,0.16)",
  padding: "4px 10px",
  fontSize: 12,
};

const modalNote = {
  marginTop: 10,
  marginBottom: 0,
  fontSize: 14,
  lineHeight: 1.4,
  color: "rgba(245,232,207,0.9)",
};

const modalCaption = {
  marginTop: 10,
  fontSize: 12,
  opacity: 0.74,
};
