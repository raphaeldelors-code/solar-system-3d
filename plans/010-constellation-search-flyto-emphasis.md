# Plan 010 — Constellation search, fly-to, and line emphasis (S4)

## User request (verbatim, 2026-08-23)

> "add constellations to the search feature and when picked we should also
> have a camera travel that let us visualise it clearly maybe from the sky
> vue, center camera on it + emphasize the constellation lines with a
> specific color or something"

Three deliverables:

- **A** — the `#find` combobox lists all 88 constellations alongside bodies.
- **B** — picking a constellation flies the camera to a _sky-dome view_
  centered on the figure, framed so the whole figure is clearly visible.
- **C** — the picked constellation's lines are emphasized with a distinct
  color (plus a soft pulse); the emphasis clears when the user picks
  anything else.

## Current state (what we build on)

- **Search** (`src/data/searchIndex.ts`, pure): `searchBodies(bodies, query)`
  → ranked `SearchHit[]`; `groupedBodyMenu(bodies)` = display order.
  `main.ts` `findRender(query)` builds the dropdown (Free camera + grouped
  bodies when empty; ranked hits otherwise); `findPick(id)` →
  `camAnchorForBody(id)` → `flyTo(dest, 1.4, id)`.
- **Flight** (`src/render/cameraFlight.ts`, pure): `CamAnchor {pos, target,
fov?}`; `makeFlight`/`stepFlight` ease target+offset+FOV (cubic in/out).
  The Sky anchor (`frameConstellations`) = camera ~0.82×dome radius inside
  the shell, target origin, FOV 120.
- **Constellations** (`src/render/scene.ts`): per-constellation
  `LineSegments` (`constellation-lines:<Name>`, own
  `LineBasicMaterial` 0x8fb0ff, depthWrite false) + name-label
  `Sprite` (`constellation-label:<Name>`), all in a group; one shared
  `Points` (`constellation-stars`, 757 dots) fades with presence.
  `constellationCenter(c)` = unit direction of the figure's centroid;
  `constellationLabelPose(c).halfExtent` = far-tip angular half-extent
  along the principal axis (radians); `constellationEmphasis(center,
viewDir)` = D4 proximity 0..1 (22° in / 48° out);
  `updateConstellationHighlight(group, emphases, presence)` writes the
  per-material opacity at ~5 Hz, pose-gated.
- `flyTo(dest, duration, bodyId, sky)` in main.ts; `followId` = body being
  tracked (null for global anchors); `__solar` debug handle (scene/camera/
  renderer/bodies/…); URL state in `src/state/urlState.ts` (pure,
  `encodeAppState`/`parseAppState`, `cam` param already exists).

## Design

### A. Constellation search — new pure module

`src/data/constellationSearch.ts` (no three, no DOM — Node-testable):

- `constellationMenu(): ConstellationHit[]` — all 88 in
  `CONSTELLATIONS` order, `{ id: 'const:<Name>', name, sub:
'constellation' }`.
- `searchConstellations(query): ConstellationHit[]` — same scoring style as
  `searchIndex` (exact name > prefix > substring, case/space-insensitive,
  shorter names break ties). Empty query → full menu.
- No parent/alias complexity — a constellation's name is the only key.

**Dropdown merge in `main.ts` `findRender`:**

- Empty query: Free camera row → grouped body menu (as today) → a
  non-clickable section header row "Constellations" → 88 constellation
  rows. (Dropdown already scrolls, `max-height: 280px`.)
- Non-empty query: rank bodies and constellations independently, then
  interleave by descending score (stable within a source) — typing "ori"
  surfaces Orion above unrelated rows, "luna" still lands on Luna.
- Constellation rows get `class "fr fr-const"` with a ✦ marker via CSS
  (`#find-list .fr-const .fr-name::before { content: '✦ '; color:
var(--accent-gold) }`) so the two row kinds read at a glance.

### B. Constellation fly-to

Pure anchor builder in `cameraFlight.ts` (keeps the flight layer three-free):

```
frameConstellation(centerDir, halfExtentRad, domeRadius, camDist, aspect,
                   fill = 0.55, minFov = 6, maxFov = 120): CamAnchor
```

- **Geometry — sky-dome view, sun kept out of frame:** the camera sits on
  the figure's own direction line, `pos = centerDir × camDist`
  (`camDist = 700`), looking at `target = centerDir × domeRadius`
  (domeRadius 4800). The Sun at the origin is then directly _behind_ the
  camera (never in view), the figure is dead-center, and the view is the
  natural inside-the-dome perspective. No roll change: `up = (0,1,0)`,
  OrbitControls resumes normally from the landed pose.
