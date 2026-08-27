# Plan 014 — generalise the fix to all 88 + prevent figure overlaps

**User request:** generalise the plan-013 pilot fix to all 88 constellations,
and also prevent collisions (overlaps) between the animal figures while
keeping each animal matched to its star pattern as closely as possible.

## Method — Stellarium ground-truth anchors (no vision, no free search)

`/tmp/anchors.json` (Stellarium data) carries 3 (art-pixel, sky-star)
correspondences for each of the 85 Stellarium figures. Each 3-point pair set
determines a **closed-form least-squares similarity** (scale + rotation +
translation) of the art onto the sky — the same renderer frame math as the
pilot (image-right = east, image-up = north, rotation CCW, gnomonic
in-plane offsets). No optimization loop, no per-figure vision calls.

- **Chirality from the anchors themselves:** sign of the anchor-triangle
  signed area in art-space vs sky-space. Result: **84/85 Stellarium figures
  are horizontal mirrors of the stored art** (Stellarium draws for the
  inside-of-the-dome view, east-left; the renderer is east-right). The 3
  pilots stay as plan 013 solved them.
- **Self-selecting plan:** use anchor+refine only where it beats the shipped
  star-ink baseline, else keep the shipped fit (protects the 3 pilots +
  Puppis/Vela/Serpens originals). 80 upgraded, 8 kept.
- **De-collision pass:** per-figure coordinate descent minimizing
  `J = star_score + λ·overlap_fraction` (λ=30, 5 passes), where overlap is
  ink-on-ink on the sphere (fraction of A's art pixels within 0.25° of
  B's art). Guards: star score may degrade at most ~2.2× baseline, and the
  in-box star count may not drop below the anchor-optimal value.

## Measured results (full-resolution ink-on-ink, all 88 figures)

| plan          | star score ↓ | stars on art | pairs >1% | 5–10% | 10–20% | worst pair              |
| ------------- | ------------ | ------------ | --------- | ----- | ------ | ----------------------- |
| SHIPPED (013) | 763.1        | 380/757      | 15        | 3     | 4      | Carina/Vela 22.4%       |
| ANCHOR (raw)  | 65.0         | 740/757      | 58        | 11    | 10     | Boötes/Virgo 14.1%      |
| **NEW (014)** | **67.3**     | **742/757**  | **46**    | 6     | 6      | **Carina/Puppis 12.9%** |

- Star match: **742/757 stars now sit on the art** (380 before); weighted
  star score 11× lower.
- Overlap: worst pair 22.4% → 12.9%, **no pair above 13%** (shipped had two
  > 20%), and the four worst regions were A/B vision-checked at in-app
  > (38% opacity) rendering: Carina/Vela and Hydra/Leo both clearly reduced
  > ("broad muddy zone" → "small contained patch"); Boötes/Virgo is a minor
  > head/hand edge-kiss; Antlia/Hydra minor.
- All 88 pass the data tests (sizes in (0.5, 70), rot in [−180, 180], 88
  unique names, PNG aspect invariant).

## Critical bug found while building this (local tooling, not repo)

The overlap metrics initially ran with `ink_dirs` missing the `π/180`
deg→rad conversion (renderer: `planeSize = sizeW·π/180`), smearing each
figure's ink across ±150° of sky. Every earlier overlap number and the first
de-collide run were void; fixed and re-measured (table above is post-fix).
Star-ink scores were unaffected (they work in degree units consistently).

## Commit

1. `fix(figures): plan 014 — anchor-registered all 88 + de-collide`
   - `public/constellation-figures/*.png`: 80 figures mirrored in place
     (renderer has no flip parameter; the baked mirror is the figure's true
     chirality per the Stellarium anchor test).
   - `src/data/figures.ts`: new centerRAHours/centerDecDeg/sizeW/sizeH/
     rotationDeg for 85 figures (3 unchanged — already optimal from plan 013).
   - Gates: vitest 212/212, `prettier --check .`, vite build.
