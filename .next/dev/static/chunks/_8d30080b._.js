(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/components/BirthdayCard.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BirthdayCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
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
    _s();
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
    const [fontReady, setFontReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [cardOpen, setCardOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [arrowPull, setArrowPull] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isDragging, setIsDragging] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isPlaying, setIsPlaying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [lineProgress, setLineProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "BirthdayCard.useState": ()=>POEM_LINES.map({
                "BirthdayCard.useState": ()=>0
            }["BirthdayCard.useState"])
    }["BirthdayCard.useState"]);
    const [audioLoaded, setAudioLoaded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const audioRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const rafRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const arrowRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const dragStartY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BirthdayCard.useEffect": ()=>{
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
            return ({
                "BirthdayCard.useEffect": ()=>{
                    cancelled = true;
                }
            })["BirthdayCard.useEffect"];
        }
    }["BirthdayCard.useEffect"], [
        fontUrl
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BirthdayCard.useEffect": ()=>{
            const audio = audioRef.current;
            if (audio) {
                const onLoaded = {
                    "BirthdayCard.useEffect.onLoaded": ()=>setAudioLoaded(true)
                }["BirthdayCard.useEffect.onLoaded"];
                audio.addEventListener("loadedmetadata", onLoaded);
                return ({
                    "BirthdayCard.useEffect": ()=>audio.removeEventListener("loadedmetadata", onLoaded)
                })["BirthdayCard.useEffect"];
            }
        }
    }["BirthdayCard.useEffect"], []);
    const handleDragStart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BirthdayCard.useCallback[handleDragStart]": (e)=>{
            if (cardOpen) return;
            setIsDragging(true);
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            dragStartY.current = clientY;
            e.preventDefault();
        }
    }["BirthdayCard.useCallback[handleDragStart]"], [
        cardOpen
    ]);
    const handleDragMove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BirthdayCard.useCallback[handleDragMove]": (e)=>{
            if (!isDragging || cardOpen) return;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            const delta = clientY - dragStartY.current;
            const pull = Math.min(1, Math.max(0, delta / 150));
            setArrowPull(pull);
        }
    }["BirthdayCard.useCallback[handleDragMove]"], [
        isDragging,
        cardOpen
    ]);
    const handleDragEnd = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BirthdayCard.useCallback[handleDragEnd]": ()=>{
            if (!isDragging) return;
            setIsDragging(false);
            if (arrowPull > 0.5) {
                setArrowPull(0);
                setCardOpen(true);
            } else {
                setArrowPull(0);
            }
        }
    }["BirthdayCard.useCallback[handleDragEnd]"], [
        isDragging,
        arrowPull
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BirthdayCard.useEffect": ()=>{
            if (isDragging) {
                window.addEventListener("mousemove", handleDragMove);
                window.addEventListener("mouseup", handleDragEnd);
                window.addEventListener("touchmove", handleDragMove, {
                    passive: false
                });
                window.addEventListener("touchend", handleDragEnd);
                return ({
                    "BirthdayCard.useEffect": ()=>{
                        window.removeEventListener("mousemove", handleDragMove);
                        window.removeEventListener("mouseup", handleDragEnd);
                        window.removeEventListener("touchmove", handleDragMove);
                        window.removeEventListener("touchend", handleDragEnd);
                    }
                })["BirthdayCard.useEffect"];
            }
        }
    }["BirthdayCard.useEffect"], [
        isDragging,
        handleDragMove,
        handleDragEnd
    ]);
    const handleArrowClick = ()=>{
        if (!cardOpen && !isDragging) {
            setCardOpen(true);
        }
    };
    const computeLineEnds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BirthdayCard.useCallback[computeLineEnds]": ()=>{
            const audio = audioRef.current;
            const duration = audio?.duration || 72;
            return lineStartTimes.map({
                "BirthdayCard.useCallback[computeLineEnds]": (t, i)=>i < lineStartTimes.length - 1 ? lineStartTimes[i + 1] : duration
            }["BirthdayCard.useCallback[computeLineEnds]"]);
        }
    }["BirthdayCard.useCallback[computeLineEnds]"], [
        lineStartTimes
    ]);
    const startAnimation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BirthdayCard.useCallback[startAnimation]": ()=>{
            const audio = audioRef.current;
            if (!audio) return;
            const ends = computeLineEnds();
            const tick = {
                "BirthdayCard.useCallback[startAnimation].tick": ()=>{
                    const t = audio.currentTime;
                    const newProgress = POEM_LINES.map({
                        "BirthdayCard.useCallback[startAnimation].tick.newProgress": (line, i)=>{
                            if (!line.trim()) return t >= lineStartTimes[i] ? 1 : 0;
                            const t0 = lineStartTimes[i];
                            const t1 = ends[i];
                            return Math.min(1, Math.max(0, (t - t0) / Math.max(0.2, t1 - t0)));
                        }
                    }["BirthdayCard.useCallback[startAnimation].tick.newProgress"]);
                    setLineProgress(newProgress);
                    if (!audio.paused && !audio.ended) {
                        rafRef.current = requestAnimationFrame(tick);
                    } else if (audio.ended) {
                        setIsPlaying(false);
                    }
                }
            }["BirthdayCard.useCallback[startAnimation].tick"];
            rafRef.current = requestAnimationFrame(tick);
        }
    }["BirthdayCard.useCallback[startAnimation]"], [
        lineStartTimes,
        computeLineEnds,
        POEM_LINES
    ]);
    const startSilentAnimation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BirthdayCard.useCallback[startSilentAnimation]": ()=>{
            const totalDuration = 40;
            const startTime = Date.now();
            const ends = lineStartTimes.map({
                "BirthdayCard.useCallback[startSilentAnimation].ends": (t, i)=>i < lineStartTimes.length - 1 ? lineStartTimes[i + 1] : totalDuration
            }["BirthdayCard.useCallback[startSilentAnimation].ends"]);
            const scale = totalDuration / (lineStartTimes[lineStartTimes.length - 1] + 3);
            const tick = {
                "BirthdayCard.useCallback[startSilentAnimation].tick": ()=>{
                    const elapsed = (Date.now() - startTime) / 1000;
                    const t = elapsed * scale;
                    const newProgress = POEM_LINES.map({
                        "BirthdayCard.useCallback[startSilentAnimation].tick.newProgress": (line, i)=>{
                            if (!line.trim()) return t >= lineStartTimes[i] ? 1 : 0;
                            const t0 = lineStartTimes[i];
                            const t1 = ends[i];
                            return Math.min(1, Math.max(0, (t - t0) / Math.max(0.2, t1 - t0)));
                        }
                    }["BirthdayCard.useCallback[startSilentAnimation].tick.newProgress"]);
                    setLineProgress(newProgress);
                    if (elapsed < totalDuration / scale) {
                        rafRef.current = requestAnimationFrame(tick);
                    }
                }
            }["BirthdayCard.useCallback[startSilentAnimation].tick"];
            rafRef.current = requestAnimationFrame(tick);
        }
    }["BirthdayCard.useCallback[startSilentAnimation]"], [
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
    const silentAnimationRan = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BirthdayCard.useEffect": ()=>{
            if (cardOpen && !isPlaying && !silentAnimationRan.current) {
                const timer = setTimeout({
                    "BirthdayCard.useEffect.timer": ()=>{
                        if (!isPlaying) {
                            silentAnimationRan.current = true;
                            startSilentAnimation();
                        }
                    }
                }["BirthdayCard.useEffect.timer"], 1500);
                return ({
                    "BirthdayCard.useEffect": ()=>clearTimeout(timer)
                })["BirthdayCard.useEffect"];
            }
        }
    }["BirthdayCard.useEffect"], [
        cardOpen,
        isPlaying,
        startSilentAnimation
    ]);
    if (!fontReady) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: styles.loading,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: styles.loadingText,
                children: "Loading..."
            }, void 0, false, {
                fileName: "[project]/app/components/BirthdayCard.jsx",
                lineNumber: 238,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/components/BirthdayCard.jsx",
            lineNumber: 237,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: styles.container,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("audio", {
                ref: audioRef,
                src: audioUrl,
                preload: "auto"
            }, void 0, false, {
                fileName: "[project]/app/components/BirthdayCard.jsx",
                lineNumber: 245,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card-wrapper-responsive",
                style: {
                    ...styles.cardWrapper,
                    perspective: cardOpen ? "2000px" : "1000px"
                },
                children: [
                    !cardOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: styles.cardFront,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: styles.frontContent,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    style: styles.frontTitle,
                                    children: "Happy Birthday!"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                    lineNumber: 256,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: styles.frontSubtitle,
                                    children: "Pull the arrow to open"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                    lineNumber: 257,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    ref: arrowRef,
                                    style: {
                                        ...styles.arrowContainer,
                                        transform: `translateY(${arrowPull * 60}px)`,
                                        cursor: isDragging ? "grabbing" : "grab"
                                    },
                                    onMouseDown: handleDragStart,
                                    onTouchStart: handleDragStart,
                                    onClick: handleArrowClick,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            width: "80",
                                            height: "200",
                                            viewBox: "0 0 80 200",
                                            style: styles.arrowSvg,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                                                            id: "arrowGrad",
                                                            x1: "0%",
                                                            y1: "0%",
                                                            x2: "0%",
                                                            y2: "100%",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                                    offset: "0%",
                                                                    stopColor: "#ffd700"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                                                    lineNumber: 273,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                                    offset: "100%",
                                                                    stopColor: "#ff8c00"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                                                    lineNumber: 274,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                                            lineNumber: 272,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("filter", {
                                                            id: "arrowGlow",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feGaussianBlur", {
                                                                    stdDeviation: "3",
                                                                    result: "blur"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                                                    lineNumber: 277,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feMerge", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feMergeNode", {
                                                                            in: "blur"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                                                            lineNumber: 279,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feMergeNode", {
                                                                            in: "SourceGraphic"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                                                            lineNumber: 280,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                                                    lineNumber: 278,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                                            lineNumber: 276,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                                    lineNumber: 271,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                    x1: "40",
                                                    y1: "30",
                                                    x2: "40",
                                                    y2: "170",
                                                    stroke: "url(#arrowGrad)",
                                                    strokeWidth: "4",
                                                    strokeLinecap: "round",
                                                    filter: "url(#arrowGlow)"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                                    lineNumber: 284,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                                                    points: "40,10 25,40 55,40",
                                                    fill: "url(#arrowGrad)",
                                                    filter: "url(#arrowGlow)"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                                    lineNumber: 285,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                                                    points: "30,165 40,180 50,165",
                                                    fill: "url(#arrowGrad)",
                                                    opacity: "0.6"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                                    lineNumber: 286,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                    x1: "30",
                                                    y1: "170",
                                                    x2: "40",
                                                    y2: "175",
                                                    stroke: "url(#arrowGrad)",
                                                    strokeWidth: "2"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                                    lineNumber: 287,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                    x1: "50",
                                                    y1: "170",
                                                    x2: "40",
                                                    y2: "175",
                                                    stroke: "url(#arrowGrad)",
                                                    strokeWidth: "2"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                                    lineNumber: 288,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                            lineNumber: 270,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                ...styles.bowString,
                                                transform: `scaleY(${1 + arrowPull * 0.3})`
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                            lineNumber: 291,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                    lineNumber: 259,
                                    columnNumber: 15
                                }, this),
                                arrowPull > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        ...styles.pullIndicator,
                                        opacity: arrowPull
                                    },
                                    children: arrowPull > 0.5 ? "Release!" : "Keep pulling..."
                                }, void 0, false, {
                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                    lineNumber: 298,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/BirthdayCard.jsx",
                            lineNumber: 255,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/BirthdayCard.jsx",
                        lineNumber: 254,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "card-inner-responsive",
                        style: {
                            ...styles.cardInner,
                            transform: cardOpen ? "rotateY(0deg)" : "rotateY(-90deg)",
                            opacity: cardOpen ? 1 : 0,
                            pointerEvents: cardOpen ? "auto" : "none"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "card-left-responsive",
                                style: styles.cardLeft,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "polaroid-stack-responsive",
                                    style: styles.polaroidStack,
                                    children: photos.slice(0, 3).map((src, i)=>{
                                        const rotations = [
                                            -8,
                                            5,
                                            -3
                                        ];
                                        const offsets = [
                                            {
                                                x: -15,
                                                y: 10
                                            },
                                            {
                                                x: 20,
                                                y: -5
                                            },
                                            {
                                                x: 5,
                                                y: 15
                                            }
                                        ];
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                ...styles.polaroid,
                                                transform: `rotate(${rotations[i]}deg) translate(${offsets[i].x}px, ${offsets[i].y}px)`,
                                                zIndex: 3 - i,
                                                animationDelay: `${i * 0.2}s`
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: styles.polaroidImage,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: src,
                                                        alt: captions[i],
                                                        style: styles.photo
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/BirthdayCard.jsx",
                                                        lineNumber: 333,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                                    lineNumber: 332,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: styles.polaroidCaption,
                                                    children: captions[i]
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                                    lineNumber: 335,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, i, true, {
                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                            lineNumber: 323,
                                            columnNumber: 19
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                    lineNumber: 318,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/BirthdayCard.jsx",
                                lineNumber: 317,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "card-right-responsive",
                                style: styles.cardRight,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: styles.poemHeader,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: styles.toName,
                                                children: [
                                                    "To ",
                                                    toName,
                                                    ","
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/components/BirthdayCard.jsx",
                                                lineNumber: 344,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: styles.audioControls,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: handlePlayAudio,
                                                        style: styles.playBtn,
                                                        children: isPlaying ? "⏸" : "▶"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/BirthdayCard.jsx",
                                                        lineNumber: 346,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: handleReplay,
                                                        style: styles.replayBtn,
                                                        children: "↺"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/BirthdayCard.jsx",
                                                        lineNumber: 349,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/components/BirthdayCard.jsx",
                                                lineNumber: 345,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/BirthdayCard.jsx",
                                        lineNumber: 343,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: styles.poemContainer,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            viewBox: "0 0 500 650",
                                            style: styles.poemSvg,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("filter", {
                                                        id: "inkBleed",
                                                        x: "-10%",
                                                        y: "-10%",
                                                        width: "120%",
                                                        height: "120%",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feMorphology", {
                                                                operator: "dilate",
                                                                radius: "0.3"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/components/BirthdayCard.jsx",
                                                                lineNumber: 357,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feGaussianBlur", {
                                                                stdDeviation: "0.8"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/components/BirthdayCard.jsx",
                                                                lineNumber: 358,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/components/BirthdayCard.jsx",
                                                        lineNumber: 356,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                                    lineNumber: 355,
                                                    columnNumber: 17
                                                }, this),
                                                POEM_LINES.map((line, i)=>{
                                                    if (!line.trim()) return null;
                                                    const y = 40 + i * 34;
                                                    const progress = lineProgress[i] || 0;
                                                    const clipWidth = 500 * progress;
                                                    const isEmphasis = line.includes("Luke") || line.includes("star") || line.includes("thrive");
                                                    const strokeOpacity = isEmphasis ? 1 : 0.95;
                                                    const glowIntensity = isEmphasis ? "0 0 12px rgba(255,210,120,0.6)" : "0 0 6px rgba(255,210,120,0.3)";
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("clipPath", {
                                                                    id: `clip-${i}`,
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                                                        x: "0",
                                                                        y: y - 30,
                                                                        width: clipWidth,
                                                                        height: "40"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/components/BirthdayCard.jsx",
                                                                        lineNumber: 376,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                                                    lineNumber: 375,
                                                                    columnNumber: 25
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/components/BirthdayCard.jsx",
                                                                lineNumber: 374,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                                                x: "20",
                                                                y: y,
                                                                style: {
                                                                    fontFamily: '"InterSignature", cursive',
                                                                    fontSize: 26,
                                                                    fill: `rgba(255,255,255,${strokeOpacity * 0.15})`,
                                                                    filter: "url(#inkBleed)"
                                                                },
                                                                clipPath: `url(#clip-${i})`,
                                                                children: line
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/components/BirthdayCard.jsx",
                                                                lineNumber: 379,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                                                x: "20",
                                                                y: y,
                                                                style: {
                                                                    fontFamily: '"InterSignature", cursive',
                                                                    fontSize: 26,
                                                                    fill: `rgba(255,255,255,${strokeOpacity})`,
                                                                    filter: `drop-shadow(${glowIntensity})`
                                                                },
                                                                clipPath: `url(#clip-${i})`,
                                                                children: line
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/components/BirthdayCard.jsx",
                                                                lineNumber: 392,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, i, true, {
                                                        fileName: "[project]/app/components/BirthdayCard.jsx",
                                                        lineNumber: 373,
                                                        columnNumber: 21
                                                    }, this);
                                                })
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                            lineNumber: 354,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/BirthdayCard.jsx",
                                        lineNumber: 353,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: styles.audioStatus,
                                        children: audioLoaded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "🎵 Audio ready"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                            lineNumber: 413,
                                            columnNumber: 17
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Loading audio..."
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                            lineNumber: 415,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/BirthdayCard.jsx",
                                        lineNumber: 411,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/BirthdayCard.jsx",
                                lineNumber: 342,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/BirthdayCard.jsx",
                        lineNumber: 309,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/BirthdayCard.jsx",
                lineNumber: 247,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
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
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
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
          .card-wrapper-responsive {
            min-height: auto !important;
          }
          .polaroid-stack-responsive {
            max-width: 160px !important;
          }
        }
      `
            }, void 0, false, {
                fileName: "[project]/app/components/BirthdayCard.jsx",
                lineNumber: 422,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/BirthdayCard.jsx",
        lineNumber: 244,
        columnNumber: 5
    }, this);
}
_s(BirthdayCard, "3U2KgzR6JpA9K4aimeEIrN+80iY=");
_c = BirthdayCard;
const styles = {
    container: {
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        boxSizing: "border-box"
    },
    loading: {
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#1a1a2e"
    },
    loadingText: {
        color: "white",
        fontSize: 18,
        fontFamily: "system-ui, sans-serif"
    },
    cardWrapper: {
        width: "100%",
        maxWidth: 1000,
        minHeight: 600,
        position: "relative",
        transformStyle: "preserve-3d"
    },
    cardFront: {
        position: "absolute",
        inset: 0,
        background: "linear-gradient(145deg, #2d3561 0%, #1e2243 100%)",
        borderRadius: 24,
        boxShadow: "0 25px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid rgba(255,255,255,0.1)"
    },
    frontContent: {
        textAlign: "center",
        color: "white"
    },
    frontTitle: {
        fontSize: "clamp(28px, 5vw, 48px)",
        fontWeight: 700,
        margin: "0 0 16px",
        background: "linear-gradient(135deg, #ffd700, #ff8c00)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        textShadow: "0 2px 20px rgba(255,215,0,0.3)"
    },
    frontSubtitle: {
        fontSize: 16,
        opacity: 0.7,
        marginBottom: 40,
        animation: "pulse 2s infinite"
    },
    arrowContainer: {
        display: "inline-block",
        padding: 20,
        transition: "transform 0.1s ease-out",
        userSelect: "none",
        touchAction: "none"
    },
    arrowSvg: {
        filter: "drop-shadow(0 4px 12px rgba(255,215,0,0.4))",
        animation: "float 3s ease-in-out infinite"
    },
    bowString: {
        position: "absolute",
        left: "50%",
        bottom: 0,
        width: 2,
        height: 60,
        background: "linear-gradient(to bottom, rgba(255,215,0,0.6), transparent)",
        transform: "translateX(-50%)",
        transformOrigin: "top center",
        transition: "transform 0.1s ease-out"
    },
    pullIndicator: {
        marginTop: 20,
        fontSize: 14,
        color: "#ffd700",
        fontWeight: 600,
        transition: "opacity 0.2s"
    },
    cardInner: {
        display: "grid",
        gridTemplateColumns: "1fr 1.3fr",
        minHeight: 600,
        background: "linear-gradient(145deg, #1e2243 0%, #0f1225 100%)",
        borderRadius: 24,
        boxShadow: "0 25px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.1)",
        transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s ease",
        transformOrigin: "left center"
    },
    cardLeft: {
        padding: 30,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(circle at 30% 30%, rgba(255,210,120,0.08), transparent 60%)",
        borderRight: "1px solid rgba(255,255,255,0.08)"
    },
    polaroidStack: {
        position: "relative",
        width: "100%",
        maxWidth: 280,
        aspectRatio: "3/4"
    },
    polaroid: {
        position: "absolute",
        inset: 0,
        background: "#fefefe",
        padding: "12px 12px 40px",
        borderRadius: 4,
        boxShadow: "0 8px 30px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.2)",
        animation: "polaroidIn 0.6s ease-out forwards",
        opacity: 0
    },
    polaroidImage: {
        width: "100%",
        height: "100%",
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
        bottom: 10,
        left: 0,
        right: 0,
        textAlign: "center",
        fontFamily: '"InterSignature", cursive',
        fontSize: 14,
        color: "#333"
    },
    cardRight: {
        padding: "24px 30px",
        display: "flex",
        flexDirection: "column",
        background: "radial-gradient(ellipse at 70% 20%, rgba(158,231,255,0.06), transparent 50%)"
    },
    poemHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
        paddingBottom: 12,
        borderBottom: "1px solid rgba(255,255,255,0.1)"
    },
    toName: {
        fontSize: 20,
        fontWeight: 700,
        color: "white"
    },
    audioControls: {
        display: "flex",
        gap: 8
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
        transition: "all 0.2s"
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
        transition: "all 0.2s"
    },
    poemContainer: {
        flex: 1,
        overflow: "hidden"
    },
    poemSvg: {
        width: "100%",
        height: "100%",
        display: "block"
    },
    audioStatus: {
        fontSize: 12,
        color: "rgba(255,255,255,0.5)",
        marginTop: 12
    }
};
var _c;
__turbopack_context__.k.register(_c, "BirthdayCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
            case REACT_VIEW_TRANSITION_TYPE:
                return "ViewTransition";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        if (trackActualOwner) {
            var previousStackTraceLimit = Error.stackTraceLimit;
            Error.stackTraceLimit = 10;
            var debugStackDEV = Error("react-stack-top-frame");
            Error.stackTraceLimit = previousStackTraceLimit;
        } else debugStackDEV = unknownOwnerDebugStack;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStackDEV, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
]);

//# sourceMappingURL=_8d30080b._.js.map