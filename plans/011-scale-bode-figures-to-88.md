# Plan 011 — Scale the Bode figures to all 88 constellations (S1-followup)

## Status (updated 2026-08-23, batch 3a staged)

- **Shipped:** batch 1a (`8eaf84f`), batch 1b (`df88dfd`), batch 2
  (`7a047e9`) = **36/88 live** on the gh-pages site.
- **Staged (this commit, batch 3a):** **32 more → 68/88.** All 32 are full
  star-chart crops from the 16 multi-constellation 1801 plates + the 4
  dedicated 1782 _Coelum Stellatum_ sheets (equuleus, sextans, norma).
  Pipeline: OCR each source plate → anchor the crop on the constellation's
  German figure label (or the labelled star field) → adaptive-threshold
  extract (`mkfig7win.py`) → fit the star pattern (`fit_batch3.py` math) →
  **verify with a star-pattern D-test** (`verify_fits.py`: mean star→ink
  distance for the fitted placement must beat a random-placement baseline by
  ≥1.6×, i.e. the art is actually aligned to the constellation's stars, not
  just _some_ ink). All 32 pass.
- **Style (user-confirmed 2026-08-23):** FULL STAR-CHART look (figure + stars
  - lines + graticule + labels). Per the plan-007 docs the plates are "loose,
    star-adjacent art, not star-anchored" — the app draws the IAU stars/lines
    separately and lays the Bode chart near the centroid. The D-test is
    deliberately stricter than that bar.
- **Remaining: 20 constellations — the south-polar set.** All 20 (Phoenix +
  the 19 that `bode_sourcing.py` mis-mapped to the _December_ plate) live on
  `phoenix_1782.jpg`, Bode 1782 **south-pole** chart. Sourcing correction
  (2026-08-23): `dec_regional.jpg` is a **north**-pole December chart (Cepheus,
  UMi, Draco, Boötes, Quadrans Muralis), NOT the southern set. The 1782
  south pole is an azimuthal/polar projection (concentric dec circles + radial
  RA lines), so the linear `gridfit.py` graticule model does not apply — the
  crop window must come from the polar projection (pole at bottom-center, RA
  along the top arc, dec rings across).

**Remaining:** 20 south-polar constellations (Phoenix, Apus, Carina,
Chamaeleon, Circinus, Columba, Dorado, Fornax, Hydrus, Indus, Musca, Octans,
Pavo, Pictor, Puppis, Reticulum, Triangulum Australe, Tucana, Vela, Volans)
on `phoenix_1782.jpg`. Crop via the polar projection, extract, fit, D-test,
register (→ 88/88), gates, CDP verify, commit+push.

## User request (standing, 2026-08-22)

> "go with all remaining todos" — S1-followup: scale the Bode figure plates
> beyond the 5-constellation prototype to the remaining 83.

Prototype state (plan 007, commit `f883db8`): 5 fitted figures — Orion,
Ursa Major, Cygnus, Scorpius, Leo — as transparent ivory plates on tangent
planes of the sky dome, toggle `fig=1`, opacity driven by the D4 emphasis
pass. This plan scales it to all 88 IAU constellations.

## Source material (public domain, Wikimedia Commons)

Bode's 1801 _Uranographia_ plates, two tiers on Commons:

- **Dedicated single-constellation plates** (~24 of the 88 exist as
  standalone files — `File:Bode <slug>.jpg`, `File:<Name> bode.jpg`,
  `File:<Name> (Uranographia Bode).jpg`, e.g. `Aql bode.jpg`,
  `Cetus (Uranographia Bode).jpg`, `Bode Pyxis.jpg`).
- **Multi-constellation plates** (~20 files each carry 3–8 figures, e.g.
  `Cassiopea, Cepheus, der Kleine Bär, Drache.jpg`,
  `Hydra Continua, Crater, Corvus, Centaurus et Lupus.jpg`,
  `Wassermann, Steinbock, Der Südliche Fisch.jpg`) — need a crop window per
  constellation.

Dedicated plate always wins over a crop from a shared plate (cleaner
figure, easier QA). Pre-IAU plates (Quadrans Muralis, Turdus Solitarius,
Xiphias, Sceptrum Brandenburgicum, Bode pontowski/felis/machina/…) do NOT
map to the 88 and are skipped.

## Pipeline per constellation (proven in plan 007 — `references/classic-figure-plates.md`)

1. **Coverage audit** — for each of the 83 missing names, pick its Commons
   file (dedicated first). Output: `scripts/bode_coverage.tsv`
   (`name<TAB>file<TAB>dedicated|crop`). Gaps (no Bode figure on Commons)
   are recorded and left without a plate — the toggle simply shows nothing.
