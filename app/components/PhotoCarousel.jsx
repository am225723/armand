"use client";
import React, { useMemo, useState } from "react";

export default function PhotoCarousel({ photos = [], captions = [] }) {
  const [i, setI] = useState(0);
  const safePhotos = useMemo(() => (photos || []).filter(Boolean), [photos]);
  const count = safePhotos.length || 1;

  const prev = () => setI((v) => (v - 1 + count) % count);
  const next = () => setI((v) => (v + 1) % count);

  if (!safePhotos.length) return null;

  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          width: "100%",
          borderRadius: 18,
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.10)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
        }}
      >
        <img
          src={safePhotos[i]}
          alt={`Photo ${i + 1}`}
          style={{ width: "100%", height: 360, objectFit: "cover", display: "block" }}
        />
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, gap: 10 }}>
        <button onClick={prev} style={btnStyle}>Prev</button>
        <div style={{ flex: 1, textAlign: "center", opacity: 0.85, fontSize: 14 }}>
          {captions?.[i] ?? `Memory ${i + 1} / ${count}`}
        </div>
        <button onClick={next} style={btnStyle}>Next</button>
      </div>
    </div>
  );
}

const btnStyle = {
  padding: "10px 14px",
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,0.14)",
  background: "rgba(0,0,0,0.35)",
  color: "white",
  fontSize: 14,
};
