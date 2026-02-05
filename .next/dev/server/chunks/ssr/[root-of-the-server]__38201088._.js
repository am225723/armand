module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/app/components/BirthdayCard.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BirthdayCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
const BOW_ARROW_CONFIG = {
    // Bow settings
    bowRotation: 180,
    bowWidth: 120,
    bowOffsetY: 40,
    // Arrow settings
    arrowRotation: 0,
    arrowWidth: 140,
    arrowOffsetX: 30,
    arrowOffsetY: 0,
    pullDistance: 100,
    // Flight settings
    arrowFlightDistance: 500,
    arrowFlightDuration: 1.5,
    // Candle extinguish timing (milliseconds after arrow release)
    candleExtinguishDelays: [
        500,
        600,
        700,
        800,
        900
    ]
};
function BirthdayCard({ toName = "Luke", photos = [
    "/photo1.jpg",
    "/photo2.jpg",
    "/photo3.jpg"
], captions = [
    "Memory #1",
    "Memory #2",
    "Memory #3"
], fontUrl = "/fonts/InterSignature-q20q2.ttf", audioUrl = "/audio/luke-poem.mp3", lineStartTimes = [
    0.0,
    4.2,
    7.4,
    11.8,
    15.4,
    18.9,
    23.1,
    27.0,
    31.6,
    34.6,
    36.9,
    41.9,
    45.9,
    50.0,
    53.1,
    57.2,
    62.1,
    65.6,
    69.4
] }) {
    const POEM_LINES = [
        "The world became a brighter place...",
        "The moment Luke arrived,",
        "With kindness written on his face",
        "And a spirit meant to thrive.",
        "",
        "Through every year and every mile,",
        "A soul grows in heart and mind,",
        "With a steady hand and a ready smile,",
        "The rarest sort to find.",
        "",
        "May this day be filled with all that's loved,",
        "With laughter, warmth, and light,",
        "And may the year ahead unfold...",
        "To be exceptionally bright..",
        "",
        "So here's to Luke, for all he is,",
        "And the light he's always shown,",
        "",
        "Is To Be Known"
    ];
    const EMPHASIS_WORDS = [
        "Luke",
        "thrive",
        "loved",
        "bright",
        "Known",
        "heart"
    ];
    const [fontReady, setFontReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [cardOpen, setCardOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [arrowPull, setArrowPull] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isDragging, setIsDragging] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isPlaying, setIsPlaying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [lineProgress, setLineProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>POEM_LINES.map(()=>0));
    const [candlesLit, setCandlesLit] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([
        true,
        true,
        true,
        true,
        true
    ]);
    const [arrowFlying, setArrowFlying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showSmoke, setShowSmoke] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([
        false,
        false,
        false,
        false,
        false
    ]);
    const [currentPhotoIndex, setCurrentPhotoIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [photoSwipeOffset, setPhotoSwipeOffset] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isPhotoSwiping, setIsPhotoSwiping] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const audioRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const rafRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const dragStartX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(0);
    const photoSwipeStartX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(0);
    const silentAnimationRan = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let cancelled = false;
        async function loadFont() {
            try {
                const ff = new FontFace("InterSignature", `url(${fontUrl})`);
                await ff.load();
                document.fonts.add(ff);
                await document.fonts.ready;
            } catch  {}
            if (!cancelled) setFontReady(true);
        }
        loadFont();
        return ()=>{
            cancelled = true;
        };
    }, [
        fontUrl
    ]);
    const handleDragStart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((e)=>{
        if (cardOpen || arrowFlying) return;
        setIsDragging(true);
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        dragStartX.current = clientX;
        e.preventDefault();
    }, [
        cardOpen,
        arrowFlying
    ]);
    const handleDragMove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((e)=>{
        if (!isDragging || cardOpen || arrowFlying) return;
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const delta = dragStartX.current - clientX;
        const pull = Math.min(1, Math.max(0, delta / 100));
        setArrowPull(pull);
    }, [
        isDragging,
        cardOpen,
        arrowFlying
    ]);
    const handleDragEnd = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (!isDragging) return;
        setIsDragging(false);
        if (arrowPull > 0.5) {
            setArrowFlying(true);
            setArrowPull(0);
            BOW_ARROW_CONFIG.candleExtinguishDelays.forEach((delay, i)=>{
                setTimeout(()=>{
                    setCandlesLit((prev)=>{
                        const newState = [
                            ...prev
                        ];
                        newState[i] = false;
                        return newState;
                    });
                    setShowSmoke((prev)=>{
                        const newState = [
                            ...prev
                        ];
                        newState[i] = true;
                        return newState;
                    });
                }, delay);
            });
            setTimeout(()=>{
                setShowSmoke([
                    false,
                    false,
                    false,
                    false,
                    false
                ]);
            }, 1800);
            setTimeout(()=>{
                setCardOpen(true);
                setArrowFlying(false);
            }, 2000);
        } else {
            setArrowPull(0);
        }
    }, [
        isDragging,
        arrowPull
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (isDragging) {
            window.addEventListener("mousemove", handleDragMove);
            window.addEventListener("mouseup", handleDragEnd);
            window.addEventListener("touchmove", handleDragMove, {
                passive: false
            });
            window.addEventListener("touchend", handleDragEnd);
            return ()=>{
                window.removeEventListener("mousemove", handleDragMove);
                window.removeEventListener("mouseup", handleDragEnd);
                window.removeEventListener("touchmove", handleDragMove);
                window.removeEventListener("touchend", handleDragEnd);
            };
        }
    }, [
        isDragging,
        handleDragMove,
        handleDragEnd
    ]);
    const handleArrowClick = ()=>{
        if (!cardOpen && !isDragging && !arrowFlying) {
            setArrowFlying(true);
            [
                300,
                400,
                500,
                600,
                700
            ].forEach((delay, i)=>{
                setTimeout(()=>{
                    setCandlesLit((prev)=>{
                        const newState = [
                            ...prev
                        ];
                        newState[i] = false;
                        return newState;
                    });
                    setShowSmoke((prev)=>{
                        const newState = [
                            ...prev
                        ];
                        newState[i] = true;
                        return newState;
                    });
                }, delay);
            });
            setTimeout(()=>setShowSmoke([
                    false,
                    false,
                    false,
                    false,
                    false
                ]), 1800);
            setTimeout(()=>{
                setCardOpen(true);
                setArrowFlying(false);
            }, 2000);
        }
    };
    const handlePhotoSwipeStart = (e)=>{
        setIsPhotoSwiping(true);
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        photoSwipeStartX.current = clientX;
    };
    const handlePhotoSwipeMove = (e)=>{
        if (!isPhotoSwiping) return;
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const delta = clientX - photoSwipeStartX.current;
        setPhotoSwipeOffset(delta);
    };
    const handlePhotoSwipeEnd = ()=>{
        if (!isPhotoSwiping) return;
        setIsPhotoSwiping(false);
        if (Math.abs(photoSwipeOffset) > 50) {
            if (photoSwipeOffset < 0 && currentPhotoIndex < photos.length - 1) {
                setCurrentPhotoIndex((prev)=>prev + 1);
            } else if (photoSwipeOffset > 0 && currentPhotoIndex > 0) {
                setCurrentPhotoIndex((prev)=>prev - 1);
            }
        }
        setPhotoSwipeOffset(0);
    };
    const computeLineEnds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        const audio = audioRef.current;
        const duration = audio?.duration || 72;
        return lineStartTimes.map((t, i)=>i < lineStartTimes.length - 1 ? lineStartTimes[i + 1] : duration);
    }, [
        lineStartTimes
    ]);
    const startAnimation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        const audio = audioRef.current;
        if (!audio) return;
        const ends = computeLineEnds();
        const tick = ()=>{
            const t = audio.currentTime;
            const newProgress = POEM_LINES.map((line, i)=>{
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
    }, [
        lineStartTimes,
        computeLineEnds,
        POEM_LINES
    ]);
    const startSilentAnimation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        const totalDuration = 40;
        const startTime = Date.now();
        const ends = lineStartTimes.map((t, i)=>i < lineStartTimes.length - 1 ? lineStartTimes[i + 1] : totalDuration);
        const scale = totalDuration / (lineStartTimes[lineStartTimes.length - 1] + 3);
        const tick = ()=>{
            const elapsed = (Date.now() - startTime) / 1000;
            const t = elapsed * scale;
            const newProgress = POEM_LINES.map((line, i)=>{
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
    }, [
        lineStartTimes,
        POEM_LINES
    ]);
    const handlePlayAudio = async ()=>{
        const audio = audioRef.current;
        if (!audio) return;
        if (audio.paused) {
            try {
                audio.currentTime = 0;
                setLineProgress(POEM_LINES.map(()=>0));
                await audio.play();
                setIsPlaying(true);
                if (rafRef.current) cancelAnimationFrame(rafRef.current);
                startAnimation();
            } catch  {
                startSilentAnimation();
            }
        } else {
            audio.pause();
            setIsPlaying(false);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        }
    };
    const handleReplay = ()=>{
        const audio = audioRef.current;
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
        setLineProgress(POEM_LINES.map(()=>0));
        setIsPlaying(false);
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        handlePlayAudio();
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (cardOpen && !isPlaying && !silentAnimationRan.current) {
            const timer = setTimeout(()=>{
                if (!isPlaying) {
                    silentAnimationRan.current = true;
                    startSilentAnimation();
                }
            }, 1500);
            return ()=>clearTimeout(timer);
        }
    }, [
        cardOpen,
        isPlaying,
        startSilentAnimation
    ]);
    const inkSplatters = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useMemo(()=>[
            {
                x: 45,
                y: 120,
                size: 3
            },
            {
                x: 380,
                y: 200,
                size: 4
            },
            {
                x: 120,
                y: 340,
                size: 2
            },
            {
                x: 420,
                y: 420,
                size: 3
            },
            {
                x: 70,
                y: 500,
                size: 2
            },
            {
                x: 350,
                y: 560,
                size: 4
            },
            {
                x: 200,
                y: 150,
                size: 2
            },
            {
                x: 450,
                y: 300,
                size: 3
            }
        ], []);
    const inkDotsStatic = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useMemo(()=>{
        const seed = 12345;
        const dots = [];
        for(let i = 0; i < 25; i++){
            const pseudoRandom = (seed * (i + 1) * 9301 + 49297) % 233280;
            const x = 20 + pseudoRandom % 460;
            const y = 30 + pseudoRandom * 7 % 620;
            const size = 1 + pseudoRandom % 3;
            const opacity = 0.1 + pseudoRandom % 30 / 100;
            dots.push({
                x,
                y,
                size,
                opacity
            });
        }
        return dots;
    }, []);
    const renderLineWithEmphasis = (line, i, progress)=>{
        if (!line.trim()) return null;
        const isFinalLine = line === "Is To Be Known";
        const y = 50 + i * 38;
        const clipWidth = 520 * progress;
        const wobble = isFinalLine ? 0 : Math.sin(i * 1.5) * 2;
        const rotation = isFinalLine ? 0 : Math.sin(i * 0.7) * 0.8;
        const words = line.split(" ");
        let xOffset = isFinalLine ? 100 : 25;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("clipPath", {
                        id: `clip-${i}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                            x: "0",
                            y: y - 45,
                            width: clipWidth,
                            height: "70"
                        }, void 0, false, {
                            fileName: "[project]/app/components/BirthdayCard.jsx",
                            lineNumber: 395,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/BirthdayCard.jsx",
                        lineNumber: 394,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/components/BirthdayCard.jsx",
                    lineNumber: 393,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                    clipPath: `url(#clip-${i})`,
                    transform: `rotate(${rotation} 250 ${y})`,
                    children: isFinalLine ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                        x: xOffset,
                        y: y + 15,
                        style: {
                            fontFamily: '"Pinyon Script", cursive',
                            fontSize: 52,
                            fontWeight: 400,
                            fill: "#2d1810",
                            filter: "drop-shadow(0 2px 4px rgba(139,90,43,0.3)) drop-shadow(0 0 8px rgba(201,165,90,0.2))",
                            letterSpacing: 4
                        },
                        children: line
                    }, void 0, false, {
                        fileName: "[project]/app/components/BirthdayCard.jsx",
                        lineNumber: 403,
                        columnNumber: 13
                    }, this) : words.map((word, wordIdx)=>{
                        const isEmphasis = EMPHASIS_WORDS.some((ew)=>word.includes(ew));
                        const wordX = xOffset;
                        xOffset += word.length * 14 + 12;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                            x: wordX,
                            y: y + wobble,
                            style: {
                                fontFamily: '"Pinyon Script", cursive',
                                fontSize: isEmphasis ? 38 : 32,
                                fontWeight: 400,
                                fill: isEmphasis ? "#2d1810" : "#3d2b1f",
                                filter: isEmphasis ? "drop-shadow(0 1px 2px rgba(139,90,43,0.25))" : "drop-shadow(0 1px 1px rgba(0,0,0,0.1))",
                                letterSpacing: isEmphasis ? 2 : 1
                            },
                            children: word
                        }, wordIdx, false, {
                            fileName: "[project]/app/components/BirthdayCard.jsx",
                            lineNumber: 424,
                            columnNumber: 17
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/app/components/BirthdayCard.jsx",
                    lineNumber: 398,
                    columnNumber: 9
                }, this)
            ]
        }, i, true, {
            fileName: "[project]/app/components/BirthdayCard.jsx",
            lineNumber: 392,
            columnNumber: 7
        }, this);
    };
    if (!fontReady) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: styles.loading,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: styles.loadingText,
                children: "Loading..."
            }, void 0, false, {
                fileName: "[project]/app/components/BirthdayCard.jsx",
                lineNumber: 452,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/components/BirthdayCard.jsx",
            lineNumber: 451,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: styles.container,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("audio", {
                ref: audioRef,
                src: audioUrl,
                preload: "auto"
            }, void 0, false, {
                fileName: "[project]/app/components/BirthdayCard.jsx",
                lineNumber: 459,
                columnNumber: 7
            }, this),
            !cardOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: styles.cardFront,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: styles.cardPaper,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: styles.cardEdgeLeft
                        }, void 0, false, {
                            fileName: "[project]/app/components/BirthdayCard.jsx",
                            lineNumber: 464,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: styles.cardEdgeRight
                        }, void 0, false, {
                            fileName: "[project]/app/components/BirthdayCard.jsx",
                            lineNumber: 465,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: styles.partyBackground,
                            children: [
                                [
                                    ...Array(25)
                                ].map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            ...styles.confetti,
                                            left: `${3 + i * 3.8 % 94}%`,
                                            backgroundColor: [
                                                '#8b1a4a',
                                                '#1a3a5c',
                                                '#4a2c7a',
                                                '#2d5a4a',
                                                '#8b4513',
                                                '#6b2d5b'
                                            ][i % 6],
                                            animationDelay: `${i * 0.25}s`,
                                            animationDuration: `${4 + i % 4}s`,
                                            width: i % 3 === 0 ? 12 : i % 3 === 1 ? 8 : 6,
                                            height: i % 3 === 0 ? 12 : i % 3 === 1 ? 14 : 8,
                                            borderRadius: i % 4 === 0 ? '50%' : i % 4 === 1 ? '2px' : '0',
                                            transform: `rotate(${i * 15}deg)`
                                        }
                                    }, `confetti-${i}`, false, {
                                        fileName: "[project]/app/components/BirthdayCard.jsx",
                                        lineNumber: 471,
                                        columnNumber: 17
                                    }, this)),
                                [
                                    ...Array(6)
                                ].map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            ...styles.ribbon,
                                            left: `${8 + i * 16 % 84}%`,
                                            backgroundColor: [
                                                '#6b2d5b',
                                                '#1a3a5c',
                                                '#4a2c7a'
                                            ][i % 3],
                                            animationDelay: `${i * 0.8}s`,
                                            height: 30 + i % 3 * 10
                                        }
                                    }, `ribbon-${i}`, false, {
                                        fileName: "[project]/app/components/BirthdayCard.jsx",
                                        lineNumber: 488,
                                        columnNumber: 17
                                    }, this)),
                                [
                                    ...Array(10)
                                ].map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            ...styles.floatingStar,
                                            left: `${8 + i * 10 % 84}%`,
                                            top: `${10 + i * 8 % 75}%`,
                                            animationDelay: `${i * 0.4}s`,
                                            fontSize: `${12 + i % 4 * 5}px`,
                                            color: [
                                                '#8b6914',
                                                '#5c4a1a',
                                                '#6b4423'
                                            ][i % 3]
                                        },
                                        children: "✦"
                                    }, `star-${i}`, false, {
                                        fileName: "[project]/app/components/BirthdayCard.jsx",
                                        lineNumber: 501,
                                        columnNumber: 17
                                    }, this)),
                                [
                                    ...Array(15)
                                ].map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            ...styles.sparkle,
                                            left: `${5 + i * 6.5 % 90}%`,
                                            top: `${8 + i * 6 % 84}%`,
                                            animationDelay: `${i * 0.35}s`,
                                            backgroundColor: [
                                                '#c9a227',
                                                '#8b6914',
                                                '#a67c00'
                                            ][i % 3],
                                            boxShadow: `0 0 ${8 + i % 3 * 4}px ${[
                                                '#c9a227',
                                                '#8b6914',
                                                '#a67c00'
                                            ][i % 3]}`
                                        }
                                    }, `sparkle-${i}`, false, {
                                        fileName: "[project]/app/components/BirthdayCard.jsx",
                                        lineNumber: 517,
                                        columnNumber: 17
                                    }, this)),
                                [
                                    ...Array(8)
                                ].map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            ...styles.floatingOrb,
                                            left: `${10 + i * 12 % 80}%`,
                                            animationDelay: `${i * 0.6}s`,
                                            background: `radial-gradient(circle at 30% 30%, ${[
                                                'rgba(139, 26, 74, 0.4)',
                                                'rgba(26, 58, 92, 0.4)',
                                                'rgba(74, 44, 122, 0.4)'
                                            ][i % 3]}, transparent)`,
                                            width: 20 + i % 3 * 15,
                                            height: 20 + i % 3 * 15
                                        }
                                    }, `orb-${i}`, false, {
                                        fileName: "[project]/app/components/BirthdayCard.jsx",
                                        lineNumber: 531,
                                        columnNumber: 17
                                    }, this)),
                                [
                                    ...Array(7)
                                ].map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            ...styles.balloon,
                                            left: `${5 + i * 14 % 90}%`,
                                            animationDelay: `${i * 0.7}s`,
                                            animationDuration: `${5 + i % 3}s`
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    ...styles.balloonBody,
                                                    background: `radial-gradient(circle at 30% 25%, ${[
                                                        '#a82255',
                                                        '#1e4d7a',
                                                        '#5c3d8a',
                                                        '#2a6b50',
                                                        '#8a4520',
                                                        '#6b3d6b',
                                                        '#4a6b8a'
                                                    ][i]} 0%, ${[
                                                        '#7a1940',
                                                        '#153a5c',
                                                        '#3d2860',
                                                        '#1a4a35',
                                                        '#5c3015',
                                                        '#4a2850',
                                                        '#2a4a6a'
                                                    ][i]} 100%)`
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: styles.balloonShine
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                                    lineNumber: 564,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/BirthdayCard.jsx",
                                                lineNumber: 554,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    ...styles.balloonString,
                                                    backgroundColor: [
                                                        '#7a1940',
                                                        '#153a5c',
                                                        '#3d2860',
                                                        '#1a4a35',
                                                        '#5c3015',
                                                        '#4a2850',
                                                        '#2a4a6a'
                                                    ][i]
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/BirthdayCard.jsx",
                                                lineNumber: 566,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, `balloon-${i}`, true, {
                                        fileName: "[project]/app/components/BirthdayCard.jsx",
                                        lineNumber: 545,
                                        columnNumber: 17
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/BirthdayCard.jsx",
                            lineNumber: 468,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: styles.embossedBorder
                        }, void 0, false, {
                            fileName: "[project]/app/components/BirthdayCard.jsx",
                            lineNumber: 576,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: styles.cornerTL,
                            children: "❧"
                        }, void 0, false, {
                            fileName: "[project]/app/components/BirthdayCard.jsx",
                            lineNumber: 578,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: styles.cornerTR,
                            children: "❧"
                        }, void 0, false, {
                            fileName: "[project]/app/components/BirthdayCard.jsx",
                            lineNumber: 579,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: styles.cornerBL,
                            children: "❧"
                        }, void 0, false, {
                            fileName: "[project]/app/components/BirthdayCard.jsx",
                            lineNumber: 580,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: styles.cornerBR,
                            children: "❧"
                        }, void 0, false, {
                            fileName: "[project]/app/components/BirthdayCard.jsx",
                            lineNumber: 581,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: styles.decorTop
                        }, void 0, false, {
                            fileName: "[project]/app/components/BirthdayCard.jsx",
                            lineNumber: 583,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: styles.decorBottom
                        }, void 0, false, {
                            fileName: "[project]/app/components/BirthdayCard.jsx",
                            lineNumber: 584,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: styles.frontContent,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: styles.titleSection,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: styles.starDecor,
                                            children: "✦ ✦ ✦"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                            lineNumber: 588,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            style: styles.mainTitle,
                                            children: "Happy Birthday"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                            lineNumber: 589,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            style: styles.nameTitle,
                                            children: toName
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                            lineNumber: 590,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: styles.starDecor,
                                            children: "✦ ✦ ✦"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                            lineNumber: 591,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                    lineNumber: 587,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: styles.interactionArea,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: styles.bowSection,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        ...styles.bowContainer,
                                                        transform: `scaleX(${1 + arrowPull * 0.1})`
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: "/bow.png",
                                                        alt: "Bow",
                                                        style: styles.bowImage
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/BirthdayCard.jsx",
                                                        lineNumber: 602,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                                    lineNumber: 596,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        ...styles.arrowWrapper,
                                                        transform: `translateY(-50%) translateX(${-arrowPull * BOW_ARROW_CONFIG.pullDistance}px)`,
                                                        opacity: arrowFlying ? 0 : 1,
                                                        transition: arrowFlying ? "opacity 0.15s" : "transform 0.05s"
                                                    },
                                                    onMouseDown: handleDragStart,
                                                    onTouchStart: handleDragStart,
                                                    onClick: handleArrowClick,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: "/arrow.png",
                                                        alt: "Arrow",
                                                        style: styles.arrowImage
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/BirthdayCard.jsx",
                                                        lineNumber: 618,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                                    lineNumber: 605,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                            lineNumber: 595,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: styles.targetSection,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: styles.candlesCluster,
                                                    children: [
                                                        0,
                                                        1,
                                                        2,
                                                        3,
                                                        4
                                                    ].map((i)=>{
                                                        const positions = [
                                                            {
                                                                x: -35,
                                                                y: 0,
                                                                scale: 0.9,
                                                                z: 1
                                                            },
                                                            {
                                                                x: 35,
                                                                y: 0,
                                                                scale: 0.9,
                                                                z: 1
                                                            },
                                                            {
                                                                x: -55,
                                                                y: -30,
                                                                scale: 0.75,
                                                                z: 0
                                                            },
                                                            {
                                                                x: 0,
                                                                y: -35,
                                                                scale: 0.8,
                                                                z: 0
                                                            },
                                                            {
                                                                x: 55,
                                                                y: -30,
                                                                scale: 0.75,
                                                                z: 0
                                                            }
                                                        ];
                                                        const pos = positions[i];
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                ...styles.candleContainer,
                                                                transform: `translateX(${pos.x}px) translateY(${pos.y}px) scale(${pos.scale})`,
                                                                zIndex: pos.z
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                    src: "/candle.png",
                                                                    alt: "Candle",
                                                                    style: {
                                                                        ...styles.candleImage,
                                                                        filter: candlesLit[i] ? "brightness(1)" : "brightness(0.65) saturate(0.7)"
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                                                    lineNumber: 646,
                                                                    columnNumber: 27
                                                                }, this),
                                                                candlesLit[i] && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: styles.flameContainer,
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            style: styles.flameOuter
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                                                            lineNumber: 659,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            style: styles.flameInner
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                                                            lineNumber: 660,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            style: styles.flameGlow
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                                                            lineNumber: 661,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                                                    lineNumber: 658,
                                                                    columnNumber: 29
                                                                }, this),
                                                                showSmoke[i] && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: styles.smokeContainer,
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            style: styles.smoke1
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                                                            lineNumber: 667,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            style: styles.smoke2
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                                                            lineNumber: 668,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            style: styles.smoke3
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                                                            lineNumber: 669,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                                                    lineNumber: 666,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, i, true, {
                                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                                            lineNumber: 638,
                                                            columnNumber: 25
                                                        }, this);
                                                    })
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                                    lineNumber: 627,
                                                    columnNumber: 19
                                                }, this),
                                                arrowFlying && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: "/arrow.png",
                                                    alt: "Flying Arrow",
                                                    style: styles.flyingArrow
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                                    lineNumber: 677,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                            lineNumber: 626,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                    lineNumber: 594,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: styles.instructionBox,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: styles.instruction,
                                            children: arrowPull > 0.5 ? "Release to shoot!" : arrowPull > 0 ? "Pull back more..." : "Pull the arrow back to extinguish the candles"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                            lineNumber: 687,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: styles.pullMeter,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    ...styles.pullFill,
                                                    width: `${arrowPull * 100}%`,
                                                    background: arrowPull > 0.5 ? "linear-gradient(90deg, #4ade80, #22c55e)" : "linear-gradient(90deg, #fbbf24, #f59e0b)"
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/BirthdayCard.jsx",
                                                lineNumber: 695,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                            lineNumber: 694,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                    lineNumber: 686,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: styles.footerDecor,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: styles.decorDot,
                                            children: "◆"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                            lineNumber: 709,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: styles.decorLine
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                            lineNumber: 710,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: styles.decorStar,
                                            children: "★"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                            lineNumber: 711,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: styles.decorLine
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                            lineNumber: 712,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: styles.decorDot,
                                            children: "◆"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                            lineNumber: 713,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                    lineNumber: 708,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/BirthdayCard.jsx",
                            lineNumber: 586,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/BirthdayCard.jsx",
                    lineNumber: 463,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/BirthdayCard.jsx",
                lineNumber: 462,
                columnNumber: 9
            }, this),
            cardOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card-inner-responsive",
                style: styles.cardInner,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "card-left-responsive",
                        style: styles.cardLeft,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: styles.photoGallery,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        ...styles.photoCarousel,
                                        transform: `translateX(${-currentPhotoIndex * 100 + photoSwipeOffset * 0.3}%)`
                                    },
                                    onMouseDown: handlePhotoSwipeStart,
                                    onMouseMove: handlePhotoSwipeMove,
                                    onMouseUp: handlePhotoSwipeEnd,
                                    onMouseLeave: handlePhotoSwipeEnd,
                                    onTouchStart: handlePhotoSwipeStart,
                                    onTouchMove: handlePhotoSwipeMove,
                                    onTouchEnd: handlePhotoSwipeEnd,
                                    children: photos.map((src, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: styles.photoSlide,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: styles.polaroid,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: styles.polaroidTape
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/BirthdayCard.jsx",
                                                        lineNumber: 740,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: styles.polaroidImage,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                            src: src,
                                                            alt: captions[i],
                                                            style: styles.photo
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                                            lineNumber: 742,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/BirthdayCard.jsx",
                                                        lineNumber: 741,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: styles.polaroidCaption,
                                                        children: captions[i]
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/BirthdayCard.jsx",
                                                        lineNumber: 744,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/components/BirthdayCard.jsx",
                                                lineNumber: 739,
                                                columnNumber: 21
                                            }, this)
                                        }, i, false, {
                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                            lineNumber: 738,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                    lineNumber: 724,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: styles.photoDots,
                                    children: photos.map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setCurrentPhotoIndex(i),
                                            style: {
                                                ...styles.photoDot,
                                                background: i === currentPhotoIndex ? "#fff" : "rgba(255,255,255,0.3)",
                                                transform: i === currentPhotoIndex ? "scale(1.3)" : "scale(1)"
                                            }
                                        }, i, false, {
                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                            lineNumber: 752,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                    lineNumber: 750,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: styles.swipeHint,
                                    children: "← Swipe to see more →"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                    lineNumber: 768,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/BirthdayCard.jsx",
                            lineNumber: 723,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/BirthdayCard.jsx",
                        lineNumber: 722,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "card-right-responsive",
                        style: styles.cardRight,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: styles.poemHeader,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: styles.toName,
                                        children: [
                                            "To ",
                                            toName,
                                            ","
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/BirthdayCard.jsx",
                                        lineNumber: 774,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: styles.audioControls,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: handlePlayAudio,
                                                style: styles.playBtn,
                                                children: isPlaying ? "⏸" : "▶"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/BirthdayCard.jsx",
                                                lineNumber: 776,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: handleReplay,
                                                style: styles.replayBtn,
                                                children: "↺"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/BirthdayCard.jsx",
                                                lineNumber: 779,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/BirthdayCard.jsx",
                                        lineNumber: 775,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/BirthdayCard.jsx",
                                lineNumber: 773,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: styles.poemContainer,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    viewBox: "0 0 520 720",
                                    className: "poem-svg-responsive",
                                    style: styles.poemSvg,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("filter", {
                                                    id: "inkBleed",
                                                    x: "-20%",
                                                    y: "-20%",
                                                    width: "140%",
                                                    height: "140%",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feMorphology", {
                                                            operator: "dilate",
                                                            radius: "0.4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                                            lineNumber: 799,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feGaussianBlur", {
                                                            stdDeviation: "0.6"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                                            lineNumber: 800,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                                    lineNumber: 792,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("filter", {
                                                    id: "wetInk",
                                                    x: "-10%",
                                                    y: "-10%",
                                                    width: "120%",
                                                    height: "120%",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feGaussianBlur", {
                                                            in: "SourceAlpha",
                                                            stdDeviation: "1",
                                                            result: "blur"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                                            lineNumber: 809,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feOffset", {
                                                            in: "blur",
                                                            dx: "0.5",
                                                            dy: "0.5",
                                                            result: "offsetBlur"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                                            lineNumber: 814,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feMerge", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feMergeNode", {
                                                                    in: "offsetBlur"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                                                    lineNumber: 816,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feMergeNode", {
                                                                    in: "SourceGraphic"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                                                    lineNumber: 817,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                                            lineNumber: 815,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                                    lineNumber: 802,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                            lineNumber: 791,
                                            columnNumber: 17
                                        }, this),
                                        inkDotsStatic.map((dot, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                cx: dot.x,
                                                cy: dot.y,
                                                r: dot.size,
                                                fill: `rgba(61,43,31,${dot.opacity * 0.4})`
                                            }, `dot-${i}`, false, {
                                                fileName: "[project]/app/components/BirthdayCard.jsx",
                                                lineNumber: 823,
                                                columnNumber: 19
                                            }, this)),
                                        inkSplatters.map((spot, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                        cx: spot.x,
                                                        cy: spot.y,
                                                        r: spot.size,
                                                        fill: "rgba(139,90,43,0.15)",
                                                        filter: "url(#inkBleed)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/BirthdayCard.jsx",
                                                        lineNumber: 834,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                        cx: spot.x + 2,
                                                        cy: spot.y - 1,
                                                        r: spot.size * 0.5,
                                                        fill: "rgba(139,90,43,0.1)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/BirthdayCard.jsx",
                                                        lineNumber: 841,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, `splat-${i}`, true, {
                                                fileName: "[project]/app/components/BirthdayCard.jsx",
                                                lineNumber: 833,
                                                columnNumber: 19
                                            }, this)),
                                        POEM_LINES.map((line, i)=>renderLineWithEmphasis(line, i, lineProgress[i] || 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "M 25 680 Q 80 675, 150 680 T 280 678",
                                            fill: "none",
                                            stroke: "rgba(201,165,90,0.4)",
                                            strokeWidth: "1.5",
                                            strokeLinecap: "round"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                            lineNumber: 855,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "M 180 25 Q 220 20, 260 25 Q 300 30, 340 25",
                                            fill: "none",
                                            stroke: "rgba(201,165,90,0.3)",
                                            strokeWidth: "1",
                                            strokeLinecap: "round"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                            lineNumber: 863,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                            x: "480",
                                            y: "40",
                                            fill: "rgba(201,165,90,0.5)",
                                            fontSize: "24",
                                            fontFamily: "Georgia, serif",
                                            children: "❧"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                            lineNumber: 871,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                            x: "25",
                                            y: "700",
                                            fill: "rgba(201,165,90,0.5)",
                                            fontSize: "24",
                                            fontFamily: "Georgia, serif",
                                            transform: "rotate(180, 37, 694)",
                                            children: "❧"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                            lineNumber: 873,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                    lineNumber: 786,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/BirthdayCard.jsx",
                                lineNumber: 785,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/BirthdayCard.jsx",
                        lineNumber: 772,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/BirthdayCard.jsx",
                lineNumber: 721,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
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
            transform: translateY(-30px) rotate(0deg) translateX(0); 
            opacity: 0;
          }
          5% {
            opacity: 0.9;
          }
          50% {
            transform: translateY(300px) rotate(360deg) translateX(20px);
          }
          100% { 
            transform: translateY(700px) rotate(720deg) translateX(-10px); 
            opacity: 0.2;
          }
        }

        @keyframes floatStar {
          0% { 
            transform: translateY(0) scale(1) rotate(0deg); 
            opacity: 0.5;
          }
          25% {
            transform: translateY(-10px) scale(1.1) rotate(10deg);
            opacity: 0.8;
          }
          50% { 
            transform: translateY(-20px) scale(1.3) rotate(0deg); 
            opacity: 1;
          }
          75% {
            transform: translateY(-10px) scale(1.1) rotate(-10deg);
            opacity: 0.8;
          }
          100% { 
            transform: translateY(0) scale(1) rotate(0deg); 
            opacity: 0.5;
          }
        }

        @keyframes sparkleGlow {
          0%, 100% { 
            transform: scale(0) rotate(0deg); 
            opacity: 0;
          }
          25% {
            transform: scale(0.5) rotate(45deg);
            opacity: 0.5;
          }
          50% { 
            transform: scale(1.2) rotate(90deg); 
            opacity: 1;
          }
          75% {
            transform: scale(0.8) rotate(135deg);
            opacity: 0.7;
          }
        }

        @keyframes ribbonFall {
          0% {
            transform: translateY(-50px) rotate(0deg) scaleY(1);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          25% {
            transform: translateY(150px) rotate(15deg) scaleY(1.2);
          }
          50% {
            transform: translateY(350px) rotate(-10deg) scaleY(0.9);
          }
          75% {
            transform: translateY(500px) rotate(20deg) scaleY(1.1);
          }
          100% {
            transform: translateY(700px) rotate(-5deg) scaleY(1);
            opacity: 0.1;
          }
        }

        @keyframes orbFloat {
          0% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0.3;
          }
          25% {
            transform: translateY(-30px) translateX(15px) scale(1.1);
            opacity: 0.5;
          }
          50% {
            transform: translateY(-50px) translateX(0) scale(1.2);
            opacity: 0.6;
          }
          75% {
            transform: translateY(-30px) translateX(-15px) scale(1.1);
            opacity: 0.5;
          }
          100% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0.3;
          }
        }

        @keyframes balloonFloat {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.9;
          }
          25% {
            transform: translateY(-180px) translateX(10px) rotate(3deg);
          }
          50% {
            transform: translateY(-380px) translateX(-8px) rotate(-2deg);
          }
          75% {
            transform: translateY(-550px) translateX(12px) rotate(4deg);
          }
          90% {
            opacity: 0.7;
          }
          100% {
            transform: translateY(-720px) translateX(0) rotate(0deg);
            opacity: 0;
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
      `
            }, void 0, false, {
                fileName: "[project]/app/components/BirthdayCard.jsx",
                lineNumber: 880,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/BirthdayCard.jsx",
        lineNumber: 458,
        columnNumber: 5
    }, this);
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
        boxSizing: "border-box"
    },
    loading: {
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#1a1225"
    },
    loadingText: {
        color: "white",
        fontSize: 18,
        fontFamily: "system-ui, sans-serif"
    },
    cardFront: {
        width: "100%",
        maxWidth: 750,
        perspective: "1500px"
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
        overflow: "hidden"
    },
    cardEdgeLeft: {
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width: 8,
        background: "linear-gradient(90deg, rgba(0,0,0,0.08), transparent)"
    },
    cardEdgeRight: {
        position: "absolute",
        right: 0,
        top: 0,
        bottom: 0,
        width: 8,
        background: "linear-gradient(-90deg, rgba(0,0,0,0.05), transparent)"
    },
    embossedBorder: {
        position: "absolute",
        top: 20,
        left: 20,
        right: 20,
        bottom: 20,
        border: "2px solid rgba(180,150,120,0.2)",
        borderRadius: 8,
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -1px 0 rgba(0,0,0,0.05)",
        pointerEvents: "none",
        zIndex: 1
    },
    partyBackground: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0
    },
    confetti: {
        position: "absolute",
        top: -20,
        width: 10,
        height: 10,
        borderRadius: 2,
        animation: "confettiFall 4s linear infinite"
    },
    floatingStar: {
        position: "absolute",
        top: "15%",
        color: "#d4a574",
        animation: "floatStar 2.5s ease-in-out infinite",
        opacity: 0.6
    },
    sparkle: {
        position: "absolute",
        width: 5,
        height: 5,
        backgroundColor: "#c9a227",
        borderRadius: "50%",
        boxShadow: "0 0 8px #c9a227",
        animation: "sparkleGlow 2.5s ease-in-out infinite"
    },
    ribbon: {
        position: "absolute",
        top: -40,
        width: 4,
        borderRadius: 2,
        animation: "ribbonFall 6s ease-in-out infinite"
    },
    floatingOrb: {
        position: "absolute",
        top: "20%",
        borderRadius: "50%",
        animation: "orbFloat 5s ease-in-out infinite"
    },
    balloon: {
        position: "absolute",
        bottom: -80,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        animation: "balloonFloat 6s ease-in-out infinite"
    },
    balloonBody: {
        width: 35,
        height: 42,
        borderRadius: "50% 50% 50% 50% / 40% 40% 60% 60%",
        position: "relative",
        boxShadow: "inset -3px -3px 8px rgba(0,0,0,0.3), 2px 4px 8px rgba(0,0,0,0.2)"
    },
    balloonShine: {
        position: "absolute",
        top: 8,
        left: 8,
        width: 10,
        height: 12,
        borderRadius: "50%",
        background: "rgba(255,255,255,0.4)",
        filter: "blur(2px)"
    },
    balloonString: {
        width: 1,
        height: 40,
        marginTop: -2
    },
    cornerTL: {
        position: "absolute",
        top: 30,
        left: 30,
        fontSize: 22,
        color: "rgba(180,150,120,0.4)",
        transform: "rotate(-45deg)"
    },
    cornerTR: {
        position: "absolute",
        top: 30,
        right: 30,
        fontSize: 22,
        color: "rgba(180,150,120,0.4)",
        transform: "rotate(45deg) scaleX(-1)"
    },
    cornerBL: {
        position: "absolute",
        bottom: 30,
        left: 30,
        fontSize: 22,
        color: "rgba(180,150,120,0.4)",
        transform: "rotate(-135deg)"
    },
    cornerBR: {
        position: "absolute",
        bottom: 30,
        right: 30,
        fontSize: 22,
        color: "rgba(180,150,120,0.4)",
        transform: "rotate(135deg) scaleX(-1)"
    },
    decorTop: {
        position: "absolute",
        top: 40,
        left: 50,
        right: 50,
        height: 1,
        background: "linear-gradient(90deg, transparent, rgba(180,140,100,0.25) 15%, rgba(180,140,100,0.35) 50%, rgba(180,140,100,0.25) 85%, transparent)"
    },
    decorBottom: {
        position: "absolute",
        bottom: 40,
        left: 50,
        right: 50,
        height: 1,
        background: "linear-gradient(90deg, transparent, rgba(180,140,100,0.25) 15%, rgba(180,140,100,0.35) 50%, rgba(180,140,100,0.25) 85%, transparent)"
    },
    frontContent: {
        position: "relative",
        zIndex: 1
    },
    titleSection: {
        textAlign: "center",
        marginBottom: 20
    },
    starDecor: {
        color: "#c9a55a",
        fontSize: 16,
        letterSpacing: 12,
        marginBottom: 6
    },
    mainTitle: {
        fontFamily: '"InterSignature", Georgia, serif',
        fontSize: "clamp(36px, 6.5vw, 58px)",
        fontWeight: 700,
        color: "#2a1810",
        margin: "6px 0",
        letterSpacing: 3,
        textShadow: "2px 2px 4px rgba(0,0,0,0.2), 0 0 20px rgba(139, 26, 74, 0.15)"
    },
    nameTitle: {
        fontFamily: '"InterSignature", Georgia, serif',
        fontSize: "clamp(44px, 8.5vw, 72px)",
        fontWeight: 700,
        color: "#8b5a2b",
        margin: "0 0 6px",
        letterSpacing: 3,
        textShadow: "2px 2px 4px rgba(0,0,0,0.1)"
    },
    interactionArea: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "15px 10px",
        gap: 50,
        minHeight: 250
    },
    bowSection: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: BOW_ARROW_CONFIG.bowOffsetY
    },
    bowContainer: {
        transition: "transform 0.1s ease-out",
        transformOrigin: "center"
    },
    bowImage: {
        width: BOW_ARROW_CONFIG.bowWidth,
        height: "auto",
        filter: "drop-shadow(3px 5px 8px rgba(0,0,0,0.35))",
        transform: `rotate(${BOW_ARROW_CONFIG.bowRotation}deg)`
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
        touchAction: "none"
    },
    arrowImage: {
        width: BOW_ARROW_CONFIG.arrowWidth,
        height: "auto",
        filter: "drop-shadow(2px 3px 5px rgba(0,0,0,0.35))",
        transform: `rotate(${BOW_ARROW_CONFIG.arrowRotation}deg)`,
        pointerEvents: "none"
    },
    bowString: {
        display: "none"
    },
    targetSection: {
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end"
    },
    candlesCluster: {
        position: "relative",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        width: 220,
        height: 220
    },
    candleContainer: {
        position: "absolute",
        bottom: 0,
        left: "50%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginLeft: -45
    },
    candleImage: {
        width: 90,
        height: "auto",
        filter: "drop-shadow(3px 8px 10px rgba(0,0,0,0.35))",
        transition: "filter 0.4s ease-out"
    },
    flameContainer: {
        position: "absolute",
        top: -50,
        left: "50%",
        transform: "translateX(-50%)",
        width: 50,
        height: 70
    },
    flameOuter: {
        position: "absolute",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: 30,
        height: 50,
        background: "radial-gradient(ellipse at 50% 85%, #ff4500 0%, #ff6b35 20%, #ff9500 45%, #ffcc00 70%, transparent 100%)",
        borderRadius: "50% 50% 50% 50% / 65% 65% 35% 35%",
        animation: "naturalFlicker 0.5s ease-in-out infinite"
    },
    flameInner: {
        position: "absolute",
        bottom: 5,
        left: "50%",
        transform: "translateX(-50%)",
        width: 12,
        height: 25,
        background: "radial-gradient(ellipse at 50% 80%, #fff 0%, #fffbe6 45%, #ffd54f 75%, transparent 100%)",
        borderRadius: "50% 50% 50% 50% / 70% 70% 30% 30%",
        animation: "naturalFlicker 0.3s ease-in-out infinite"
    },
    flameGlow: {
        position: "absolute",
        bottom: -10,
        left: "50%",
        transform: "translateX(-50%)",
        width: 60,
        height: 60,
        background: "radial-gradient(circle, rgba(255,150,50,0.35) 0%, rgba(255,100,30,0.15) 45%, transparent 70%)",
        animation: "glowPulse 0.9s ease-in-out infinite",
        pointerEvents: "none"
    },
    smokeContainer: {
        position: "absolute",
        top: -60,
        left: "50%",
        transform: "translateX(-50%)"
    },
    smoke1: {
        position: "absolute",
        width: 18,
        height: 18,
        background: "rgba(150,150,150,0.6)",
        borderRadius: "50%",
        animation: "smokeRise 1.2s ease-out forwards",
        left: -10
    },
    smoke2: {
        position: "absolute",
        width: 22,
        height: 22,
        background: "rgba(130,130,130,0.5)",
        borderRadius: "50%",
        animation: "smokeRise 1.4s ease-out 0.1s forwards"
    },
    smoke3: {
        position: "absolute",
        width: 14,
        height: 14,
        background: "rgba(140,140,140,0.4)",
        borderRadius: "50%",
        animation: "smokeRise 1.1s ease-out 0.2s forwards",
        left: 16
    },
    flyingArrow: {
        position: "absolute",
        width: BOW_ARROW_CONFIG.arrowWidth,
        height: "auto",
        top: "calc(50% + 45px)",
        left: -200,
        transform: `translateY(-50%) rotate(${BOW_ARROW_CONFIG.arrowRotation}deg)`,
        animation: `flyArrow ${BOW_ARROW_CONFIG.arrowFlightDuration}s ease-out forwards`,
        filter: "drop-shadow(3px 3px 6px rgba(0,0,0,0.4))",
        zIndex: 20
    },
    instructionBox: {
        textAlign: "center",
        marginTop: 15,
        padding: "14px 20px",
        background: "rgba(60,40,20,0.05)",
        borderRadius: 8,
        border: "1px solid rgba(180,140,100,0.2)"
    },
    instruction: {
        fontFamily: "Georgia, serif",
        fontSize: 14,
        color: "#5a4030",
        margin: "0 0 10px",
        fontStyle: "italic"
    },
    pullMeter: {
        width: "100%",
        maxWidth: 180,
        height: 6,
        background: "rgba(0,0,0,0.1)",
        borderRadius: 3,
        margin: "0 auto",
        overflow: "hidden"
    },
    pullFill: {
        height: "100%",
        borderRadius: 3,
        transition: "width 0.08s, background 0.2s"
    },
    footerDecor: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        marginTop: 20,
        color: "#c9a55a"
    },
    decorDot: {
        fontSize: 9,
        opacity: 0.7
    },
    decorLine: {
        width: 50,
        height: 1,
        background: "linear-gradient(90deg, transparent, rgba(180,140,100,0.4), transparent)"
    },
    decorStar: {
        fontSize: 13
    },
    cardInner: {
        display: "grid",
        gridTemplateColumns: "1fr 1.4fr",
        minHeight: 650,
        width: "100%",
        maxWidth: 1100,
        background: "linear-gradient(145deg, #f8f4e8 0%, #f0e8d8 50%, #e8dcc8 100%)",
        borderRadius: 24,
        boxShadow: "0 25px 80px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.8), inset 0 -2px 4px rgba(139,90,43,0.1)",
        overflow: "hidden",
        border: "2px solid rgba(180,140,100,0.3)",
        animation: "fadeIn 0.8s ease-out",
        position: "relative"
    },
    cardLeft: {
        padding: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, rgba(139,90,43,0.08) 0%, transparent 50%), radial-gradient(circle at 30% 30%, rgba(201,165,90,0.15), transparent 60%)",
        borderRight: "1px solid rgba(180,140,100,0.2)",
        maxWidth: 320,
        position: "relative"
    },
    photoGallery: {
        width: "100%",
        maxWidth: 280,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        overflow: "hidden"
    },
    photoCarousel: {
        display: "flex",
        width: "100%",
        transition: "transform 0.3s ease-out",
        cursor: "grab"
    },
    photoSlide: {
        minWidth: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 10px",
        boxSizing: "border-box"
    },
    polaroid: {
        position: "relative",
        background: "#fefefe",
        padding: "12px 12px 45px",
        borderRadius: 4,
        boxShadow: "0 10px 40px rgba(0,0,0,0.4), 0 3px 10px rgba(0,0,0,0.2)",
        transform: "rotate(-2deg)",
        width: 220,
        maxWidth: "100%"
    },
    polaroidTape: {
        position: "absolute",
        top: -12,
        left: "50%",
        transform: "translateX(-50%) rotate(2deg)",
        width: 70,
        height: 24,
        background: "linear-gradient(180deg, rgba(255,255,220,0.7), rgba(240,230,180,0.6))",
        borderRadius: 2,
        boxShadow: "0 1px 3px rgba(0,0,0,0.15)"
    },
    polaroidImage: {
        width: "100%",
        aspectRatio: "1/1",
        background: "#e0e0e0",
        borderRadius: 2,
        overflow: "hidden"
    },
    photo: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block"
    },
    polaroidCaption: {
        position: "absolute",
        bottom: 12,
        left: 0,
        right: 0,
        textAlign: "center",
        fontFamily: '"Pinyon Script", cursive',
        fontSize: 18,
        color: "#333"
    },
    photoDots: {
        display: "flex",
        gap: 10,
        justifyContent: "center"
    },
    photoDot: {
        width: 10,
        height: 10,
        borderRadius: "50%",
        border: "none",
        cursor: "pointer",
        transition: "all 0.2s ease"
    },
    swipeHint: {
        fontSize: 12,
        color: "rgba(139,90,43,0.5)",
        fontStyle: "italic",
        margin: 0
    },
    cardRight: {
        padding: "24px 35px",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(180deg, rgba(248,244,232,0.9) 0%, rgba(240,232,216,0.95) 100%), radial-gradient(ellipse at 70% 20%, rgba(201,165,90,0.1), transparent 50%)",
        position: "relative"
    },
    poemHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
        paddingBottom: 12,
        borderBottom: "1px solid rgba(139,90,43,0.2)"
    },
    toName: {
        fontFamily: '"Pinyon Script", cursive',
        fontSize: 32,
        fontWeight: 400,
        color: "#3d2b1f",
        letterSpacing: 1,
        textShadow: "1px 1px 2px rgba(201,165,90,0.3)"
    },
    audioControls: {
        display: "flex",
        gap: 8
    },
    playBtn: {
        width: 42,
        height: 42,
        borderRadius: "50%",
        border: "1px solid rgba(139,90,43,0.3)",
        background: "linear-gradient(145deg, #c9a55a, #8b6914)",
        color: "#fff",
        fontSize: 16,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.2s",
        boxShadow: "0 2px 8px rgba(139,90,43,0.3)"
    },
    replayBtn: {
        width: 42,
        height: 42,
        borderRadius: "50%",
        border: "1px solid rgba(139,90,43,0.3)",
        background: "rgba(201,165,90,0.2)",
        color: "#5a4030",
        fontSize: 18,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.2s"
    },
    poemContainer: {
        flex: 1,
        overflow: "hidden"
    },
    poemSvg: {
        width: "100%",
        height: "100%",
        display: "block",
        minHeight: 680
    }
};
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__38201088._.js.map