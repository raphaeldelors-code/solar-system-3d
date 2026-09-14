# Plan 042 — Constellation line halo (readable edges over the figure art)

## Problem (user feedback, 2026-09-13, live mobile screenshot)

Task 7 (plan 040) fixed the layering: the line objects now render ABOVE the
figure plates and the art is capped at `FIGURE_PLATE_MAX_OPACITY = 0.5`. But
the user reports the constellation **edges** are still hard to read over the
figures. The failure mode: `LineBasicMaterial` edges are a fixed ~1 device px
of pale blue (`#8fb0ff`). Where that hairline crosses a large, bright,
high-luminance cream figure fill (Ursa Major's body, Leo's sickle, Lynx's
torso, Lyra's frame, Sagittarius's bow) the blue-on-cream contrast is too low
and the line "disappears." The lines read fine on the black sky — the problem
is strictly line-vs-cream-fill contrast.

A pure CSS/2D halo cannot work: the label overlay (`#cst-labels`, z-index 5)
sits ABOVE the WebGL canvas, so anything drawn there would float over the
plate, not between the plate and the line. The halo must live in the same
transparent pass as the lines, one renderOrder below them.

## Root cause of the earlier draft being wrong

The first design draft assumed a wider halo line could be made by scaling the
line's endpoints radially in 3D — that only _moves_ a 1px line, it does not
thicken it (WebGL `Line`/`LineSegments` are a fixed 1 device px on every
platform). The correct primitive is three's fat-line addon
**`LineSegments2` + `LineSegmentsGeometry` + `LineMaterial`** from
`three/examples/jsm/lines/*`, which renders a true 2-D-width line.

**Why the SEGMENTS variant and NOT `Line2` + `LineGeometry`:** `c.lines` is a
list of **disconnected** `[a,b]` index pairs. The flat vertex array built from
it (`[A0,B0, A1,B1, A2,B2, …]`) is exactly what `THREE.LineSegments` (the 1px
core) reads as independent pairs. `Line2` + `LineGeometry` reads the same
array as **one connected polyline** (A0→B0→A1→B1→…), stitching a spurious line
from each segment's end to the next segment's start — the "more connections"
regression the user reported on the first deployed build. `LineSegments2` +
`LineSegmentsGeometry` (the segments variants of the same addon) take the
identical flat pair list and draw each segment independently, matching the
original topology one-for-one. The first deployed build (commit `b53255c`)
used `Line2`/`LineGeometry` by mistake; fixed in commit `7c39162`.

## Design (as built)

Per constellation, THREE line objects are drawn in the same transparent pass,
stacked by an explicit `renderOrder` split (three sorts by renderOrder before
insertion order, so the stack is deterministic):

| object                  | type / material                             | width          | renderOrder | name                              |
| ----------------------- | ------------------------------------------- | -------------- | ----------- | --------------------------------- |
| figure plates           | `Mesh` / `MeshBasicMaterial` (plan 007)     | —              | 0           | `constellation-figure:<name>`     |
| dark halo under-stroke  | `LineSegments2` / `LineMaterial` (plan 042) | 11 world units | 1           | `constellation-lines-halo:<name>` |
| fat blue line (primary) | `LineSegments2` / `LineMaterial` (plan 042) | 8 world units  | 2           | `constellation-lines:<name>`      |
| 1px core line (crisp)   | `LineSegments` / `LineBasicMaterial`        | 1 device px    | 3           | `constellation-lines-core:<name>` |
| star dots + emphasis    | `Points` (existing)                         | —              | 4           | `constellation-stars*`            |

- **Widths are WORLD units** (`LineMaterial` `worldUnits: true`). The dome is
  at a fixed radius (`CONSTELLATION_RADIUS`) and the sky-view camera sits ~4800
  units out, so a world-unit width projects to a roughly constant screen px at
  the usual view and scales with zoom like everything else in the scene.
  `worldUnits: true` means the `resolution` uniform is ignored, so it is set to
  `(1,1)` (no `window` dependency — the code runs under `node` in tests).
- **Fat blue line (8 units ≈ 1.4 CSS px @ 4800):** the PRIMARY visible stroke.
  A 1px WebGL line is a hairline on the cream plates; a true 8-unit fat line
  gives a solid, traceable blue edge. The 1px `LineBasicMaterial` core is kept
  on top (renderOrder 3) for a crisp centre line and is what main.ts's
  `find('constellation-lines:<name>')`-style lookups still resolve.
- **Dark halo (11 units ≈ 2.0 CSS px), PURE BLACK `0x000000`:** ~0.3px wider on
  each side of the fat blue line. Over the cream fill it cuts a dark groove —
  blue line / black rim / cream — which is what carries the contrast. Over the
  black sky, **black-on-black is invisible**, so the halo adds NO "fat grey
  line" side effect (verified: the first near-black `#0a0f18` halo _did_ read as
  a visible grey stroke on the open sky; switching to pure black removed it).
- **Halo width is only just wider than the fat line** (`11 vs 8`): a much wider
  halo reintroduces the fat-line/grey-ghost artifact, so the rim is kept thin.

### Opacity (mirrors the blue-line D4 curve)

`haloOpacity = (HALO_BASE + (HALO_PEAK - HALO_BASE) * emph) * presence`

- `CONSTELLATION_LINE_HALO_BASE_OPACITY = 0.45`, `_PEAK_OPACITY = 0.7`
- Picked figure: the halo shares the blue line's full emphasis pulse
  (`constellationEmphasisOpacity(tSec)`), exactly as the fat/core lines do.

