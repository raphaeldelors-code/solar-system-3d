# 040 — Constellation figures too bright: edges hard to trace when both are on

## Ask (user, 2026-09-13)

> "The constellations are hard to distinguish when figures are enabled. Both
> are light bright. I was wondering if we can make sure we see constellation
> edges even when figures are enabled."

## Root cause (grounded in code + a live vision capture)

Two independent sky layers both brighten toward the view center:

- **Edges** (the thin lines connecting the bright stars): `scene.ts:1490
updateConstellationHighlight` drives opacity from `CONSTELLATION_BASE_OPACITY
0.28` → `CONSTELLATION_PEAK_OPACITY 1.0` (blue `0x8fb0ff`); a picked
  constellation pulses at full opacity in green.
- **Figures** (the dense Stellarium art plates): `scene.ts:1446
updateConstellationFigureHighlights` drives each plate from the label curve
  but hard-caps it at a **magic `0.85`**:

  ```ts
  const t = Math.min(0.85, constellationLabelOpacity(emph)) * presence;
  ```

At view-center the plates sit at **0.85** while the edges are at **1.0** — but
the figures are a _dense_ high-ink illustration, so at 0.85 they read as a
solid, opaque wash that competes with (and visually swamps) the thin line
segments.

Live "before" (`.baseline/p7-uma-fig-before.png`, Ursa Major picked + figures
on, labels off): vision confirms the figures are "large, opaque, high-contrast,
far brighter and more eye-catching than the star points or the connecting
lines" and the thin lines are "hard to distinguish... the dense figure art
competes with and largely obscures the stick-figure asterism lines."

The cap comment already states the design intent — plates are meant to be "a
SOFT UNDERLAY; the star lines and name labels stay primary" — but **0.85 is
too high** for that intent: it's only 15% below the line peak, so the dense
art still wins.

## Fix

Extract the plate cap into a named constant and lower it, so the dense art
recedes behind the lines at every emphasis level:

- `scene.ts:~837` — add `export const FIGURE_PLATE_MAX_OPACITY = 0.5` with a
  comment explaining it is the soft-underlay cap that keeps the lines primary.
- `scene.ts:1461` — `Math.min(0.85, ...)` → `Math.min(FIGURE_PLATE_MAX_OPACITY, ...)`.

**Why 0.5:** the lines reach 1.0 at view-center; the plates now peak at 0.5,
half the lines' peak. Because the plates are dense art, 0.5 is still clearly
visible as a soft illustration, but the thin edge lines (1.0, plus the green
picked emphasis) now read as the primary layer — the asterism is traceable.
0.5 is also the natural midpoint between the plate's old 0.85 (too strong) and
the "recede" floor, and leaves headroom: if it's still a touch strong the cap
is a one-line tune.

Picked-constellation emphasis is untouched: the green lines still pulse at
full opacity, so the user's explicit pick remains dominant — this only lowers
the _art_, never the _lines_.

### 2. Render order — the plates paint OVER the lines (the occlusion)

Dimming alone is not enough: the figure plates are added to the scene **after**
the line group (`scene.ts:362` lines, `:366` figures), and in three.js the
transparent pass draws equal-depth objects in object order — so the dense
plates paint **over** the thin edge lines wherever they overlap, physically
burying them. Vision on the 0.85 vs 0.5 A/B confirmed this: the lines are
"partially masked by the opaque illustration" where they cross a plate.

Fix: give the constellation **lines** (and the star dots + picked-emphasis
markers) a `renderOrder` above the figure plates, so the edges are never
buried — the direct guarantee the user asked for. The plates become a true
underlay: dimmer (cap 0.5) AND strictly behind the lines.

## Files

- `src/render/scene.ts` — new `FIGURE_PLATE_MAX_OPACITY` constant (0.85 magic
  → 0.5) + use it in `updateConstellationFigureHighlights`; set
  `renderOrder` on the line/star/emphasis objects above the plates.
- `tests/constellationLabels.test.ts` — add a unit test asserting the plate cap
  is a soft underlay strictly below the line peak (`FIGURE_PLATE_MAX_OPACITY
< CONSTELLATION_PEAK_OPACITY`).

## Verification

- Gates: test / tsc / lint / format / build.
- Live before/after vision on the same Ursa Major pick + figures-on frame:
  - before: figures opaque/dominant, edges hard to trace (captured).
  - after: figures visibly dimmer, thin edges clearly traceable through/around
    the art; the picked green lines still dominant.
