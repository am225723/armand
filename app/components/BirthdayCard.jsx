"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

export default function BirthdayCard({
  toName = "Luke",
  photos = ["/photo1.jpg", "/photo2.jpg", "/photo3.jpg"],
  captions = ["Memory #1", "Memory #2", "Memory #3"],
  fontUrl = "/fonts/InterSignature-q20q2.ttf",
  audioUrl = "/audio/luke-poem.mp3",
  lineStartTimes = [
    0.0, 4.2, 7.4, 11.8, 15.4,
    18.9, 23.1, 27.0, 31.6, 34.6,
    36.9, 41.9, 45.9, 50.0, 53.1,
    57.2, 62.1, 65.6, 69.4,
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

  const [fontReady, setFontReady] = useState(false);
  const [cardOpen, setCardOpen] = useState(false);
  const [arrowPull, setArrowPull] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lineProgress, setLineProgress] = useState(() => POEM_LINES.map(() => 0));
  const [audioLoaded, setAudioLoaded] = useState(false);
  const [candleLit, setCandleLit] = useState(true);
  const [arrowFlying, setArrowFlying] = useState(false);
  const [showSmoke, setShowSmoke] = useState(false);

  const audioRef = useRef(null);
  const rafRef = useRef(null);
  const dragStartX = useRef(0);
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
    return () => { cancelled = true; };
  }, [fontUrl]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const onLoaded = () => setAudioLoaded(true);
      audio.addEventListener("loadedmetadata", onLoaded);
      return () => audio.removeEventListener("loadedmetadata", onLoaded);
    }
  }, []);

  const handleDragStart = useCallback((e) => {
    if (cardOpen || arrowFlying) return;
    setIsDragging(true);
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    dragStartX.current = clientX;
    e.preventDefault();
  }, [cardOpen, arrowFlying]);

  const handleDragMove = useCallback((e) => {
    if (!isDragging || cardOpen || arrowFlying) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const delta = dragStartX.current - clientX;
    const pull = Math.min(1, Math.max(0, delta / 120));
    setArrowPull(pull);
  }, [isDragging, cardOpen, arrowFlying]);

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    if (arrowPull > 0.6) {
      setArrowFlying(true);
      setArrowPull(0);
      
      setTimeout(() => {
        setCandleLit(false);
        setShowSmoke(true);
      }, 300);
      
      setTimeout(() => {
        setShowSmoke(false);
        setCardOpen(true);
        setArrowFlying(false);
      }, 1200);
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
      setTimeout(() => {
        setCandleLit(false);
        setShowSmoke(true);
      }, 300);
      setTimeout(() => {
        setShowSmoke(false);
        setCardOpen(true);
        setArrowFlying(false);
      }, 1200);
    }
  };

  const computeLineEnds = useCallback(() => {
    const audio = audioRef.current;
    const duration = audio?.duration || 72;
    return lineStartTimes.map((t, i) => 
      i < lineStartTimes.length - 1 ? lineStartTimes[i + 1] : duration
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
      i < lineStartTimes.length - 1 ? lineStartTimes[i + 1] : totalDuration
    );
    const scale = totalDuration / (lineStartTimes[lineStartTimes.length - 1] + 3);

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
            
            <div style={styles.cardFold} />
            
            <div style={styles.decorTop} />
            <div style={styles.decorBottom} />
            
            <div style={styles.frontContent}>
              <div style={styles.titleSection}>
                <div style={styles.starDecor}>✦</div>
                <h1 style={styles.mainTitle}>Happy Birthday</h1>
                <h2 style={styles.nameTitle}>{toName}</h2>
                <div style={styles.starDecor}>✦</div>
              </div>

              <div style={styles.interactionArea}>
                <div style={styles.bowSection}>
                  <img 
                    src="/bow.png" 
                    alt="Bow" 
                    style={styles.bowImage}
                  />
                  
                  <div 
                    style={{
                      ...styles.arrowWrapper,
                      transform: `translateX(${-arrowPull * 80}px)`,
                      opacity: arrowFlying ? 0 : 1,
                      transition: arrowFlying ? 'opacity 0.2s' : 'transform 0.05s',
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

                  <div style={{
                    ...styles.bowString,
                    transform: `scaleX(${1 - arrowPull * 0.3})`,
                  }} />
                </div>

                <div style={styles.targetSection}>
                  <div style={styles.candleContainer}>
                    <img 
                      src="/candle.png" 
                      alt="Candle" 
                      style={{
                        ...styles.candleImage,
                        filter: candleLit ? 'brightness(1)' : 'brightness(0.7)',
                      }}
                    />
                    
                    {candleLit && !arrowFlying && (
                      <div style={styles.flameContainer}>
                        <div style={styles.flameOuter} />
                        <div style={styles.flameInner} />
                        <div style={styles.flameGlow} />
                      </div>
                    )}
                    
                    {showSmoke && (
                      <div style={styles.smokeContainer}>
                        <div style={styles.smoke1} />
                        <div style={styles.smoke2} />
                        <div style={styles.smoke3} />
                      </div>
                    )}
                    
                    {arrowFlying && (
                      <img 
                        src="/arrow.png" 
                        alt="Flying Arrow" 
                        style={styles.flyingArrow}
                      />
                    )}
                  </div>
                </div>
              </div>

              <div style={styles.instructionBox}>
                <p style={styles.instruction}>
                  {arrowPull > 0.6 ? "Release to shoot!" : arrowPull > 0 ? "Pull back more..." : "Pull the arrow back to extinguish the candle"}
                </p>
                <div style={styles.pullMeter}>
                  <div style={{
                    ...styles.pullFill,
                    width: `${arrowPull * 100}%`,
                    background: arrowPull > 0.6 ? '#4ade80' : '#fbbf24',
                  }} />
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
        <div 
          className="card-inner-responsive"
          style={styles.cardInner}
        >
          <div className="card-left-responsive" style={styles.cardLeft}>
            <div className="polaroid-stack-responsive" style={styles.polaroidStack}>
              {photos.slice(0, 3).map((src, i) => {
                const rotations = [-8, 5, -3];
                const offsets = [{ x: -15, y: 10 }, { x: 20, y: -5 }, { x: 5, y: 15 }];
                return (
                  <div 
                    key={i}
                    style={{
                      ...styles.polaroid,
                      transform: `rotate(${rotations[i]}deg) translate(${offsets[i].x}px, ${offsets[i].y}px)`,
                      zIndex: 3 - i,
                      animationDelay: `${i * 0.2}s`,
                    }}
                  >
                    <div style={styles.polaroidImage}>
                      <img src={src} alt={captions[i]} style={styles.photo} />
                    </div>
                    <div style={styles.polaroidCaption}>{captions[i]}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="card-right-responsive" style={styles.cardRight}>
            <div style={styles.poemHeader}>
              <span style={styles.toName}>To {toName},</span>
              <div style={styles.audioControls}>
                <button onClick={handlePlayAudio} style={styles.playBtn}>
                  {isPlaying ? "⏸" : "▶"}
                </button>
                <button onClick={handleReplay} style={styles.replayBtn}>↺</button>
              </div>
            </div>

            <div style={styles.poemContainer}>
              <svg viewBox="0 0 500 650" className="poem-svg-responsive" style={styles.poemSvg}>
                <defs>
                  <filter id="inkBleed" x="-10%" y="-10%" width="120%" height="120%">
                    <feMorphology operator="dilate" radius="0.3" />
                    <feGaussianBlur stdDeviation="0.8" />
                  </filter>
                </defs>
                
                {POEM_LINES.map((line, i) => {
                  if (!line.trim()) return null;
                  const y = 40 + i * 34;
                  const progress = lineProgress[i] || 0;
                  const clipWidth = 500 * progress;
                  
                  const isEmphasis = line.includes("Luke") || line.includes("star") || line.includes("thrive");
                  const strokeOpacity = isEmphasis ? 1 : 0.95;
                  const glowIntensity = isEmphasis ? "0 0 12px rgba(255,210,120,0.6)" : "0 0 6px rgba(255,210,120,0.3)";

                  return (
                    <g key={i}>
                      <defs>
                        <clipPath id={`clip-${i}`}>
                          <rect x="0" y={y - 30} width={clipWidth} height="40" />
                        </clipPath>
                      </defs>
                      <text
                        x="20"
                        y={y}
                        style={{
                          fontFamily: '"InterSignature", cursive',
                          fontSize: 26,
                          fill: `rgba(255,255,255,${strokeOpacity * 0.15})`,
                          filter: "url(#inkBleed)",
                        }}
                        clipPath={`url(#clip-${i})`}
                      >
                        {line}
                      </text>
                      <text
                        x="20"
                        y={y}
                        style={{
                          fontFamily: '"InterSignature", cursive',
                          fontSize: 26,
                          fill: `rgba(255,255,255,${strokeOpacity})`,
                          filter: `drop-shadow(${glowIntensity})`,
                        }}
                        clipPath={`url(#clip-${i})`}
                      >
                        {line}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            <div style={styles.audioStatus}>
              {audioLoaded ? (
                <span>🎵 Audio ready</span>
              ) : (
                <span>Loading audio...</span>
              )}
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
          25% { transform: scaleY(1.1) scaleX(0.95); opacity: 0.9; }
          50% { transform: scaleY(0.95) scaleX(1.05); opacity: 1; }
          75% { transform: scaleY(1.05) scaleX(0.98); opacity: 0.95; }
        }
        
        @keyframes glowPulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }

        @keyframes smokeRise {
          0% { opacity: 0.8; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(-60px) scale(2); }
        }

        @keyframes flyArrow {
          0% { transform: translateX(-200px) rotate(0deg); opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateX(20px) rotate(5deg); opacity: 0; }
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
          .polaroid-stack-responsive {
            max-width: 200px !important;
          }
          .card-right-responsive {
            padding: 16px 20px !important;
          }
          .poem-svg-responsive {
            min-height: 500px;
          }
        }

        @media (max-width: 480px) {
          .polaroid-stack-responsive {
            max-width: 160px !important;
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
    background: "radial-gradient(ellipse at 30% 20%, #2d1f3d 0%, #1a1225 40%, #0d0a12 100%)",
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
    maxWidth: 700,
    perspective: "1500px",
  },
  cardPaper: {
    position: "relative",
    background: "linear-gradient(165deg, #faf8f5 0%, #f5f0e8 30%, #ebe4d8 100%)",
    borderRadius: 12,
    padding: "50px 40px",
    boxShadow: `
      0 2px 4px rgba(0,0,0,0.1),
      0 8px 16px rgba(0,0,0,0.1),
      0 24px 48px rgba(0,0,0,0.15),
      inset 0 1px 0 rgba(255,255,255,0.8)
    `,
    border: "1px solid rgba(200,180,160,0.3)",
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
  cardFold: {
    position: "absolute",
    left: "50%",
    top: 0,
    bottom: 0,
    width: 2,
    background: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.06) 20%, rgba(0,0,0,0.08) 50%, rgba(0,0,0,0.06) 80%, transparent 100%)",
    transform: "translateX(-50%)",
  },
  decorTop: {
    position: "absolute",
    top: 20,
    left: 40,
    right: 40,
    height: 2,
    background: "linear-gradient(90deg, transparent, rgba(180,140,100,0.3) 20%, rgba(180,140,100,0.4) 50%, rgba(180,140,100,0.3) 80%, transparent)",
  },
  decorBottom: {
    position: "absolute",
    bottom: 20,
    left: 40,
    right: 40,
    height: 2,
    background: "linear-gradient(90deg, transparent, rgba(180,140,100,0.3) 20%, rgba(180,140,100,0.4) 50%, rgba(180,140,100,0.3) 80%, transparent)",
  },
  frontContent: {
    position: "relative",
    zIndex: 1,
  },
  titleSection: {
    textAlign: "center",
    marginBottom: 30,
  },
  starDecor: {
    color: "#c9a55a",
    fontSize: 18,
    letterSpacing: 8,
    marginBottom: 8,
  },
  mainTitle: {
    fontFamily: '"InterSignature", Georgia, serif',
    fontSize: "clamp(32px, 6vw, 52px)",
    fontWeight: 400,
    color: "#3d2914",
    margin: "8px 0",
    letterSpacing: 2,
    textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
  },
  nameTitle: {
    fontFamily: '"InterSignature", Georgia, serif',
    fontSize: "clamp(40px, 8vw, 68px)",
    fontWeight: 400,
    color: "#8b5a2b",
    margin: "0 0 8px",
    letterSpacing: 3,
    textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
  },
  interactionArea: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "30px 20px",
    gap: 40,
  },
  bowSection: {
    position: "relative",
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  bowImage: {
    width: 120,
    height: "auto",
    filter: "drop-shadow(2px 4px 6px rgba(0,0,0,0.3))",
    transform: "rotate(90deg)",
  },
  arrowWrapper: {
    position: "absolute",
    right: 40,
    cursor: "grab",
    zIndex: 10,
    padding: 10,
    userSelect: "none",
    touchAction: "none",
  },
  arrowImage: {
    width: 200,
    height: "auto",
    filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.3))",
    pointerEvents: "none",
  },
  bowString: {
    position: "absolute",
    right: 55,
    width: 3,
    height: 80,
    background: "linear-gradient(180deg, rgba(60,40,20,0.8), rgba(80,60,40,0.9), rgba(60,40,20,0.8))",
    transformOrigin: "center",
    transition: "transform 0.05s",
    borderRadius: 2,
  },
  targetSection: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-start",
    paddingLeft: 40,
  },
  candleContainer: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  candleImage: {
    width: 100,
    height: "auto",
    filter: "drop-shadow(2px 4px 8px rgba(0,0,0,0.3))",
    transition: "filter 0.3s",
  },
  flameContainer: {
    position: "absolute",
    top: -30,
    left: "50%",
    transform: "translateX(-50%)",
    width: 30,
    height: 45,
  },
  flameOuter: {
    position: "absolute",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: 20,
    height: 35,
    background: "radial-gradient(ellipse at bottom, #ff6b35 0%, #ff9500 40%, #ffcc00 70%, transparent 100%)",
    borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
    animation: "flicker 0.5s ease-in-out infinite",
  },
  flameInner: {
    position: "absolute",
    bottom: 2,
    left: "50%",
    transform: "translateX(-50%)",
    width: 10,
    height: 20,
    background: "radial-gradient(ellipse at bottom, #fff 0%, #fffbe6 50%, transparent 100%)",
    borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
    animation: "flicker 0.3s ease-in-out infinite",
  },
  flameGlow: {
    position: "absolute",
    bottom: -10,
    left: "50%",
    transform: "translateX(-50%)",
    width: 60,
    height: 60,
    background: "radial-gradient(circle, rgba(255,150,50,0.4) 0%, transparent 70%)",
    animation: "glowPulse 1s ease-in-out infinite",
    pointerEvents: "none",
  },
  smokeContainer: {
    position: "absolute",
    top: -20,
    left: "50%",
    transform: "translateX(-50%)",
  },
  smoke1: {
    position: "absolute",
    width: 8,
    height: 8,
    background: "rgba(150,150,150,0.6)",
    borderRadius: "50%",
    animation: "smokeRise 1s ease-out forwards",
    left: -5,
  },
  smoke2: {
    position: "absolute",
    width: 10,
    height: 10,
    background: "rgba(130,130,130,0.5)",
    borderRadius: "50%",
    animation: "smokeRise 1.2s ease-out 0.1s forwards",
  },
  smoke3: {
    position: "absolute",
    width: 6,
    height: 6,
    background: "rgba(140,140,140,0.4)",
    borderRadius: "50%",
    animation: "smokeRise 1s ease-out 0.2s forwards",
    left: 8,
  },
  flyingArrow: {
    position: "absolute",
    width: 180,
    height: "auto",
    top: "50%",
    left: -200,
    transform: "translateY(-50%)",
    animation: "flyArrow 0.4s ease-out forwards",
    filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.3))",
  },
  instructionBox: {
    textAlign: "center",
    marginTop: 20,
    padding: "16px 24px",
    background: "rgba(60,40,20,0.05)",
    borderRadius: 8,
    border: "1px solid rgba(180,140,100,0.2)",
  },
  instruction: {
    fontFamily: "Georgia, serif",
    fontSize: 15,
    color: "#5a4030",
    margin: "0 0 12px",
    fontStyle: "italic",
  },
  pullMeter: {
    width: "100%",
    maxWidth: 200,
    height: 6,
    background: "rgba(0,0,0,0.1)",
    borderRadius: 3,
    margin: "0 auto",
    overflow: "hidden",
  },
  pullFill: {
    height: "100%",
    borderRadius: 3,
    transition: "width 0.1s, background 0.2s",
  },
  footerDecor: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    marginTop: 30,
    color: "#c9a55a",
  },
  decorDot: {
    fontSize: 10,
    opacity: 0.7,
  },
  decorLine: {
    width: 60,
    height: 1,
    background: "linear-gradient(90deg, transparent, rgba(180,140,100,0.4), transparent)",
  },
  decorStar: {
    fontSize: 14,
  },
  cardInner: {
    display: "grid",
    gridTemplateColumns: "1fr 1.3fr",
    minHeight: 600,
    width: "100%",
    maxWidth: 1000,
    background: "linear-gradient(145deg, #1e2243 0%, #0f1225 100%)",
    borderRadius: 24,
    boxShadow: "0 25px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.1)",
    animation: "fadeIn 0.8s ease-out",
  },
  cardLeft: {
    padding: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "radial-gradient(circle at 30% 30%, rgba(255,210,120,0.08), transparent 60%)",
    borderRight: "1px solid rgba(255,255,255,0.08)",
  },
  polaroidStack: {
    position: "relative",
    width: "100%",
    maxWidth: 280,
    aspectRatio: "3/4",
  },
  polaroid: {
    position: "absolute",
    inset: 0,
    background: "#fefefe",
    padding: "12px 12px 40px",
    borderRadius: 4,
    boxShadow: "0 8px 30px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.2)",
    animation: "polaroidIn 0.6s ease-out forwards",
    opacity: 0,
  },
  polaroidImage: {
    width: "100%",
    height: "100%",
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
    bottom: 10,
    left: 0,
    right: 0,
    textAlign: "center",
    fontFamily: '"InterSignature", cursive',
    fontSize: 14,
    color: "#333",
  },
  cardRight: {
    padding: "24px 30px",
    display: "flex",
    flexDirection: "column",
    background: "radial-gradient(ellipse at 70% 20%, rgba(158,231,255,0.06), transparent 50%)",
  },
  poemHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingBottom: 12,
    borderBottom: "1px solid rgba(255,255,255,0.1)",
  },
  toName: {
    fontSize: 20,
    fontWeight: 700,
    color: "white",
  },
  audioControls: {
    display: "flex",
    gap: 8,
  },
  playBtn: {
    width: 40,
    height: 40,
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
    width: 40,
    height: 40,
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
  },
  audioStatus: {
    fontSize: 12,
    color: "rgba(255,255,255,0.5)",
    marginTop: 12,
  },
};
