# 012 — Constellation figures: data-driven registered Stellarium art (all 88)

## Problem

The current "Figures" toggle overlays **Bode _Uranographia_ (1801) scan crops**
that were hand-fitted to the stars (`scripts/fit_figures.py` + per-constellation
`offsetRAHours`/`offsetDecDeg`/`rotationDeg` in `FIGURE_FITS`). It is
complicated (68 hand-tuned fits, a Python fitting pipeline, OCR-cropped
multi-constellation pages) and the render is rough: low-res raster engravings,
inconsistent style, many square multi-constellation crops, and plates that
drift off the stars when orbiting. The user wants **beautiful figures for all
88, well placed, a beautiful rendering**, and explicitly asked to reuse existing
2D/3D assets if possible.

## Strategy (validated)

Replace the hand-fitted Bode plates with **Stellarium's `western` sky-culture
illustrations** — 85 professional, transparent, monochrome mythological
figures, each carrying **3 Hipparcos-star pixel anchors** in
`stellarium-skycultures/western/index.json`. Because each figure is anchored to
real stars, it can be registered to the sky with a **pure 2D similarity
transform** (center + rotation + uniform scale) solved by least squares from the
3 anchors — **zero per-constellation hand tuning**.

Math (proven in prototype, `figproto.py`):

- Anchor-star placement error: **min 0.02° / median 0.09° / max 0.44°** across
  all 85 figures — sub-half-degree registration, no manual fitting.
- Each figure is rendered as a crisp tangent-plane mesh on the sky dome, so it
  stays registered to the star lines while the camera moves (same frame as the
  existing plates: north-up up-hint, `mesh.rotateZ` for the in-plane angle).
- Visual check (composite of illustration + projected stars): Orion reads as a
  clean, professional "myth behind the map" (7/10), a clear step up from the Bode
  crops. The figures are a soft, recolorable underlay — the IAU star lines +
  dots + labels (always on) stay primary.

Coverage:

- **85** constellations use a Stellarium illustration.
- **3** have no Stellarium figure (Puppis, Serpens, Vela) — synthesized from the
  constellation's star pattern as an elegant line-glow figure, registered by the
  same centroid/north-up frame, so the toggle covers all 88.

## Data model (new `src/data/figures.ts`)

`FigureFit` becomes a fully solved transform (computed once at build time by a
generator script, committed as a table — not computed at runtime):

```ts
{
  constellation: string; // our Constellation.name
  center: [raHours, decDeg]; // figure center on the sky
  rotationDeg: number; // in-plane rotation (image-up vs north)
  sizeDeg: number; // angular size of the figure square (long side)
  source: 'stellarium' | 'synthesized';
}
```

`figurePlacement(fit, …)` computes the tangent-plane mesh transform (position,
upHint, planeSize, rotationRad) exactly as today, but from the solved values.
The 3-anchor least-squares solver + gnomonic/tangent helpers live in the
generator (`scripts/make_figures.py`) and are mirrored as pure TS
(`src/data/figureMath.ts`) for unit tests.

## Render (`src/render/scene.ts`)

- `buildConstellationFigures` loads one processed PNG per constellation
  (`public/constellation-figures/<slug>.png`), places the tangent-plane mesh via
  the same math. Art is **tinted cool ivory/blue, low opacity, depth-tested** so
  it reads as a soft underlay behind the star lines and never outshines them.
- Keep the "Figures" toggle + per-constellation highlight fade
  (`updateConstellationFigureHighlights`).
- All 88 present; the 3 synthesized ones get the same treatment.

## Assets

`scripts/make_figures.py`:

1. For each of the 85: open `western/illustrations/<slug>.webp`, **tight-crop to
   the figure bbox**, **recolor** (grayscale → cool tint), **normalize alpha**,
   **upscale to a consistent ~768px** (crisp), save PNG.
2. For Puppis/Serpens/Vela: render the star pattern (dots + lines) to a clean
   line-glow figure on a transparent canvas at the same crop/scale, so it
   matches the set's language.
3. Solve the 3-anchor similarity transform per figure and emit
   `src/data/figures.ts` (the `FIGURE_FITS` table) + a JSON manifest.

## Out of scope

- Do not add new sky cultures (other mythologies) — keep the western/IAU figure
  set so figures align with the existing IAU star lines.
- Do not change the always-on star lines / labels (they stay the primary layer).

## Verification

- Unit tests (`tests/figures.test.ts`): solver round-trips (a solved transform
  reproduces the anchors), 88 entries, unique names, sane sizes, placement
  invariants (upHint ⊥ position, north-up at rotation 0, pole-safe).
- Headless: `npm run build` + `vite preview` + CDP — enable Figures, fly to a few
  constellations (Orion, Ursa Major, Cassiopeia, Scorpius, the 3 synthesized),
  screenshot; confirm figures sit on their stars, tint/opacity look good.
- `npm test`, `npm run build`, `npm run lint`, `npm run format:check` green.
- README: credit Stellarium (western sky-culture illustrations, GPL-3) + IAU.

## Outcome (shipped)

- **85/88**: Stellarium "western" illustrations, 3-anchor least-squares
  similarity-registered to the real stars (residuals 0.01-0.45 deg). Luma->alpha,
  gold tint #FFECC8, soft edge.
- **3 specials** (Puppis, Vela, Serpens — no pre-1922 figure; the Argo Navis was
  only split in 1922/1930, and old painted plates defeat clean edge extraction)
  use **ORIGINAL generated SVG line-art** rendered through the same gold pipeline:
  Puppis = filled ship-stern silhouette, Vela = two-mast sail rig (flat-topped
  billowing sails, yards, pennants), Serpens = clean S-curve serpent with a
  punched eye + forked tongue. Each figure fills its exact cloud-aspect canvas
  (rotated star-cloud extent, PCA major axis) so it SPANS the constellation —
  no letterboxed gaps, no distortion (PNG aspect == plane aspect invariant).
- **Verification**: prettier (whole repo) + `npm run build` + lint green,
  vitest 212/212. Headless Chrome 152 + CDP on the real scene: all 88 figure
  meshes at radius 4790, 0 JS exceptions; Puppis + Vela 100% sampled stars on
  art; Serpens verified visually — the gold snake weaves through the star field
  (head at Caput, tail at Cauda) as an integrated underlay (a thin line body
  does not need to sit on an ink pixel). Attribution in index.html.
