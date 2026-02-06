module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/app/components/ArcheryGame.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ArcheryGame
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
"use client";
;
;
;
function ArcheryGame({ onComplete, candleCount = 7, height = 420, showToggles = true, defaultHaptics = false, defaultSound = false }) {
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const rafRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(0);
    const audioCtxRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [shots, setShots] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [done, setDone] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [hint, setHint] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("Drag to aim. Release to shoot.");
    const [hapticsOn, setHapticsOn] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(defaultHaptics);
    const [soundOn, setSoundOn] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(defaultSound);
    const hapticsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(defaultHaptics);
    const soundRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(defaultSound);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        hapticsRef.current = hapticsOn;
    }, [
        hapticsOn
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        soundRef.current = soundOn;
    }, [
        soundOn
    ]);
    const startTimeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(0);
    const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            gravity: 1600,
            maxPower: 1200,
            minPower: 420,
            windMax: 90,
            trailDots: 26,
            candleW: 16,
            candleH: 54,
            arrowW: 34,
            arrowH: 6,
            // Palette (matching BirthdayCard-ish)
            ink: "rgba(190, 240, 255, 0.95)",
            inkSoft: "rgba(190, 240, 255, 0.35)",
            amber: "rgba(255, 210, 122, 0.95)",
            amberSoft: "rgba(255, 210, 122, 0.35)",
            paperLine: "rgba(255,255,255,0.10)",
            bgTop: "rgba(255,255,255,0.06)",
            bgBot: "rgba(255,255,255,0.03)"
        }), []);
    const vibrate = (pattern)=>{
        if (!hapticsRef.current) return;
        if (typeof navigator === "undefined") return;
        if (typeof navigator.vibrate !== "function") return;
        try {
            navigator.vibrate(pattern);
        } catch  {
        // ignore
        }
    };
    const ensureAudioCtx = async ()=>{
        if (!soundRef.current) return null;
        if ("TURBOPACK compile-time truthy", 1) return null;
        //TURBOPACK unreachable
        ;
        const AC = undefined;
    };
    const blip = async ({ freq = 520, dur = 0.06, type = "sine", gain = 0.05 } = {})=>{
        if (!soundRef.current) return;
        const ctx = await ensureAudioCtx();
        if (!ctx) return;
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = type;
        o.frequency.value = freq;
        g.gain.value = 0;
        g.gain.linearRampToValueAtTime(gain, ctx.currentTime + 0.005);
        g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
        o.connect(g);
        g.connect(ctx.destination);
        o.start();
        o.stop(ctx.currentTime + dur + 0.02);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d", {
            alpha: true
        });
        // HiDPI setup
        const dpr = Math.max(1, window.devicePixelRatio || 1);
        const resize = ()=>{
            const cssW = canvas.clientWidth;
            const cssH = canvas.clientHeight;
            canvas.width = Math.floor(cssW * dpr);
            canvas.height = Math.floor(cssH * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };
        resize();
        window.addEventListener("resize", resize);
        const state = {
            aiming: false,
            origin: {
                x: 78,
                y: height - 78
            },
            aimNow: {
                x: 120,
                y: height - 120
            },
            arrows: [],
            sparks: [],
            lastTs: performance.now(),
            wind: (Math.random() * 2 - 1) * config.windMax,
            candles: [],
            w: canvas.clientWidth,
            h: canvas.clientHeight,
            completed: false
        };
        const rand = (a, b)=>a + Math.random() * (b - a);
        const resetCandles = ()=>{
            const w = canvas.clientWidth;
            const h = canvas.clientHeight;
            // Place candles on a cake-ish baseline
            const cakeY = Math.max(140, Math.min(h * 0.55, h - 160));
            const startX = Math.max(w * 0.46, w - (candleCount * 36 + 60));
            state.candles = Array.from({
                length: candleCount
            }).map((_, i)=>({
                    x: startX + i * 36 + rand(-3, 3),
                    y: cakeY + rand(-6, 6),
                    w: config.candleW,
                    h: config.candleH,
                    lit: true,
                    flicker: rand(0, 20),
                    wiggle: 0
                }));
        };
        resetCandles();
        // Helpers
        const clamp01 = (x)=>Math.max(0, Math.min(1, x));
        const rectsIntersect = (a, b)=>a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
        const spawnSparks = (x, y)=>{
            for(let i = 0; i < 22; i++){
                state.sparks.push({
                    x,
                    y,
                    vx: (Math.random() - 0.5) * 480,
                    vy: (Math.random() - 0.9) * 520,
                    life: 0.55 + Math.random() * 0.25,
                    size: rand(1, 2.2)
                });
            }
        };
        const shoot = async ()=>{
            const dx = state.origin.x - state.aimNow.x;
            const dy = state.origin.y - state.aimNow.y;
            let dist = Math.hypot(dx, dy) * 7.2;
            dist = Math.max(config.minPower, Math.min(config.maxPower, dist));
            const angle = Math.atan2(dy, dx);
            state.arrows.push({
                x: state.origin.x,
                y: state.origin.y,
                w: config.arrowW,
                h: config.arrowH,
                vx: Math.cos(angle) * dist,
                vy: Math.sin(angle) * dist,
                rot: angle,
                alive: true
            });
            setShots((s)=>s + 1);
            setHint("Again. Steady.");
            vibrate(12);
            await blip({
                freq: 420,
                dur: 0.05,
                type: "triangle",
                gain: 0.04
            });
        };
        const onDown = async (e)=>{
            if (state.completed) return;
            // ensure audio context can start from gesture
            await ensureAudioCtx();
            state.aiming = true;
            const r = canvas.getBoundingClientRect();
            state.aimNow = {
                x: e.clientX - r.left,
                y: e.clientY - r.top
            };
            vibrate(8);
        };
        const onMove = (e)=>{
            if (!state.aiming) return;
            const r = canvas.getBoundingClientRect();
            state.aimNow = {
                x: e.clientX - r.left,
                y: e.clientY - r.top
            };
        };
        const onUp = async ()=>{
            if (!state.aiming) return;
            state.aiming = false;
            await shoot();
        };
        canvas.addEventListener("pointerdown", onDown);
        canvas.addEventListener("pointermove", onMove);
        canvas.addEventListener("pointerup", onUp);
        canvas.addEventListener("pointercancel", onUp);
        // Update loop
        const update = async (dt, w, h)=>{
            // arrows
            for (const a of state.arrows){
                if (!a.alive) continue;
                // wind influences vx slightly
                a.vx += state.wind * dt;
                a.vy += config.gravity * dt;
                a.x += a.vx * dt;
                a.y += a.vy * dt;
                a.rot = Math.atan2(a.vy, a.vx);
                // kill if out of bounds
                if (a.x > w + 120 || a.y > h + 120 || a.y < -180) a.alive = false;
                // collisions
                const arrowBox = {
                    x: a.x,
                    y: a.y,
                    w: a.w,
                    h: a.h
                };
                for (const c of state.candles){
                    if (!c.lit) continue;
                    const candleBox = {
                        x: c.x,
                        y: c.y,
                        w: c.w,
                        h: c.h
                    };
                    if (rectsIntersect(arrowBox, candleBox)) {
                        c.lit = false;
                        c.wiggle = 1;
                        a.alive = false;
                        spawnSparks(c.x + c.w / 2, c.y);
                        vibrate([
                            20,
                            20,
                            10
                        ]);
                        await blip({
                            freq: 820,
                            dur: 0.06,
                            type: "sine",
                            gain: 0.06
                        });
                    }
                }
            }
            // sparks
            state.sparks = state.sparks.filter((p)=>p.life > 0);
            for (const p of state.sparks){
                p.vy = (p.vy ?? 0) + config.gravity * 0.35 * dt;
                p.x += p.vx * dt;
                p.y += p.vy * dt;
                p.life -= dt;
            }
            // candle wiggle decay + flicker
            for (const c of state.candles){
                if (c.wiggle > 0) c.wiggle = Math.max(0, c.wiggle - dt * 3);
                c.flicker += dt * 18;
            }
            // completion
            if (!state.completed && state.candles.every((c)=>!c.lit)) {
                state.completed = true;
                setDone(true);
                setHint("Perfect. Unlocked.");
                vibrate([
                    30,
                    30,
                    30
                ]);
                await blip({
                    freq: 980,
                    dur: 0.08,
                    type: "triangle",
                    gain: 0.06
                });
                if (typeof onComplete === "function") {
                    const timeMs = Math.max(0, performance.now() - startTimeRef.current);
                    onComplete({
                        shots: shots + 1,
                        timeMs
                    });
                }
            }
        };
        const drawBackground = (w, h)=>{
            // Dark base
            ctx.clearRect(0, 0, w, h);
            // Soft paper gradient (matches BirthdayCard feel)
            const g = ctx.createLinearGradient(0, 0, 0, h);
            g.addColorStop(0, "rgba(15,18,22,1)");
            g.addColorStop(1, "rgba(7,9,12,1)");
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, w, h);
            // Warm + cool glows (like your poem panel)
            const glow1 = ctx.createRadialGradient(w * 0.55, h * 0.18, 10, w * 0.55, h * 0.18, w * 0.9);
            glow1.addColorStop(0, "rgba(255,210,122,0.10)");
            glow1.addColorStop(1, "rgba(255,210,122,0)");
            ctx.fillStyle = glow1;
            ctx.fillRect(0, 0, w, h);
            const glow2 = ctx.createRadialGradient(w * 0.18, h * 0.78, 10, w * 0.18, h * 0.78, w * 0.85);
            glow2.addColorStop(0, "rgba(190,240,255,0.10)");
            glow2.addColorStop(1, "rgba(190,240,255,0)");
            ctx.fillStyle = glow2;
            ctx.fillRect(0, 0, w, h);
            // Subtle grain (cheap, effective)
            ctx.globalAlpha = 0.14;
            for(let i = 0; i < 220; i++){
                const x = Math.random() * w;
                const y = Math.random() * h;
                const r = Math.random() * 1.6;
                ctx.fillStyle = Math.random() > 0.5 ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.10)";
                ctx.fillRect(x, y, r, r);
            }
            ctx.globalAlpha = 1;
        };
        const draw = (w, h)=>{
            drawBackground(w, h);
            // “Cake” platform line
            ctx.strokeStyle = config.paperLine;
            ctx.lineWidth = 1;
            ctx.beginPath();
            const cakeY = state.candles.length ? state.candles[0].y + state.candles[0].h + 16 : h * 0.62;
            ctx.moveTo(w * 0.36, cakeY);
            ctx.lineTo(w - 24, cakeY);
            ctx.stroke();
            // Wind indicator
            ctx.font = "12px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
            ctx.fillStyle = "rgba(255,255,255,0.65)";
            const windDir = state.wind >= 0 ? "→" : "←";
            ctx.fillText(`wind ${windDir}`, w - 74, 22);
            // Candles + flames
            for (const c of state.candles){
                const wiggleX = Math.sin((1 - c.wiggle) * 18) * 5 * c.wiggle;
                // candle body (ink outline + warm fill)
                ctx.fillStyle = "rgba(255,255,255,0.06)";
                ctx.fillRect(c.x + wiggleX, c.y, c.w, c.h);
                ctx.strokeStyle = "rgba(255,255,255,0.10)";
                ctx.strokeRect(c.x + wiggleX, c.y, c.w, c.h);
                if (c.lit) {
                    const fx = c.x + c.w / 2 + wiggleX + Math.sin(c.flicker) * 1.8;
                    const fy = c.y - 10 + Math.cos(c.flicker * 0.7) * 1.2;
                    // flame glow
                    const fg = ctx.createRadialGradient(fx, fy, 2, fx, fy, 16);
                    fg.addColorStop(0, "rgba(255,210,122,0.55)");
                    fg.addColorStop(1, "rgba(255,210,122,0)");
                    ctx.fillStyle = fg;
                    ctx.beginPath();
                    ctx.arc(fx, fy, 16, 0, Math.PI * 2);
                    ctx.fill();
                    // flame core
                    ctx.fillStyle = config.amber;
                    ctx.beginPath();
                    ctx.ellipse(fx, fy, 5.5, 10, 0, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
            // Trajectory preview while aiming
            if (state.aiming && !state.completed) {
                const dx = state.origin.x - state.aimNow.x;
                const dy = state.origin.y - state.aimNow.y;
                let dist = Math.hypot(dx, dy) * 7.2;
                dist = Math.max(config.minPower, Math.min(config.maxPower, dist));
                const angle = Math.atan2(dy, dx);
                let x = state.origin.x;
                let y = state.origin.y;
                let vx = Math.cos(angle) * dist;
                let vy = Math.sin(angle) * dist;
                ctx.fillStyle = config.inkSoft;
                for(let i = 0; i < config.trailDots; i++){
                    const dt = 0.016;
                    vx += state.wind * dt;
                    vy += config.gravity * dt;
                    x += vx * dt;
                    y += vy * dt;
                    ctx.fillRect(x, y, 2, 2);
                }
            }
            // Bow (simple ink arc)
            ctx.strokeStyle = config.inkSoft;
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(state.origin.x - 10, state.origin.y + 8, 42, -0.8, 0.8);
            ctx.stroke();
            // Arrows
            for (const a of state.arrows){
                if (!a.alive) continue;
                ctx.save();
                ctx.translate(a.x, a.y);
                ctx.rotate(a.rot);
                ctx.fillStyle = config.ink;
                ctx.fillRect(0, 0, a.w, a.h);
                // tiny arrowhead
                ctx.beginPath();
                ctx.moveTo(a.w, a.h / 2);
                ctx.lineTo(a.w + 8, -3);
                ctx.lineTo(a.w + 8, a.h + 3);
                ctx.closePath();
                ctx.fill();
                ctx.restore();
            }
            // Sparks
            for (const p of state.sparks){
                ctx.globalAlpha = Math.max(0, p.life);
                ctx.fillStyle = config.amber;
                ctx.fillRect(p.x, p.y, p.size, p.size);
                ctx.globalAlpha = 1;
            }
            // HUD (shots + hint)
            ctx.fillStyle = "rgba(255,255,255,0.70)";
            ctx.fillText(`shots ${shots}`, 14, 22);
            ctx.fillStyle = "rgba(255,255,255,0.75)";
            ctx.fillText(hint, 14, h - 14);
        };
        const loop = async (ts)=>{
            const dt = Math.min(0.033, (ts - state.lastTs) / 1000);
            state.lastTs = ts;
            state.w = canvas.clientWidth;
            state.h = canvas.clientHeight;
            if (!startTimeRef.current) startTimeRef.current = performance.now();
            if (!state.completed) {
                // update is async because of sound; keep it lightweight
                await update(dt, state.w, state.h);
            }
            draw(state.w, state.h);
            rafRef.current = requestAnimationFrame(loop);
        };
        rafRef.current = requestAnimationFrame(loop);
        return ()=>{
            window.removeEventListener("resize", resize);
            canvas.removeEventListener("pointerdown", onDown);
            canvas.removeEventListener("pointermove", onMove);
            canvas.removeEventListener("pointerup", onUp);
            canvas.removeEventListener("pointercancel", onUp);
            cancelAnimationFrame(rafRef.current);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        candleCount,
        height,
        config
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            width: "100%",
            position: "relative"
        },
        children: [
            showToggles && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: toggles,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>setHapticsOn((v)=>!v),
                        style: {
                            ...toggleBtn,
                            ...hapticsOn ? toggleOn : {}
                        },
                        children: [
                            "Haptics ",
                            hapticsOn ? "On" : "Off"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/ArcheryGame.jsx",
                        lineNumber: 503,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>setSoundOn((v)=>!v),
                        style: {
                            ...toggleBtn,
                            ...soundOn ? toggleOn : {}
                        },
                        children: [
                            "Sound ",
                            soundOn ? "On" : "Off"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/ArcheryGame.jsx",
                        lineNumber: 510,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/ArcheryGame.jsx",
                lineNumber: 502,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                ref: canvasRef,
                style: {
                    width: "100%",
                    height,
                    borderRadius: 18,
                    border: "1px solid rgba(255,255,255,.10)",
                    boxShadow: "0 18px 40px rgba(0,0,0,.40)",
                    touchAction: "none"
                }
            }, void 0, false, {
                fileName: "[project]/app/components/ArcheryGame.jsx",
                lineNumber: 520,
                columnNumber: 7
            }, this),
            done && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: doneBadge,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontWeight: 900
                        },
                        children: "Unlocked"
                    }, void 0, false, {
                        fileName: "[project]/app/components/ArcheryGame.jsx",
                        lineNumber: 534,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: 12,
                            opacity: 0.8
                        },
                        children: "Proceed to your reward."
                    }, void 0, false, {
                        fileName: "[project]/app/components/ArcheryGame.jsx",
                        lineNumber: 535,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/ArcheryGame.jsx",
                lineNumber: 533,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/ArcheryGame.jsx",
        lineNumber: 500,
        columnNumber: 5
    }, this);
}
const toggles = {
    position: "absolute",
    zIndex: 5,
    top: 10,
    left: 10,
    display: "flex",
    gap: 8
};
const toggleBtn = {
    borderRadius: 999,
    border: "1px solid rgba(255,255,255,.14)",
    background: "rgba(255,255,255,.06)",
    color: "rgba(255,255,255,.85)",
    fontSize: 12,
    padding: "8px 10px",
    backdropFilter: "blur(10px)"
};
const toggleOn = {
    border: "1px solid rgba(255,210,122,.35)",
    background: "rgba(255,210,122,.10)",
    color: "rgba(255,210,122,.95)"
};
const doneBadge = {
    position: "absolute",
    left: 14,
    bottom: 14,
    padding: "10px 12px",
    borderRadius: 14,
    border: "1px solid rgba(255,210,122,.20)",
    background: "rgba(0,0,0,.45)",
    color: "rgba(255,210,122,.95)",
    backdropFilter: "blur(10px)"
};
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
    const pressureGamma = 0.72; // <1 broadens the thick region
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
        return startY - 10 + i * lineGap;
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
        const x1 = startX + w;
        // Per-line pressure personality
        const rand = hash01(lineIndex + 1);
        const line = POEM_LINES[lineIndex] ?? "";
        const punctuationBoost = /[—–,.;:!?]$/.test(line.trim()) ? 1.06 : 1.0;
        const lengthBoost = clamp(0.92 + line.trim().length / 45 * 0.18, 0.92, 1.12);
        const personality = (0.94 + rand * 0.12) * punctuationBoost * lengthBoost;
        // Pressure curve (thickness): thin -> thick -> thin,
        // with a slightly late peak to feel like a flourish.
        const shifted = clamp(pE + peakShift, 0, 1);
        const bell = Math.sin(Math.PI * shifted);
        const broadBell = Math.pow(Math.max(0, bell), pressureGamma); // broaden mid region
        const t = (strokeMin + (strokeMax - strokeMin) * broadBell) * personality;
        // Taper ends a bit more (gives a nib-like lift)
        const taper = 0.85 + 0.15 * Math.sin(Math.PI * pE);
        const thickness = t * taper;
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
                const px = startX + maxRevealW * pE + 10;
                const py = startY + activeIndex * lineGap + nibWobble;
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
                                    lineNumber: 425,
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
                                    lineNumber: 428,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/BirthdayCard.jsx",
                            lineNumber: 424,
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
                                    lineNumber: 434,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleReplay,
                                    style: btnStyle(),
                                    "aria-label": "Replay",
                                    children: "↺ Replay"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                    lineNumber: 441,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/BirthdayCard.jsx",
                            lineNumber: 433,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/BirthdayCard.jsx",
                    lineNumber: 412,
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
                                                lineNumber: 483,
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
                                                lineNumber: 484,
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
                                                        lineNumber: 486,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "♡"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/BirthdayCard.jsx",
                                                        lineNumber: 487,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/components/BirthdayCard.jsx",
                                                lineNumber: 485,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, src + i, true, {
                                        fileName: "[project]/app/components/BirthdayCard.jsx",
                                        lineNumber: 468,
                                        columnNumber: 19
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/app/components/BirthdayCard.jsx",
                                lineNumber: 461,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/components/BirthdayCard.jsx",
                            lineNumber: 450,
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
                                            opacity: 0.18,
                                            backgroundImage: "radial-gradient(circle at 20% 30%, rgba(255,255,255,.35) 0 1px, transparent 2px)," + "radial-gradient(circle at 70% 60%, rgba(255,255,255,.28) 0 1px, transparent 2px)," + "radial-gradient(circle at 40% 80%, rgba(255,255,255,.22) 0 1px, transparent 2px)",
                                            backgroundSize: "120px 120px",
                                            mixBlendMode: "overlay"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/BirthdayCard.jsx",
                                        lineNumber: 511,
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
                                                lineNumber: 527,
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
                                                lineNumber: 528,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/BirthdayCard.jsx",
                                        lineNumber: 526,
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
                                        lineNumber: 531,
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
                                                                    lineNumber: 544,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                                    id: "maskGroup"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                                                    lineNumber: 545,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                                            lineNumber: 543,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("filter", {
                                                            id: "inkBleed",
                                                            x: "-20%",
                                                            y: "-20%",
                                                            width: "140%",
                                                            height: "140%",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feGaussianBlur", {
                                                                    in: "SourceGraphic",
                                                                    stdDeviation: "0.95",
                                                                    result: "blur"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                                                    lineNumber: 550,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feColorMatrix", {
                                                                    in: "blur",
                                                                    type: "matrix",
                                                                    values: " 1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.45 0",
                                                                    result: "bleed"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                                                    lineNumber: 551,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feMerge", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feMergeNode", {
                                                                            in: "bleed"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                                                            lineNumber: 562,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feMergeNode", {
                                                                            in: "SourceGraphic"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                                                            lineNumber: 563,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                                                    lineNumber: 561,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                                            lineNumber: 549,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                                    lineNumber: 542,
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
                                                            lineNumber: 581,
                                                            columnNumber: 23
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                                    lineNumber: 569,
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
                                                            lineNumber: 600,
                                                            columnNumber: 23
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/BirthdayCard.jsx",
                                                    lineNumber: 588,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/BirthdayCard.jsx",
                                            lineNumber: 541,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/BirthdayCard.jsx",
                                        lineNumber: 540,
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
                                            lineNumber: 623,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/BirthdayCard.jsx",
                                        lineNumber: 609,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("audio", {
                                        ref: audioRef,
                                        src: audioUrl,
                                        preload: "metadata"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/BirthdayCard.jsx",
                                        lineNumber: 627,
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
                                            lineNumber: 645,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/BirthdayCard.jsx",
                                        lineNumber: 631,
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
                                                lineNumber: 660,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    "Audio: ",
                                                    audioUrl
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/components/BirthdayCard.jsx",
                                                lineNumber: 669,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/BirthdayCard.jsx",
                                        lineNumber: 659,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/BirthdayCard.jsx",
                                lineNumber: 497,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/components/BirthdayCard.jsx",
                            lineNumber: 496,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/BirthdayCard.jsx",
                    lineNumber: 448,
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
                    lineNumber: 676,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/components/BirthdayCard.jsx",
            lineNumber: 399,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/BirthdayCard.jsx",
        lineNumber: 398,
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
"[project]/app/page.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Page
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ArcheryGame$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/ArcheryGame.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$BirthdayCard$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/BirthdayCard.jsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function Page() {
    const [step, setStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("archery"); // "archery" | "earned" | "poem"
    const [result, setResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        shots: null,
        timeMs: null
    });
    const earnedCopy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        // Light “earned” framing: performance -> praise -> permission -> poem
        return {
            title: "You earned what comes next.",
            stats: [
                [
                    "Strength",
                    "▲"
                ],
                [
                    "Discipline",
                    "▲"
                ],
                [
                    "Focus",
                    "▲"
                ],
                [
                    "Good boy energy",
                    "MAXED"
                ]
            ],
            agentLines: [
                "BirthdayAgent v1.0",
                "Status: ONLINE",
                "",
                "✓ Candles extinguished",
                "✓ Form verified",
                "✓ Reward authorized"
            ]
        };
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: shell,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: chrome,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: brand,
                        children: "LUKE MODE"
                    }, void 0, false, {
                        fileName: "[project]/app/page.jsx",
                        lineNumber: 35,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: sub,
                        children: "Mobile-first birthday quest"
                    }, void 0, false, {
                        fileName: "[project]/app/page.jsx",
                        lineNumber: 36,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.jsx",
                lineNumber: 34,
                columnNumber: 7
            }, this),
            step === "archery" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width: "100%"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: headerBlock,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: kicker,
                                children: "Step 1"
                            }, void 0, false, {
                                fileName: "[project]/app/page.jsx",
                                lineNumber: 42,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                style: h1,
                                children: "Extinguish the candles."
                            }, void 0, false, {
                                fileName: "[project]/app/page.jsx",
                                lineNumber: 43,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: p,
                                children: "Drag to aim. Release to shoot. Precision first."
                            }, void 0, false, {
                                fileName: "[project]/app/page.jsx",
                                lineNumber: 44,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.jsx",
                        lineNumber: 41,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ArcheryGame$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        candleCount: 7,
                        height: 420,
                        onComplete: ({ shots, timeMs })=>{
                            setResult({
                                shots,
                                timeMs
                            });
                            setStep("earned");
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/page.jsx",
                        lineNumber: 49,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.jsx",
                lineNumber: 40,
                columnNumber: 9
            }, this),
            step === "earned" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: earnedWrap,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: card,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: kicker,
                            children: "Unlocked"
                        }, void 0, false, {
                            fileName: "[project]/app/page.jsx",
                            lineNumber: 63,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            style: {
                                ...h1,
                                marginTop: 6
                            },
                            children: earnedCopy.title
                        }, void 0, false, {
                            fileName: "[project]/app/page.jsx",
                            lineNumber: 64,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: statGrid,
                            children: earnedCopy.stats.map(([k, v])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: statItem,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: statKey,
                                            children: k
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.jsx",
                                            lineNumber: 69,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: statVal,
                                            children: v
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.jsx",
                                            lineNumber: 70,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, k, true, {
                                    fileName: "[project]/app/page.jsx",
                                    lineNumber: 68,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/page.jsx",
                            lineNumber: 66,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: tinyRow,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: pill,
                                    children: [
                                        "Shots: ",
                                        result.shots ?? "—"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.jsx",
                                    lineNumber: 76,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: pill,
                                    children: [
                                        "Time:",
                                        " ",
                                        result.timeMs == null ? "—" : `${Math.round(result.timeMs / 1000)}s`
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.jsx",
                                    lineNumber: 77,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.jsx",
                            lineNumber: 75,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: terminal,
                            children: earnedCopy.agentLines.map((ln, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        whiteSpace: "pre-wrap"
                                    },
                                    children: ln
                                }, i, false, {
                                    fileName: "[project]/app/page.jsx",
                                    lineNumber: 85,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/page.jsx",
                            lineNumber: 83,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            style: primaryBtn,
                            onClick: ()=>setStep("poem"),
                            children: "Continue"
                        }, void 0, false, {
                            fileName: "[project]/app/page.jsx",
                            lineNumber: 91,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: finePrint,
                            children: "Tip: tap play if your phone blocks auto-audio."
                        }, void 0, false, {
                            fileName: "[project]/app/page.jsx",
                            lineNumber: 95,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.jsx",
                    lineNumber: 62,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.jsx",
                lineNumber: 61,
                columnNumber: 9
            }, this),
            step === "poem" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width: "100%"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$BirthdayCard$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    toName: "Luke",
                    photos: [
                        "/photo1.jpg",
                        "/photo2.jpg",
                        "/photo3.jpg"
                    ],
                    fontUrl: "/fonts/InterSignature-q20q2.ttf",
                    audioUrl: "/audio/luke-poem.mp3",
                    autoStart: true
                }, void 0, false, {
                    fileName: "[project]/app/page.jsx",
                    lineNumber: 104,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.jsx",
                lineNumber: 103,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.jsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
const shell = {
    minHeight: "100dvh",
    padding: "18px 14px 32px",
    color: "white",
    background: "radial-gradient(120% 120% at 50% 0%, rgba(255,210,122,.14), rgba(0,0,0,.92))"
};
const chrome = {
    width: "100%",
    maxWidth: 980,
    margin: "0 auto 10px",
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: 12
};
const brand = {
    fontWeight: 950,
    letterSpacing: "0.9px",
    opacity: 0.9
};
const sub = {
    opacity: 0.65,
    fontSize: 13
};
const headerBlock = {
    width: "100%",
    maxWidth: 980,
    margin: "0 auto 10px",
    padding: "10px 6px 6px"
};
const kicker = {
    fontWeight: 900,
    letterSpacing: "0.4px",
    opacity: 0.75,
    textTransform: "uppercase",
    fontSize: 12
};
const h1 = {
    margin: "8px 0 6px",
    fontSize: 28,
    lineHeight: 1.05,
    fontWeight: 950,
    letterSpacing: "-0.4px"
};
const p = {
    margin: 0,
    opacity: 0.8,
    lineHeight: 1.4
};
const earnedWrap = {
    width: "100%",
    maxWidth: 980,
    margin: "0 auto",
    display: "grid",
    placeItems: "center",
    paddingTop: 16
};
const card = {
    width: "100%",
    borderRadius: 20,
    border: "1px solid rgba(255,255,255,.14)",
    background: "rgba(0,0,0,.28)",
    boxShadow: "0 20px 70px rgba(0,0,0,.35)",
    padding: "16px 14px"
};
const statGrid = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
    marginTop: 14
};
const statItem = {
    borderRadius: 16,
    border: "1px solid rgba(255,255,255,.12)",
    background: "rgba(0,0,0,.18)",
    padding: "12px 12px"
};
const statKey = {
    opacity: 0.75,
    fontSize: 12,
    fontWeight: 850,
    letterSpacing: "0.3px",
    textTransform: "uppercase"
};
const statVal = {
    marginTop: 8,
    fontSize: 18,
    fontWeight: 950
};
const tinyRow = {
    display: "flex",
    gap: 10,
    marginTop: 12
};
const pill = {
    borderRadius: 999,
    padding: "10px 12px",
    fontWeight: 850,
    border: "1px solid rgba(255,255,255,.12)",
    background: "rgba(0,0,0,.18)"
};
const terminal = {
    marginTop: 12,
    borderRadius: 16,
    border: "1px solid rgba(255,255,255,.12)",
    background: "rgba(0,0,0,.24)",
    padding: "12px 12px",
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    fontSize: 12,
    opacity: 0.9
};
const primaryBtn = {
    marginTop: 14,
    width: "100%",
    borderRadius: 999,
    padding: "12px 14px",
    fontWeight: 950,
    border: "1px solid rgba(255,255,255,.18)",
    background: "linear-gradient(90deg, rgba(255,210,122,.25), rgba(158,231,255,.18))",
    color: "white",
    cursor: "pointer"
};
const finePrint = {
    marginTop: 10,
    fontSize: 12,
    opacity: 0.65,
    textAlign: "center"
};
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__aebd25db._.js.map