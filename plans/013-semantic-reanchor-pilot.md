# Plan 013 — semantic re-anchoring pilot (Delphinus, Ursa Major, Draco)

**User request (pilot gate):** animals are misplaced relative to their
constellation stars; fix Delphinus / Ursa Major / Draco first using
rotation, symmetry, homothety, zoom in/out; user validates before the
same process rolls out to all 88.

## Root cause (measured, not assumed)

- The plan-012 3-anchor LS fit is a pure similarity (scale + rotation +
  translation) of the ART onto the sky. Its stored `anchorSkyErr_deg` was
  actually in **radians**; true residuals were Del 2.2°, UMa 16.4°, Dra
  18.1°. The anchor points (hand-picked, 2–3 per figure) do not carry the
  figure's chirality, so a similarity can rotate/scale/translate the art
  to the anchors while the animal's body lands on the wrong half of the
  star pattern.
- Decisive test (stars of the constellation projected through the shipped
  fit into the art plane, rendered on the artwork, vision-checked): the
  real star pattern is the **horizontal mirror image** of the drawn
  figure in all three pilots. A similarity can never fix that — a mirror
  is required.

## Method (p013_solve.py v5 + p013_finetune.py)

1. Vision-locate semantic feature points on each art on a 100×100 grid:
   HEAD (Del: snout→Al Salib; UMa: head group→Muscida; Dra: head→Eltanin)
   and TAIL (Del: Aldulfin; UMa: Alkaid; Dra: Giausar).
2. Two-point exact similarity (scale + rotation + translation) mapping
   head/tail to their sky stars, evaluated for BOTH chirality (art as-is
   vs art mirrored); pick the chirality with the better global
   magnitude-weighted star score.
3. Coarse center refinement (RA 0.25h / Dec 0.5°), then fine refinement
   (RA 0.05h / Dec 0.1°) minimizing dInk (angular distance from each
   in-box star to the nearest ink pixel of the art).
4. Render the candidate exactly as the renderer does (verified renderer
   frame math earlier: image-right = east, image-up = north, rotation
   CCW) and vision-confirm every star dot sits on the gold art.

## Measured results (after = mirrored PNG + new fit)

| Figure     | before on-ink | after on-ink | max dInk | center (RA h, Dec °) | sizeW/sizeH | rot    |
| ---------- | ------------- | ------------ | -------- | -------------------- | ----------- | ------ |
| Delphinus  | 3/5           | 5/5          | 0.01°    | (20.6889, 14.1666)   | 5.38        | 11.94  |
| Ursa Major | 8/19          | 19/19        | 0.06°    | (10.6059, 55.2756)   | 55.12       | -34.58 |
| Draco      | 12/15         | 15/15        | 0.07°    | (15.6625, 68.1989)   | 53.91       | 157.16 |

All star coordinates were validated against the Hipparcos catalog
(nearest-HIP separation < 0.003° per anchor star).

Systematic check (rotation-only, size fixed, both chiralities, 87 of 88
figures): 41/87 win with mirror, 46 win as-is — the mirror is a
PER-FIGURE property, not a global renderer convention. (Boötes skipped:
slug case in the local PNG dir.)

## Commit

1. `fix(figures): plan 013 pilot — semantic re-anchor Delphinus, Ursa
Major, Draco (mirror art + solved fit)`
   - `public/constellation-figures/{delphinus,ursa_major,draco}.png`:
     horizontally mirrored (renderer has no flip parameter; the art's
     true chirality requires it).
   - `src/data/figures.ts`: new centerRAHours/centerDecDeg/sizeW/sizeH/
     rotationDeg for the three; header comment updated.
   - Gates: vitest (sizes in (0.5, 70), rot in [-180, 180], 88 unique),
     prettier, vite build.

## Rollout (AFTER user validates the pilot)

Same pipeline for all 88: per-figure chirality decision + semantic
head/tail anchors + refinement. Per-figure feature points will need
vision-location per art (batched); per-figure commit or one batched
commit decided at rollout time.
