# Plan 016 — Screen-space constellation labels + apple-green emphasis + Serpens plate removal

User requests (2026-08-27, Telegram):

1. **"the labels visualisation is still really bad. There is even a flickering
   effect when the camera move and the label goes through the figure. Maybe it's
   time to rethink completely the label design and implementation to make it
   clean looking."** → full redesign of the constellation name-label system.
2. (same batch, earlier) highlight color → **light apple green** ("veri visible"),
   highlighted constellation's **stars highlighted better**, name **label
   colorized** to match.
3. (same batch, earlier) "an old snake ugly SVG I think we generated sitting on
   top of the hercules SVG that already holds the snake in his hand… make sure
   we have not this duplicate elsewhere too" → audit all 88 figure plates,
   remove the duplicate.

## Root causes (verified in the current code, 2026-08-27)

Current labels (plan 003 P3 → 004 Q1 → 006 → 008 S2 → 015 P4): one
`THREE.Sprite` per constellation in `buildConstellations` (`src/render/scene.ts`
~1183–1215), canvas-drawn Georgia serif caps + hairline flourish
(`makeConstellationNameTexture`, `textures.ts`), anchored at
`placement.dir * (CONSTELLATION_RADIUS - 90)` (dir = the plan-006 static
anti-overlap solver), constant scene-unit scale (constant ANGULAR size),
`depthTest: true` (plan 008 S2).

1. **Flicker** = two independent stepping sources during camera motion:
   (a) the whole highlight/label pass (`updateConstellationHighlightThrottled`,
   `main.ts`) runs at **200 ms intervals** (5 Hz) and only when the pose key
   (pos to 2 decimals + quat.w to 3) changes → label opacity steps 5×/s while
   dragging; (b) `depthTest: true` on a sprite 90 units in front of the figure
   plane → as the camera orbits, the sprite plane crosses in front of/behind
   the figure-plane and star-line geometry, popping between occluded/visible.
2. **"Label goes through the figure"** = parallax: the label is a 3D plane at a
   FIXED point on the dome. With the plan-015 P2 360° trackball the camera can
   orbit so the figure artwork lies between the eye and the label anchor — the
   name literally slices through the figure. The plan-015 P4 far-cap +
   `labelCoversOwnFigure` guard only constrains the STATIC anchor; it cannot
   stop a moving eye from threading figure ink between itself and a fixed 3D
   label. Any 3D-anchored label has this failure; it is intrinsic.

## Design: screen-space 2D-canvas label layer (P1)

Replace the 88 label sprites with ONE 2D overlay `<canvas>` (id `#cst-labels`)
layered over the WebGL canvas (`pointer-events: none`, below the `#panel`
z-index 10). Every frame (unthrottled, 60 fps) it projects each constellation's
solver anchor `dir` (unchanged plan-006 math — "beside the figure" side/margin
is preserved and stays unit-tested) to screen pixels and draws the name with
`globalAlpha = constellationLabelOpacity(emph) * presence`.

Why a 2D canvas (not DOM divs): the existing **"Save screenshot"** button
exports the WebGL canvas via `canvas.toBlob()` — DOM labels would silently
disappear from every saved screenshot. With a 2D canvas the screenshot handler
composites the two canvases into one PNG (one `drawImage`), keeping the feature
intact. Single rendering path, trivial cost (clear + ≤~20 `drawImage`s of cached
512×128 name canvases).

Properties gained:

- labels never intersect 3D geometry → **no "through the figure"**, by
  construction (they are drawn on top in 2D);
- position + opacity computed **every frame** at display rate → **no
  step-flicker** (emphases recomputed per frame — 88 dot products, ~µs; the
  5 Hz throttle stays for the _material_ updates of lines/stars/figures only);
- constant PIXEL size (one font size, no angular tiers, no zoom blowups);
- correct occlusion by bodies kept from plan 008 S2 via a per-label raycast
  (shared `Raycaster` vs `bodyMeshes()`; a hit closer than the anchor dims the
  label to 0) — only for labels above ~0.02 opacity on-screen (≪20 raycasts);
- screenshot parity (composite above).

### P1 — `feat(sky): screen-space constellation name labels (canvas overlay)`

- `src/render/textures.ts`: extract the name drawing into
  `drawConstellationName(ctx, name)` (same lettering + flourish as today);
  `makeConstellationNameTexture` becomes a thin wrapper (kept; still exported).
