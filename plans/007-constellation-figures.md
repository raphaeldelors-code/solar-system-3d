# Plan 007 — Classic constellation figures (Bode plates)

**Status:** IN PROGRESS
**Scope:** Star-Walk-2-style classic constellation illustrations rendered as
transparent sprite billboards over the celestial dome. **Classic public-domain
art only** — the user explicitly cancelled the AI-generated route:
_"Forget about the ai route too complicated. Let's go with the classic route
only."_

## Source material

Bode's _Uranographia_ (1801) plates, per-constellation scans on Wikimedia
Commons (all public domain, confirmed 2026-08-22). Downloaded originals in
`assets/constellation-figures/src/` (keep for provenance; NOT bundled).

Prototype set (5 of the intended 6 — see "Gaps"):

| Constellation | Source plate                     | Plate size        |
| ------------- | -------------------------------- | ----------------- |
| Orion         | `Orion_und_Haase.jpg`            | 5824×4851         |
| Ursa Major    | `Ursa_Major.jpg`                 | 5000×6014         |
| Cygnus        | `Cygnus_Lacerta_and_Lyra.jpg`    | 5644×4459         |
| Scorpius      | `Scorpio_and_Libra.jpg`          | 5870×4688         |
| Leo           | `Bode_Leo.jpg` (dedicated plate) | 5670×4490         |
| Lyra          | — small figure on Cygnus plate   | extraction failed |

### Extraction pipeline (text-first, vision unavailable)

Plates are black line-art figures on cream paper with a starfield of small
dots + graticule grid. Pipeline (`mkfig.py`, run with `/opt/data/pilenv/bin/python`
— venv with pillow+numpy+scipy):

1. Crop a **figure window** (fractions of full plate), located by hand from
   ASCII ink-density maps (`plate_map.py`, `probe_*.py`).
2. Grayscale, threshold `L < 150` → ink mask.
3. `scipy.ndimage.label` connected components; **keep components ≥ 400 px** —
   at these scan resolutions every star dot / grid fragment is < 400 px while
   figure strokes survive (verified: Orion 170/6229 comps kept).
4. Tight-crop to kept-ink bbox + margin; alpha = darkness-scaled (×1.6 gain,
   gaussian 0.6 soften); recolor ink to warm ivory `#e9e2d0` (reads on dark
   sky); cap width at 1400 px → save transparent PNG.
5. Verify by ASCII render of the kept mask (`mkfig.py` prints it) — the
   figure must read as a coherent animal; stray stars gone.

Outputs in `assets/constellation-figures/out/`, then downscaled to
**1000 px wide** for the web (≈0.7–1.6 MB each). Copied to
`public/constellation-figures/<name>.png` (vite static-asset path, same
pattern as `public/textures/`).

**Pitfalls found:**

- `/tmp` is wiped between terminal calls — save outputs inside the repo.
- Full-plate component analysis is useless (starfield fuses everything when
  dilated); the size threshold works WITHOUT dilation.
- Plates have an engraved border ring — trim ~4.5% off window edges.
- The huge Plate VI (19763×14987, Ursa Major + Leo) is landscape; the
  dedicated `Bode_Leo.jpg` plate is far easier — prefer dedicated plates.
- Lyra is tiny on its corner plate: the graticule/star dots at scan resolution
  exceed the star threshold in that corner, so clean extraction failed.
  Options when resuming: (a) accept 5/6 prototype, (b) raise min_comp for
  Lyra only + accept residual dots, (c) source a different Lyra plate
  (e.g. Flamsteed/Hevelius on Commons).

## Rendering design

**Mechanism:** one `THREE.Sprite` per figure that has an illustration,
parented to the `constellations` group (same group as lines/labels, so it
inherits the `presence` fade + group disposal).

### Fit model (per-constellation params)

Bode's figures are **not star-anchored** (1801 positions differ from J2000),
so each illustration gets a small transform against the _figure centroid_:

```ts
interface FigureFit {
  /** RA/Dec offset of the plate's figure center from the star centroid (deg). */
  dRa: number; // hours
  dDec: number; // degrees
  /** Angular width (radians) the sprite should cover — the plate's own
   *  extent in the sky. Height follows the PNG aspect ratio. */
  span: number;
  /** Rotation about the line-of-sight (radians), +ccw as seen on screen. */
  rot: number;
}
```

Initial fits (measured from plates, refine visually in the app):

| Constellation | dRa (h) | dDec (°) | span (rad)  | rot (rad) | notes                                 |
| ------------- | ------- | -------- | ----------- | --------- | ------------------------------------- |
| Orion         | 0.0     | 0.0      | 0.10 (~6°)  | 0.35      | hunter leaning; belt roughly vertical |
| Ursa Major    | 0.0     | 0.0      | 0.16 (~9°)  | -0.2      | bear elongated along UMa axis         |
| Cygnus        | 0.1     | -0.5     | 0.14 (~8°)  | 0.9       | cross rotated; plate is landscape     |
| Scorpius      | 0.0     | 0.0      | 0.20 (~11°) | 0.0       | scorpion curled                       |
| Leo           | 0.0     | 0.0      | 0.16 (~9°)  | 0.0       | lion facing right (sable)             |

