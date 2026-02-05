(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/components/CardInsideOrnate.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CardInsideOrnate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function CardInsideOrnate({ name = "Luke", lineProgress = [], emphasisWords = [] }) {
    _s();
    const [fontsLoaded, setFontsLoaded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CardInsideOrnate.useEffect": ()=>{
            const loadFonts = {
                "CardInsideOrnate.useEffect.loadFonts": async ()=>{
                    const adelia = new FontFace("Adelia", "url(/fonts/Adelia.ttf)");
                    const mayonice = new FontFace("Mayonice", "url(/fonts/Mayonice.ttf)");
                    try {
                        const [f1, f2] = await Promise.all([
                            adelia.load(),
                            mayonice.load()
                        ]);
                        document.fonts.add(f1);
                        document.fonts.add(f2);
                        setFontsLoaded(true);
                    } catch (e) {
                        console.error("Font load error:", e);
                        setFontsLoaded(true);
                    }
                }
            }["CardInsideOrnate.useEffect.loadFonts"];
            loadFonts();
        }
    }["CardInsideOrnate.useEffect"], []);
    const VB_W = 820;
    const VB_H = 1320;
    const poemLines = [
        `The world became a brighter place...`,
        `The moment ${name} arrived,`,
        `With kindness written on his face`,
        `And a spirit meant to thrive.`,
        ``,
        `Through every year and every mile,`,
        `A soul grows in heart and mind,`,
        `With a steady hand and a ready smile,`,
        `The rarest sort to find.`,
        ``,
        `May this day be filled with all that's loved,`,
        `With laughter, warmth, and light,`,
        `And may the year ahead unfold...`,
        `To be exceptionally bright..`,
        ``,
        `So here's to ${name}, for all he is,`,
        `And the light he's always shown,`,
        ``,
        `The greatest gift of all Dear ${name},`,
        `Is To Be Known`
    ];
    const topPad = 270;
    const poemFontSize = 40;
    const lineGap = 50;
    const stanzaGapExtra = 18;
    let currentY = topPad;
    const dividerYs = [];
    const linePositions = [];
    poemLines.forEach((line, i)=>{
        const isBlank = line.trim() === "";
        const dy = i === 0 ? 0 : isBlank ? lineGap + stanzaGapExtra : lineGap;
        if (isBlank && i !== 0) dividerYs.push(currentY + (lineGap + stanzaGapExtra) * 0.55);
        currentY += dy;
        linePositions.push({
            y: currentY,
            line,
            isBlank
        });
    });
    const secondToLastLineY = 1080;
    const finalLineY = 1180;
    const secondToLastIndex = poemLines.length - 2;
    const finalLineIndex = poemLines.length - 1;
    const finalProgress = lineProgress[finalLineIndex] ?? 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: `0 0 ${VB_W} ${VB_H}`,
        width: "100%",
        height: "100%",
        role: "img",
        "aria-label": "Ornate birthday card inside",
        style: {
            display: "block"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                        id: "paperGrad",
                        x1: "0",
                        y1: "0",
                        x2: "0",
                        y2: "1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "0%",
                                stopColor: "#f5e6c8"
                            }, void 0, false, {
                                fileName: "[project]/app/components/CardInsideOrnate.jsx",
                                lineNumber: 83,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "30%",
                                stopColor: "#ecdbb4"
                            }, void 0, false, {
                                fileName: "[project]/app/components/CardInsideOrnate.jsx",
                                lineNumber: 84,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "70%",
                                stopColor: "#e4cea0"
                            }, void 0, false, {
                                fileName: "[project]/app/components/CardInsideOrnate.jsx",
                                lineNumber: 85,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "100%",
                                stopColor: "#d8bf8a"
                            }, void 0, false, {
                                fileName: "[project]/app/components/CardInsideOrnate.jsx",
                                lineNumber: 86,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/CardInsideOrnate.jsx",
                        lineNumber: 82,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("radialGradient", {
                        id: "vignette",
                        cx: "50%",
                        cy: "40%",
                        r: "75%",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "40%",
                                stopColor: "rgba(0,0,0,0)"
                            }, void 0, false, {
                                fileName: "[project]/app/components/CardInsideOrnate.jsx",
                                lineNumber: 90,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "100%",
                                stopColor: "rgba(60,40,20,0.25)"
                            }, void 0, false, {
                                fileName: "[project]/app/components/CardInsideOrnate.jsx",
                                lineNumber: 91,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/CardInsideOrnate.jsx",
                        lineNumber: 89,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("radialGradient", {
                        id: "edgeWear",
                        cx: "50%",
                        cy: "50%",
                        r: "70%",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "60%",
                                stopColor: "rgba(0,0,0,0)"
                            }, void 0, false, {
                                fileName: "[project]/app/components/CardInsideOrnate.jsx",
                                lineNumber: 95,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "90%",
                                stopColor: "rgba(80,50,20,0.08)"
                            }, void 0, false, {
                                fileName: "[project]/app/components/CardInsideOrnate.jsx",
                                lineNumber: 96,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "100%",
                                stopColor: "rgba(60,30,10,0.15)"
                            }, void 0, false, {
                                fileName: "[project]/app/components/CardInsideOrnate.jsx",
                                lineNumber: 97,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/CardInsideOrnate.jsx",
                        lineNumber: 94,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("filter", {
                        id: "paperNoise",
                        x: "-20%",
                        y: "-20%",
                        width: "140%",
                        height: "140%",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feTurbulence", {
                                type: "fractalNoise",
                                baseFrequency: "0.85",
                                numOctaves: "3",
                                stitchTiles: "stitch"
                            }, void 0, false, {
                                fileName: "[project]/app/components/CardInsideOrnate.jsx",
                                lineNumber: 101,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feColorMatrix", {
                                type: "matrix",
                                values: " 1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.10 0"
                            }, void 0, false, {
                                fileName: "[project]/app/components/CardInsideOrnate.jsx",
                                lineNumber: 102,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/CardInsideOrnate.jsx",
                        lineNumber: 100,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("filter", {
                        id: "softShadow",
                        x: "-25%",
                        y: "-25%",
                        width: "150%",
                        height: "150%",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feDropShadow", {
                            dx: "0",
                            dy: "10",
                            stdDeviation: "14",
                            floodColor: "rgba(0,0,0,0.18)"
                        }, void 0, false, {
                            fileName: "[project]/app/components/CardInsideOrnate.jsx",
                            lineNumber: 113,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/CardInsideOrnate.jsx",
                        lineNumber: 112,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                        id: "goldFoil",
                        x1: "0",
                        y1: "0",
                        x2: "1",
                        y2: "1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "0%",
                                stopColor: "#f1d58a",
                                stopOpacity: "0.75"
                            }, void 0, false, {
                                fileName: "[project]/app/components/CardInsideOrnate.jsx",
                                lineNumber: 117,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "35%",
                                stopColor: "#caa24b",
                                stopOpacity: "0.65"
                            }, void 0, false, {
                                fileName: "[project]/app/components/CardInsideOrnate.jsx",
                                lineNumber: 118,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "70%",
                                stopColor: "#a77c24",
                                stopOpacity: "0.55"
                            }, void 0, false, {
                                fileName: "[project]/app/components/CardInsideOrnate.jsx",
                                lineNumber: 119,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "100%",
                                stopColor: "#f1d58a",
                                stopOpacity: "0.75"
                            }, void 0, false, {
                                fileName: "[project]/app/components/CardInsideOrnate.jsx",
                                lineNumber: 120,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/CardInsideOrnate.jsx",
                        lineNumber: 116,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pattern", {
                        id: "filigreePattern",
                        width: "120",
                        height: "120",
                        patternUnits: "userSpaceOnUse",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                            opacity: "0.06",
                            stroke: "url(#goldFoil)",
                            strokeWidth: "2",
                            fill: "none",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M20 62 C40 40, 80 40, 100 62"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/CardInsideOrnate.jsx",
                                    lineNumber: 125,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M20 58 C40 80, 80 80, 100 58"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/CardInsideOrnate.jsx",
                                    lineNumber: 126,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                    cx: "60",
                                    cy: "60",
                                    r: "3"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/CardInsideOrnate.jsx",
                                    lineNumber: 127,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/CardInsideOrnate.jsx",
                            lineNumber: 124,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/CardInsideOrnate.jsx",
                        lineNumber: 123,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mask", {
                        id: "revealMask",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                            x: "0",
                            y: "0",
                            width: "100%",
                            height: "100%",
                            fill: "white"
                        }, void 0, false, {
                            fileName: "[project]/app/components/CardInsideOrnate.jsx",
                            lineNumber: 132,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/CardInsideOrnate.jsx",
                        lineNumber: 131,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/CardInsideOrnate.jsx",
                lineNumber: 81,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                filter: "url(#softShadow)",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        x: "26",
                        y: "26",
                        width: VB_W - 52,
                        height: VB_H - 52,
                        rx: "30",
                        fill: "url(#paperGrad)"
                    }, void 0, false, {
                        fileName: "[project]/app/components/CardInsideOrnate.jsx",
                        lineNumber: 137,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        x: "26",
                        y: "26",
                        width: VB_W - 52,
                        height: VB_H - 52,
                        rx: "30",
                        fill: "#ffffff",
                        opacity: "0.26",
                        filter: "url(#paperNoise)"
                    }, void 0, false, {
                        fileName: "[project]/app/components/CardInsideOrnate.jsx",
                        lineNumber: 138,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        x: "26",
                        y: "26",
                        width: VB_W - 52,
                        height: VB_H - 52,
                        rx: "30",
                        fill: "url(#vignette)",
                        opacity: "0.55"
                    }, void 0, false, {
                        fileName: "[project]/app/components/CardInsideOrnate.jsx",
                        lineNumber: 148,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        x: "26",
                        y: "26",
                        width: VB_W - 52,
                        height: VB_H - 52,
                        rx: "30",
                        fill: "url(#edgeWear)",
                        opacity: "0.7"
                    }, void 0, false, {
                        fileName: "[project]/app/components/CardInsideOrnate.jsx",
                        lineNumber: 149,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        x: "26",
                        y: "26",
                        width: VB_W - 52,
                        height: VB_H - 52,
                        rx: "30",
                        fill: "url(#filigreePattern)",
                        opacity: "1"
                    }, void 0, false, {
                        fileName: "[project]/app/components/CardInsideOrnate.jsx",
                        lineNumber: 150,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        x: "54",
                        y: "54",
                        width: VB_W - 108,
                        height: VB_H - 108,
                        rx: "24",
                        fill: "none",
                        stroke: "url(#goldFoil)",
                        strokeWidth: "2.4",
                        opacity: "0.85"
                    }, void 0, false, {
                        fileName: "[project]/app/components/CardInsideOrnate.jsx",
                        lineNumber: 160,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        x: "70",
                        y: "70",
                        width: VB_W - 140,
                        height: VB_H - 140,
                        rx: "20",
                        fill: "none",
                        stroke: "rgba(20,20,20,0.12)",
                        strokeWidth: "1.2"
                    }, void 0, false, {
                        fileName: "[project]/app/components/CardInsideOrnate.jsx",
                        lineNumber: 171,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/CardInsideOrnate.jsx",
                lineNumber: 136,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                opacity: "0.55",
                stroke: "url(#goldFoil)",
                strokeWidth: "2",
                fill: "none",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M92 132 C110 95, 160 88, 195 110"
                    }, void 0, false, {
                        fileName: "[project]/app/components/CardInsideOrnate.jsx",
                        lineNumber: 184,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M92 132 C130 150, 160 175, 175 205",
                        opacity: "0.55"
                    }, void 0, false, {
                        fileName: "[project]/app/components/CardInsideOrnate.jsx",
                        lineNumber: 185,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M120 118 C140 110, 158 110, 178 120",
                        opacity: "0.55"
                    }, void 0, false, {
                        fileName: "[project]/app/components/CardInsideOrnate.jsx",
                        lineNumber: 186,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: `M${VB_W - 92} 132 C${VB_W - 110} 95, ${VB_W - 160} 88, ${VB_W - 195} 110`
                    }, void 0, false, {
                        fileName: "[project]/app/components/CardInsideOrnate.jsx",
                        lineNumber: 187,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: `M${VB_W - 92} 132 C${VB_W - 130} 150, ${VB_W - 160} 175, ${VB_W - 175} 205`,
                        opacity: "0.55"
                    }, void 0, false, {
                        fileName: "[project]/app/components/CardInsideOrnate.jsx",
                        lineNumber: 188,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: `M${VB_W - 120} 118 C${VB_W - 140} 110, ${VB_W - 158} 110, ${VB_W - 178} 120`,
                        opacity: "0.55"
                    }, void 0, false, {
                        fileName: "[project]/app/components/CardInsideOrnate.jsx",
                        lineNumber: 189,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: `M92 ${VB_H - 132} C110 ${VB_H - 95}, 160 ${VB_H - 88}, 195 ${VB_H - 110}`
                    }, void 0, false, {
                        fileName: "[project]/app/components/CardInsideOrnate.jsx",
                        lineNumber: 190,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: `M92 ${VB_H - 132} C130 ${VB_H - 150}, 160 ${VB_H - 175}, 175 ${VB_H - 205}`,
                        opacity: "0.55"
                    }, void 0, false, {
                        fileName: "[project]/app/components/CardInsideOrnate.jsx",
                        lineNumber: 191,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: `M${VB_W - 92} ${VB_H - 132} C${VB_W - 110} ${VB_H - 95}, ${VB_W - 160} ${VB_H - 88}, ${VB_W - 195} ${VB_H - 110}`
                    }, void 0, false, {
                        fileName: "[project]/app/components/CardInsideOrnate.jsx",
                        lineNumber: 192,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: `M${VB_W - 92} ${VB_H - 132} C${VB_W - 130} ${VB_H - 150}, ${VB_W - 160} ${VB_H - 175}, ${VB_W - 175} ${VB_H - 205}`,
                        opacity: "0.55"
                    }, void 0, false, {
                        fileName: "[project]/app/components/CardInsideOrnate.jsx",
                        lineNumber: 193,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/CardInsideOrnate.jsx",
                lineNumber: 183,
                columnNumber: 7
            }, this),
            (()=>{
                const headerText = `To ${name},`;
                const headerProgress = lineProgress[0] ?? 0;
                const strokeLen = headerText.length * 50;
                const strokeOffset = strokeLen * (1 - headerProgress);
                const fillOpacity = headerProgress > 0.5 ? (headerProgress - 0.5) / 0.5 : 0;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                    x: "120",
                    y: "165",
                    textAnchor: "start",
                    fontFamily: "'Mayonice', cursive",
                    fontSize: "72",
                    fill: `rgba(26, 20, 16, ${fillOpacity})`,
                    stroke: "#1a1410",
                    strokeWidth: "1",
                    strokeDasharray: strokeLen,
                    strokeDashoffset: strokeOffset,
                    style: {
                        textRendering: "geometricPrecision",
                        transition: "stroke-dashoffset 0.1s linear, fill 0.15s ease-out"
                    },
                    children: headerText
                }, void 0, false, {
                    fileName: "[project]/app/components/CardInsideOrnate.jsx",
                    lineNumber: 203,
                    columnNumber: 11
                }, this);
            })(),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                opacity: "0.65",
                stroke: "url(#goldFoil)",
                strokeWidth: "2",
                fill: "none",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: `M110 215 C240 205, 580 205, 710 215`
                    }, void 0, false, {
                        fileName: "[project]/app/components/CardInsideOrnate.jsx",
                        lineNumber: 225,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "410",
                        cy: "212",
                        r: "3.5",
                        fill: "#caa24b",
                        opacity: "0.45"
                    }, void 0, false, {
                        fileName: "[project]/app/components/CardInsideOrnate.jsx",
                        lineNumber: 226,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/CardInsideOrnate.jsx",
                lineNumber: 224,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                x: "50%",
                y: "710",
                textAnchor: "middle",
                fontFamily: "'Adelia', cursive",
                fontSize: "340",
                fill: "#000000",
                opacity: "0.035",
                style: {
                    userSelect: "none"
                },
                children: name.slice(0, 1).toUpperCase()
            }, void 0, false, {
                fileName: "[project]/app/components/CardInsideOrnate.jsx",
                lineNumber: 229,
                columnNumber: 7
            }, this),
            linePositions.slice(0, -1).map((pos, i)=>{
                if (pos.isBlank) return null;
                const progress = lineProgress[i] ?? 0;
                const tokens = pos.line.split(/(\s+)/);
                // Stroke drawing animation - estimate stroke length based on text
                const strokeLen = pos.line.length * 25;
                const strokeOffset = strokeLen * (1 - progress);
                const fillOpacity = progress > 0.6 ? (progress - 0.6) / 0.4 : 0;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                    x: "50%",
                    y: pos.y,
                    textAnchor: "middle",
                    fontFamily: "'Adelia', cursive",
                    fontSize: 32,
                    fill: `rgba(29, 23, 20, ${fillOpacity})`,
                    stroke: "#1d1714",
                    strokeWidth: "0.8",
                    strokeDasharray: strokeLen,
                    strokeDashoffset: strokeOffset,
                    style: {
                        textRendering: "geometricPrecision",
                        transition: "stroke-dashoffset 0.1s linear, fill 0.15s ease-out"
                    },
                    children: tokens.map((token, ti)=>{
                        const cleanToken = token.replace(/[^a-zA-Z]/g, "");
                        const isEmphasis = emphasisWords.some((ew)=>cleanToken.toLowerCase() === ew.toLowerCase());
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tspan", {
                            style: {
                                fontWeight: isEmphasis ? "bold" : "normal"
                            },
                            stroke: isEmphasis ? "#0a0604" : "#1d1714",
                            fill: isEmphasis ? `rgba(10, 6, 4, ${fillOpacity})` : `rgba(29, 23, 20, ${fillOpacity})`,
                            children: token
                        }, ti, false, {
                            fileName: "[project]/app/components/CardInsideOrnate.jsx",
                            lineNumber: 274,
                            columnNumber: 17
                        }, this);
                    })
                }, i, false, {
                    fileName: "[project]/app/components/CardInsideOrnate.jsx",
                    lineNumber: 253,
                    columnNumber: 11
                }, this);
            }),
            dividerYs.map((yy, idx)=>{
                const dividerLineIndex = [
                    4,
                    9,
                    14
                ][idx];
                const prevProgress = lineProgress[dividerLineIndex - 1] ?? 0;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                    opacity: prevProgress > 0.8 ? 0.55 : 0,
                    fill: "none",
                    stroke: "url(#goldFoil)",
                    strokeWidth: "2",
                    style: {
                        transition: "opacity 0.5s ease"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: `M${VB_W / 2 - 220} ${yy} C${VB_W / 2 - 120} ${yy - 22}, ${VB_W / 2 + 120} ${yy - 22}, ${VB_W / 2 + 220} ${yy}`
                        }, void 0, false, {
                            fileName: "[project]/app/components/CardInsideOrnate.jsx",
                            lineNumber: 302,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: `M${VB_W / 2 - 110} ${yy + 4} C${VB_W / 2 - 55} ${yy - 8}, ${VB_W / 2 + 55} ${yy - 8}, ${VB_W / 2 + 110} ${yy + 4}`,
                            opacity: "0.45"
                        }, void 0, false, {
                            fileName: "[project]/app/components/CardInsideOrnate.jsx",
                            lineNumber: 303,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                            cx: VB_W / 2,
                            cy: yy - 4,
                            r: "4",
                            fill: "#caa24b",
                            opacity: "0.35"
                        }, void 0, false, {
                            fileName: "[project]/app/components/CardInsideOrnate.jsx",
                            lineNumber: 304,
                            columnNumber: 13
                        }, this)
                    ]
                }, idx, true, {
                    fileName: "[project]/app/components/CardInsideOrnate.jsx",
                    lineNumber: 294,
                    columnNumber: 11
                }, this);
            }),
            (()=>{
                const secondLine = `The greatest gift of all Dear ${name},`;
                const tokens = secondLine.split(/(\s+)/);
                const secondProgress = lineProgress[secondToLastIndex] ?? 0;
                const strokeLen = secondLine.length * 30;
                const strokeOffset = strokeLen * (1 - secondProgress);
                const fillOpacity = secondProgress > 0.6 ? (secondProgress - 0.6) / 0.4 : 0;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                    x: "50%",
                    y: secondToLastLineY,
                    textAnchor: "middle",
                    fontFamily: "'Adelia', cursive",
                    fontSize: "38",
                    fill: `rgba(29, 23, 20, ${fillOpacity})`,
                    stroke: "#1d1714",
                    strokeWidth: "0.9",
                    strokeDasharray: strokeLen,
                    strokeDashoffset: strokeOffset,
                    style: {
                        textRendering: "geometricPrecision",
                        transition: "stroke-dashoffset 0.1s linear, fill 0.15s ease-out"
                    },
                    children: tokens.map((token, ti)=>{
                        const cleanToken = token.replace(/[^a-zA-Z]/g, "");
                        const isEmphasis = emphasisWords.some((ew)=>cleanToken.toLowerCase() === ew.toLowerCase());
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tspan", {
                            style: {
                                fontWeight: isEmphasis ? "bold" : "normal"
                            },
                            stroke: isEmphasis ? "#0a0604" : "#1d1714",
                            fill: isEmphasis ? `rgba(10, 6, 4, ${fillOpacity})` : `rgba(29, 23, 20, ${fillOpacity})`,
                            children: token
                        }, ti, false, {
                            fileName: "[project]/app/components/CardInsideOrnate.jsx",
                            lineNumber: 334,
                            columnNumber: 17
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/app/components/CardInsideOrnate.jsx",
                    lineNumber: 317,
                    columnNumber: 11
                }, this);
            })(),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                opacity: finalProgress > 0 ? finalProgress : 0,
                style: {
                    transition: "opacity 0.5s ease"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                        opacity: finalProgress > 0.3 ? 0.75 : 0,
                        stroke: "url(#goldFoil)",
                        strokeWidth: "2",
                        fill: "none",
                        style: {
                            transition: "opacity 0.3s ease"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: `M${VB_W / 2 - 260} ${finalLineY - 55} C${VB_W / 2 - 140} ${finalLineY - 90}, ${VB_W / 2 + 140} ${finalLineY - 90}, ${VB_W / 2 + 260} ${finalLineY - 55}`
                            }, void 0, false, {
                                fileName: "[project]/app/components/CardInsideOrnate.jsx",
                                lineNumber: 350,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: `M${VB_W / 2 - 170} ${finalLineY - 60} C${VB_W / 2 - 90} ${finalLineY - 80}, ${VB_W / 2 + 90} ${finalLineY - 80}, ${VB_W / 2 + 170} ${finalLineY - 60}`,
                                opacity: "0.55"
                            }, void 0, false, {
                                fileName: "[project]/app/components/CardInsideOrnate.jsx",
                                lineNumber: 351,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/CardInsideOrnate.jsx",
                        lineNumber: 349,
                        columnNumber: 9
                    }, this),
                    (()=>{
                        const finalText = "Is To Be Known";
                        const strokeLen = finalText.length * 60;
                        const strokeOffset = strokeLen * (1 - finalProgress);
                        const fillOpacity = finalProgress > 0.5 ? (finalProgress - 0.5) / 0.5 : 0;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                            x: "50%",
                            y: finalLineY,
                            textAnchor: "middle",
                            fontFamily: "'Mayonice', cursive",
                            fontSize: "80",
                            fill: `rgba(20, 16, 14, ${fillOpacity})`,
                            stroke: "#14100e",
                            strokeWidth: "1.2",
                            strokeDasharray: strokeLen,
                            strokeDashoffset: strokeOffset,
                            style: {
                                textRendering: "geometricPrecision",
                                transition: "stroke-dashoffset 0.12s linear, fill 0.2s ease-out"
                            },
                            children: finalText
                        }, void 0, false, {
                            fileName: "[project]/app/components/CardInsideOrnate.jsx",
                            lineNumber: 360,
                            columnNumber: 13
                        }, this);
                    })(),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                        opacity: finalProgress > 0.8 ? 0.75 : 0,
                        stroke: "url(#goldFoil)",
                        strokeWidth: "2",
                        fill: "none",
                        style: {
                            transition: "opacity 0.3s ease"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: `M${VB_W / 2 - 280} ${finalLineY + 45} C${VB_W / 2 - 150} ${finalLineY + 95}, ${VB_W / 2 + 150} ${finalLineY + 95}, ${VB_W / 2 + 280} ${finalLineY + 45}`
                            }, void 0, false, {
                                fileName: "[project]/app/components/CardInsideOrnate.jsx",
                                lineNumber: 379,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                cx: VB_W / 2 - 310,
                                cy: finalLineY + 46,
                                r: "4"
                            }, void 0, false, {
                                fileName: "[project]/app/components/CardInsideOrnate.jsx",
                                lineNumber: 380,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                cx: VB_W / 2 + 310,
                                cy: finalLineY + 46,
                                r: "4"
                            }, void 0, false, {
                                fileName: "[project]/app/components/CardInsideOrnate.jsx",
                                lineNumber: 381,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/CardInsideOrnate.jsx",
                        lineNumber: 378,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/CardInsideOrnate.jsx",
                lineNumber: 348,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                opacity: "0.35",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                        cx: "95",
                        cy: "180",
                        rx: "8",
                        ry: "6",
                        fill: "#2a1810",
                        opacity: "0.15"
                    }, void 0, false, {
                        fileName: "[project]/app/components/CardInsideOrnate.jsx",
                        lineNumber: 388,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                        cx: VB_W - 85,
                        cy: "280",
                        rx: "10",
                        ry: "7",
                        fill: "#1a1008",
                        opacity: "0.12"
                    }, void 0, false, {
                        fileName: "[project]/app/components/CardInsideOrnate.jsx",
                        lineNumber: 389,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                        cx: "140",
                        cy: "1150",
                        rx: "12",
                        ry: "8",
                        fill: "#2a1810",
                        opacity: "0.1"
                    }, void 0, false, {
                        fileName: "[project]/app/components/CardInsideOrnate.jsx",
                        lineNumber: 390,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                        cx: VB_W - 130,
                        cy: "1050",
                        rx: "9",
                        ry: "6",
                        fill: "#1a1008",
                        opacity: "0.12"
                    }, void 0, false, {
                        fileName: "[project]/app/components/CardInsideOrnate.jsx",
                        lineNumber: 391,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "88",
                        cy: "320",
                        r: "2.5",
                        fill: "#1a1008",
                        opacity: "0.25"
                    }, void 0, false, {
                        fileName: "[project]/app/components/CardInsideOrnate.jsx",
                        lineNumber: 394,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "105",
                        cy: "380",
                        r: "1.5",
                        fill: "#2a1810",
                        opacity: "0.3"
                    }, void 0, false, {
                        fileName: "[project]/app/components/CardInsideOrnate.jsx",
                        lineNumber: 395,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "72",
                        cy: "450",
                        r: "2",
                        fill: "#1a1008",
                        opacity: "0.2"
                    }, void 0, false, {
                        fileName: "[project]/app/components/CardInsideOrnate.jsx",
                        lineNumber: 396,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "118",
                        cy: "580",
                        r: "1.8",
                        fill: "#2a1810",
                        opacity: "0.28"
                    }, void 0, false, {
                        fileName: "[project]/app/components/CardInsideOrnate.jsx",
                        lineNumber: 397,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "85",
                        cy: "720",
                        r: "2.2",
                        fill: "#1a1008",
                        opacity: "0.22"
                    }, void 0, false, {
                        fileName: "[project]/app/components/CardInsideOrnate.jsx",
                        lineNumber: 398,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "95",
                        cy: "850",
                        r: "1.5",
                        fill: "#2a1810",
                        opacity: "0.25"
                    }, void 0, false, {
                        fileName: "[project]/app/components/CardInsideOrnate.jsx",
                        lineNumber: 399,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "110",
                        cy: "950",
                        r: "2",
                        fill: "#1a1008",
                        opacity: "0.2"
                    }, void 0, false, {
                        fileName: "[project]/app/components/CardInsideOrnate.jsx",
                        lineNumber: 400,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: VB_W - 92,
                        r: "2",
                        cy: "350",
                        fill: "#2a1810",
                        opacity: "0.25"
                    }, void 0, false, {
                        fileName: "[project]/app/components/CardInsideOrnate.jsx",
                        lineNumber: 402,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: VB_W - 78,
                        r: "1.8",
                        cy: "480",
                        fill: "#1a1008",
                        opacity: "0.22"
                    }, void 0, false, {
                        fileName: "[project]/app/components/CardInsideOrnate.jsx",
                        lineNumber: 403,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: VB_W - 115,
                        r: "2.2",
                        cy: "620",
                        fill: "#2a1810",
                        opacity: "0.28"
                    }, void 0, false, {
                        fileName: "[project]/app/components/CardInsideOrnate.jsx",
                        lineNumber: 404,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: VB_W - 88,
                        r: "1.5",
                        cy: "780",
                        fill: "#1a1008",
                        opacity: "0.25"
                    }, void 0, false, {
                        fileName: "[project]/app/components/CardInsideOrnate.jsx",
                        lineNumber: 405,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: VB_W - 105,
                        r: "2",
                        cy: "900",
                        fill: "#2a1810",
                        opacity: "0.2"
                    }, void 0, false, {
                        fileName: "[project]/app/components/CardInsideOrnate.jsx",
                        lineNumber: 406,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: VB_W - 95,
                        r: "1.8",
                        cy: "1000",
                        fill: "#1a1008",
                        opacity: "0.22"
                    }, void 0, false, {
                        fileName: "[project]/app/components/CardInsideOrnate.jsx",
                        lineNumber: 407,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "200",
                        cy: "240",
                        r: "1",
                        fill: "#2a1810",
                        opacity: "0.18"
                    }, void 0, false, {
                        fileName: "[project]/app/components/CardInsideOrnate.jsx",
                        lineNumber: 410,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "350",
                        cy: "160",
                        r: "0.8",
                        fill: "#1a1008",
                        opacity: "0.15"
                    }, void 0, false, {
                        fileName: "[project]/app/components/CardInsideOrnate.jsx",
                        lineNumber: 411,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "520",
                        cy: "200",
                        r: "1.2",
                        fill: "#2a1810",
                        opacity: "0.12"
                    }, void 0, false, {
                        fileName: "[project]/app/components/CardInsideOrnate.jsx",
                        lineNumber: 412,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "650",
                        cy: "180",
                        r: "0.8",
                        fill: "#1a1008",
                        opacity: "0.15"
                    }, void 0, false, {
                        fileName: "[project]/app/components/CardInsideOrnate.jsx",
                        lineNumber: 413,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "280",
                        cy: "1200",
                        r: "1",
                        fill: "#2a1810",
                        opacity: "0.15"
                    }, void 0, false, {
                        fileName: "[project]/app/components/CardInsideOrnate.jsx",
                        lineNumber: 414,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "450",
                        cy: "1240",
                        r: "1.2",
                        fill: "#1a1008",
                        opacity: "0.12"
                    }, void 0, false, {
                        fileName: "[project]/app/components/CardInsideOrnate.jsx",
                        lineNumber: 415,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "580",
                        cy: "1180",
                        r: "0.8",
                        fill: "#2a1810",
                        opacity: "0.18"
                    }, void 0, false, {
                        fileName: "[project]/app/components/CardInsideOrnate.jsx",
                        lineNumber: 416,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/CardInsideOrnate.jsx",
                lineNumber: 386,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                opacity: "0.18",
                fill: "#caa24b",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M90 340 l6 6 -6 6 -6 -6 z"
                    }, void 0, false, {
                        fileName: "[project]/app/components/CardInsideOrnate.jsx",
                        lineNumber: 421,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M110 520 l4 4 -4 4 -4 -4 z"
                    }, void 0, false, {
                        fileName: "[project]/app/components/CardInsideOrnate.jsx",
                        lineNumber: 422,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M95 920 l5 5 -5 5 -5 -5 z"
                    }, void 0, false, {
                        fileName: "[project]/app/components/CardInsideOrnate.jsx",
                        lineNumber: 423,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: `M${VB_W - 90} 410 l6 6 -6 6 -6 -6 z`
                    }, void 0, false, {
                        fileName: "[project]/app/components/CardInsideOrnate.jsx",
                        lineNumber: 424,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: `M${VB_W - 110} 650 l4 4 -4 4 -4 -4 z`
                    }, void 0, false, {
                        fileName: "[project]/app/components/CardInsideOrnate.jsx",
                        lineNumber: 425,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: `M${VB_W - 95} 980 l5 5 -5 5 -5 -5 z`
                    }, void 0, false, {
                        fileName: "[project]/app/components/CardInsideOrnate.jsx",
                        lineNumber: 426,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/CardInsideOrnate.jsx",
                lineNumber: 420,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/CardInsideOrnate.jsx",
        lineNumber: 73,
        columnNumber: 5
    }, this);
}
_s(CardInsideOrnate, "SyL4XUlrRz+MMCoPhmPaElWoaZQ=");
_c = CardInsideOrnate;
var _c;
__turbopack_context__.k.register(_c, "CardInsideOrnate");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/BirthdayCard.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BirthdayCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$CardInsideOrnate$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/CardInsideOrnate.jsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
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
    69.4,
    73.0,
    77.0
] }) {
    _s();
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
        "The greatest gift of all Dear Luke,",
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
    const [candlesLit, setCandlesLit] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        true,
        true,
        true,
        true,
        true
    ]);
    const [arrowFlying, setArrowFlying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showSmoke, setShowSmoke] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        false,
        false,
        false,
        false,
        false
    ]);
    const [currentPhotoIndex, setCurrentPhotoIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [photoSwipeOffset, setPhotoSwipeOffset] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isPhotoSwiping, setIsPhotoSwiping] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const audioRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const rafRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const dragStartX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const photoSwipeStartX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const silentAnimationRan = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
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
    const handleDragStart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BirthdayCard.useCallback[handleDragStart]": (e)=>{
            if (cardOpen || arrowFlying) return;
            setIsDragging(true);
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            dragStartX.current = clientX;
            e.preventDefault();
        }
    }["BirthdayCard.useCallback[handleDragStart]"], [
        cardOpen,
        arrowFlying
    ]);
    const handleDragMove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BirthdayCard.useCallback[handleDragMove]": (e)=>{
            if (!isDragging || cardOpen || arrowFlying) return;
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const delta = dragStartX.current - clientX;
            const pull = Math.min(1, Math.max(0, delta / 100));
            setArrowPull(pull);
        }
    }["BirthdayCard.useCallback[handleDragMove]"], [
        isDragging,
        cardOpen,
        arrowFlying
    ]);
    const handleDragEnd = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BirthdayCard.useCallback[handleDragEnd]": ()=>{
            if (!isDragging) return;
            setIsDragging(false);
            if (arrowPull > 0.5) {
                setArrowFlying(true);
                setArrowPull(0);
                BOW_ARROW_CONFIG.candleExtinguishDelays.forEach({
                    "BirthdayCard.useCallback[handleDragEnd]": (delay, i)=>{
                        setTimeout({
                            "BirthdayCard.useCallback[handleDragEnd]": ()=>{
                                setCandlesLit({
                                    "BirthdayCard.useCallback[handleDragEnd]": (prev)=>{
                                        const newState = [
                                            ...prev
                                        ];
                                        newState[i] = false;
                                        return newState;
                                    }
                                }["BirthdayCard.useCallback[handleDragEnd]"]);
                                setShowSmoke({
                                    "BirthdayCard.useCallback[handleDragEnd]": (prev)=>{
                                        const newState = [
                                            ...prev
                                        ];
                                        newState[i] = true;
                                        return newState;
                                    }
                                }["BirthdayCard.useCallback[handleDragEnd]"]);
                            }
                        }["BirthdayCard.useCallback[handleDragEnd]"], delay);
                    }
                }["BirthdayCard.useCallback[handleDragEnd]"]);
                setTimeout({
                    "BirthdayCard.useCallback[handleDragEnd]": ()=>{
                        setShowSmoke([
                            false,
                            false,
                            false,
                            false,
                            false
                        ]);
                    }
                }["BirthdayCard.useCallback[handleDragEnd]"], 1800);
                setTimeout({
                    "BirthdayCard.useCallback[handleDragEnd]": ()=>{
                        setCardOpen(true);
                        setArrowFlying(false);
                    }
                }["BirthdayCard.useCallback[handleDragEnd]"], 2000);
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BirthdayCard.useEffect": ()=>{
            if (cardOpen && !isPlaying) {
                silentAnimationRan.current = false;
                const timer = setTimeout({
                    "BirthdayCard.useEffect.timer": ()=>{
                        if (!isPlaying && !silentAnimationRan.current) {
                            silentAnimationRan.current = true;
                            startSilentAnimation();
                        }
                    }
                }["BirthdayCard.useEffect.timer"], 500);
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
    const inkSplatters = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useMemo({
        "BirthdayCard.useMemo[inkSplatters]": ()=>[
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
            ]
    }["BirthdayCard.useMemo[inkSplatters]"], []);
    const inkDotsStatic = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useMemo({
        "BirthdayCard.useMemo[inkDotsStatic]": ()=>{
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
        }
    }["BirthdayCard.useMemo[inkDotsStatic]"], []);
    const renderLineWithEmphasis = (line, i, progress)=>{
        if (!line.trim()) return null;
        const isFinalLine = line === "Is To Be Known";
        const y = 50 + i * 38;
        const clipWidth = 520 * progress;
        const wobble = isFinalLine ? 0 : Math.sin(i * 1.5) * 1.5;
        const rotation = isFinalLine ? 0 : Math.sin(i * 0.7) * 0.5;
        const words = line.split(" ");
        let xOffset = isFinalLine ? 85 : 25;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("clipPath", {
                        id: `clip-${i}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                            x: "0",
                            y: y - 45,
                            width: clipWidth,
                            height: "80"
                        }, void 0, false, {
                            fileName: "[project]/app/components/BirthdayCard.jsx",
                            lineNumber: 398,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/BirthdayCard.jsx",
                        lineNumber: 397,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/components/BirthdayCard.jsx",
                    lineNumber: 396,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                    clipPath: `url(#clip-${i})`,
                    transform: `rotate(${rotation} 250 ${y})`,
                    children: isFinalLine ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                x: xOffset - 45,
                                y: y + 20,
                                style: {
                                    fontFamily: 'Georgia, serif',
                                    fontSize: 28,
                                    fill: 'rgba(201,165,90,0.6)'
                                },
                                children: "❧"
                            }, void 0, false, {
                                fileName: "[project]/app/components/BirthdayCard.jsx",
                                lineNumber: 408,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                x: xOffset,
                                y: y + 20,
                                style: {
                                    fontFamily: '"Great Vibes", cursive',
                                    fontSize: 56,
                                    fontWeight: 400,
                                    fill: "#1a0f08",
                                    filter: "drop-shadow(0 2px 4px rgba(139,90,43,0.35)) drop-shadow(0 0 12px rgba(201,165,90,0.25))",
                                    letterSpacing: 5
                                },
                                children: line
                            }, void 0, false, {
                                fileName: "[project]/app/components/BirthdayCard.jsx",
                                lineNumber: 419,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                x: xOffset + 295,
                                y: y + 20,
                                style: {
                                    fontFamily: 'Georgia, serif',
                                    fontSize: 28,
                                    fill: 'rgba(201,165,90,0.6)',
                                    transform: 'scaleX(-1)'
                                },
                                children: "❧"
                            }, void 0, false, {
                                fileName: "[project]/app/components/BirthdayCard.jsx",
                                lineNumber: 434,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true) : words.map((word, wordIdx)=>{
                        const isEmphasis = EMPHASIS_WORDS.some((ew)=>word.includes(ew));
                        const wordX = xOffset;
                        xOffset += word.length * 15 + 10;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                            x: wordX,
                            y: y + wobble,
                            style: {
                                fontFamily: '"Great Vibes", cursive',
                                fontSize: isEmphasis ? 36 : 30,
                                fontWeight: 400,
                                fill: isEmphasis ? "#1a0f08" : "#2d1810",
                                filter: isEmphasis ? "drop-shadow(0 1px 2px rgba(139,90,43,0.3))" : "drop-shadow(0 0.5px 1px rgba(0,0,0,0.08))",
                                letterSpacing: isEmphasis ? 1.5 : 0.5
                            },
                            children: word
                        }, wordIdx, false, {
                            fileName: "[project]/app/components/BirthdayCard.jsx",
                            lineNumber: 454,
                            columnNumber: 17
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/app/components/BirthdayCard.jsx",
                    lineNumber: 401,
                    columnNumber: 9
                }, this)
            ]
        }, i, true, {
            fileName: "[project]/app/components/BirthdayCard.jsx",
            lineNumber: 395,
            columnNumber: 7
        }, this);
    };
    if (!fontReady) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: styles.loading,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: styles.loadingText,
                children: "Loading..."
            }, void 0, false, {
                fileName: "[project]/app/components/BirthdayCard.jsx",
                lineNumber: 482,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/components/BirthdayCard.jsx",
            lineNumber: 481,
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
                lineNumber: 489,
                columnNumber: 7
            }, this),
            !cardOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: styles.cardFront,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: styles.cardPaper,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: styles.cardEdgeLeft
                        }, void 0, false, {
                            fileName: "[project]/app/components/BirthdayCard.jsx",
                            lineNumber: 494,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: styles.cardEdgeRight
                        }, void 0, false, {
                            fileName: "[project]/app/components/BirthdayCard.jsx",
                            lineNumber: 495,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: styles.partyBackground,
                            children: [
                                [
                                    ...Array(25)
                                ].map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                        lineNumber: 501,
                                        columnNumber: 17
                                    }, this)),
                                [
                                    ...Array(6)
                                ].map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                        lineNumber: 518,
                                        columnNumber: 17
                                    }, this)),
                                [
                                    ...Array(10)
                                ].map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                        lineNumber: 531,
                                        columnNumber: 17
                                    }, this)),
                                [
                                    ...Array(15)
                                ].map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                        lineNumber: 547,
                                        columnNumber: 17
                                    }, this)),
                                [
                                    ...Array(8)
                                ].map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                        lineNumber: 561,
                                        columnNumber: 17
                                    }, this)),
                                [
                                    ...Array(7)
                                ].map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            ...styles.balloon,
                                            left: `${5 + i * 14 % 90}%`,
                                            animationDelay: `${i * 0.7}s`,
                                            animationDuration: `${5 + i % 3}s`
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: styles.balloonShine
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                                    lineNumber: 594,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/BirthdayCard.jsx",
                                                lineNumber: 584,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                                lineNumber: 596,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, `balloon-${i}`, true, {
                                        fileName: "[project]/app/components/BirthdayCard.jsx",
                                        lineNumber: 575,
                                        columnNumber: 17
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/BirthdayCard.jsx",
                            lineNumber: 498,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: styles.embossedBorder
                        }, void 0, false, {
                            fileName: "[project]/app/components/BirthdayCard.jsx",
                            lineNumber: 606,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: styles.cornerTL,
                            children: "❧"
                        }, void 0, false, {
                            fileName: "[project]/app/components/BirthdayCard.jsx",
                            lineNumber: 608,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: styles.cornerTR,
                            children: "❧"
                        }, void 0, false, {
                            fileName: "[project]/app/components/BirthdayCard.jsx",
                            lineNumber: 609,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: styles.cornerBL,
                            children: "❧"
                        }, void 0, false, {
                            fileName: "[project]/app/components/BirthdayCard.jsx",
                            lineNumber: 610,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: styles.cornerBR,
                            children: "❧"
                        }, void 0, false, {
                            fileName: "[project]/app/components/BirthdayCard.jsx",
                            lineNumber: 611,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: styles.decorTop
                        }, void 0, false, {
                            fileName: "[project]/app/components/BirthdayCard.jsx",
                            lineNumber: 613,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: styles.decorBottom
                        }, void 0, false, {
                            fileName: "[project]/app/components/BirthdayCard.jsx",
                            lineNumber: 614,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: styles.frontContent,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: styles.titleSection,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: styles.starDecor,
                                            children: "✦ ✦ ✦"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                            lineNumber: 618,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            style: styles.mainTitle,
                                            children: "Happy Birthday"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                            lineNumber: 619,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            style: styles.nameTitle,
                                            children: toName
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                            lineNumber: 620,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: styles.starDecor,
                                            children: "✦ ✦ ✦"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                            lineNumber: 621,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                    lineNumber: 617,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: styles.interactionArea,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: styles.bowSection,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        ...styles.bowContainer,
                                                        transform: `scaleX(${1 + arrowPull * 0.1})`
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: "/bow.png",
                                                        alt: "Bow",
                                                        style: styles.bowImage
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/BirthdayCard.jsx",
                                                        lineNumber: 632,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                                    lineNumber: 626,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        ...styles.arrowWrapper,
                                                        transform: `translateY(-50%) translateX(${-arrowPull * BOW_ARROW_CONFIG.pullDistance}px)`,
                                                        opacity: arrowFlying ? 0 : 1,
                                                        transition: arrowFlying ? "opacity 0.15s" : "transform 0.05s"
                                                    },
                                                    onMouseDown: handleDragStart,
                                                    onTouchStart: handleDragStart,
                                                    onClick: handleArrowClick,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: "/arrow.png",
                                                        alt: "Arrow",
                                                        style: styles.arrowImage
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/BirthdayCard.jsx",
                                                        lineNumber: 648,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                                    lineNumber: 635,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                            lineNumber: 625,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: styles.targetSection,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                ...styles.candleContainer,
                                                                transform: `translateX(${pos.x}px) translateY(${pos.y}px) scale(${pos.scale})`,
                                                                zIndex: pos.z
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                    src: "/candle.png",
                                                                    alt: "Candle",
                                                                    style: {
                                                                        ...styles.candleImage,
                                                                        filter: candlesLit[i] ? "brightness(1)" : "brightness(0.65) saturate(0.7)"
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                                                    lineNumber: 676,
                                                                    columnNumber: 27
                                                                }, this),
                                                                candlesLit[i] && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: styles.flameContainer,
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            style: styles.flameOuter
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                                                            lineNumber: 689,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            style: styles.flameInner
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                                                            lineNumber: 690,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            style: styles.flameGlow
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                                                            lineNumber: 691,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                                                    lineNumber: 688,
                                                                    columnNumber: 29
                                                                }, this),
                                                                showSmoke[i] && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: styles.smokeContainer,
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            style: styles.smoke1
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                                                            lineNumber: 697,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            style: styles.smoke2
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                                                            lineNumber: 698,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            style: styles.smoke3
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                                                            lineNumber: 699,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                                                    lineNumber: 696,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, i, true, {
                                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                                            lineNumber: 668,
                                                            columnNumber: 25
                                                        }, this);
                                                    })
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                                    lineNumber: 657,
                                                    columnNumber: 19
                                                }, this),
                                                arrowFlying && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: "/arrow.png",
                                                    alt: "Flying Arrow",
                                                    style: styles.flyingArrow
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                                    lineNumber: 707,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                            lineNumber: 656,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                    lineNumber: 624,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: styles.instructionBox,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: styles.instruction,
                                            children: arrowPull > 0.5 ? "Release to shoot!" : arrowPull > 0 ? "Pull back more..." : "Pull the arrow back to extinguish the candles"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                            lineNumber: 717,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: styles.pullMeter,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    ...styles.pullFill,
                                                    width: `${arrowPull * 100}%`,
                                                    background: arrowPull > 0.5 ? "linear-gradient(90deg, #4ade80, #22c55e)" : "linear-gradient(90deg, #fbbf24, #f59e0b)"
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/BirthdayCard.jsx",
                                                lineNumber: 725,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                            lineNumber: 724,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                    lineNumber: 716,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: styles.footerDecor,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: styles.decorDot,
                                            children: "◆"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                            lineNumber: 739,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: styles.decorLine
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                            lineNumber: 740,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: styles.decorStar,
                                            children: "★"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                            lineNumber: 741,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: styles.decorLine
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                            lineNumber: 742,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: styles.decorDot,
                                            children: "◆"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                            lineNumber: 743,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                    lineNumber: 738,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/BirthdayCard.jsx",
                            lineNumber: 616,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/BirthdayCard.jsx",
                    lineNumber: 493,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/BirthdayCard.jsx",
                lineNumber: 492,
                columnNumber: 9
            }, this),
            cardOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card-inner-responsive",
                style: styles.cardInner,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "card-left-responsive",
                        style: styles.cardLeft,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: styles.photoGallery,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                    children: photos.map((src, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: styles.photoSlide,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: styles.polaroid,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: styles.polaroidTape
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/BirthdayCard.jsx",
                                                        lineNumber: 770,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: styles.polaroidImage,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                            src: src,
                                                            alt: captions[i],
                                                            style: styles.photo
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                                            lineNumber: 772,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/BirthdayCard.jsx",
                                                        lineNumber: 771,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: styles.polaroidCaption,
                                                        children: captions[i]
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/BirthdayCard.jsx",
                                                        lineNumber: 774,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/components/BirthdayCard.jsx",
                                                lineNumber: 769,
                                                columnNumber: 21
                                            }, this)
                                        }, i, false, {
                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                            lineNumber: 768,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                    lineNumber: 754,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: styles.photoDots,
                                    children: photos.map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setCurrentPhotoIndex(i),
                                            style: {
                                                ...styles.photoDot,
                                                background: i === currentPhotoIndex ? "#fff" : "rgba(255,255,255,0.3)",
                                                transform: i === currentPhotoIndex ? "scale(1.3)" : "scale(1)"
                                            }
                                        }, i, false, {
                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                            lineNumber: 782,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                    lineNumber: 780,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: styles.swipeHint,
                                    children: "← Swipe to see more →"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                    lineNumber: 798,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/BirthdayCard.jsx",
                            lineNumber: 753,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/BirthdayCard.jsx",
                        lineNumber: 752,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "card-right-responsive",
                        style: styles.cardRight,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: styles.audioControlsFloating,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handlePlayAudio,
                                        style: styles.playBtn,
                                        children: isPlaying ? "⏸" : "▶"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/BirthdayCard.jsx",
                                        lineNumber: 804,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleReplay,
                                        style: styles.replayBtn,
                                        children: "↺"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/BirthdayCard.jsx",
                                        lineNumber: 807,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/BirthdayCard.jsx",
                                lineNumber: 803,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: styles.ornateContainer,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$CardInsideOrnate$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    name: toName,
                                    lineProgress: lineProgress,
                                    emphasisWords: EMPHASIS_WORDS
                                }, void 0, false, {
                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                    lineNumber: 812,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/BirthdayCard.jsx",
                                lineNumber: 811,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/BirthdayCard.jsx",
                        lineNumber: 802,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/BirthdayCard.jsx",
                lineNumber: 751,
                columnNumber: 9
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
                lineNumber: 818,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/BirthdayCard.jsx",
        lineNumber: 488,
        columnNumber: 5
    }, this);
}
_s(BirthdayCard, "yNjxLMnFUSS31V7j5FYCChdnlCg=");
_c = BirthdayCard;
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
        gridTemplateColumns: "280px 1fr",
        minHeight: 700,
        width: "100%",
        maxWidth: 1200,
        background: "linear-gradient(145deg, #1a1520 0%, #0f0a15 100%)",
        borderRadius: 24,
        boxShadow: "0 25px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.1)",
        animation: "fadeIn 0.8s ease-out",
        position: "relative"
    },
    cardLeft: {
        padding: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, rgba(30,20,40,0.9) 0%, rgba(15,10,25,0.95) 100%)",
        borderRight: "1px solid rgba(255,255,255,0.1)",
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
        fontFamily: '"Great Vibes", cursive',
        fontSize: 20,
        color: "#3d2b1f"
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
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        background: "transparent",
        position: "relative",
        flex: 1.5
    },
    ornateContainer: {
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden"
    },
    audioControlsFloating: {
        position: "absolute",
        top: 15,
        right: 15,
        display: "flex",
        gap: 8,
        zIndex: 10
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
        fontFamily: '"Great Vibes", cursive',
        fontSize: 34,
        fontWeight: 400,
        color: "#2d1810",
        letterSpacing: 1.5,
        textShadow: "1px 1px 2px rgba(201,165,90,0.35)"
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
var _c;
__turbopack_context__.k.register(_c, "BirthdayCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_components_6d8d6aa3._.js.map