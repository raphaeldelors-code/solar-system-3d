# Plan 006 — Constellation readability (constant text size, anti-overlap, focus)

User feedback (2026-08-22, sky view):

1. **Names have different sizes** — inconsistent, looks unintentional.
2. **Names of different constellations overlap** (crowded regions: Orion/Taurus/
   Auriga/Gemini winter band, etc.).
3. **Everything feels packed** — question: "make the sphere bigger?"
4. **Center emphasis weak** — constellations at camera center should stand out
   more against the background starfield, especially in sky view.

Also on the table (deferred, needs user decision): **constellation artwork**
(Star Walk 2 style — mythological figures over the stars). Route A: Bode
Uranographia (1801, public domain) crops; Route B: AI-generated set via
ComfyUI Cloud (needs user's API key). Separate plan once decided.

## Analysis

- Label size varies because sprite angular width =
  `max(0.2, halfExtent × 0.8)` (tied to the figure's span) while the glyph
  height is fixed on the 512×128 canvas. Hydra's name renders ~13× taller
  than Canis Minor's. Fix: **constant angular text height** for every name;
  sprite width then = ink fraction × (height target × 512/s).
- Overlaps: 88 constant-size names on a fixed sky will still collide in dense
  bands. Fix: **static placement solver** (the sky is static — run once at
  build). For each figure, candidates: label side +/− axis × margin ×/÷ 1.5.
  Big figures keep priority; small figures detour. Score = total angular
  overlap with neighbors. Pure function → unit-tested, plus a full-sky test:
  no two of the 88 resolved labels overlap.
- "Packed": the sphere radius is irrelevant to angular crowding — 88
  constellations always cover 4π; a bigger radius just moves the same angles
  further away (no math change, no visual gain). The real levers: constant
  (smaller) text, anti-overlap, and **peripheral labels fading out** (they
  clutter the 120° sky view) so the center stays clean.
- Center emphasis: background starfield (4000 random dots, opacity 0.8,
  1.6 px) is as bright as the figures at the view edge. Fix: dim the
  starfield (0.8→0.55, 1.6→1.3 px), widen the emphasis IN band (15°→22°),
  peak 0.95→1.0, line base 0.32→0.28, and give **labels their own, steeper
  fade**: ~0 at the periphery → 1.0 at center (lines keep a visible base).

## Changes

### src/render/textures.ts

- `layoutConstellationName` unchanged (pure canvas layout).
- No texture changes needed — canvas stays 512×128.

### src/render/scene.ts

- `CONSTELLATION_LABEL_HEIGHT_RAD = 0.019` (~1.1° angular cap height).
- `constellationLabelWidth(c)`: new formula — sprite angular width for
  constant text height: `W = inkFracInv…` precisely
  `W = (CONSTELLATION_NAME_CANVAS_W / s) × CONSTELLATION_LABEL_HEIGHT_RAD × 4`
  where s = layout font size (60 for short names → W ≈ 10.2°; long names
  shrink s → wider sprite, same glyph height).
- Label placement solver `resolveConstellationLabels()`:
  - input: `CONSTELLATIONS`, per-constellation pose (`constellationLabelPose`)
    and ink angular radius (half ink width).
  - candidates per constellation: {side: +1/−1} × {margin × 1.0 / × 1.5}.
  - greedy by descending halfExtent (big figures first, fixed); each later
    figure picks the candidate minimizing Σ overlap with already-placed
    neighbors + a 0.25× penalty on the ×1.5 margin (prefer default distance).
  - returns per-constellation {side, marginScale, labelDir (unit), inkRad}.
  - Used by `buildConstellations` instead of the current
    `pose.labelDir(constellationLabelMargin(c))`.
- `updateConstellationHighlight`: labels get
  `opacity = presence × labelCurve(emph)` where
  `labelCurve(e) = 0.06 + 0.94 × e^0.75` (≈0 at the periphery, 1 at center);
  lines keep `base 0.28 + (1.0 − 0.28) × emph`.
  New exported constants: `CONSTELLATION_LABEL_BASE_OPACITY = 0.06`,
  `CONSTELLATION_LABEL_PEAK_OPACITY = 1.0`, `CONSTELLATION_LABEL_GAMMA = 0.75`.
- Emphasis band: `CONSTELLATION_HILITE_IN_DEG 15→22`, `HILITE_OUT_DEG 40→45`,
  `PEAK_OPACITY 0.95→1.0`, `BASE_OPACITY 0.32→0.28`.
- Starfield: opacity 0.8→0.55, size 1.6→1.3 (buildScene).

### Tests

- `tests/constellationLabels.test.ts`:
  - constant text height: for every constellation, derived glyph angular
    height (s/128 × W/4) equals `CONSTELLATION_LABEL_HEIGHT_RAD` (±1e-6).
  - solver: synthetic pair of touching figures → resolved placements do not
    overlap (angular distance ≥ sum of ink radii).
  - solver: placement is stable/deterministic (same output twice).
  - **full sky (real 88)**: resolved labels pairwise — no overlaps; every
    label stays within 60° of its own figure centroid (no runaway drift).
- `tests/constellations.test.ts`: emphasis band constants updated where
  asserted (15/40 → 22/45) if present.
- `tests/constellationPresence.test.ts`: unaffected (presence unchanged).

## Gates

`npm run format` (Prettier!) → `npm run lint` → `npx vitest run` →
`npm run build` → CDP verify (88 labels, opacity curves live, screenshot via
CDP → vision check) → commit → push → watch CI → confirm live deploy.

## Out of scope (this plan)

- Constellation artwork (separate plan after user picks route A/B).
- Sphere radius change (no visual effect — documented above).