- NEW `src/render/constellationScreenLabels.ts`:
  - `createConstellationLabelLayer(webglCanvas): ScreenLabelLayer` — creates
    `#cst-labels` (absolute, inset 0, `pointer-events:none`, z-index 5,
    `position:relative` parent fallback), appends after the WebGL canvas;
    returns `{ canvas, setVisible(v), dispose() }`.
  - `projectSkyDir(dir, camera, wCss, hCss, scratchV3): {x, y, ok}` — PURE
    (three Vector3/PerspectiveCamera construct in Node per
    threejs-node-testing). World point `dir * CONSTELLATION_RADIUS` → view
    space (behind camera → `ok:false`) → NDC → CSS px.
  - `nameCanvas(name): HTMLCanvasElement` — cached 512×128 offscreen canvas via
    `drawConstellationName`.
  - `updateConstellationScreenLabels(layer, camera, dirs, emphases, presence,
selectedIdx, nearestIdx, isOccluded(dir)): void` — resize canvas to
    clientSize × dpr (dpr = min(devicePixelRatio,2), same as the renderer),
    clear, per label: project; `op = constellationLabelOpacity(emph) *
presence`; draw if `op > 0.015` and on-screen and not occluded, at constant
    height (28 px) centered on the projected point. `selectedIdx`/`nearestIdx`
    draw the name in the emphasis color (P2 wires the green variant; P1 keeps
    the base variant for both so the function shape is final).
  - No per-frame allocation: one scratch `THREE.Vector3`, cached name canvases.
- `src/render/scene.ts` `buildConstellations`: remove the sprite creation
  (lines ~1183–1215) + its dispose; expose `group.userData.labelDirs =
placements.map(p => p.dir)` (the solver output the 2D layer needs). Remove
  the `THREE.Sprite` branch of `updateConstellationHighlight` (dead).
- `src/main.ts`:
  - create the layer once (after `rebuildScene`; the `#app` canvas element
    persists across scale rebuilds); expose on `__solar` as `labelLayer` for
    CDP checks;
  - compute `CONSTELLATION_EMPHASES` **every frame** (the 88-dot-product loop
    moves out of the 200 ms throttle into the frame loop; the MATERIAL update
    `updateConstellationHighlight` stays 5 Hz pose-gated);
  - after `renderer.render`, call `updateConstellationScreenLabels(...)` when
    `labelsEl.checked` (else the layer is hidden — zero cost);
  - occlusion: shared `Raycaster` + existing `bodyMeshes()`; per visible label
    ray from camera to `dir * CONSTELLATION_RADIUS`, hit → occluded;
  - `applyToggles`: `labelsEl.checked` → `layer.setVisible(...)` (replaces the
    `child.name.startsWith('constellation-label:')` loop);
  - **screenshot**: composite — temp canvas sized like the WebGL canvas,
    `drawImage(webgl)` + `drawImage(labelLayer.canvas)`, `toBlob` from the
    composite (feature preserved with the new labels).
- `index.html`: nothing required (styles set in JS), + maybe a `<canvas>`
  comment. (CSS kept in JS to avoid a second edit surface.)

Tests:

- NEW `tests/constellationScreenLabels.test.ts`: `projectSkyDir` (center dir →
  center px; off-axis dir → correct px against a known camera; behind camera →
  `ok:false`; pure-math checks with a fixed PerspectiveCamera);
  `updateConstellationScreenLabels` opacity gating (op ≤ 0.015 → not drawn:
  assert via a fake ctx counting `drawImage` calls; off-screen → not drawn;
  occluded → not drawn).
- `tests/constellationPresence.test.ts`: remove the label-sprite assertions
  (sprites no longer exist) — keep lines + star-dots; add the emph-stars
  assertions in P2's commit.
- `tests/constellationLabels.test.ts` (solver / margin / height / width /
  opacity curve) untouched — the dir math is reused verbatim.

Gate: `npm test`, `tsc`, `vite build`, `prettier --check .` green; CDP sweep
(winter + Hydra + Hercules) shows: stable labels at 60 fps (no opacity
stepping), labels never intersecting figure ink, correct occlusion behind
Saturn/Sun, screenshot PNG contains the labels.

### P2 — `feat(sky): apple-green emphasis + glowing constellation stars`

- `CONSTELLATION_EMPHASIS_COLOR` `0xffc46b` (warm gold) → **`0x7cfc5a` (light
  apple green, 124/252/90)** — highly visible on the dark blue sky. Single
  constant: picked lines, nearest-line lerp (`proximityGoldMix` curve unchanged),
  emphasis stars, and the label variant all follow.
- **Stars of the emphasized constellation glow**: the shared `constellation-stars`
  `Points` (one opacity, size 3.2, blue-white) cannot highlight one
  constellation. Add per-constellation overlay `Points`
  `constellation-stars-emph:<name>` in `buildConstellations` (positions = the
  already-computed per-constellation `pos`), green `0x7cfc5a`,
  `sizeAttenuation:false`, `size 5.2`, `depthWrite:false`, placed at
  `CONSTELLATION_RADIUS + 4` (in front of lines, no z-fight), `visible=false`
  when idle. In `updateConstellationHighlight`: picked → opacity
  `constellationEmphasisOpacity(tSec)` (the same breathing pulse as its lines),
  nearest → opacity `proximityGoldMix(emph, isNearest, false)`, else 0 — so the
  highlighted constellation's stars clearly bloom green, in step with its
  lines. (88 tiny Points, invisible unless active — negligible.)
