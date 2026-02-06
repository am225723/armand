"use client";
import { useEffect, useRef, useState } from "react";

export default function ArcheryGame({ onComplete }) {
  const canvasRef = useRef(null);
  const imagesRef = useRef({ loaded: false });

  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const bow = new Image();
    const arrow = new Image();
    const candle = new Image();

    bow.src = "/game/bow.png";
    arrow.src = "/game/arrow.png";
    candle.src = "/game/candle.png";

    let loaded = 0;
    const done = () => {
      loaded++;
      if (loaded === 3) {
        imagesRef.current = { bow, arrow, candle, loaded: true };
      }
    };

    bow.onload = done;
    arrow.onload = done;
    candle.onload = done;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const DPR = window.devicePixelRatio || 1;
    canvas.width = 360 * DPR;
    canvas.height = 520 * DPR;
    canvas.style.width = "360px";
    canvas.style.height = "520px";
    ctx.scale(DPR, DPR);

    const GRAVITY = 1200;

    const arrowState = {
      x: 60,
      y: 420,
      vx: 0,
      vy: 0,
      flying: false,
      rot: 0,
    };

    const candles = Array.from({ length: 5 }).map((_, i) => ({
      x: 220 + i * 28,
      y: 280,
      w: 26,
      h: 90,
      alive: true,
    }));

    let aiming = false;
    let aimX = 0;
    let aimY = 0;

    const down = (e) => {
      aiming = true;
      aimX = e.offsetX;
      aimY = e.offsetY;
    };

    const up = (e) => {
      if (!aiming) return;
      aiming = false;
      const dx = 60 - aimX;
      const dy = 420 - aimY;
      arrowState.vx = dx * 6;
      arrowState.vy = dy * 6;
      arrowState.flying = true;
    };

    canvas.addEventListener("pointerdown", down);
    canvas.addEventListener("pointerup", up);

    let last = performance.now();

    function loop(t) {
      const dt = Math.min(0.033, (t - last) / 1000);
      last = t;

      ctx.clearRect(0, 0, 360, 520);

      // background
      ctx.fillStyle = "#f3e9d8";
      ctx.fillRect(0, 0, 360, 520);

      if (arrowState.flying) {
        arrowState.vy += GRAVITY * dt;
        arrowState.x += arrowState.vx * dt;
        arrowState.y += arrowState.vy * dt;
        arrowState.rot = Math.atan2(arrowState.vy, arrowState.vx);
      }

      const imgs = imagesRef.current;

      // candles
      if (imgs.loaded) {
        candles.forEach((c) => {
          if (!c.alive) return;
          ctx.drawImage(
            imgs.candle,
            c.x - c.w / 2,
            c.y - c.h,
            c.w,
            c.h
          );
        });
      }

      // collision
      candles.forEach((c) => {
        if (!c.alive || !arrowState.flying) return;
        if (
          arrowState.x > c.x - c.w / 2 &&
          arrowState.x < c.x + c.w / 2 &&
          arrowState.y > c.y - c.h &&
          arrowState.y < c.y
        ) {
          c.alive = false;
          arrowState.flying = false;
        }
      });

      // arrow
      if (imgs.loaded && arrowState.flying) {
        ctx.save();
        ctx.translate(arrowState.x, arrowState.y);
        ctx.rotate(arrowState.rot);
        ctx.drawImage(imgs.arrow, -10, -4, 120, 8);
        ctx.restore();
      }

      // bow
      if (imgs.loaded) {
        ctx.drawImage(imgs.bow, 10, 340, 120, 160);
      }

      if (!completed && candles.every((c) => !c.alive)) {
        setCompleted(true);
        setTimeout(onComplete, 600);
      }

      requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);

    return () => {
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointerup", up);
    };
  }, [onComplete, completed]);

  return <canvas ref={canvasRef} style={{ touchAction: "none" }} />;
}