These are first guesses — the prototype acceptance test is visual (CDP
screenshot with figure near view center), and fits get tuned then.

### Placement

Position = `raDecToUnit(centroidRa + dRa, centroidDec + dDec) * (CONSTELLATION_RADIUS - 90)`,
i.e. just inside the dome with the labels. Sprite scale:
`width = span * (CONSTELLATION_RADIUS - 90)`, `height = width / aspect`.
Rotation: billboard sprites face the camera, so `rot` is applied to the
**texture** (pre-rotate the canvas) OR via `material.rotation` (THREE.Sprite
supports `rotation`) — use `material.rotation`, no texture copy needed.

### Opacity / lifecycle

Same emphasis curve as labels but with its own constants so figures stay
subtle: `FIGURE_BASE_OPACITY = 0.0`, `FIGURE_PEAK_OPACITY = 0.85`,
reusing `constellationEmphasis` (22°/48° band) so a figure only appears when
its constellation is near view center — this also keeps the 88-constellation
sky from being cluttered (only ≤ ~3 figures visible at once at 50° FOV).
Hook: `updateConstellationHighlight` already iterates group children by name;
name figure sprites `constellation-figure:<Name>` and give them the same
treatment (extend the Sprite branch: labels keep their curve, figures get
`figureOpacity(emph)` — pure, unit-tested).

**Gating:** `Figures: on/off` toggle (default **on** for the 5 prototyped;
constellations without a plate are simply absent). Toggle button in the
toolbar next to Labels/Orbits (`#figures-toggle`), persisted in the URL state
(`fig=1/0`), applied in `applyToggles()`.

### Loading

Static Vite imports (`import orionUrl from '/constellation-figures/orion.png'`)
for the 5 prototype files → a `FIGURE_SOURCES` map in a new
`src/render/figures.ts`. `TextureLoader` loads them at startup into a
**shared cache** (Map name→Texture) so scene rebuilds are no-ops, same
pattern as `attachRealTextures`. Missing file = skip (defensive; all 5 are
bundled so this is belt-and-braces).

### Disposal

`buildConstellations` returns the group; extend `group.userData.dispose` for
the Sprite branch (it already handles Sprites for labels — figures get the
same path; the shared texture cache is NOT disposed per-group, only on page
unload — matches label textures? NO: label textures are disposed today.
Decision: figure textures are cached+shared → dispose only the material,
never the shared map. Document in code.)

## Files touched

- `public/constellation-figures/{orion,ursa_major,cygnus,scorpius,leo}.png` — NEW
- `assets/constellation-figures/{src,out,*.py}` — NEW (provenance + pipeline;
  gitkeep; the .py scripts are dev tooling, not bundled)
- `src/render/figures.ts` — NEW: `FIGURE_FITS` (5 entries), `FIGURE_SOURCES`,
  `figureOpacity(emph)`, `buildFigureSprites(loader, enabled)` or similar,
  shared texture cache
- `src/render/scene.ts` — wire figure sprites into `buildConstellations`
  (or return them via `BuiltScene` and add in `buildScene`); extend
  `updateConstellationHighlight` + `dispose`
- `src/main.ts` — toggle button wiring, URL state `fig`, pass loader to scene
- `src/state/urlState.ts` — `fig` field
- `src/ui.html` (or wherever the toolbar lives) — button
- `tests/figures.test.ts` — NEW: fit table has 5 valid entries (finite,
  span>0), `figureOpacity` monotonic + bounded, figure-sprite build count
- `plans/007-*.md`, `todo.md` — docs

## Acceptance (prototype gate)

1. `npm run format:check` + `npm run lint` + `npx vitest run` (existing 179 +
   new tests) + `npm run build` all green.
2. CDP headless verify: 5 sprites exist named `constellation-figure:*` in the
   DOM-scene graph; opacity 0 when their constellation is >48° off-axis,
   > 0.5 when centered (point camera at Orion, read material.opacity); toggle
   > off removes/hides them; URL `fig=0` restores hidden on load.
3. Visual: CDP screenshot centered on Orion shows the hunter ghost over the
   stick figure, not covering the name label, not bleeding past the dome edge.
4. Bundle: the 5 PNGs are in the build output; total added weight ≤ ~5 MB.

## Scale-out (later, separate commit)

- Extract the remaining ~83 plates (dedicated Bode plates exist for nearly
  all; Argo Navis is unsplit in 1801 — use the three split modern plates or
  skip; Cetus/Erinus etc. verified per-plate).
- `FIGURE_FITS` auto-initialization: span from `constellationLabelPose().halfExtent`
  × ~1.6; dRa/dDec/rot = 0; manual override table for the mismatches.
- No UI change needed (toggle already covers all-or-nothing; per-constellation
  fit lives in data).

## Non-goals (this commit)

- No Lyra (extraction gap) — 5/6 prototype.
- No S2 (label see-through) or S3 (planet camera) — separate plans/commits
  (queue items S2/S3 in todo.md).
- No star-anchoring: Bode art sits loosely beside/near the figure (Star Walk 2
  does the same with its 1801-era figures).