- **Colorized label**: the picked + nearest label draws with the green name
  variant (cached green canvas: same lettering, green core + green glow,
  flourish green-tinted) via `nameCanvas(name, 'green')`.
- `tests/constellations.test.ts`: `proximityGoldMix` shape tests unchanged
  (curve, not hex) — add a test pinning
  `CONSTELLATION_EMPHASIS_COLOR` to the green (G is the max channel, R < G, B < G).
- `tests/constellationPresence.test.ts`: fake sky gains the emph-Points; assert
  picked → pulse opacity, others → 0, presence multiplies.
- `p015/check_gold.js`: add `p016/check_green.js` with the green linear
  expected tuple (three reports linear working-space colors).

Gate: CDP — aim at Orion: lines green + stars visibly brighter green (pixel
probe), name label green; pan to a non-highlighted region: blue lines, dim
blue-white stars, base-colored label; screenshot shows the green label.

### P3 — `fix(figures): remove generated Serpens silhouette (duplicates Ophiuchus' snake)`

**Audit evidence** (2026-08-27; ink-on-ink on the sky, `p016/audit_global.py`,
cKDTree, 0.4° window; plate composites vision-verified):

- The only **generated** plates are the plan-012 trio: **Serpens, Puppis, Vela**
  (flat cream silhouettes, `#e0c0a0` ink; the other 85 are Stellarium
  line-art).
- **Serpens is the duplicate.** The Ophiuchus Stellarium plate ALREADY contains
  a full serpent (head raised at his shoulder, body coiled around his waist,
  tail held in both hands — vision-verified from the plate itself), and the
  Hercules plate contains its own two snakes. The generated Serpens silhouette
  is the #5 ink-on-ink overlap in the whole sky (≈48 k overlapping ink points
  with Ophiuchus, plus ≈44 k with the adjacent Libra plate) — the "old ugly
  generated snake sitting on top of a figure that already holds the snake" the
  user saw (they spotted it in the Hercules region, which sits beside
  Ophiuchus/Serpens and has its own snakes too).
- **Puppis + Vela: NO duplicate — kept.** Vision-verified the Argo-Navis split:
  the Carina plate is only 2 sails+masts (no hull/stern), Vela (hull+cabin+1
  sail) and Puppis (ornate stern+1 sail) each add parts no other plate shows.
  Sails appear in all three (mild, unavoidable for the historical split), but
  no plate duplicates a whole other plate.
- All other audit pairs (Canis Minor/Monoceros, Dorado/Reticulum,
  Corona Australis/Sagittarius, …) are adjacent-constellation Stellarium plates
  whose art naturally extends across the IAU border — pre-existing, expected,
  not generated duplicates. Nothing else to remove.

Fix (data deletion, zero code): `git rm public/constellation-figures/serpens.png`

- delete the Serpens entry from `FIGURE_FITS` in `src/data/figures.ts`. The
  serpent the sky shows is Ophiuchus' own registered art (and Hercules' snakes),
  so the region still has its snake — one clean, star-registered one.

* `tests/figures.test.ts`: 88 → **87** (+ 87 unique; document the deliberate
  omission in the test); `findFigureFit('Serpens')` now `undefined` (assert);
  `findFigureFit('Puppis')` still defined.
* Re-run `p016/audit_global.py`: Serpens×Ophiuchus / Serpens×Libra pairs gone;
  no new pair enters the top 5.

Gate: gates green; CDP Figures-on shot of 16.5–17.5 h / 0±15°: a single
star-registered snake (Ophiuchus), no flat cream duplicate; `serpens.png`
404s.

### P4 — `docs`: record P1–P3 hashes, flip todo lines, live-deploy verify.

## Conventions

- One feature in the tree at a time; gates green → commit → push → next.
- Conventional-commit subjects above. `npx prettier --write` on every changed
  file (incl. this `.md` + `todo.md`) BEFORE each commit (CI runs
  `prettier --check .` over the whole repo).
- No per-figure hand-tuning: P3 is a data deletion, P1/P2 are one-algorithm
  changes (same solver dirs, same emphasis curves, one color constant).
- Record hashes in the follow-up `docs:` commit (P4), never `--amend`.

## Verify (headless)

- Gates per feature (`npm test`, `tsc`, `vite build`, `prettier --check .`).
- CDP (preview :4173, `p016/shot4.js` + `p016/sweep.js`): labels stable during a
  7-frame camera sweep (no opacity stepping / no parallax slicing), never on
  figure ink, green when picked/nearest, stars blooming green, Saturn/Sun
  occlusion, and a composited **screenshot** containing the labels.
- Live deploy: poll GH Actions to `completed success`, grep the deployed bundle
  for `cst-labels` + the green constant; `serpens.png` 404s on the live site.
