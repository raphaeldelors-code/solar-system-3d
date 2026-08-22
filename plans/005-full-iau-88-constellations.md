# Plan 005 — Full IAU sky: all 88 constellations, verified coordinates (2026-08-22)

User request (2026-08-22): "apply the fixes and I want all the 88 constellations
well placed and double check the star count in each."

## Background — audit results (already run, this plan's justification)

Full-sky nearest-neighbor audit of the current 13-constellation file against the
Hipparcos catalog (118,218 rows) with a 60″ flag threshold found **15 mispositioned
stars** (Scorpius tail, Ursa Minor RA shifts, Epsilon Tauri ~6.7° dec off, …).
Root cause: the 13-figure file was hand-assembled from a mixed source; several
"stars" sit at the wrong coordinates, and the intended scope (13) predates the
user's request for the full IAU set.

Fix strategy: **replace the hand-typed 13 figures wholesale with the authoritative
IAU 1930 standard figures** — that both adds the 75 missing constellations AND
eliminates every audited coordinate error at once (all 15 bad stars are
superseded by catalog-sourced positions).

## Data sources (fetched + verified 2026-08-22)

1. **Figures (which stars, which lines, per constellation)** — Stellarium
   `skycultures/modern_iau/index.json` (`Stellarium/stellarium` repo, master):
   88 constellations, each `lines` = list of polylines of **HIP IDs**
   (the canonical IAU line set; `edges_source: pbarbier.com/constellations/edges_18.txt`).
   757 figure-star occurrences (745 unique). Also carries the canonical
   `common_name.english` + `native` per constellation.
2. **Coordinates + magnitude** — local `/tmp/hip_main.dat` (Hipparcos, CDS).
   Column semantics VERIFIED before use:
   - col 1 = HIP number (col 5 = V magnitude)
   - cols 8/9 = decimal **J2000 ICRF** RA°/Dec° (cols 3/4 = HMS at J1991.25)
   - Verified two ways: (a) 9 bright anchors (Polaris, Rigel, Sirius, Vega,
     Kochab, Betelgeuse, Procyon, Capella, Arcturus) match col8/9 to <14″,
     with PM-correction NOT improving (i.e. already J2000 — do not double-correct);
     (b) 61/61 independently-verified J2000 positions (the old app file's 76 stars
     - 13 SIMBAD-confirmed) map to the catalog row whose HIP matches the
       skyculture's name→HIP (60/61 exact; 1 name-collision "Gienah" used by two
       stars — not a catalog defect).
   - All 745 unique figure HIPs exist in the file (max HIP 118322 ≤ 118320… file
     max 120416 rows — 0 missing).
3. **Star names** — `skycultures/modern/index.json` `common_names`
   (HIP-keyed, 659 entries; richest IAU proper-name set), fallback
   `modern_iau` names, else `HIP <id>`.

## Changes

- `src/data/constellations.ts` — regenerated: `raDecToUnit` + interfaces kept;
  `CONSTELLATIONS` becomes 88 entries. Star name = proper name where known.
  `Star` interface unchanged (`name`, `raHours`, `decDeg`).
  Header comment updated (source + epoch + counts).
- `tests/constellations.test.ts` — extend:
  - dataset has exactly 88 constellations, names are the IAU English names
    (set-equality against the 88),
  - per-constellation star count matches the IAU figure (assert exact counts,
    values baked from the source at generation time — this is the user's
    "double check the star count" requirement, made a permanent test),
  - line endpoints valid (already present), coordinates in range (present),
  - names unique per constellation (present),
  - Orion belt collinearity + Polaris near pole (present — must still pass).
- No renderer changes needed (everything data-driven; `CONSTELLATIONS.length`
  used throughout). Cosmetic: update "13" comments in scene.ts/main.ts to
  "88" so the docs don't rot.

## Out of scope (noted, not done)

- No magnitude in the `Star` interface (renderer draws uniform dots; adding
  per-star sizing is a separate render feature).
- Boundary polygons (spans dat) — the app draws figures, not boundaries.

## Gates (per standing process)

`npx vitest run` (all suites) → `npm run build` → `npm run lint` →
`npm run format:check` → browser-verify (preview server, screenshots of
several figures incl. Orion, Ursa Minor, Scorpius, Cassiopeia + the sky tour)
→ commit `feat(data): full IAU sky — all 88 constellations, catalog-verified coordinates`
→ push → todo.md hash line in a follow-up docs commit (no --amend).

## Commit order (strict)

1. `feat(data): …` — regenerated constellations.ts + extended tests.
   (Comments-only "13→88" fixes ride along; same concern.)

One feature, one commit.
