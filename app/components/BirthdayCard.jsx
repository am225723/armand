"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";

const BOW_ARROW_CONFIG = {
  // Bow settings
  bowRotation: 180, // Degrees to rotate the bow (90 = vertical)
  bowWidth: 120, // Size of the bow in pixels
  bowOffsetY: 40, // Vertical offset for the entire bow/arrow unit

  // Arrow settings
  arrowRotation: 0, // Degrees to rotate the arrow (0 = horizontal right)
  arrowWidth: 140, // Size of the arrow in pixels
  arrowOffsetX: 30, // Horizontal offset from bow center
  arrowOffsetY: 0, // Vertical offset relative to bow
  pullDistance: 100, // How far arrow moves when pulled back

  // Flight settings
  arrowFlightDistance: 500, // How far the arrow flies (in pixels)
  arrowFlightDuration: 1.5, // Flight animation duration (in seconds)

  // Candle extinguish timing (milliseconds after arrow release)
  candleExtinguishDelays: [500, 600, 700, 800, 900],
};

export default function BirthdayCard({
  toName = "Luke",
  photos = ["/photo1.jpg", "/photo2.jpg", "/photo3.jpg"],
  captions = ["Memory #1", "Memory #2", "Memory #3"],
  fontUrl = "/fonts/InterSignature-q20q2.ttf",
  audioUrl = "/audio/luke-poem.mp3",
  lineStartTimes = [
    0.0, 4.2, 7.4, 11.8, 15.4, 18.9, 23.1, 27.0, 31.6, 34.6, 36.9, 41.9, 45.9,
    50.0, 53.1, 57.2, 62.1, 65.6, 69.4,
  ],
}) {
  const POEM_LINES = [
    "The world became a brighter place",
    "The moment Luke arrived,",
    "With kindness written on your face",
    "And a spirit meant to thrive",
    "",
    "Through every year and every mile,",
    "You've grown in heart and mind,",
    "With a steady hand and a ready smile,",
    "The rarest soul to find.",
    "",
    "May your day be filled with all you love,",
    "With laughter, warmth, and light,",
    "And may the year ahead hold dreams",
    "That shine forever bright.",
    "",
    "So here's to you, for all you are,",
    "And all you're yet to be—",
    "Luke, you truly are a star",
    "For everyone to see.",
  ];

  const EMPHASIS_WORDS = [
    "Luke",
    "star",
    "thrive",
    "love",
    "bright",
    "dreams",
    "heart",
  ];

  const [fontReady, setFontReady] = useState(false);
  const [cardOpen, setCardOpen] = useState(false);
  const [arrowPull, setArrowPull] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lineProgress, setLineProgress] = useState(() =>
    POEM_LINES.map(() => 0),
  );
  const [candlesLit, setCandlesLit] = useState([true, true, true, true, true]);
  const [arrowFlying, setArrowFlying] = useState(false);
  const [showSmoke, setShowSmoke] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [photoSwipeOffset, setPhotoSwipeOffset] = useState(0);
  const [isPhotoSwiping, setIsPhotoSwiping] = useState(false);

  const audioRef = useRef(null);
  const rafRef = useRef(null);
  const dragStartX = useRef(0);
  const photoSwipeStartX = useRef(0);
  const silentAnimationRan = useRef(false);

  useEffect(() => {
    let cancelled = false;
    async function loadFont() {
      try {
        const ff = new FontFace("InterSignature", `url(${fontUrl})`);
        await ff.load();
        document.fonts.add(ff);
        await document.fonts.ready;
      } catch {}
      if (!cancelled) setFontReady(true);
    }
    loadFont();
    return () => {
      cancelled = true;
    };
  }, [fontUrl]);

  const handleDragStart = useCallback(
    (e) => {
      if (cardOpen || arrowFlying) return;
      setIsDragging(true);
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      dragStartX.current = clientX;
      e.preventDefault();
    },
    [cardOpen, arrowFlying],
  );

  const handleDragMove = useCallback(
    (e) => {
      if (!isDragging || cardOpen || arrowFlying) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const delta = dragStartX.current - clientX;
      const pull = Math.min(1, Math.max(0, delta / 100));
      setArrowPull(pull);
    },
    [isDragging, cardOpen, arrowFlying],
  );

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    if (arrowPull > 0.5) {
      setArrowFlying(true);
      setArrowPull(0);

      BOW_ARROW_CONFIG.candleExtinguishDelays.forEach((delay, i) => {
        setTimeout(() => {
          setCandlesLit((prev) => {
            const newState = [...prev];
            newState[i] = false;
            return newState;
          });
          setShowSmoke((prev) => {
            const newState = [...prev];
            newState[i] = true;
            return newState;
          });
        }, delay);
      });

      setTimeout(() => {
        setShowSmoke([false, false, false, false, false]);
      }, 1800);

      setTimeout(() => {
        setCardOpen(true);
        setArrowFlying(false);
      }, 2000);
    } else {
      setArrowPull(0);
    }
  }, [isDragging, arrowPull]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleDragMove);
      window.addEventListener("mouseup", handleDragEnd);
      window.addEventListener("touchmove", handleDragMove, { passive: false });
      window.addEventListener("touchend", handleDragEnd);
      return () => {
        window.removeEventListener("mousemove", handleDragMove);
        window.removeEventListener("mouseup", handleDragEnd);
        window.removeEventListener("touchmove", handleDragMove);
        window.removeEventListener("touchend", handleDragEnd);
      };
    }
  }, [isDragging, handleDragMove, handleDragEnd]);

  const handleArrowClick = () => {
    if (!cardOpen && !isDragging && !arrowFlying) {
      setArrowFlying(true);
      [300, 400, 500, 600, 700].forEach((delay, i) => {
        setTimeout(() => {
          setCandlesLit((prev) => {
            const newState = [...prev];
            newState[i] = false;
            return newState;
          });
          setShowSmoke((prev) => {
            const newState = [...prev];
            newState[i] = true;
            return newState;
          });
        }, delay);
      });
      setTimeout(() => setShowSmoke([false, false, false, false, false]), 1800);
      setTimeout(() => {
        setCardOpen(true);
        setArrowFlying(false);
      }, 2000);
    }
  };

  const handlePhotoSwipeStart = (e) => {
    setIsPhotoSwiping(true);
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    photoSwipeStartX.current = clientX;
  };

  const handlePhotoSwipeMove = (e) => {
    if (!isPhotoSwiping) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const delta = clientX - photoSwipeStartX.current;
    setPhotoSwipeOffset(delta);
  };

  const handlePhotoSwipeEnd = () => {
    if (!isPhotoSwiping) return;
    setIsPhotoSwiping(false);

    if (Math.abs(photoSwipeOffset) > 50) {
      if (photoSwipeOffset < 0 && currentPhotoIndex < photos.length - 1) {
        setCurrentPhotoIndex((prev) => prev + 1);
      } else if (photoSwipeOffset > 0 && currentPhotoIndex > 0) {
        setCurrentPhotoIndex((prev) => prev - 1);
      }
    }
    setPhotoSwipeOffset(0);
  };

  const computeLineEnds = useCallback(() => {
    const audio = audioRef.current;
    const duration = audio?.duration || 72;
    return lineStartTimes.map((t, i) =>
      i < lineStartTimes.length - 1 ? lineStartTimes[i + 1] : duration,
    );
  }, [lineStartTimes]);

  const startAnimation = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const ends = computeLineEnds();

    const tick = () => {
      const t = audio.currentTime;
      const newProgress = POEM_LINES.map((line, i) => {
        if (!line.trim()) return t >= lineStartTimes[i] ? 1 : 0;
        const t0 = lineStartTimes[i];
        const t1 = ends[i];
        return Math.min(1, Math.max(0, (t - t0) / Math.max(0.2, t1 - t0)));
      });
      setLineProgress(newProgress);

      if (!audio.paused && !audio.ended) {
        rafRef.current = requestAnimationFrame(tick);
      } else if (audio.ended) {
        setIsPlaying(false);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  }, [lineStartTimes, computeLineEnds, POEM_LINES]);

  const startSilentAnimation = useCallback(() => {
    const totalDuration = 40;
    const startTime = Date.now();
    const ends = lineStartTimes.map((t, i) =>
      i < lineStartTimes.length - 1 ? lineStartTimes[i + 1] : totalDuration,
    );
    const scale =
      totalDuration / (lineStartTimes[lineStartTimes.length - 1] + 3);

    const tick = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      const t = elapsed * scale;

      const newProgress = POEM_LINES.map((line, i) => {
        if (!line.trim()) return t >= lineStartTimes[i] ? 1 : 0;
        const t0 = lineStartTimes[i];
        const t1 = ends[i];
        return Math.min(1, Math.max(0, (t - t0) / Math.max(0.2, t1 - t0)));
      });
      setLineProgress(newProgress);

      if (elapsed < totalDuration / scale) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  }, [lineStartTimes, POEM_LINES]);

  const handlePlayAudio = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        audio.currentTime = 0;
        setLineProgress(POEM_LINES.map(() => 0));
        await audio.play();
        setIsPlaying(true);
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        startAnimation();
      } catch {
        startSilentAnimation();
      }
    } else {
      audio.pause();
      setIsPlaying(false);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    }
  };

  const handleReplay = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setLineProgress(POEM_LINES.map(() => 0));
    setIsPlaying(false);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    handlePlayAudio();
  };

  useEffect(() => {
    if (cardOpen && !isPlaying && !silentAnimationRan.current) {
      const timer = setTimeout(() => {
        if (!isPlaying) {
          silentAnimationRan.current = true;
          startSilentAnimation();
        }
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [cardOpen, isPlaying, startSilentAnimation]);

  const inkSplatters = React.useMemo(
    () => [
      { x: 45, y: 120, size: 3 },
      { x: 380, y: 200, size: 4 },
      { x: 120, y: 340, size: 2 },
      { x: 420, y: 420, size: 3 },
      { x: 70, y: 500, size: 2 },
      { x: 350, y: 560, size: 4 },
      { x: 200, y: 150, size: 2 },
      { x: 450, y: 300, size: 3 },
    ],
    [],
  );

  const inkDotsStatic = React.useMemo(() => {
    const seed = 12345;
    const dots = [];
    for (let i = 0; i < 25; i++) {
      const pseudoRandom = (seed * (i + 1) * 9301 + 49297) % 233280;
      const x = 20 + (pseudoRandom % 460);
      const y = 30 + ((pseudoRandom * 7) % 620);
      const size = 1 + (pseudoRandom % 3);
      const opacity = 0.1 + (pseudoRandom % 30) / 100;
      dots.push({ x, y, size, opacity });
    }
    return dots;
  }, []);

  const renderLineWithEmphasis = (line, i, progress) => {
    if (!line.trim()) return null;

    const y = 50 + i * 38;
    const clipWidth = 520 * progress;
    const wobble = Math.sin(i * 1.5) * 2;
    const rotation = Math.sin(i * 0.7) * 0.8;

    const words = line.split(" ");
    let xOffset = 25;

    return (
      <g key={i}>
        <defs>
          <clipPath id={`clip-${i}`}>
            <rect x="0" y={y - 35} width={clipWidth} height="50" />
          </clipPath>
        </defs>
        <g
          clipPath={`url(#clip-${i})`}
          transform={`rotate(${rotation} 250 ${y})`}
        >
          {words.map((word, wordIdx) => {
            const isEmphasis = EMPHASIS_WORDS.some((ew) => word.includes(ew));
            const wordX = xOffset;
            xOffset += word.length * 14 + 12;

            return (
              <text
                key={wordIdx}
                x={wordX}
                y={y + wobble}
                style={{
                  fontFamily: '"InterSignature", cursive',
                  fontSize: isEmphasis ? 34 : 30,
                  fontWeight: isEmphasis ? 600 : 400,
                  fill: isEmphasis ? "#fff" : "rgba(255,255,255,0.92)",
                  filter: isEmphasis
                    ? "drop-shadow(0 0 8px rgba(255,220,150,0.5)) drop-shadow(0 0 15px rgba(255,180,100,0.3))"
                    : "drop-shadow(0 0 4px rgba(255,210,120,0.2))",
                  letterSpacing: isEmphasis ? 1.5 : 0.5,
                }}
              >
                {word}
              </text>
            );
          })}
        </g>
      </g>
    );
  };

  if (!fontReady) {
    return (
      <div style={styles.loading}>
        <div style={styles.loadingText}>Loading...</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <audio ref={audioRef} src={audioUrl} preload="auto" />

      {!cardOpen && (
        <div style={styles.cardFront}>
          <div style={styles.cardPaper}>
            <div style={styles.cardEdgeLeft} />
            <div style={styles.cardEdgeRight} />

            {/* Festive party background animations */}
            <div style={styles.partyBackground}>
              {/* Floating confetti */}
              {[...Array(20)].map((_, i) => (
                <div
                  key={`confetti-${i}`}
                  style={{
                    ...styles.confetti,
                    left: `${5 + (i * 4.5) % 90}%`,
                    backgroundColor: ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#ff9ff3', '#ffc048'][i % 6],
                    animationDelay: `${i * 0.3}s`,
                    animationDuration: `${3 + (i % 3)}s`,
                  }}
                />
              ))}
              {/* Floating stars */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={`star-${i}`}
                  style={{
                    ...styles.floatingStar,
                    left: `${10 + (i * 12) % 80}%`,
                    animationDelay: `${i * 0.5}s`,
                    fontSize: `${14 + (i % 3) * 4}px`,
                  }}
                >
                  ✦
                </div>
              ))}
              {/* Sparkles */}
              {[...Array(12)].map((_, i) => (
                <div
                  key={`sparkle-${i}`}
                  style={{
                    ...styles.sparkle,
                    left: `${8 + (i * 8) % 84}%`,
                    top: `${10 + (i * 7) % 80}%`,
                    animationDelay: `${i * 0.4}s`,
                  }}
                />
              ))}
            </div>

            <div style={styles.embossedBorder} />

            <div style={styles.cornerTL}>❧</div>
            <div style={styles.cornerTR}>❧</div>
            <div style={styles.cornerBL}>❧</div>
            <div style={styles.cornerBR}>❧</div>

            <div style={styles.decorTop} />
            <div style={styles.decorBottom} />

            <div style={styles.frontContent}>
              <div style={styles.titleSection}>
                <div style={styles.starDecor}>✦ ✦ ✦</div>
                <h1 style={styles.mainTitle}>Happy Birthday</h1>
                <h2 style={styles.nameTitle}>{toName}</h2>
                <div style={styles.starDecor}>✦ ✦ ✦</div>
              </div>

              <div style={styles.interactionArea}>
                <div style={styles.bowSection}>
                  <div
                    style={{
                      ...styles.bowContainer,
                      transform: `scaleX(${1 + arrowPull * 0.1})`,
                    }}
                  >
                    <img src="/bow.png" alt="Bow" style={styles.bowImage} />
                  </div>

                  <div
                    style={{
                      ...styles.arrowWrapper,
                      transform: `translateY(-50%) translateX(${-arrowPull * BOW_ARROW_CONFIG.pullDistance}px)`,
                      opacity: arrowFlying ? 0 : 1,
                      transition: arrowFlying
                        ? "opacity 0.15s"
                        : "transform 0.05s",
                    }}
                    onMouseDown={handleDragStart}
                    onTouchStart={handleDragStart}
                    onClick={handleArrowClick}
                  >
                    <img
                      src="/arrow.png"
                      alt="Arrow"
                      style={styles.arrowImage}
                    />
                  </div>
                </div>

                <div style={styles.targetSection}>
                  <div style={styles.candlesCluster}>
                    {[0, 1, 2, 3, 4].map((i) => {
                      const positions = [
                        { x: -35, y: 0, scale: 0.9, z: 1 },
                        { x: 35, y: 0, scale: 0.9, z: 1 },
                        { x: -55, y: -30, scale: 0.75, z: 0 },
                        { x: 0, y: -35, scale: 0.8, z: 0 },
                        { x: 55, y: -30, scale: 0.75, z: 0 },
                      ];
                      const pos = positions[i];
                      return (
                        <div
                          key={i}
                          style={{
                            ...styles.candleContainer,
                            transform: `translateX(${pos.x}px) translateY(${pos.y}px) scale(${pos.scale})`,
                            zIndex: pos.z,
                          }}
                        >
                          <img
                            src="/candle.png"
                            alt="Candle"
                            style={{
                              ...styles.candleImage,
                              filter: candlesLit[i]
                                ? "brightness(1)"
                                : "brightness(0.65) saturate(0.7)",
                            }}
                          />

                          {candlesLit[i] && (
                            <div style={styles.flameContainer}>
                              <div style={styles.flameOuter} />
                              <div style={styles.flameInner} />
                              <div style={styles.flameGlow} />
                            </div>
                          )}

                          {showSmoke[i] && (
                            <div style={styles.smokeContainer}>
                              <div style={styles.smoke1} />
                              <div style={styles.smoke2} />
                              <div style={styles.smoke3} />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  {arrowFlying && (
                    <img
                      src="/arrow.png"
                      alt="Flying Arrow"
                      style={styles.flyingArrow}
                    />
                  )}
                </div>
              </div>

              <div style={styles.instructionBox}>
                <p style={styles.instruction}>
                  {arrowPull > 0.5
                    ? "Release to shoot!"
                    : arrowPull > 0
                      ? "Pull back more..."
                      : "Pull the arrow back to extinguish the candles"}
                </p>
                <div style={styles.pullMeter}>
                  <div
                    style={{
                      ...styles.pullFill,
                      width: `${arrowPull * 100}%`,
                      background:
                        arrowPull > 0.5
                          ? "linear-gradient(90deg, #4ade80, #22c55e)"
                          : "linear-gradient(90deg, #fbbf24, #f59e0b)",
                    }}
                  />
                </div>
              </div>

              <div style={styles.footerDecor}>
                <span style={styles.decorDot}>◆</span>
                <span style={styles.decorLine} />
                <span style={styles.decorStar}>★</span>
                <span style={styles.decorLine} />
                <span style={styles.decorDot}>◆</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {cardOpen && (
        <div className="card-inner-responsive" style={styles.cardInner}>
          <div className="card-left-responsive" style={styles.cardLeft}>
            <div style={styles.photoGallery}>
              <div
                style={{
                  ...styles.photoCarousel,
                  transform: `translateX(${-currentPhotoIndex * 100 + photoSwipeOffset * 0.3}%)`,
                }}
                onMouseDown={handlePhotoSwipeStart}
                onMouseMove={handlePhotoSwipeMove}
                onMouseUp={handlePhotoSwipeEnd}
                onMouseLeave={handlePhotoSwipeEnd}
                onTouchStart={handlePhotoSwipeStart}
                onTouchMove={handlePhotoSwipeMove}
                onTouchEnd={handlePhotoSwipeEnd}
              >
                {photos.map((src, i) => (
                  <div key={i} style={styles.photoSlide}>
                    <div style={styles.polaroid}>
                      <div style={styles.polaroidTape} />
                      <div style={styles.polaroidImage}>
                        <img src={src} alt={captions[i]} style={styles.photo} />
                      </div>
                      <div style={styles.polaroidCaption}>{captions[i]}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={styles.photoDots}>
                {photos.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPhotoIndex(i)}
                    style={{
                      ...styles.photoDot,
                      background:
                        i === currentPhotoIndex
                          ? "#fff"
                          : "rgba(255,255,255,0.3)",
                      transform:
                        i === currentPhotoIndex ? "scale(1.3)" : "scale(1)",
                    }}
                  />
                ))}
              </div>

              <p style={styles.swipeHint}>← Swipe to see more →</p>
            </div>
          </div>

          <div className="card-right-responsive" style={styles.cardRight}>
            <div style={styles.poemHeader}>
              <span style={styles.toName}>To {toName},</span>
              <div style={styles.audioControls}>
                <button onClick={handlePlayAudio} style={styles.playBtn}>
                  {isPlaying ? "⏸" : "▶"}
                </button>
                <button onClick={handleReplay} style={styles.replayBtn}>
                  ↺
                </button>
              </div>
            </div>

            <div style={styles.poemContainer}>
              <svg
                viewBox="0 0 520 720"
                className="poem-svg-responsive"
                style={styles.poemSvg}
              >
                <defs>
                  <filter
                    id="inkBleed"
                    x="-20%"
                    y="-20%"
                    width="140%"
                    height="140%"
                  >
                    <feMorphology operator="dilate" radius="0.4" />
                    <feGaussianBlur stdDeviation="0.6" />
                  </filter>
                  <filter
                    id="wetInk"
                    x="-10%"
                    y="-10%"
                    width="120%"
                    height="120%"
                  >
                    <feGaussianBlur
                      in="SourceAlpha"
                      stdDeviation="1"
                      result="blur"
                    />
                    <feOffset in="blur" dx="0.5" dy="0.5" result="offsetBlur" />
                    <feMerge>
                      <feMergeNode in="offsetBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {inkDotsStatic.map((dot, i) => (
                  <circle
                    key={`dot-${i}`}
                    cx={dot.x}
                    cy={dot.y}
                    r={dot.size}
                    fill={`rgba(255,255,255,${dot.opacity})`}
                  />
                ))}

                {inkSplatters.map((spot, i) => (
                  <g key={`splat-${i}`}>
                    <circle
                      cx={spot.x}
                      cy={spot.y}
                      r={spot.size}
                      fill="rgba(255,255,255,0.25)"
                      filter="url(#inkBleed)"
                    />
                    <circle
                      cx={spot.x + 2}
                      cy={spot.y - 1}
                      r={spot.size * 0.5}
                      fill="rgba(255,255,255,0.15)"
                    />
                  </g>
                ))}

                {POEM_LINES.map((line, i) =>
                  renderLineWithEmphasis(line, i, lineProgress[i] || 0),
                )}

                <path
                  d="M 25 680 Q 80 675, 150 680 T 280 678"
                  fill="none"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes polaroidIn {
          from {
            opacity: 0;
            transform: rotate(0deg) translateY(30px) scale(0.8);
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes flicker {
          0%, 100% { transform: scaleY(1) scaleX(1); opacity: 1; }
          25% { transform: scaleY(1.15) scaleX(0.92); opacity: 0.85; }
          50% { transform: scaleY(0.9) scaleX(1.08); opacity: 1; }
          75% { transform: scaleY(1.08) scaleX(0.95); opacity: 0.9; }
        }
        
        @keyframes naturalFlicker {
          0% { transform: translateX(-50%) scaleY(1) scaleX(1) skewX(0deg); opacity: 1; }
          15% { transform: translateX(-50%) scaleY(1.08) scaleX(0.94) skewX(2deg); opacity: 0.92; }
          30% { transform: translateX(-50%) scaleY(0.95) scaleX(1.04) skewX(-1deg); opacity: 1; }
          45% { transform: translateX(-50%) scaleY(1.12) scaleX(0.9) skewX(3deg); opacity: 0.88; }
          60% { transform: translateX(-50%) scaleY(0.92) scaleX(1.06) skewX(-2deg); opacity: 0.95; }
          75% { transform: translateX(-50%) scaleY(1.05) scaleX(0.96) skewX(1deg); opacity: 1; }
          90% { transform: translateX(-50%) scaleY(0.98) scaleX(1.02) skewX(-1deg); opacity: 0.9; }
          100% { transform: translateX(-50%) scaleY(1) scaleX(1) skewX(0deg); opacity: 1; }
        }
        
        @keyframes glowPulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.85; transform: scale(1.15); }
        }

        @keyframes smokeRise {
          0% { opacity: 0.7; transform: translateY(0) scale(1) rotate(0deg); }
          50% { opacity: 0.4; transform: translateY(-40px) scale(1.8) rotate(10deg); }
          100% { opacity: 0; transform: translateY(-80px) scale(2.5) rotate(-5deg); }
        }

        @keyframes confettiFall {
          0% { 
            transform: translateY(-20px) rotate(0deg); 
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% { 
            transform: translateY(650px) rotate(720deg); 
            opacity: 0.3;
          }
        }

        @keyframes floatStar {
          0% { 
            transform: translateY(0) scale(1); 
            opacity: 0.4;
          }
          50% { 
            transform: translateY(-15px) scale(1.2); 
            opacity: 1;
          }
          100% { 
            transform: translateY(0) scale(1); 
            opacity: 0.4;
          }
        }

        @keyframes sparkleGlow {
          0%, 100% { 
            transform: scale(0); 
            opacity: 0;
          }
          50% { 
            transform: scale(1); 
            opacity: 1;
          }
        }

        @keyframes flyArrow {
          0% { 
            transform: translateY(-50%) translateX(0px) rotate(0deg); 
            opacity: 1; 
          }
          30% {
            transform: translateY(-50%) translateX(${BOW_ARROW_CONFIG.arrowFlightDistance * 0.4}px) rotate(0deg);
            opacity: 1;
          }
          75% { 
            transform: translateY(-50%) translateX(${BOW_ARROW_CONFIG.arrowFlightDistance * 0.85}px) rotate(1deg); 
            opacity: 1; 
          }
          95% { 
            transform: translateY(-50%) translateX(${BOW_ARROW_CONFIG.arrowFlightDistance * 0.96}px) rotate(0deg); 
            opacity: 0.8; 
          }
          100% { 
            transform: translateY(-50%) translateX(${BOW_ARROW_CONFIG.arrowFlightDistance}px) rotate(0deg); 
            opacity: 0; 
          }
        }

        @keyframes bowPullback {
          0% { transform: scaleY(1); }
          100% { transform: scaleY(0.9); }
        }

        @keyframes arrowShake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-2px); }
          75% { transform: translateX(2px); }
        }

        @media (max-width: 768px) {
          .card-inner-responsive {
            grid-template-columns: 1fr !important;
            min-height: auto !important;
          }
          .card-left-responsive {
            padding: 20px !important;
            border-right: none !important;
            border-bottom: 1px solid rgba(255,255,255,0.08) !important;
          }
          .card-right-responsive {
            padding: 16px 20px !important;
          }
          .poem-svg-responsive {
            min-height: 600px;
          }
        }

        @media (max-width: 480px) {
          .card-left-responsive {
            padding: 15px !important;
          }
        }
      `}</style>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    background:
      "radial-gradient(ellipse at 30% 20%, #2d1f3d 0%, #1a1225 40%, #0d0a12 100%)",
    boxSizing: "border-box",
  },
  loading: {
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#1a1225",
  },
  loadingText: {
    color: "white",
    fontSize: 18,
    fontFamily: "system-ui, sans-serif",
  },
  cardFront: {
    width: "100%",
    maxWidth: 750,
    perspective: "1500px",
  },
  cardPaper: {
    position: "relative",
    background: `
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 28px,
        rgba(200,180,160,0.08) 28px,
        rgba(200,180,160,0.08) 29px
      ),
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent 28px,
        rgba(200,180,160,0.05) 28px,
        rgba(200,180,160,0.05) 29px
      ),
      linear-gradient(165deg, #fdf9f3 0%, #f8f3eb 30%, #f0e8db 70%, #e8dfd0 100%)
    `,
    borderRadius: 16,
    padding: "50px 40px",
    boxShadow: `
      0 1px 2px rgba(0,0,0,0.07),
      0 4px 8px rgba(0,0,0,0.07),
      0 8px 16px rgba(0,0,0,0.08),
      0 16px 32px rgba(0,0,0,0.1),
      0 32px 64px rgba(0,0,0,0.12),
      inset 0 2px 0 rgba(255,255,255,0.9),
      inset 0 -1px 0 rgba(0,0,0,0.05)
    `,
    border: "1px solid rgba(180,160,140,0.25)",
    overflow: "hidden",
  },
  cardEdgeLeft: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 8,
    background: "linear-gradient(90deg, rgba(0,0,0,0.08), transparent)",
  },
  cardEdgeRight: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: 8,
    background: "linear-gradient(-90deg, rgba(0,0,0,0.05), transparent)",
  },
  embossedBorder: {
    position: "absolute",
    top: 20,
    left: 20,
    right: 20,
    bottom: 20,
    border: "2px solid rgba(180,150,120,0.2)",
    borderRadius: 8,
    boxShadow:
      "inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -1px 0 rgba(0,0,0,0.05)",
    pointerEvents: "none",
    zIndex: 1,
  },
  partyBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: "hidden",
    pointerEvents: "none",
    zIndex: 0,
  },
  confetti: {
    position: "absolute",
    top: -20,
    width: 10,
    height: 10,
    borderRadius: 2,
    animation: "confettiFall 4s linear infinite",
  },
  floatingStar: {
    position: "absolute",
    top: "15%",
    color: "#d4a574",
    animation: "floatStar 2.5s ease-in-out infinite",
    opacity: 0.6,
  },
  sparkle: {
    position: "absolute",
    width: 6,
    height: 6,
    backgroundColor: "#ffd93d",
    borderRadius: "50%",
    boxShadow: "0 0 8px #ffd93d, 0 0 12px #ff9ff3",
    animation: "sparkleGlow 2s ease-in-out infinite",
  },
  cornerTL: {
    position: "absolute",
    top: 30,
    left: 30,
    fontSize: 22,
    color: "rgba(180,150,120,0.4)",
    transform: "rotate(-45deg)",
  },
  cornerTR: {
    position: "absolute",
    top: 30,
    right: 30,
    fontSize: 22,
    color: "rgba(180,150,120,0.4)",
    transform: "rotate(45deg) scaleX(-1)",
  },
  cornerBL: {
    position: "absolute",
    bottom: 30,
    left: 30,
    fontSize: 22,
    color: "rgba(180,150,120,0.4)",
    transform: "rotate(-135deg)",
  },
  cornerBR: {
    position: "absolute",
    bottom: 30,
    right: 30,
    fontSize: 22,
    color: "rgba(180,150,120,0.4)",
    transform: "rotate(135deg) scaleX(-1)",
  },
  decorTop: {
    position: "absolute",
    top: 40,
    left: 50,
    right: 50,
    height: 1,
    background:
      "linear-gradient(90deg, transparent, rgba(180,140,100,0.25) 15%, rgba(180,140,100,0.35) 50%, rgba(180,140,100,0.25) 85%, transparent)",
  },
  decorBottom: {
    position: "absolute",
    bottom: 40,
    left: 50,
    right: 50,
    height: 1,
    background:
      "linear-gradient(90deg, transparent, rgba(180,140,100,0.25) 15%, rgba(180,140,100,0.35) 50%, rgba(180,140,100,0.25) 85%, transparent)",
  },
  frontContent: {
    position: "relative",
    zIndex: 1,
  },
  titleSection: {
    textAlign: "center",
    marginBottom: 20,
  },
  starDecor: {
    color: "#c9a55a",
    fontSize: 16,
    letterSpacing: 12,
    marginBottom: 6,
  },
  mainTitle: {
    fontFamily: '"InterSignature", Georgia, serif',
    fontSize: "clamp(30px, 5.5vw, 48px)",
    fontWeight: 400,
    color: "#3d2914",
    margin: "6px 0",
    letterSpacing: 2,
    textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
  },
  nameTitle: {
    fontFamily: '"InterSignature", Georgia, serif',
    fontSize: "clamp(38px, 7.5vw, 62px)",
    fontWeight: 400,
    color: "#8b5a2b",
    margin: "0 0 6px",
    letterSpacing: 3,
    textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
  },
  interactionArea: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "15px 10px",
    gap: 50,
    minHeight: 250,
  },
  bowSection: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: BOW_ARROW_CONFIG.bowOffsetY,
  },
  bowContainer: {
    transition: "transform 0.1s ease-out",
    transformOrigin: "center",
  },
  bowImage: {
    width: BOW_ARROW_CONFIG.bowWidth,
    height: "auto",
    filter: "drop-shadow(3px 5px 8px rgba(0,0,0,0.35))",
    transform: `rotate(${BOW_ARROW_CONFIG.bowRotation}deg)`,
  },
  arrowWrapper: {
    position: "absolute",
    top: `calc(50% + ${BOW_ARROW_CONFIG.arrowOffsetY}px)`,
    left: BOW_ARROW_CONFIG.arrowOffsetX,
    transform: "translateY(-50%)",
    cursor: "grab",
    zIndex: 10,
    padding: 10,
    userSelect: "none",
    touchAction: "none",
  },
  arrowImage: {
    width: BOW_ARROW_CONFIG.arrowWidth,
    height: "auto",
    filter: "drop-shadow(2px 3px 5px rgba(0,0,0,0.35))",
    transform: `rotate(${BOW_ARROW_CONFIG.arrowRotation}deg)`,
    pointerEvents: "none",
  },
  bowString: {
    display: "none",
  },
  targetSection: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  candlesCluster: {
    position: "relative",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    width: 220,
    height: 220,
  },
  candleContainer: {
    position: "absolute",
    bottom: 0,
    left: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginLeft: -45,
  },
  candleImage: {
    width: 90,
    height: "auto",
    filter: "drop-shadow(3px 8px 10px rgba(0,0,0,0.35))",
    transition: "filter 0.4s ease-out",
  },
  flameContainer: {
    position: "absolute",
    top: -50,
    left: "50%",
    transform: "translateX(-50%)",
    width: 50,
    height: 70,
  },
  flameOuter: {
    position: "absolute",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: 30,
    height: 50,
    background:
      "radial-gradient(ellipse at 50% 85%, #ff4500 0%, #ff6b35 20%, #ff9500 45%, #ffcc00 70%, transparent 100%)",
    borderRadius: "50% 50% 50% 50% / 65% 65% 35% 35%",
    animation: "naturalFlicker 0.5s ease-in-out infinite",
  },
  flameInner: {
    position: "absolute",
    bottom: 5,
    left: "50%",
    transform: "translateX(-50%)",
    width: 12,
    height: 25,
    background:
      "radial-gradient(ellipse at 50% 80%, #fff 0%, #fffbe6 45%, #ffd54f 75%, transparent 100%)",
    borderRadius: "50% 50% 50% 50% / 70% 70% 30% 30%",
    animation: "naturalFlicker 0.3s ease-in-out infinite",
  },
  flameGlow: {
    position: "absolute",
    bottom: -10,
    left: "50%",
    transform: "translateX(-50%)",
    width: 60,
    height: 60,
    background:
      "radial-gradient(circle, rgba(255,150,50,0.35) 0%, rgba(255,100,30,0.15) 45%, transparent 70%)",
    animation: "glowPulse 0.9s ease-in-out infinite",
    pointerEvents: "none",
  },
  smokeContainer: {
    position: "absolute",
    top: -60,
    left: "50%",
    transform: "translateX(-50%)",
  },
  smoke1: {
    position: "absolute",
    width: 18,
    height: 18,
    background: "rgba(150,150,150,0.6)",
    borderRadius: "50%",
    animation: "smokeRise 1.2s ease-out forwards",
    left: -10,
  },
  smoke2: {
    position: "absolute",
    width: 22,
    height: 22,
    background: "rgba(130,130,130,0.5)",
    borderRadius: "50%",
    animation: "smokeRise 1.4s ease-out 0.1s forwards",
  },
  smoke3: {
    position: "absolute",
    width: 14,
    height: 14,
    background: "rgba(140,140,140,0.4)",
    borderRadius: "50%",
    animation: "smokeRise 1.1s ease-out 0.2s forwards",
    left: 16,
  },
  flyingArrow: {
    position: "absolute",
    width: BOW_ARROW_CONFIG.arrowWidth,
    height: "auto",
    top: "50%",
    left: -200,
    transform: `translateY(-50%) rotate(${BOW_ARROW_CONFIG.arrowRotation}deg)`,
    animation: `flyArrow ${BOW_ARROW_CONFIG.arrowFlightDuration}s ease-out forwards`,
    filter: "drop-shadow(3px 3px 6px rgba(0,0,0,0.4))",
    zIndex: 20,
  },
  instructionBox: {
    textAlign: "center",
    marginTop: 15,
    padding: "14px 20px",
    background: "rgba(60,40,20,0.05)",
    borderRadius: 8,
    border: "1px solid rgba(180,140,100,0.2)",
  },
  instruction: {
    fontFamily: "Georgia, serif",
    fontSize: 14,
    color: "#5a4030",
    margin: "0 0 10px",
    fontStyle: "italic",
  },
  pullMeter: {
    width: "100%",
    maxWidth: 180,
    height: 6,
    background: "rgba(0,0,0,0.1)",
    borderRadius: 3,
    margin: "0 auto",
    overflow: "hidden",
  },
  pullFill: {
    height: "100%",
    borderRadius: 3,
    transition: "width 0.08s, background 0.2s",
  },
  footerDecor: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 20,
    color: "#c9a55a",
  },
  decorDot: {
    fontSize: 9,
    opacity: 0.7,
  },
  decorLine: {
    width: 50,
    height: 1,
    background:
      "linear-gradient(90deg, transparent, rgba(180,140,100,0.4), transparent)",
  },
  decorStar: {
    fontSize: 13,
  },
  cardInner: {
    display: "grid",
    gridTemplateColumns: "1fr 1.4fr",
    minHeight: 650,
    width: "100%",
    maxWidth: 1100,
    background: "linear-gradient(145deg, #1e2243 0%, #0f1225 100%)",
    borderRadius: 24,
    boxShadow:
      "0 25px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.1)",
    animation: "fadeIn 0.8s ease-out",
  },
  cardLeft: {
    padding: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background:
      "radial-gradient(circle at 30% 30%, rgba(255,210,120,0.08), transparent 60%)",
    borderRight: "1px solid rgba(255,255,255,0.08)",
    maxWidth: 320,
  },
  photoGallery: {
    width: "100%",
    maxWidth: 280,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    overflow: "hidden",
  },
  photoCarousel: {
    display: "flex",
    width: "100%",
    transition: "transform 0.3s ease-out",
    cursor: "grab",
  },
  photoSlide: {
    minWidth: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0 10px",
    boxSizing: "border-box",
  },
  polaroid: {
    position: "relative",
    background: "#fefefe",
    padding: "12px 12px 45px",
    borderRadius: 4,
    boxShadow: "0 10px 40px rgba(0,0,0,0.4), 0 3px 10px rgba(0,0,0,0.2)",
    transform: "rotate(-2deg)",
    width: 220,
    maxWidth: "100%",
  },
  polaroidTape: {
    position: "absolute",
    top: -12,
    left: "50%",
    transform: "translateX(-50%) rotate(2deg)",
    width: 70,
    height: 24,
    background:
      "linear-gradient(180deg, rgba(255,255,220,0.7), rgba(240,230,180,0.6))",
    borderRadius: 2,
    boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
  },
  polaroidImage: {
    width: "100%",
    aspectRatio: "1/1",
    background: "#e0e0e0",
    borderRadius: 2,
    overflow: "hidden",
  },
  photo: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  polaroidCaption: {
    position: "absolute",
    bottom: 12,
    left: 0,
    right: 0,
    textAlign: "center",
    fontFamily: '"InterSignature", cursive',
    fontSize: 16,
    color: "#333",
  },
  photoDots: {
    display: "flex",
    gap: 10,
    justifyContent: "center",
  },
  photoDot: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  swipeHint: {
    fontSize: 12,
    color: "rgba(255,255,255,0.4)",
    fontStyle: "italic",
    margin: 0,
  },
  cardRight: {
    padding: "24px 35px",
    display: "flex",
    flexDirection: "column",
    background:
      "radial-gradient(ellipse at 70% 20%, rgba(158,231,255,0.06), transparent 50%)",
  },
  poemHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    paddingBottom: 10,
    borderBottom: "1px solid rgba(255,255,255,0.1)",
  },
  toName: {
    fontFamily: '"InterSignature", cursive',
    fontSize: 26,
    fontWeight: 400,
    color: "white",
    letterSpacing: 1,
  },
  audioControls: {
    display: "flex",
    gap: 8,
  },
  playBtn: {
    width: 42,
    height: 42,
    borderRadius: "50%",
    border: "1px solid rgba(255,255,255,0.2)",
    background: "rgba(255,255,255,0.1)",
    color: "white",
    fontSize: 16,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s",
  },
  replayBtn: {
    width: 42,
    height: 42,
    borderRadius: "50%",
    border: "1px solid rgba(255,255,255,0.2)",
    background: "rgba(255,255,255,0.05)",
    color: "white",
    fontSize: 18,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s",
  },
  poemContainer: {
    flex: 1,
    overflow: "hidden",
  },
  poemSvg: {
    width: "100%",
    height: "100%",
    display: "block",
    minHeight: 680,
  },
};
