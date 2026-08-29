# 019 — Fix constellation-label DPR mismatch (labels "worse than v1")

Date: 2026-08-29 · Status: DONE · Commit: (recorded in follow-up `docs:` commit)

## Symptom

On any hi-DPI / retina display (devicePixelRatio > 1), every constellation name
label rendered **crammed into the top-left quadrant at half size**, detached
from its figure. User: "the label visualisation is even worse than the first
version, where at least they were close to the constellation."

## Root cause (confirmed in code + reproduced)

`updateConstellationScreenLabels` (`src/render/constellationScreenLabels.ts`)
sizes the 2D overlay backing store in **device pixels** (`wCss * dpr`,
`hCss * dpr`) so it is crisp on retina, but then drew every label with
`ctx.setTransform(1,0,0,1,0,0)` (identity) using **CSS-pixel** coordinates
(`s.x`, `s.y` from `selectVisibleLabels`, which runs in `wCss/hCss`). On a
dpr=2 screen the 2560×1600 device canvas was addressed as if it were 1280×800,
so all labels landed in the top-left quarter at half scale — while the WebGL
solar-system figures (correctly scaled by the renderer's pixel ratio) filled
the whole frame. The v1 3D sprites were unaffected, which is why v1 "at least
had them close".

Reproduced by forcing `devicePixelRatio=2` via CDP
`Emulation.setDeviceMetricsOverride`: before the fix the boot view showed a
tight cluster of half-size labels in the top-left; after, the same labels are
spread across the full viewport at normal size, each beside its figure
(see `/opt/data/audit/dpr1_boot.png` vs `dpr2_boot.png`).

## Fix (2 lines, non-breaking)

```ts
-ctx.setTransform(1, 0, 0, 1, 0, 0);
-ctx.clearRect(0, 0, wPx, hPx);
+ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
+ctx.clearRect(0, 0, wCss, hCss);
```

Scale the context once to device pixels: CSS-px coords now land at the correct
device-px position **and** at full size. `clearRect` uses CSS-px (×dpr via the
transform = the full device buffer). The WebGL pixel ratio and the 2D backing
store (capped dpr 2) are untouched, so crispness is preserved.

`selectVisibleLabels` is deliberately **unchanged**: its de-collision boxes and
the max-8 cap are all in CSS-pixel space and scale-invariant (a uniform scale
preserves overlaps/containments), so no new `dpr` parameter is needed — the
one-algorithm policy is preserved.

## Test plan

- Existing `tests/constellationScreenLabels.test.ts` (projectSkyDir /
  selectVisibleLabels / de-collision) — unchanged, still passes.
- Full suite green (269 tests).
- `vite build` clean; marker `setTransform(o,0,0,o,0,0)` (variable, not the
  old `setTransform(1,0,0,1,0,0)`) present in the emitted bundle.
- Live CDP reproduction at dpr=1 (control) and dpr=2 (bug) — visual confirmed
  fixed via vision analysis.

## Verification

- `npx vitest run`: 269 passed.
- `npm run build`: ✓ built; new bundle `index-Cs4nFLed.js` contains the fix.
- CDP dpr=2: labels now full-screen + normal size (before: top-left, half-size).