- **FOV = the zoom knob.** The figure's apparent half-extent from a camera
  at distance `camDist` inside the dome is
  `h = (halfExtentRad × domeRadius / (domeRadius − camDist)) / fill`
  (the R/(R−d) ≈ 1.17 perspective factor is absorbed so the far tip lands
  at ~55% of the view's smaller axis, same "safe margin" philosophy as
  `frameBody`'s BODY_FILL). Solve for the vertical FOV so the tighter of
  the two screen axes covers `h`:
  `fov = clamp(2 × max(deg(h), deg(atan(h / aspect))) × … , minFov, maxFov)`
  (landscape: vertical governs; portrait: horizontal is tighter and
  `atan(h/aspect)` wins). Small figures → small FOV = zoomed in, the
  figure fills the view; huge figures (Hydra ~130°) clamp at 120° and can
  be panned.
- main.ts `flyToConstellation(name)`: look up the constellation, compute
  `constellationCenter` + `constellationLabelPose().halfExtent`, build the
  anchor with the live `built.camera.aspect`, `flyTo(anchor, 1.6)`,
  `followId = ''` (the sky is fixed — nothing to track),
  `setSelectedConstellation(name)`.

### C. Line emphasis (color + pulse)

- New export in `scene.ts`: `CONSTELLATION_EMPHASIS_COLOR = 0xffc46b`
  (warm gold — max contrast against the 0x8fb0ff sky blue) and
  `CONSTELLATION_EMPHASIS_PULSE = 0.15` (opacity swings 1.0 ± 0.15 at
  0.4 Hz, a gentle breathing that marks "this is the one").
- `updateConstellationHighlight(group, emphases, presence, selectedName?)`
  gains an optional last arg:
  - selected line mesh → `material.color = emphasis gold`,
    `opacity = (1 − pulse×(1+sin(2π·0.4·t))/2) × presence` (t passed in or
    computed; base 1.0, floor 0.85);
  - selected label sprite → forced peak opacity `1 × presence` (labels are
    white-ish, so opacity alone reads as emphasis);
  - every other line/label → exactly today's D4 behavior (blue, base+emph
    curve). Resetting `selectedName` to undefined restores default color
    (`material.color` set back to the base line color — stored on the
    material as `userData.baseColor` at build time so the reset is
    exact).
- The throttled 5 Hz highlight keeps running; when a selection is active,
  the frame loop also writes the pulse's one material.opacity per frame
  (pose-independent, so it keeps breathing while idle).
- **State + clearing** in main.ts: `selectedConstellation: string | null`.
  Set only by `flyToConstellation`. Cleared (→ `null`) by: Free camera
  pick, any body pick / anchor fly / event-body fly / scene click (all
  funnel through `flyTo` — clear there when `bodyId` is set or the dest is
  a global anchor), and on URL restore. `findLabel` learns the `const:`
  prefix so the input shows the name while selected.
- **Star dots (nice-to-have, cheap path):** on selection, add one small
  overlay `THREE.Points` of just that constellation's dots in the
  emphasis color (size ~2.2× the base dots) to the scene; remove+dispose on
  deselect and on `rebuildScene`. Skipped if it fights the render loop —
  the gold lines + bright label are the core emphasis.

### URL sharing (consistent with the app's shareable-view model)

`urlState.ts`: optional `c` param = constellation name.
`captureState` includes `constellation: selectedConstellation`; restore
re-selects (validates against `CONSTELLATIONS`), snaps the camera to
`frameConstellation`'s anchor immediately (no flight on load), and sets the
find input. Cheap, and "share a link to Orion" just works.

### Tests (all Node / vitest)

- `tests/constellationSearch.test.ts` (new): empty query → 88 in data
  order with `const:` ids; "ori" → Orion ranked first; case-insensitive
  ("orion", "ORION", "o r i o n" spaces); unknown query → []; no
  cross-contamination (a body-named query doesn't match a constellation).
- `tests/cameraFlight.test.ts` (extend): `frameConstellation` — target
  exactly on `centerDir × domeRadius`; pos on the same ray at `camDist`
  (sun behind camera: `pos·centerDir > 0` and `|pos| < |target|`); FOV
  monotonic in halfExtent; portrait aspect (0.6) → wider FOV than
  landscape (1.6) for the same figure; clamps [6, 120] hold (tiny Fornax
  → 6, Hydra → 120); aspect 1 → vertical-governed value.
- `tests/constellations.test.ts` (extend): `updateConstellationHighlight`
  with `selectedName` — selected line material color === gold, opacity
  within [0.85, 1.0]; all other line colors === base 0x8fb0ff; selected
  label at peak; calling again with `undefined` resets the selected
  material's color to base (assert the exact reset).

### Browser verification (CDP, real find path)

1. Type "ori" into `#find` → an Orion row exists; type "leo" → Leo row.
2. Click the Orion row → wait for the flight to land; then assert via
   `__solar`: camera→target direction ≈ `constellationCenter(Orion)` within
   1°; FOV within [6, 120]; project every Orion star through the camera
   into NDC — all |ndc| ≤ 0.95 (whole figure visible with margin);
   `constellation-lines:Orion` material color === gold; a second
   constellation (Cygnus) still at base color.
3. Pick a planet from `#find` → Orion's lines back to base blue,
   `__solar.selectedConstellation === null`.
4. Portrait resize (narrow aspect) → fly to Leo, figure still in-frame
   (NDC check).

## Files touched

- NEW `src/data/constellationSearch.ts`
- `src/render/cameraFlight.ts` (+ `frameConstellation`)
- `src/render/scene.ts` (emphasis color/pulse, `updateConstellationHighlight`
  selected arg, baseColor userData at build)
- `src/main.ts` (find merge, `flyToConstellation`, selection state +
  clearing, pulse write, `__solar.selectedConstellation`, URL wiring)
- `src/state/urlState.ts` (+ `c` param)
- `index.html` (CSS: `.fr-const` ✦ marker + gold accent; find placeholder
  text)
- `tests/constellationSearch.test.ts` (new), `tests/cameraFlight.test.ts`,
  `tests/constellations.test.ts`

## Gates (per feature)

prettier --write ALL changed files **including this plan md** (CI runs
`npx prettier --check .` over the whole repo) → `npm run lint` →
`npx vitest run` → `npm run build` → CDP verification → commit → push.

## Out of scope

- S1-followup (83 remaining Bode figures) — separate plan, after this
  lands.
- Constellation info panel (mythology etc.) — not requested.
