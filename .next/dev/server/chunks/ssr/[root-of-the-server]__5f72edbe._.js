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
        "For everyone to see."
    ];
    const EMPHASIS_WORDS = [
        "Luke",
        "star",
        "thrive",
        "love",
        "bright",
        "dreams",
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
        true
    ]);
    const [arrowFlying, setArrowFlying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showSmoke, setShowSmoke] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([
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
            [
                400,
                550,
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
            setTimeout(()=>{
                setShowSmoke([
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
                400,
                550,
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
        const y = 50 + i * 38;
        const clipWidth = 520 * progress;
        const wobble = Math.sin(i * 1.5) * 2;
        const rotation = Math.sin(i * 0.7) * 0.8;
        const words = line.split(' ');
        let xOffset = 25;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("clipPath", {
                        id: `clip-${i}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                            x: "0",
                            y: y - 35,
                            width: clipWidth,
                            height: "50"
                        }, void 0, false, {
                            fileName: "[project]/app/components/BirthdayCard.jsx",
                            lineNumber: 342,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/BirthdayCard.jsx",
                        lineNumber: 341,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/components/BirthdayCard.jsx",
                    lineNumber: 340,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                    clipPath: `url(#clip-${i})`,
                    transform: `rotate(${rotation} 250 ${y})`,
                    children: words.map((word, wordIdx)=>{
                        const isEmphasis = EMPHASIS_WORDS.some((ew)=>word.includes(ew));
                        const wordX = xOffset;
                        xOffset += word.length * 14 + 12;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                            x: wordX,
                            y: y + wobble,
                            style: {
                                fontFamily: '"InterSignature", cursive',
                                fontSize: isEmphasis ? 34 : 30,
                                fontWeight: isEmphasis ? 600 : 400,
                                fill: isEmphasis ? "#fff" : "rgba(255,255,255,0.92)",
                                filter: isEmphasis ? "drop-shadow(0 0 8px rgba(255,220,150,0.5)) drop-shadow(0 0 15px rgba(255,180,100,0.3))" : "drop-shadow(0 0 4px rgba(255,210,120,0.2))",
                                letterSpacing: isEmphasis ? 1.5 : 0.5
                            },
                            children: word
                        }, wordIdx, false, {
                            fileName: "[project]/app/components/BirthdayCard.jsx",
                            lineNumber: 355,
                            columnNumber: 15
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/app/components/BirthdayCard.jsx",
                    lineNumber: 345,
                    columnNumber: 9
                }, this)
            ]
        }, i, true, {
            fileName: "[project]/app/components/BirthdayCard.jsx",
            lineNumber: 339,
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
                lineNumber: 383,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/components/BirthdayCard.jsx",
            lineNumber: 382,
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
                lineNumber: 390,
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
                            lineNumber: 395,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: styles.cardEdgeRight
                        }, void 0, false, {
                            fileName: "[project]/app/components/BirthdayCard.jsx",
                            lineNumber: 396,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: styles.embossedBorder
                        }, void 0, false, {
                            fileName: "[project]/app/components/BirthdayCard.jsx",
                            lineNumber: 398,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: styles.cornerTL,
                            children: "❧"
                        }, void 0, false, {
                            fileName: "[project]/app/components/BirthdayCard.jsx",
                            lineNumber: 400,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: styles.cornerTR,
                            children: "❧"
                        }, void 0, false, {
                            fileName: "[project]/app/components/BirthdayCard.jsx",
                            lineNumber: 401,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: styles.cornerBL,
                            children: "❧"
                        }, void 0, false, {
                            fileName: "[project]/app/components/BirthdayCard.jsx",
                            lineNumber: 402,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: styles.cornerBR,
                            children: "❧"
                        }, void 0, false, {
                            fileName: "[project]/app/components/BirthdayCard.jsx",
                            lineNumber: 403,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: styles.decorTop
                        }, void 0, false, {
                            fileName: "[project]/app/components/BirthdayCard.jsx",
                            lineNumber: 405,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: styles.decorBottom
                        }, void 0, false, {
                            fileName: "[project]/app/components/BirthdayCard.jsx",
                            lineNumber: 406,
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
                                            lineNumber: 410,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            style: styles.mainTitle,
                                            children: "Happy Birthday"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                            lineNumber: 411,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            style: styles.nameTitle,
                                            children: toName
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                            lineNumber: 412,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: styles.starDecor,
                                            children: "✦ ✦ ✦"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                            lineNumber: 413,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                    lineNumber: 409,
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
                                                        transform: `scaleX(${1 - arrowPull * 0.15})`
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: "/bow.png",
                                                        alt: "Bow",
                                                        style: styles.bowImage
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/BirthdayCard.jsx",
                                                        lineNumber: 424,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                                    lineNumber: 418,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        ...styles.arrowWrapper,
                                                        transform: `translateY(${arrowPull * 60}px)`,
                                                        opacity: arrowFlying ? 0 : 1,
                                                        transition: arrowFlying ? 'opacity 0.15s' : 'transform 0.05s'
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
                                                        lineNumber: 442,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                                    lineNumber: 431,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        ...styles.bowString,
                                                        height: 80 + arrowPull * 40
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                                    lineNumber: 449,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                            lineNumber: 417,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: styles.targetSection,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: styles.candlesRow,
                                                children: [
                                                    [
                                                        0,
                                                        1,
                                                        2
                                                    ].map((i)=>{
                                                        const offsets = [
                                                            -30,
                                                            0,
                                                            30
                                                        ];
                                                        const heights = [
                                                            5,
                                                            -8,
                                                            0
                                                        ];
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                ...styles.candleContainer,
                                                                transform: `translateX(${offsets[i]}px) translateY(${heights[i]}px)`
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                    src: "/candle.png",
                                                                    alt: "Candle",
                                                                    style: {
                                                                        ...styles.candleImage,
                                                                        filter: candlesLit[i] ? 'brightness(1)' : 'brightness(0.65) saturate(0.7)'
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                                                    lineNumber: 468,
                                                                    columnNumber: 27
                                                                }, this),
                                                                candlesLit[i] && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: styles.flameContainer,
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            style: styles.flameOuter
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                                                            lineNumber: 479,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            style: styles.flameInner
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                                                            lineNumber: 480,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            style: styles.flameGlow
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                                                            lineNumber: 481,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                                                    lineNumber: 478,
                                                                    columnNumber: 29
                                                                }, this),
                                                                showSmoke[i] && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: styles.smokeContainer,
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            style: styles.smoke1
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                                                            lineNumber: 487,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            style: styles.smoke2
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                                                            lineNumber: 488,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            style: styles.smoke3
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                                                            lineNumber: 489,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                                                    lineNumber: 486,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, i, true, {
                                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                                            lineNumber: 461,
                                                            columnNumber: 25
                                                        }, this);
                                                    }),
                                                    arrowFlying && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: "/arrow.png",
                                                        alt: "Flying Arrow",
                                                        style: styles.flyingArrow
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/BirthdayCard.jsx",
                                                        lineNumber: 497,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/components/BirthdayCard.jsx",
                                                lineNumber: 456,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                            lineNumber: 455,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                    lineNumber: 416,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: styles.instructionBox,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: styles.instruction,
                                            children: arrowPull > 0.5 ? "Release to shoot!" : arrowPull > 0 ? "Pull back more..." : "Pull the arrow down to extinguish the candles"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                            lineNumber: 508,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: styles.pullMeter,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    ...styles.pullFill,
                                                    width: `${arrowPull * 100}%`,
                                                    background: arrowPull > 0.5 ? 'linear-gradient(90deg, #4ade80, #22c55e)' : 'linear-gradient(90deg, #fbbf24, #f59e0b)'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/BirthdayCard.jsx",
                                                lineNumber: 512,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                            lineNumber: 511,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                    lineNumber: 507,
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
                                            lineNumber: 521,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: styles.decorLine
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                            lineNumber: 522,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: styles.decorStar,
                                            children: "★"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                            lineNumber: 523,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: styles.decorLine
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                            lineNumber: 524,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: styles.decorDot,
                                            children: "◆"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                            lineNumber: 525,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                    lineNumber: 520,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/BirthdayCard.jsx",
                            lineNumber: 408,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/BirthdayCard.jsx",
                    lineNumber: 394,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/BirthdayCard.jsx",
                lineNumber: 393,
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
                                                        lineNumber: 555,
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
                                                            lineNumber: 557,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/BirthdayCard.jsx",
                                                        lineNumber: 556,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: styles.polaroidCaption,
                                                        children: captions[i]
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/BirthdayCard.jsx",
                                                        lineNumber: 559,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/components/BirthdayCard.jsx",
                                                lineNumber: 554,
                                                columnNumber: 21
                                            }, this)
                                        }, i, false, {
                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                            lineNumber: 553,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                    lineNumber: 539,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: styles.photoDots,
                                    children: photos.map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setCurrentPhotoIndex(i),
                                            style: {
                                                ...styles.photoDot,
                                                background: i === currentPhotoIndex ? '#fff' : 'rgba(255,255,255,0.3)',
                                                transform: i === currentPhotoIndex ? 'scale(1.3)' : 'scale(1)'
                                            }
                                        }, i, false, {
                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                            lineNumber: 567,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                    lineNumber: 565,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: styles.swipeHint,
                                    children: "← Swipe to see more →"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                    lineNumber: 579,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/BirthdayCard.jsx",
                            lineNumber: 538,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/BirthdayCard.jsx",
                        lineNumber: 537,
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
                                        lineNumber: 585,
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
                                                lineNumber: 587,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: handleReplay,
                                                style: styles.replayBtn,
                                                children: "↺"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/BirthdayCard.jsx",
                                                lineNumber: 590,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/BirthdayCard.jsx",
                                        lineNumber: 586,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/BirthdayCard.jsx",
                                lineNumber: 584,
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
                                                            lineNumber: 598,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feGaussianBlur", {
                                                            stdDeviation: "0.6"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                                            lineNumber: 599,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                                    lineNumber: 597,
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
                                                            lineNumber: 602,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feOffset", {
                                                            in: "blur",
                                                            dx: "0.5",
                                                            dy: "0.5",
                                                            result: "offsetBlur"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                                            lineNumber: 603,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feMerge", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feMergeNode", {
                                                                    in: "offsetBlur"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                                                    lineNumber: 605,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feMergeNode", {
                                                                    in: "SourceGraphic"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                                                    lineNumber: 606,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                                            lineNumber: 604,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                                    lineNumber: 601,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                            lineNumber: 596,
                                            columnNumber: 17
                                        }, this),
                                        inkDotsStatic.map((dot, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                cx: dot.x,
                                                cy: dot.y,
                                                r: dot.size,
                                                fill: `rgba(255,255,255,${dot.opacity})`
                                            }, `dot-${i}`, false, {
                                                fileName: "[project]/app/components/BirthdayCard.jsx",
                                                lineNumber: 612,
                                                columnNumber: 19
                                            }, this)),
                                        inkSplatters.map((spot, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                        cx: spot.x,
                                                        cy: spot.y,
                                                        r: spot.size,
                                                        fill: "rgba(255,255,255,0.25)",
                                                        filter: "url(#inkBleed)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/BirthdayCard.jsx",
                                                        lineNumber: 623,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                        cx: spot.x + 2,
                                                        cy: spot.y - 1,
                                                        r: spot.size * 0.5,
                                                        fill: "rgba(255,255,255,0.15)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/BirthdayCard.jsx",
                                                        lineNumber: 630,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, `splat-${i}`, true, {
                                                fileName: "[project]/app/components/BirthdayCard.jsx",
                                                lineNumber: 622,
                                                columnNumber: 19
                                            }, this)),
                                        POEM_LINES.map((line, i)=>renderLineWithEmphasis(line, i, lineProgress[i] || 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "M 25 680 Q 80 675, 150 680 T 280 678",
                                            fill: "none",
                                            stroke: "rgba(255,255,255,0.3)",
                                            strokeWidth: "1.5",
                                            strokeLinecap: "round"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                            lineNumber: 641,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                    lineNumber: 595,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/BirthdayCard.jsx",
                                lineNumber: 594,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/BirthdayCard.jsx",
                        lineNumber: 583,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/BirthdayCard.jsx",
                lineNumber: 533,
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
        
        @keyframes glowPulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.85; transform: scale(1.15); }
        }

        @keyframes smokeRise {
          0% { opacity: 0.7; transform: translateY(0) scale(1) rotate(0deg); }
          50% { opacity: 0.4; transform: translateY(-40px) scale(1.8) rotate(10deg); }
          100% { opacity: 0; transform: translateY(-80px) scale(2.5) rotate(-5deg); }
        }

        @keyframes flyArrow {
          0% { 
            transform: translateY(-50%) translateX(-100px) rotate(-90deg); 
            opacity: 1; 
          }
          20% {
            transform: translateY(-50%) translateX(50px) rotate(-90deg);
            opacity: 1;
          }
          60% { 
            transform: translateY(-50%) translateX(320px) rotate(-88deg); 
            opacity: 1; 
          }
          80% { 
            transform: translateY(-50%) translateX(340px) rotate(-92deg); 
            opacity: 1; 
          }
          100% { 
            transform: translateY(-50%) translateX(340px) rotate(-90deg); 
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
                lineNumber: 654,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/BirthdayCard.jsx",
        lineNumber: 389,
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
        pointerEvents: "none"
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
        fontSize: "clamp(30px, 5.5vw, 48px)",
        fontWeight: 400,
        color: "#3d2914",
        margin: "6px 0",
        letterSpacing: 2,
        textShadow: "1px 1px 2px rgba(0,0,0,0.1)"
    },
    nameTitle: {
        fontFamily: '"InterSignature", Georgia, serif',
        fontSize: "clamp(38px, 7.5vw, 62px)",
        fontWeight: 400,
        color: "#8b5a2b",
        margin: "0 0 6px",
        letterSpacing: 3,
        textShadow: "2px 2px 4px rgba(0,0,0,0.1)"
    },
    interactionArea: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px 10px",
        gap: 60,
        minHeight: 280
    },
    bowSection: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    bowContainer: {
        transition: "transform 0.1s ease-out",
        transformOrigin: "center"
    },
    bowImage: {
        width: 120,
        height: "auto",
        filter: "drop-shadow(3px 5px 8px rgba(0,0,0,0.35))",
        transform: "rotate(90deg)"
    },
    arrowWrapper: {
        position: "absolute",
        top: -30,
        cursor: "grab",
        zIndex: 10,
        padding: 10,
        userSelect: "none",
        touchAction: "none"
    },
    arrowImage: {
        width: 160,
        height: "auto",
        filter: "drop-shadow(2px 3px 5px rgba(0,0,0,0.35))",
        transform: "rotate(-90deg)",
        pointerEvents: "none"
    },
    bowString: {
        position: "absolute",
        left: "50%",
        top: 20,
        width: 2,
        background: "linear-gradient(180deg, rgba(60,40,20,0.7), rgba(80,60,40,0.85), rgba(60,40,20,0.7))",
        transformOrigin: "top center",
        transition: "height 0.08s ease-out",
        borderRadius: 1,
        marginLeft: -1
    },
    targetSection: {
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end"
    },
    candlesRow: {
        position: "relative",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        width: 350,
        height: 300
    },
    candleContainer: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 0,
        marginLeft: -40
    },
    candleImage: {
        width: 180,
        height: "auto",
        filter: "drop-shadow(4px 10px 15px rgba(0,0,0,0.4))",
        transition: "filter 0.4s ease-out"
    },
    flameContainer: {
        position: "absolute",
        top: -90,
        left: "50%",
        transform: "translateX(-50%)",
        width: 70,
        height: 100
    },
    flameOuter: {
        position: "absolute",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: 50,
        height: 85,
        background: "radial-gradient(ellipse at bottom, #ff6b35 0%, #ff9500 35%, #ffcc00 65%, transparent 100%)",
        borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
        animation: "flicker 0.4s ease-in-out infinite"
    },
    flameInner: {
        position: "absolute",
        bottom: 8,
        left: "50%",
        transform: "translateX(-50%)",
        width: 25,
        height: 50,
        background: "radial-gradient(ellipse at bottom, #fff 0%, #fffbe6 50%, transparent 100%)",
        borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
        animation: "flicker 0.25s ease-in-out infinite"
    },
    flameGlow: {
        position: "absolute",
        bottom: -25,
        left: "50%",
        transform: "translateX(-50%)",
        width: 140,
        height: 140,
        background: "radial-gradient(circle, rgba(255,150,50,0.5) 0%, transparent 70%)",
        animation: "glowPulse 0.8s ease-in-out infinite",
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
        width: 140,
        height: "auto",
        top: "50%",
        left: -100,
        transform: "translateY(-50%) rotate(-90deg)",
        animation: "flyArrow 0.8s ease-out forwards",
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
        background: "linear-gradient(145deg, #1e2243 0%, #0f1225 100%)",
        borderRadius: 24,
        boxShadow: "0 25px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.1)",
        animation: "fadeIn 0.8s ease-out"
    },
    cardLeft: {
        padding: 25,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(circle at 30% 30%, rgba(255,210,120,0.08), transparent 60%)",
        borderRight: "1px solid rgba(255,255,255,0.08)"
    },
    photoGallery: {
        width: "100%",
        maxWidth: 320,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 15
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
        padding: "15px 15px 50px",
        borderRadius: 4,
        boxShadow: "0 10px 40px rgba(0,0,0,0.4), 0 3px 10px rgba(0,0,0,0.2)",
        transform: "rotate(-2deg)",
        maxWidth: 260
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
        aspectRatio: "4/3",
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
        fontFamily: '"InterSignature", cursive',
        fontSize: 16,
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
        color: "rgba(255,255,255,0.4)",
        fontStyle: "italic",
        margin: 0
    },
    cardRight: {
        padding: "24px 35px",
        display: "flex",
        flexDirection: "column",
        background: "radial-gradient(ellipse at 70% 20%, rgba(158,231,255,0.06), transparent 50%)"
    },
    poemHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
        paddingBottom: 10,
        borderBottom: "1px solid rgba(255,255,255,0.1)"
    },
    toName: {
        fontFamily: '"InterSignature", cursive',
        fontSize: 26,
        fontWeight: 400,
        color: "white",
        letterSpacing: 1
    },
    audioControls: {
        display: "flex",
        gap: 8
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
        transition: "all 0.2s"
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
"[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        if ("TURBOPACK compile-time truthy", 1) {
            if ("TURBOPACK compile-time truthy", 1) {
                module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)");
            } else //TURBOPACK unreachable
            ;
        } else //TURBOPACK unreachable
        ;
    }
} //# sourceMappingURL=module.compiled.js.map
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].React; //# sourceMappingURL=react.js.map
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__5f72edbe._.js.map