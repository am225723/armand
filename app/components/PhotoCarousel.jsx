"use client";
import React, { useMemo, useState } from "react";

export default function PhotoCarousel({ photos = [], captions = [] }) {
  const [i, setI] = useState(0);
  const safePhotos = useMemo(() => (photos || []).filter(Boolean), [photos]);
  const count = safePhotos.length || 1;

  const prev = () => setI((v) => (v - 1 + count) % count);
  const next = () => setI((v) => (v + 1) % count);

  const src = safePhotos[i] || safePhotos[0] || "";
  const cap = captions?.[i] ?? "";

  return (
    <div
      style={{
        width: "100%",
        borderRadius: 18,
        border: "1px solid rgba(255,255,255,.12)",
        overflow: "hidden",
        background: "rgba(0,0,0,.20)",
        boxShadow: "0 18px 55px rgba(0,0,0,.35)",
      }}
    >
      <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 9" }}>
        {src ? (
          <img
            src={src}
            alt={cap || `Photo ${i + 1}`}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        ) : (
          <div style={{ width: "100%", height: "100%", display: "grid", placeItems: "center", color: "rgba(255,255,255,.7)" }}>
            No photos found
          </div>
        )}

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,.62), rgba(0,0,0,0) 60%)",
          }}
        />

        <div style={{ position: "absolute", left: 12, right: 12, bottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
          <div style={{ color: "white", fontWeight: 900, textShadow: "0 2px 16px rgba(0,0,0,.7)" }}>
            {cap || `Memory ${i + 1}`}
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

      <div style={{ display: "flex", gap: 6, padding: "10px 12px", justifyContent: "center" }}>
        {Array.from({ length: count }).map((_, idx) => (
          <span
            key={idx}
            onClick={() => setI(idx)}
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              cursor: "pointer",
              background: idx === i ? "rgba(255,210,122,.95)" : "rgba(255,255,255,.22)",
              boxShadow: idx === i ? "0 0 18px rgba(255,210,122,.55)" : "none",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function pillBtn() {
  return {
    appearance: "none",
    width: 38,
    height: 38,
    borderRadius: 999,
    border: "1px solid rgba(255,255,255,.16)",
    background: "rgba(0,0,0,.28)",
    color: "white",
    fontWeight: 900,
    fontSize: 18,
    lineHeight: "18px",
    cursor: "pointer",
    backdropFilter: "blur(8px)",
  };
}