2. **Download** at full res (multi-constellation plates up to 75 MP —
   `Image.MAX_IMAGE_PIXELS = None`; downscale for layout mapping only).
3. **Crop** (crop tier only) to the figure region via ASCII density maps
   (~96 cols) + zoom probes; trim the plate border ring (~4.5–5 %/edge).
4. **Extract** at FULL resolution: ink mask (`a < 150`, black ink on cream —
   verify per plate), `scipy.ndimage.label`, keep components ≥ ~400 px
   (stars are isolated 20–500 px dots; figure strokes are big). Output RGBA
   ivory (233,226,208) on transparent, cropped to ink bbox + margin.
5. **Verify text-first** — ASCII-render the extracted mask (~100 cols),
   read the silhouette; sanity-check ink fraction of bbox.
6. **Fit** — extend `scripts/fit_figures.py` per batch: size = angular
   diameter of the star distribution × 1.25 margin (cap 70°); offset
   (RA/Dec) minimized mean star→ink distance at that size; prints
   paste-ready `FIGURE_FITS` entries.
7. **Wire + QA** — `FIGURE_FITS` entry in `src/data/figures.ts`;
   `pngquant` (line art → low hundreds of KB); unit test extension (fit
   count, name-set == 88-minus-gaps, placement invariants); gates green;
   CDP spot-check (toggle on → one mesh per new fit at the sky radius;
   `js_errors` empty; canvas sample non-black).
8. **Commit per batch** (10–12 constellations), push, next batch. One batch
   in the tree at a time.

## Batches (ordered by coverage ease, ~9–11 per batch)

1. **B1 — easy dedicated plates (south/west):** Antlia, Aquila, Aquarius,
   Aries, Boötes, Caelum, Cancer, Canis Major, Cetus, Coma Berenices, Crux
2. **B2 — more dedicated:** Eridanus, Gemini, Microscopium, Ophiuchus,
   Perseus, Piscis Austrinus, Pyxis, Sagittarius, Virgo, Vulpecula,
   Andromeda
3. **B3 — shared plate, circumpolar north:** Cassiopeia, Cepheus, Ursa
   Minor, Draco, Hercules, Lyra, Lacerta, Corona Borealis, Cygnus-adjacent
   gaps
4. **B4 — shared plate, west/equatorial:** Auriga, Lynx, Camelopardalis,
   Lepus, Monoceros, Canis Minor, Triangulum, Pegasus, Equuleus, Delphinus
5. **B5 — shared plate, south/central:** Hydra, Crater, Corvus, Centaurus,
   Lupus, Serpens, Libra, Taurus, Pictor, Phoenix
6. **B6 — remaining south + smalls:** Ara, Carina, Chamaeleon, Circinus,
   Columba, Corona Australis, Dorado, Grus, Horologium, Hydrus, Indus
7. **B7 — remaining smalls + gaps report:** Musca, Norma, Octans, Puppis,
   Reticulum, Sculptor, Sextans, Telescopium, Tucana, Vela, Volans,
   (Sagitta if a crop is found) + final gap list in the commit message

(The batches are planning aids — membership shifts as the audit reveals
dedicated vs crop availability.)

## Definition of done

- Every constellation with a Bode plate on Commons has a fitted
  `FIGURE_FITS` entry + optimized PNG; gaps documented (per-batch commit
  notes + final summary).
- All gates green per batch (`format:check` → `lint` → `vitest` →
  `build`), CDP spot-check per batch, commit+push per batch.
- Final: 88-constellation coverage table (name → file → dedicated/crop →
  fit sizeDeg) in the closing commit message; total asset size noted.

## Risks / notes

- Multi-constellation crops inherit each other's star fields — the
  component-size filter (step 4) handles it, but a neighboring figure's
  strokes can bleed in if crops touch; keep crop windows conservative.
- Some Commons files are low-res or badly scanned; if a plate is too
  noisy to extract, fall back to the shared plate for that constellation,
  and only then mark it a gap.
- 1801 plates use pre-IAU star extents — art sits LOOSELY beside the star
  lines by design (accepted, Star Walk 2 does the same). No star-anchoring.
- The `fig=` toggle stays OFF by default (unchanged); figures ride the
  existing D4 opacity pass, so no new render-loop cost beyond texture
  memory.
- Bundle: plates are fetched from `public/` (not the JS bundle) — bundle
  size unaffected; note total `public/constellation-figures/` size per
  batch.
