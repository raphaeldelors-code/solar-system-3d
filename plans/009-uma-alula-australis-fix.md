# Plan 009 — Fix Ursa Major "Alula Australis" zeroed coordinate (stray line to Pisces)

## Symptom (user report)

> "there seems to have a mistake in the constellation where the drago is
> connected to a start near pisces while they are appart from the star sphere"

A long constellation line shoots from the circumpolar UMa/Draco region all
the way down to the Pisces region of the sky.

## Root cause

`src/data/constellations.ts` — Ursa Major, star index 6:

```ts
{ name: 'Alula Australis', raHours: 0, decDeg: 0 },
```

RA 0h / Dec 0° is the **vernal equinox** — the middle of **Pisces**. The
generation pass found no J2000 _decimal_ coordinates for HIP 55203 in
`hip_main.dat` (those columns are blank for this star) and wrote a `(0,0)`
sentinel instead of falling back to the sexagesimal J2000 columns. The line
`[5, 6]` (Alula Borealis → Alula Australis) then renders as a segment from
the Big Dipper handle base (RA 11.31h, Dec +33.09°) across the entire sky
to Pisces. The stray star dot at the equinox point is drawn by the shared
star-`Points` cloud too.

The user attributed it to Draco (Draco wraps around the pole next to the
Dipper and shares the same part of the sky), but the line belongs to
**Ursa Major**. Draco's own data is clean (all 15 stars exact to <0.001°
vs the catalog; line set matches the IAU polyline).

## Verification of the fix value

- IAU line source (`modern_iau_index.json`, `CON modern_iau UMa`): final
  edge is `…55219, 55203` — i.e. Alula Borealis (η UMa, HIP 55219) →
  Alula Australis (δ UMa, **HIP 55203**). Matches file index 5 → 6.
- `hip_main.dat` HIP 55203: J2000 decimal columns blank, sexagesimal
  columns: RA `11 18 11.24`, Dec `+31 31 50.8` →
  **RA 11.303122h, Dec +31.530778°** (δ UMa, 1.56° south of η UMa —
  correct for the "two Alulas" pair).
- Cross-check: HIP 55219 sexagesimal columns reproduce its J2000 decimal
  columns exactly, confirming col 3/4 are J2000 sexagesimal.

## Change

`src/data/constellations.ts` — one line:

```ts
{ name: 'Alula Australis', raHours: 11.3031, decDeg: 31.5308 },
```

## Regression tests (new, in `tests/constellations.test.ts`)

1. **No sentinel coordinates**: no star in any constellation may sit at
   (raHours, decDeg) = (0, 0) — the vernal-equinox sentinel.
2. **No sky-spanning segments**: for every line `[a,b]`, the angular
   separation of the two stars is ≤ 30° (current max across all 88
   constellations is ~14° — Draco Altais→Grumium; 30° is ~2× headroom and
   far below any cross-sky artifact).

## Gates

prettier (file + this plan) → lint → vitest → build → commit → push → CI.