All line objects (core + fat + halo) are driven by the SAME per-figure D4 /
pick math in `updateConstellationHighlight`; the loop resolves the
per-constellation index from each object's NAME and computes the emphasis once,
then applies it to the matching material. The halo name
(`constellation-lines-halo:`) is tested **before** the generic
`constellation-lines:` prefix (it is a super-string), so it short-circuits to
its own branch and is never swallowed by the fat-line branch.

Constants exported; unit test pins the halo to pure black, the width/opacity
bands, and the 3-object renderOrder stack.

## Change surface

1. `src/render/scene.ts`
   - imports: `LineSegments2`, `LineSegmentsGeometry`, `LineMaterial` from
     `three/examples/jsm/lines/*` (the **segments** variants — see "Root
     cause" above for why not `Line2`/`LineGeometry`).
   - new exports: `CONSTELLATION_LINE_HALO_COLOR = 0x000000`,
     `CONSTELLATION_LINE_HALO_BASE_OPACITY = 0.45`,
     `CONSTELLATION_LINE_HALO_PEAK_OPACITY = 0.7`,
     `CONSTELLATION_LINE_FAT_WIDTH = 8`, `CONSTELLATION_LINE_HALO_WIDTH = 11`.
   - `buildConstellations()`: per constellation — a fat `LineSegments2` (blue,
     `constellation-lines:<name>`, renderOrder 2) and a halo `LineSegments2`
     (black, `constellation-lines-halo:<name>`, renderOrder 1) added alongside
     the existing 1px core `LineSegments` (renamed
     `constellation-lines-core:<name>`, renderOrder 3). Star dots + emphasis
     dots bumped to renderOrder 4. All geometry/materials tracked for disposal;
     halo `worldUnits: true`, `resolution (1,1)`.
   - `updateConstellationHighlight()`: per-child loop extended — halo branch
     (tested first) + fat branch + core branch, all on the shared emph/presence
     math; picked figures take the full emphasis pulse on all three.
2. `tests/constellations.test.ts` — new `describe('plan 042 …')`: halo is pure
   black, halo width just-wider-than-fat, halo opacity in a subtle band, the
   3 line objects exist with the correct renderOrder/width/worldUnits/colors,
   **and a topology lock** asserting the fat line + halo geometries are
   `LineSegmentsGeometry` (an `instanceStart` attribute present) whose
   `instanceStart.count` equals the constellation's link count (21 for Ursa
   Major) — so each segment maps 1:1 to an asterism link and a regression to
   `Line2`/`LineGeometry` (connected polyline, no `instanceStart`) fails.

## Verification (live headless Chrome, plan 040 framing)

- Mobile portrait 900×1200 @ dpr 2, `?intro=0&fig=1&l=0&o=0&b=0&p=1&sp=…&t=…`
  with a `cam=` pointing the view axis at Ursa Major's centroid (RA 11.2h,
  Dec +51°). No body flight (the camera is set directly, avoiding the
  SwiftShader wedge).
- Plates are D4-distance-faded; at the sky view they sit at the 0.5 emphasis
  cap. To isolate the "lines over BRIGHT cream" worst case, the capture forces
  all 87 plates to opacity 1 via a temporary `window.__debugBuilt` scene handle
  (removed before commit) — the deployed opacity system is untouched.
- A/B in the SAME scene: BEFORE hides the fat+halo `LineSegments2`s (leaves
  only the 1px core = today's task-7 look); AFTER shows all three. `visible`
  is toggled (the per-frame loop does not reset it), so the two frames
  genuinely differ. The post-fix A/B (core-only vs core+fat+halo) confirms
  **identical star-to-star connections** in both — the fat/halo strokes are
  only wider, no stitched "extra connections" (the original `Line2` bug).
- Result (vision A/B, cream + black-sky both assessed):
  - **Line readability over the cream figure: 3/10 → 8/10.** The black halo
    creates a dark rim that keeps the blue line legible over the brightest
    cream; no segment fully fails.
  - **On the black sky: the pure-black halo is invisible (no grey-line
    artifact).** A native-resolution crop confirmed no dark rim/ghost/doubling
    — the blue-to-black transition is normal anti-aliasing of a slightly wider
    stroke, not a halo edge.
  - The initial near-black `#0a0f18` halo was A/B-verified to REGRESS the open
    sky (visible fat grey line); the pure-black `0x000000` version fixed it.

## Commit plan

1. Feature: `fix(sky): dark halo under constellation lines for cream-plate
contrast (plan 042)` — `src/render/scene.ts` + `tests/constellations.test.ts`
   - `plans/042-…md`.
2. Docs: `docs(plan-042): task index — constellation line halo (commit <sha>)`.
3. Push → CI auto-deploy → verify the live bundle is byte-identical to local
   `dist/` and contains the segments-variant markers (`instanceStart`,
   `constellation-lines-halo`, the fat-line `worldUnits`) and that no
   `__debugBuilt` capture handle remains in the source/bundle.

## Post-fix note (2026-09-13)

The first deployed build (`b53255c`) used `Line2` + `LineGeometry`, which
stitched a spurious line between every unrelated asterism segment — the user
reported "more connections." Fixed in `7c39162` by switching to
`LineSegments2` + `LineSegmentsGeometry` (segments variant, identical flat
input, disconnected segments). A topology regression test now locks the
segment count to the data's link count.
