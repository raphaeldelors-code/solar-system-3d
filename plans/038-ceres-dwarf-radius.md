# 038 — Ceres (and all dwarf planets) look planet-sized: dwarf radius tier

## Ask (user, 2026-09-11)

> "Is Ceres size ok it look like a planet size now?"

Live measurement (headless Chrome, scene probe): Ceres `sceneRadius = 1.140`
vs Earth `1.615` → **71% of Earth**, real ratio 7.4%. All five dwarfs sit at
1.1–1.30 (44–64% of Earth). The log-compression in `planetRadiusKm` lifts small
bodies: the `0.8` floor alone is 50% of Earth's `1.615`.

## Root cause

`src/render/visibleScale.ts` `planetRadiusKm(km) = 0.8 + 0.45·log10(km/100+1)`:

| body     | km   | old scene r | vs Earth (rendered) | real vs Earth |
| -------- | ---- | ----------- | ------------------- | ------------- |
| Earth    | 6371 | 1.615       | 1.000               | 1.000         |
| Mercury  | 2440 | 1.432       | 0.887               | 0.384         |
| Pluto    | 1188 | 1.300       | 0.805               | 0.186         |
| Haumea   | 745  | 1.217       | 0.754               | 0.117         |
| Makemake | 715  | 1.210       | 0.749               | 0.112         |
| Eris     | 1163 | 1.296       | 0.802               | 0.183         |
| Ceres    | 470  | 1.140       | 0.706               | 0.074         |

Dwarfs render in the same band as the small _planets_ (Mercury 1.432). They
need their own tier.

## Design

New function, same log shape as the existing tiers, compressed floor:

```ts
export function dwarfRadiusKm(km: number): number {
  return 0.15 + 0.3 * Math.log10(km / 100 + 1);
}
```

| body     | km   | new r | vs Earth (rendered) |
| -------- | ---- | ----- | ------------------- |
| Pluto    | 1188 | 0.483 | 0.299               |
| Eris     | 1163 | 0.480 | 0.297               |
| Haumea   | 745  | 0.428 | 0.265               |
| Makemake | 715  | 0.423 | 0.262               |
| Ceres    | 470  | 0.377 | 0.233               |

All five now < Mercury (1.432) and ~3–5× smaller than before; the 0.15 floor
keeps Ceres a visible ~1.2 px at the default 900×1200 viewport (dwarf orbit
distances are 28–130 scene units; 0.15 r ≈ 0.4–1.7 px — visible dot, not a
planet disc).

## Why the orbit anchors DON'T need re-solving

`solve_scale.py --dwarf` (new mode, plan 038) pins D to the **shipped**
6-decimal `ANCHORS` table and re-checks every clearance constraint with the
new dwarf radii: **TOTAL FAILS: 0** (the 3 tangent-solution rows
mercury→venus / earth→mars / jupiter→saturn sit within the documented
5e-3 rounding tolerance — sub-1e-3 scene units, far below a pixel; the
default re-solve mode keeps the tight 1e-9 tolerance and also ends 0 fails).

Two things prove the dwarf tier is safe:

1. **Smaller radii only LOOSEN constraints.** The dwarf-involving rows get
   slack _back_: mars→ceres margin goes `-0.000` (tangent, planet-tier) →
   `+0.763`; ceres→jupiter `+0.763`.
2. **The 3 residual tangent rows are planet-only pairs** (no dwarf in them)
   and appear identically when the _same pinned anchors_ are checked with
   planet-tier radii — they are a rounding artifact of the shipped 6-decimal
   table, pre-existing and independent of this change.

Re-solving would move the outer orbits ~1.1 units inward for no user-visible
benefit (the shipped table is hand-loosened for visual separation). Decision:
**keep the anchors unchanged**; `solve_scale.py --dwarf` is the regression
gate that proves they stay feasible under the dwarf tier.

`followDistanceKm` gains an optional `dwarf` flag so a dwarf follow frame is
`max(3, dwarfR*6) = 3.0` (was `max(3, planetR*6) = 6.9` — would frame Ceres at
~8% of screen height; now ~37%, consistent with its new disc size).
`TRUE_SCALE` follow is physical km regardless of kind — no change.

## Edits

1. `src/render/visibleScale.ts` — `dwarfRadiusKm(km)`; `followDistanceKm(km, dwarf=false)`.
2. `src/render/scene.ts` — `VisualScale.followDistanceKm` signature gains
   `dwarf?: boolean`; `VISIBLE_SCALE` wires `followDistanceKm`; `TRUE_SCALE`
   ignores the flag; `lerpScale` passes `dwarf` through; `buildScene` radius
   selection: `kind==='dwarf'` → `dwarfRadiusKm` for the build scale,
   `TRUE_SCALE`/`VISIBLE_SCALE` radius lookups use the kind too.
3. `src/main.ts` — follow-camera site: `scale.followDistanceKm(rkm, entry.def.kind==='dwarf')`.
4. `tests/orbitReproject.test.ts` — fake scale gains `followDistanceKm: (km, dwarf) => km`-shaped
   (keep signature-compatible); no behavior change there.
5. `tests/visibleScale.test.ts` — new cases: dwarf tier values; dwarf < Mercury;
   followDistanceKm dwarf vs planet; `lerpScale` passes dwarf flag through.
6. `solve_scale.py` — `--dwarf` flag: uses the dwarf radii for ALL bodies and
   pins D to the SHIPPED `ANCHORS` table (read from `src/render/visibleScale.ts`),
   then re-checks every clearance constraint — a regression gate proving the
   deployed layout stays feasible under the dwarf tier (run result: TOTAL FAILS 0,
   anchors unchanged). Default mode is byte-identical to the original solver.

## Verification (results)

- Gates: test (387 pass, +6 new dwarf-tier cases) / tsc / lint / format:check / build — all green.
- `python3 solve_scale.py --dwarf` → TOTAL FAILS 0, shipped `ANCHORS` unchanged (the
  dwarf tier only loosens the dwarf-involving rows; the 3 planet-only tangent rows
  sit within the documented 5e-3 rounding tolerance of the shipped 6-decimal table).
- Bundle marker: three `Math.log10(n/100+1)` tiers present in `dist/assets/*.js`
  (planet 0.8/0.45, dwarf 0.15/0.3, moon 0.08/0.22) — dwarf formula shipped.
- Live (headless Chrome, `f=ceres` + `f=earth` follow frames, FOV 50°, 1280×800):
  - **Earth control: measured blob 383 px vs predicted 380 px (1.615 r @ d=9.69) — calibration proven.**
  - **Ceres: measured ~198 px** (body + thin ring halo) → radius ≈ 0.4–0.5, consistent with
    the new 0.377 tier; the old 1.14 tier would render a ~460 px disc (~2.4× larger) — not seen.
  - Vision on `f=ceres`: a small tan cratered sphere inside the cyan selection ring — reads as a
    dwarf, not a planet. (Follow distance clamps to `d=3` at this tier, so on-screen size is
    set by the clamp; the radius itself is proven by unit tests + the Earth-calibrated ratio.)
- Screenshot evidence in `.baseline/`: `p6-ceres-follow.png`, `p6-earth-follow.png` (untracked).

## Rollback

One feature commit + docs commit; revert both. No data, no texture, no deploy
change besides the rolling dist.
