# 046 — Code-Practice Review (grill-me)

Scope: coding practice, architecture, maintainability, test quality ONLY.
Facts: `src/main.ts` = 3315 lines, 58 `addEventListener`s; `src/render/scene.ts` = 2314 lines; src ≈ 12.4k LOC; 47 test files / ~545 `it()` blocks; dist = 1.2 MB index JS + 104 KB chunk, no meaningful code-splitting; TS 5.5 strict, Vite 5, three 0.168; CI present.

## GRADE: 62/100 (prod-readiness, code-practice)

Solid sim/data core; the app shell is a liability.

## 1. Architecture — 6/10

The sim/data/render split is real and enforced (pure TS, documented invariants). But the "app layer" is a 3315-line god file: 58 event listeners, UI wiring, camera tours, label occlusion, share/screenshot, i18n, SW registration all in one module with module-level mutable globals (`built`, `skyTour`, `selectedConstellation`). No state container, no dependency injection into main — everything is reachable from anywhere, so nothing is independently testable. scene.ts (2314 lines) is the same disease in render.

## 2. Test quality — 7/10

~545 `it()` blocks across 47 files is genuinely good coverage of the pure sim/data layer, and ground-truth pinning against JPL Horizons DE441 is a real strength. The weakness: almost everything tests pure functions. The 3315-line main.ts, the render pipeline, event wiring, and WebGL paths are essentially untested — the 11 E2E tests are the only coverage of the actual app, and E2E is brittle/slow. You have a large, untested, high-churn surface.

## 3. Error handling & resource leaks — 5/10

WebGL context loss is handled (overlay + skip-frame + resume) — good. But: 58 `addEventListener`s in one file with no visible central teardown means leak risk on scene rebuilds; `rebuildScene` is called (URL restore) and every listener/mesh/texture must be disposed or you accumulate GPU memory and duplicate handlers. No systematic `dispose()` audit, no try/catch around texture decode / TLE fetch / i18n init. `as HTMLCanvasElement` casts on `getElementById` will throw at runtime, not compile time, if markup drifts.

## 4. Type safety — 7/10

TS 5.5 strict is on and `tsc --noEmit` gates the build — good. But the app layer leans on `as HTMLCanvasElement` / `as HTMLInputElement` casts for every DOM node, which defeats the point of strict mode at the exact boundary (markup) that drifts most. Module-level `let built: BuiltScene` assigned inside a `window.load` callback means the rest of the file operates on a possibly-uninitialized global; a `built!` non-null-assertion pattern hides ordering bugs. Pure layers are well-typed; the shell is cast-heavy.

## 5. Bundle & performance hygiene — 5/10

1.2 MB index JS + 104 KB chunk, no route/feature splitting. three.js is the floor, but the whole app (i18n, exo systems, telemetry, events, all render modules) ships eagerly in one file. No dynamic `import()` for heavy optional paths (exoplanet scene, post-processing, real textures). No bundle-size budget in CI, so it will silently grow. For a PWA that precaches everything, a 1.3 MB payload on first install is a real mobile cost.

## 6. Concurrency & async — 6/10

Async work (TLE fetch, texture HEAD probes, i18n load) is injectable and tested where pure, which is good. But there's no visible cancellation: if `rebuildScene` or a fast URL restore fires mid-fetch, stale responses can race into a new scene. No request dedup/abort (AbortController) around fetches. The frame loop mixes sim, throttled highlight recomputation (string-keyed cache on camera position — a per-frame `toFixed` string concat is a hot-path smell), and GPU work in one closure.

## 7. Code organization & naming — 6/10

File names are descriptive and the render/ modules are mostly single-responsibility (lensMath, visibleScale, beltLod). But scene.ts is a 2314-line grab-bag (bodies + constellations + orbit lines + moons + ISS) that should be 4–5 modules. main.ts mixes 6+ concerns. Magic numbers are documented (good: `HIGHLIGHT_INTERVAL_MS`, `SKY_TOUR_YAW`) but many thresholds live inline. No barrel/index discipline; main.ts imports 20+ symbols from scene.ts directly, coupling the shell to every render detail.

## 8. Tooling & process — 7/10

CI (ci.yml), ESLint flat config, Prettier, strict tsc, vitest — the guardrails exist and are documented in AGENTS.md, which is above average. Gaps: no coverage threshold, no bundle budget, no visual-regression or render-path tests, no documented dispose/teardown contract, and the "one data table" invariant is only enforced by convention/review, not a lint rule.

## Top-10 prioritized improvements

1. **Split main.ts into feature modules** (ui-controls, camera-tour, labels, share, i18n-wiring, lifecycle) behind a small app-state object. Why: 3315-line god file is the #1 maintainability + testability risk. Effort: L.
2. **Add a central teardown/dispose contract** — every `addEventListener` registered via a helper that records it; `rebuildScene` disposes meshes/textures/listeners. Why: leak + duplicate-handler risk on rebuild. Effort: M.
3. **Split scene.ts** into bodies/constellations/orbits/moons modules. Why: 2314-line grab-bag, 20+ symbols imported by main. Effort: L.
4. **Dynamic-import heavy optional paths** (exo scene, post-processing, real textures) + add a CI bundle-size budget. Why: 1.2 MB eager bundle, PWA precache cost. Effort: M.
5. **Replace `as HTMLElement` casts** with a typed `querySelector` helper that throws a typed error; guard `built` init with an explicit ready-state. Why: strict mode defeated at the DOM boundary. Effort: S.
6. **Add AbortController + rebuild-token** to all fetches (TLE, textures, i18n). Why: stale-response races on fast URL restore. Effort: S.
7. **Extract the frame loop** into a testable scheduler; move the per-frame `toFixed` string-key cache to a numeric hash. Why: hot-path allocation + untestable loop. Effort: M.
8. **Introduce a minimal app-state store** (single source for followId/scale/toggles/selected) instead of module globals. Why: enables unit-testing the shell and kills hidden coupling. Effort: M.
9. **Add render-path/visual-regression tests** (headless WebGL or Playwright screenshot diff) + a coverage threshold in CI. Why: the high-churn shell is effectively untested. Effort: M.
10. **Enforce the "pure sim/data" invariant with a lint rule** (no `three`/DOM imports in src/sim, src/data). Why: currently convention-only; will rot. Effort: S.
