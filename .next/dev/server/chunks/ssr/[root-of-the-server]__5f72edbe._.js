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
], fontUrl = "/fonts/InterSignature-q20q2.ttf", audioUrl = "/audio/luke-poem.mp3", autoStart = true, /**
   * lineStartTimes: seconds for each poem line (INCLUDING blank spacer lines).
   * If you want perfect sync, tweak these by small amounts.
   * If you pass null, it will auto-distribute across the audio duration.
   */ lineStartTimes = [
    0.000,
    4.288,
    7.407,
    11.825,
    15.464,
    18.943,
    23.189,
    27.060,
    31.680,
    34.677,
    36.994,
    41.951,
    45.941,
    50.052,
    53.196,
    57.290,
    62.135,
    65.698,
    69.403
] }) {
    const POEM_LINES = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>[
            "The world became a brighter place",
            "The moment Luke arrived,",
            "With kindness written on your face",
            "And a spirit meant to thrive",
            "",
            "Through every year and every mile,",
            "You’ve grown in heart and mind,",
            "With a steady hand and a ready smile,",
            "The rarest soul to find.",
            "",
            "May your day be filled with all you love,",
            "With laughter, warmth, and light,",
            "And may the year ahead hold dreams",
            "That shine forever bright.",
            "",
            "So here’s to you, for all you are,",
            "And all you’re yet to be—",
            "Luke, you truly are a star",
            "For everyone to see."
        ], []);
    const svgRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const penRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const audioRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Animated mask: one path per line (white reveals the ink)
    const maskPathsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])([]);
    const rafRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(0);
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("Ready ✍️");
    const [ready, setReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isPlaying, setIsPlaying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [needsGesture, setNeedsGesture] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Layout knobs
    const viewW = 900;
    const viewH = 560;
    const startX = 40;
    const startY = 90;
    const lineGap = 48;
    const maxRevealW = 860;
    // Tuned "pressure" knobs
    // Thinner starts/ends, richer mid-line, with a slightly late peak (feels more like a flourish)
    const strokeMin = 18; // thin
    const strokeMax = 62; // thick
    const peakShift = 0.07; // shift thickness peak slightly later (0..0.15-ish)
    const pressureGamma = 0.64; // <1 broadens the thick region
    const baselineJitter = 2.6; // subtle per-line baseline drift (handwritten feel)
    const personalitySpread = 0.14; // per-line pressure personality boost range
    // Ink look
    const inkFill = "rgba(255,255,255,.96)";
    const inkGlow = "rgba(255,210,122,.22)";
    // ---------- Font loading ----------
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let cancelled = false;
        async function loadFont() {
            try {
                const ff = new FontFace("InterSignature", `url(${fontUrl})`);
                await ff.load();
                document.fonts.add(ff);
                await document.fonts.ready;
            } catch  {
            // Fallback cursive is fine.
            }
            if (!cancelled) setReady(true);
        }
        loadFont();
        return ()=>{
            cancelled = true;
        };
    }, [
        fontUrl
    ]);
    // ---------- Build mask paths once ----------
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!ready) return;
        const svg = svgRef.current;
        if (!svg) return;
        const maskGroup = svg.querySelector("#maskGroup");
        maskGroup.innerHTML = "";
        maskPathsRef.current = [];
        for(let i = 0; i < POEM_LINES.length; i++){
            const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
            p.setAttribute("fill", "white");
            p.setAttribute("d", capsulePath(0, lineCenterY(i), i));
            maskGroup.appendChild(p);
            maskPathsRef.current.push(p);
        }
        if (penRef.current) {
            penRef.current.style.opacity = "0";
            penRef.current.style.transform = "translate(-9999px,-9999px) rotate(18deg)";
        }
    }, [
        ready,
        POEM_LINES
    ]);
    // ---------- Autostart (safe) ----------
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!ready || !autoStart) return;
        const a = audioRef.current;
        if (!a) return;
        const onMeta = async ()=>{
            try {
                await a.play();
                setNeedsGesture(false);
                startSyncedAnimation();
            } catch  {
                setNeedsGesture(true);
                setStatus("Tap to start (sound permission)");
            }
        };
        a.addEventListener("loadedmetadata", onMeta);
        return ()=>a.removeEventListener("loadedmetadata", onMeta);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        ready,
        autoStart
    ]);
    // ---------- Helpers ----------
    function stopRaf() {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = 0;
    }
    function clamp(v, a, b) {
        return Math.max(a, Math.min(b, v));
    }
    function easeInOutCubic(x) {
        return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
    }
    function hash01(n) {
        // Deterministic pseudo-random (0..1) per line
        const x = Math.sin(n * 999.123 + 0.123) * 10000;
        return x - Math.floor(x);
    }
    function lineCenterY(i) {
        const jitter = (hash01(i + 7) - 0.5) * 2 * baselineJitter;
        return startY - 10 + i * lineGap + jitter;
    }
    function svgPointToPage(svg, x, y) {
        const pt = svg.createSVGPoint();
        pt.x = x;
        pt.y = y;
        return pt.matrixTransform(svg.getScreenCTM());
    }
    function computeAutoLineStarts(duration) {
        const weights = POEM_LINES.map((l)=>l.trim() ? Math.max(6, l.length) : 4);
        const total = weights.reduce((a, b)=>a + b, 0);
        let acc = 0;
        return weights.map((w)=>{
            const t = acc / total * duration;
            acc += w;
            return t;
        });
    }
    // ---------- Pressure-tuned mask path ----------
    // progress: 0..1
    // cy: center y for line band
    // lineIndex: adds small per-line personality (pressure boost, nib wobble)
    function capsulePath(progress, cy, lineIndex) {
        const p = clamp(progress, 0, 1);
        const pE = easeInOutCubic(p);
        // Reveal length
        const w = Math.max(0, maxRevealW * pE);
        const driftX = (Math.sin(pE * 3.1 + lineIndex) + Math.sin(pE * 6.2 + lineIndex * 1.9)) * 1.2;
        const x1 = Math.max(startX, startX + w + driftX);
        // Per-line pressure personality
        const rand = hash01(lineIndex + 1);
        const line = POEM_LINES[lineIndex] ?? "";
        const punctuationBoost = /[—–,.;:!?]$/.test(line.trim()) ? 1.06 : 1.0;
        const lengthBoost = clamp(0.92 + line.trim().length / 45 * 0.18, 0.92, 1.12);
        const personality = (1 - personalitySpread / 2 + rand * personalitySpread) * punctuationBoost * lengthBoost;
        // Pressure curve (thickness): thin -> thick -> thin,
        // with a slightly late peak to feel like a flourish.
        const linePeakShift = peakShift + (rand - 0.5) * 0.05; // per-line late/early flair
        const shifted = clamp(pE + linePeakShift, 0, 1);
        const bell = Math.sin(Math.PI * shifted);
        const broadBell = Math.pow(Math.max(0, bell), pressureGamma); // broaden mid region
        const midPlateau = 0.12 + rand * 0.08; // broad, thick mid-stroke
        const plateauBlend = 1 - Math.abs(shifted - 0.55) / (0.55 + midPlateau);
        const plateau = clamp(plateauBlend, 0, 1);
        const shape = clamp(broadBell * (0.82 + 0.18 * plateau), 0, 1);
        const t = (strokeMin + (strokeMax - strokeMin) * shape) * personality;
        // Taper ends a bit more (gives a nib-like lift)
        const taper = 0.85 + 0.15 * Math.sin(Math.PI * pE);
        const pressureNoise = 1 + 0.055 * Math.sin(pE * 12 + lineIndex * 0.9) + 0.03 * Math.sin(pE * 28 + lineIndex * 1.7) + 0.02 * Math.sin(pE * 4.8 + lineIndex * 0.2);
        const thickness = Math.max(6, t * taper * pressureNoise);
        const r = thickness / 2;
        // Ink wobble: subtle feathering feeling
        const wobble = (Math.sin(pE * 10 + lineIndex) + Math.sin(pE * 23 + lineIndex * 2.3)) * 0.55;
        const topY = cy - r + wobble;
        const botY = cy + r + wobble;
        // When nearly zero, show a dot-like nib kiss
        if (w < 2) {
            return `M ${startX} ${cy}
              m -${r} 0
              a ${r} ${r} 0 1 0 ${2 * r} 0
              a ${r} ${r} 0 1 0 -${2 * r} 0`;
        }
        // Rounded capsule (pill)
        return `
      M ${startX} ${topY}
      L ${x1} ${topY}
      A ${r} ${r} 0 0 1 ${x1} ${botY}
      L ${startX} ${botY}
      A ${r} ${r} 0 0 1 ${startX} ${topY}
      Z
    `;
    }
    function findActiveLineIndex(tNow, starts, ends) {
        for(let i = 0; i < starts.length; i++){
            if (tNow >= starts[i] && tNow < ends[i]) return i;
        }
        return -1;
    }
    // ---------- Animation driver (audio clock) ----------
    function startSyncedAnimation() {
        stopRaf();
        const svg = svgRef.current;
        const pen = penRef.current;
        const audio = audioRef.current;
        const paths = maskPathsRef.current;
        if (!svg || !pen || !audio || !paths.length) return;
        setIsPlaying(true);
        setStatus("Writing…");
        const startsProvided = Array.isArray(lineStartTimes) && lineStartTimes.length === POEM_LINES.length;
        const starts = startsProvided ? lineStartTimes : computeAutoLineStarts(Number.isFinite(audio.duration) ? audio.duration : 72);
        const duration = Number.isFinite(audio.duration) ? audio.duration : starts[starts.length - 1] + 2;
        const ends = starts.map((t, i)=>i < starts.length - 1 ? starts[i + 1] : duration);
        const tick = ()=>{
            const tNow = audio.currentTime;
            // Update per-line progress
            for(let i = 0; i < paths.length; i++){
                const line = POEM_LINES[i];
                const t0 = starts[i];
                const t1 = ends[i];
                if (!line.trim()) {
                    const done = tNow >= t0 ? 1 : 0;
                    paths[i].setAttribute("d", capsulePath(done, lineCenterY(i), i));
                    continue;
                }
                const p = clamp((tNow - t0) / Math.max(0.22, t1 - t0), 0, 1);
                paths[i].setAttribute("d", capsulePath(p, lineCenterY(i), i));
            }
            // Move pen to active line
            const activeIndex = findActiveLineIndex(tNow, starts, ends);
            if (activeIndex >= 0) {
                const t0 = starts[activeIndex];
                const t1 = ends[activeIndex];
                const p = clamp((tNow - t0) / Math.max(0.22, t1 - t0), 0, 1);
                const pE = easeInOutCubic(p);
                pen.style.opacity = "1";
                const nibWobble = (Math.sin(pE * 9 + activeIndex) + Math.sin(pE * 19)) * 1.1;
                const px = startX + maxRevealW * pE + 10 + Math.sin(pE * 4 + activeIndex) * 1.4;
                const py = lineCenterY(activeIndex) + 10 + nibWobble;
                const page = svgPointToPage(svg, px, py);
                pen.style.transform = `translate(${page.x - 9}px, ${page.y - 9}px) rotate(${18 + Math.sin(pE * 7) * 3}deg)`;
            } else {
                pen.style.opacity = "0";
            }
            if (audio.ended) {
                setStatus("Done 💛");
                setIsPlaying(false);
                pen.style.opacity = "0";
                stopRaf();
                return;
            }
            rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);
    }
    async function handleStartFromOverlay() {
        const a = audioRef.current;
        if (!a) return;
        try {
            await a.play();
            setNeedsGesture(false);
            startSyncedAnimation();
        } catch  {
            setStatus("Still blocked. Tap again or unmute.");
        }
    }
    function handlePlayPause() {
        const a = audioRef.current;
        if (!a) return;
        if (a.paused) {
            a.play().then(()=>{
                setNeedsGesture(false);
                startSyncedAnimation();
            }).catch(()=>{
                setNeedsGesture(true);
                setStatus("Tap to start (sound permission)");
            });
        } else {
            a.pause();
            setIsPlaying(false);
            setStatus("Paused");
            stopRaf();
        }
    }
    function handleReplay() {
        const a = audioRef.current;
        if (!a) return;
        a.pause();
        a.currentTime = 0;
        setStatus("Writing…");
        a.play().then(()=>{
            setNeedsGesture(false);
            startSyncedAnimation();
        }).catch(()=>{
            setNeedsGesture(true);
            setStatus("Tap to start (sound permission)");
        });
    }
    // ---------- Render ----------
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen w-full grid place-items-center p-6",
        style: {
            color: "white"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full max-w-[980px] rounded-[22px] overflow-hidden",
            style: {
                border: "1px solid rgba(255,255,255,.10)",
                boxShadow: "0 18px 60px rgba(0,0,0,.45)",
                background: "radial-gradient(1000px 600px at 15% 15%, rgba(158,231,255,.18), transparent 60%)," + "radial-gradient(900px 650px at 85% 25%, rgba(255,210,122,.16), transparent 55%)," + "radial-gradient(800px 600px at 60% 90%, rgba(206,166,255,.12), transparent 55%)," + "linear-gradient(160deg, #0f1220, #1a1f35)"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 12,
                        padding: "16px 16px",
                        borderBottom: "1px solid rgba(255,255,255,.10)",
                        backdropFilter: "blur(10px)",
                        background: "linear-gradient(90deg, rgba(158,231,255,.10), rgba(255,210,122,.08))"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                minWidth: 0
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: 18,
                                        fontWeight: 800,
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis"
                                    },
                                    children: [
                                        "Happy Birthday, ",
                                        toName,
                                        " 🎉"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                    lineNumber: 440,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: 13,
                                        color: "rgba(255,255,255,.70)",
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis"
                                    },
                                    children: "Pressure ink + paper grain + synced narration."
                                }, void 0, false, {
                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                    lineNumber: 443,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/BirthdayCard.jsx",
                            lineNumber: 439,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                gap: 10,
                                flexWrap: "wrap",
                                justifyContent: "flex-end"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handlePlayPause,
                                    style: btnStyle("primary"),
                                    "aria-label": isPlaying ? "Pause" : "Play",
                                    children: isPlaying ? "⏸ Pause" : "▶ Play"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                    lineNumber: 449,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleReplay,
                                    style: btnStyle(),
                                    "aria-label": "Replay",
                                    children: "↺ Replay"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                    lineNumber: 456,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/BirthdayCard.jsx",
                            lineNumber: 448,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/BirthdayCard.jsx",
                    lineNumber: 427,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: "grid",
                        gridTemplateColumns: "1fr 1.35fr",
                        minHeight: 580
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                padding: 16,
                                borderRight: "1px solid rgba(255,255,255,.10)",
                                display: "grid",
                                placeItems: "center",
                                background: "radial-gradient(700px 450px at 30% 20%, rgba(255,210,122,.10), transparent 60%)," + "radial-gradient(600px 400px at 75% 65%, rgba(158,231,255,.10), transparent 55%)"
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    position: "relative",
                                    width: "92%",
                                    maxWidth: 340,
                                    aspectRatio: "4 / 5"
                                },
                                children: photos.slice(0, 3).map((src, i)=>{
                                    const rot = [
                                        -6,
                                        5,
                                        -2
                                    ][i] ?? 0;
                                    const tx = [
                                        -10,
                                        10,
                                        0
                                    ][i] ?? 0;
                                    const ty = [
                                        6,
                                        0,
                                        -4
                                    ][i] ?? 0;
                                    const opacity = [
                                        1,
                                        0.95,
                                        0.92
                                    ][i] ?? 1;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            position: "absolute",
                                            inset: 0,
                                            borderRadius: 18,
                                            overflow: "hidden",
                                            border: "1px solid rgba(255,255,255,.15)",
                                            boxShadow: "0 14px 35px rgba(0,0,0,.35)",
                                            background: "rgba(255,255,255,.08)",
                                            transform: `rotate(${rot}deg) translate(${tx}px, ${ty}px)`,
                                            transformOrigin: "60% 80%",
                                            opacity
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: src,
                                                alt: `Photo ${i + 1}`,
                                                style: {
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "cover",
                                                    display: "block"
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/BirthdayCard.jsx",
                                                lineNumber: 498,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    position: "absolute",
                                                    left: 0,
                                                    right: 0,
                                                    bottom: 0,
                                                    height: "22%",
                                                    background: "rgba(0,0,0,.35)",
                                                    borderTop: "1px solid rgba(255,255,255,.10)",
                                                    backdropFilter: "blur(6px)"
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/BirthdayCard.jsx",
                                                lineNumber: 499,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    position: "absolute",
                                                    left: 12,
                                                    right: 12,
                                                    bottom: 10,
                                                    fontSize: 12,
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                    textShadow: "0 2px 14px rgba(0,0,0,.60)"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontWeight: 800,
                                                            color: "rgba(255,210,122,.95)"
                                                        },
                                                        children: [
                                                            "Memory #",
                                                            i + 1
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/components/BirthdayCard.jsx",
                                                        lineNumber: 501,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "♡"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/BirthdayCard.jsx",
                                                        lineNumber: 502,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/components/BirthdayCard.jsx",
                                                lineNumber: 500,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, src + i, true, {
                                        fileName: "[project]/app/components/BirthdayCard.jsx",
                                        lineNumber: 483,
                                        columnNumber: 19
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/app/components/BirthdayCard.jsx",
                                lineNumber: 476,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/components/BirthdayCard.jsx",
                            lineNumber: 465,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                padding: 16
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    position: "relative",
                                    height: "100%",
                                    borderRadius: 18,
                                    border: "1px solid rgba(255,255,255,.10)",
                                    overflow: "hidden",
                                    background: "linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.03))," + "radial-gradient(900px 600px at 50% 0%, rgba(255,210,122,.08), transparent 60%)," + "radial-gradient(700px 500px at 20% 80%, rgba(158,231,255,.08), transparent 55%)"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            position: "absolute",
                                            inset: 0,
                                            pointerEvents: "none",
                                            opacity: 0.24,
                                            backgroundImage: "radial-gradient(circle at 20% 30%, rgba(255,255,255,.35) 0 1px, transparent 2px)," + "radial-gradient(circle at 70% 60%, rgba(255,255,255,.28) 0 1px, transparent 2px)," + "radial-gradient(circle at 40% 80%, rgba(255,255,255,.22) 0 1px, transparent 2px)," + "repeating-linear-gradient(25deg, rgba(255,255,255,.06) 0 1px, transparent 1px 6px)," + "repeating-linear-gradient(-20deg, rgba(0,0,0,.10) 0 1px, transparent 1px 7px)",
                                            backgroundSize: "120px 120px, 120px 120px, 120px 120px, 140px 140px, 160px 160px",
                                            mixBlendMode: "soft-light"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/BirthdayCard.jsx",
                                        lineNumber: 526,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "flex-end",
                                            gap: 12,
                                            padding: "18px 20px 0",
                                            position: "relative"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: 16,
                                                    fontWeight: 800
                                                },
                                                children: [
                                                    "To ",
                                                    toName,
                                                    ","
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/components/BirthdayCard.jsx",
                                                lineNumber: 544,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: 12,
                                                    color: "rgba(255,255,255,.70)",
                                                    whiteSpace: "nowrap"
                                                },
                                                children: status
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/BirthdayCard.jsx",
                                                lineNumber: 545,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/BirthdayCard.jsx",
                                        lineNumber: 543,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            margin: "10px 20px 14px",
                                            height: 1,
                                            opacity: 0.7,
                                            background: "linear-gradient(90deg, rgba(255,210,122,.45), rgba(158,231,255,.35), transparent)"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/BirthdayCard.jsx",
                                        lineNumber: 548,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            padding: "0 20px 64px",
                                            position: "relative"
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            ref: svgRef,
                                            viewBox: `0 0 ${viewW} ${viewH}`,
                                            width: "100%",
                                            height: "auto",
                                            style: {
                                                display: "block"
                                            },
                                            "aria-label": "Poem",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mask", {
                                                            id: "revealMask",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                                                    x: "0",
                                                                    y: "0",
                                                                    width: viewW,
                                                                    height: viewH,
                                                                    fill: "black"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                                                    lineNumber: 561,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                                    id: "maskGroup"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                                                    lineNumber: 562,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                                            lineNumber: 560,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("filter", {
                                                            id: "inkBleed",
                                                            x: "-20%",
                                                            y: "-20%",
                                                            width: "140%",
                                                            height: "140%",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feMorphology", {
                                                                    in: "SourceGraphic",
                                                                    operator: "dilate",
                                                                    radius: "0.6",
                                                                    result: "spread"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                                                    lineNumber: 567,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feGaussianBlur", {
                                                                    in: "spread",
                                                                    stdDeviation: "1.35",
                                                                    result: "blur"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                                                    lineNumber: 568,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feColorMatrix", {
                                                                    in: "blur",
                                                                    type: "matrix",
                                                                    values: " 1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.6 0",
                                                                    result: "bleed"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                                                    lineNumber: 569,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feMerge", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feMergeNode", {
                                                                            in: "bleed"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                                                            lineNumber: 580,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feMergeNode", {
                                                                            in: "SourceGraphic"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                                                            lineNumber: 581,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                                                    lineNumber: 579,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                                            lineNumber: 566,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                                    lineNumber: 559,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                                    x: startX,
                                                    y: startY,
                                                    mask: "url(#revealMask)",
                                                    style: {
                                                        fontFamily: `"InterSignature", cursive`,
                                                        fontSize: 42,
                                                        fill: "rgba(255,255,255,.22)",
                                                        filter: "url(#inkBleed)"
                                                    },
                                                    children: POEM_LINES.map((line, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tspan", {
                                                            x: startX,
                                                            y: startY + i * lineGap,
                                                            children: line || " "
                                                        }, i, false, {
                                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                                            lineNumber: 599,
                                                            columnNumber: 23
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                                    lineNumber: 587,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                                    x: startX,
                                                    y: startY,
                                                    mask: "url(#revealMask)",
                                                    style: {
                                                        fontFamily: `"InterSignature", cursive`,
                                                        fontSize: 42,
                                                        fill: inkFill,
                                                        filter: `drop-shadow(0 0 10px ${inkGlow})`
                                                    },
                                                    children: POEM_LINES.map((line, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tspan", {
                                                            x: startX,
                                                            y: startY + i * lineGap,
                                                            children: line || " "
                                                        }, i, false, {
                                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                                            lineNumber: 618,
                                                            columnNumber: 23
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                                    lineNumber: 606,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                            lineNumber: 558,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/BirthdayCard.jsx",
                                        lineNumber: 557,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        ref: penRef,
                                        style: {
                                            position: "absolute",
                                            width: 18,
                                            height: 18,
                                            borderRadius: 6,
                                            boxShadow: "0 10px 24px rgba(0,0,0,.35)",
                                            pointerEvents: "none",
                                            opacity: 0,
                                            background: "linear-gradient(160deg, rgba(255,210,122,.9), rgba(158,231,255,.55))",
                                            transform: "translate(-9999px,-9999px) rotate(18deg)"
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                position: "absolute",
                                                left: 5,
                                                top: 5,
                                                width: 8,
                                                height: 8,
                                                borderRadius: 3,
                                                background: "rgba(0,0,0,.55)"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                            lineNumber: 641,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/BirthdayCard.jsx",
                                        lineNumber: 627,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("audio", {
                                        ref: audioRef,
                                        src: audioUrl,
                                        preload: "metadata"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/BirthdayCard.jsx",
                                        lineNumber: 645,
                                        columnNumber: 15
                                    }, this),
                                    needsGesture && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleStartFromOverlay,
                                        style: {
                                            position: "absolute",
                                            inset: 0,
                                            display: "grid",
                                            placeItems: "center",
                                            background: "rgba(0,0,0,.42)",
                                            backdropFilter: "blur(6px)",
                                            border: "none",
                                            cursor: "pointer",
                                            color: "white"
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                padding: "12px 18px",
                                                borderRadius: 999,
                                                border: "1px solid rgba(255,255,255,.25)",
                                                background: "rgba(255,255,255,.10)",
                                                fontWeight: 900
                                            },
                                            children: "Tap to start with sound ▶"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                            lineNumber: 663,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/BirthdayCard.jsx",
                                        lineNumber: 649,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            position: "absolute",
                                            left: 18,
                                            right: 18,
                                            bottom: 14,
                                            fontSize: 12,
                                            color: "rgba(255,255,255,.70)",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 10,
                                            flexWrap: "wrap"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    width: 10,
                                                    height: 10,
                                                    borderRadius: 999,
                                                    background: "rgba(255,210,122,.95)",
                                                    boxShadow: "0 0 18px rgba(255,210,122,.65), 0 0 40px rgba(158,231,255,.22)"
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/BirthdayCard.jsx",
                                                lineNumber: 678,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    "Audio: ",
                                                    audioUrl
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/components/BirthdayCard.jsx",
                                                lineNumber: 687,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/BirthdayCard.jsx",
                                        lineNumber: 677,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/BirthdayCard.jsx",
                                lineNumber: 512,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/components/BirthdayCard.jsx",
                            lineNumber: 511,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/BirthdayCard.jsx",
                    lineNumber: 463,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                    children: `
          @media (max-width: 860px) {
            .stackGrid {
              grid-template-columns: 1fr !important;
            }
          }
        `
                }, void 0, false, {
                    fileName: "[project]/app/components/BirthdayCard.jsx",
                    lineNumber: 694,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/components/BirthdayCard.jsx",
            lineNumber: 414,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/BirthdayCard.jsx",
        lineNumber: 413,
        columnNumber: 5
    }, this);
}
function btnStyle(kind) {
    const base = {
        appearance: "none",
        borderRadius: 999,
        padding: "10px 12px",
        fontWeight: 900,
        letterSpacing: "0.2px",
        cursor: "pointer",
        border: "1px solid rgba(255,255,255,.16)",
        background: "rgba(0,0,0,.20)",
        color: "white",
        transition: "transform .08s ease, background .2s ease, border-color .2s ease"
    };
    if (kind === "primary") {
        return {
            ...base,
            border: "1px solid rgba(255,255,255,.20)",
            background: "linear-gradient(90deg, rgba(255,210,122,.22), rgba(158,231,255,.18))"
        };
    }
    return base;
}
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