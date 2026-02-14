"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";

const POLAROID_ROTATIONS = [-1.5, 1.2, -0.85, 1.35, -1.1, 0.95];
const POLAROID_MESSAGE = "Happy Birthday Luke";

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
  const polaroidRotation = reducedMotion ? 0 : POLAROID_ROTATIONS[i % POLAROID_ROTATIONS.length];

  const captionParts = useMemo(() => {
    const raw = typeof cap === "string" ? cap.trim() : "";
    if (!raw) return { main: `Memory ${i + 1}`, meta: "" };

    const separators = ["|", "\u2022", "\u2014"];
    for (const sep of separators) {
      if (!raw.includes(sep)) continue;
      const [main, ...metaParts] = raw.split(sep);
      return {
        main: (main || "").trim() || `Memory ${i + 1}`,
        meta: metaParts.join(sep).trim(),
      };
    }

    return { main: raw, meta: "" };
  }, [cap, i]);

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
          --photo-rotation: 0deg;
          transform: perspective(980px) rotateX(var(--tilt-x)) rotateY(var(--tilt-y)) rotate(var(--photo-rotation));
          transition: transform 260ms ease, box-shadow 280ms ease;
          background:
            linear-gradient(175deg, rgba(248,242,230,0.98), rgba(239,229,210,0.95)),
            radial-gradient(130% 100% at 50% 0%, rgba(255,255,255,0.55), rgba(255,255,255,0));
          box-shadow: 0 14px 28px rgba(42,28,14,0.2), inset 0 1px 0 rgba(255,255,255,0.9);
        }

        .memory-frame-active {
          box-shadow: 0 22px 38px rgba(38,24,12,0.28), inset 0 1px 0 rgba(255,255,255,0.92);
        }

        .memory-photo-window {
          position: absolute;
          top: 12px;
          left: 12px;
          right: 12px;
          bottom: 86px;
          border-radius: 10px;
          overflow: hidden;
          border: 1px solid rgba(147,120,91,0.24);
          box-shadow: 0 10px 22px rgba(0,0,0,0.2);
          background: rgba(238,226,208,0.6);
          transition: box-shadow 260ms ease;
        }

        .memory-frame-active .memory-photo-window {
          box-shadow: 0 16px 30px rgba(0,0,0,0.26);
        }

        .memory-slide {
          width: 100%;
          height: 100%;
          animation: memorySlideIn 320ms cubic-bezier(.22,.61,.36,1) both;
          transform: scale(var(--slide-scale, 1.02));
          transition: transform 280ms ease;
        }

        .memory-caption {
          animation: memoryCaptionIn 240ms ease both;
        }

        .memory-modal {
          animation: memoryModalIn 320ms cubic-bezier(.22,.61,.36,1) both;
        }

        .memory-backdrop {
          animation: memoryBackdropIn 200ms ease both;
        }

        .memory-grain {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 18% 24%, rgba(255,255,255,0.2), rgba(255,255,255,0) 44%),
            radial-gradient(circle at 74% 70%, rgba(102,74,44,0.08), rgba(255,255,255,0) 45%),
            repeating-linear-gradient(0deg, rgba(94,67,38,0.03) 0 1px, transparent 1px 3px),
            repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0 1px, transparent 1px 4px);
          mix-blend-mode: multiply;
          opacity: 0.42;
          pointer-events: none;
        }

        @keyframes memorySlideIn {
          from {
            opacity: 0.25;
            transform: translate3d(var(--slide-shift, 5px), 0, 0) scale(calc(var(--slide-scale, 1.02) - 0.014));
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(var(--slide-scale, 1.02));
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
          .memory-photo-window {
            transition: none !important;
          }
          .memory-slide {
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
        className="memory-frame memory-frame-active"
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16 / 9",
          borderRadius: 16,
          overflow: "hidden",
          border: "1px solid rgba(170, 134, 98, 0.42)",
          touchAction: "pan-y",
          "--photo-rotation": `${polaroidRotation}deg`,
        }}
        onPointerMove={onPointerMove}
        onPointerLeave={resetTilt}
        onPointerCancel={resetTilt}
      >
        <div className="memory-photo-window">
          {src ? (
            <div
              key={`${src}-${slideTick}`}
              className="memory-slide"
              style={{
                "--slide-shift": `${slideDir * 7}px`,
                "--slide-scale": reducedMotion ? 1 : 1.022,
              }}
            >
              <img
                src={src}
                alt={cap || `Photo ${i + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  display: "block",
                  cursor: "zoom-in",
                  background: "rgba(245, 239, 228, 0.82)",
                }}
                onClick={() =>
                  setActiveMemory({
                    src,
                    alt: cap || `Photo ${i + 1}`,
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
                color: "rgba(60,42,24,0.7)",
                fontFamily: "var(--font-ui)",
                fontSize: 13,
              }}
            >
              No photos found
            </div>
          )}
        </div>

        <div className="memory-grain" />

        <div
          key={`caption-${i}`}
          className="memory-caption"
          style={{
            position: "absolute",
            left: 14,
            right: 14,
            bottom: 12,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div style={{ minWidth: 0 }}>
            <div style={memoryMetaSub}>{captionParts.main || `Memory ${i + 1}`}</div>
            {captionParts.meta ? <div style={memoryMetaAux}>{captionParts.meta}</div> : null}
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
            aria-label={POLAROID_MESSAGE}
            onClick={(event) => event.stopPropagation()}
            style={modalPolaroid}
            className="memory-modal"
          >
            <div style={modalPhotoWindow}>
              <img src={activeMemory.src} alt={activeMemory.alt} style={modalPhoto} />
            </div>
            <div style={modalPolaroidLabel}>{POLAROID_MESSAGE}</div>
          </div>
        </div>
      )}
    </div>
  );
}

function pillBtn() {
  return {
    appearance: "none",
    width: 36,
    height: 36,
    borderRadius: 999,
    border: "1px solid rgba(126, 92, 58, 0.42)",
    background: "rgba(248,242,231,0.82)",
    color: "#5f3d20",
    fontWeight: 900,
    fontSize: 18,
    lineHeight: "18px",
    cursor: "pointer",
    fontFamily: "var(--font-ui)",
    boxShadow: "0 4px 10px rgba(36,22,11,0.15)",
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

const memoryMetaSub = {
  color: "rgba(58, 40, 23, 0.88)",
  fontWeight: 640,
  fontSize: 13,
  lineHeight: 1.2,
  fontFamily: "var(--font-ui)",
  textTransform: "uppercase",
  letterSpacing: "0.09em",
};

const memoryMetaAux = {
  marginTop: 3,
  color: "rgba(72, 50, 30, 0.62)",
  fontSize: 10,
  lineHeight: 1.2,
  fontFamily: "var(--font-ui)",
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

const modalPolaroid = {
  width: "min(92vw, 430px)",
  borderRadius: 10,
  border: "1px solid rgba(216, 198, 170, 0.78)",
  background: "linear-gradient(180deg, rgba(255,255,255,0.99), rgba(248,243,233,0.98))",
  boxShadow: "0 22px 56px rgba(0, 0, 0, 0.54)",
  textAlign: "center",
  color: "#5f3c1f",
  padding: "12px 12px 20px",
  cursor: "default",
  position: "relative",
};

const modalPhotoWindow = {
  borderRadius: 5,
  border: "1px solid rgba(192, 170, 140, 0.65)",
  background: "rgba(244, 236, 223, 0.9)",
  boxShadow: "0 8px 20px rgba(33, 20, 11, 0.2)",
  overflow: "hidden",
};

const modalPhoto = {
  width: "100%",
  height: "min(68vh, 560px)",
  objectFit: "contain",
  display: "block",
  background: "rgba(245, 239, 228, 0.82)",
};

const modalPolaroidLabel = {
  marginTop: 14,
  fontFamily: '"Valentine", "HawaiiLover", "InterSignature", cursive',
  fontSize: "clamp(34px, 8.8vw, 52px)",
  lineHeight: 0.9,
  color: "#613a1f",
  textShadow: "0 1px 6px rgba(243, 208, 142, 0.38)",
};
