# AGENTS.md — solar-system-3d

Guidance for AI agents (and humans) working in this repo.

## Commands

```bash
npm install          # once
npm test             # vitest, node-only, fast — run before EVERY commit
npm run dev          # vite dev server → http://localhost:5173
npm run build        # tsc --noEmit (strict) + vite build — must stay green
npm run lint         # ESLint (src/tests TS + public/sw.js JS) — must stay green
npm run format:check # Prettier style check — must stay green
npm run format       # Prettier --write . (run after manual edits to stay CI-green)
```

No other test/build tooling is configured. Do not add it casually.
ESLint is a flat config (`eslint.config.js`): `js.configs.recommended` +
`typescript-eslint` for `.ts`, plain JS rules for `public/sw.js`/scripts, with
`eslint-config-prettier` last so style rules defer to Prettier. Lint is
deliberately strict-on-real-defects, light-on-taste (Prettier owns taste).

## Architecture invariants

- `src/sim/` and `src/data/` are **pure TS**: no `three`, no DOM. Everything in
  `tests/` relies on this. If you find DOM/three imports there, refactor out.
- All three.js / DOM code lives in `src/render/` and `src/main.ts`.
- **One data table**: `src/data/bodies.ts` is the single source of truth
  for bodies (`SUN`, `PLANETS`, `DWARF_PLANETS`, `MOONS` → `ALL_BODIES`).
  Sim and render derive everything from `BodyDefinition`. Adding a body
  (planet, dwarf, moon) = adding one object to the right array. Nothing
  else should need to change (scene, orbit lines, and follow dropdown
  all derive from `ALL_BODIES`).
- **Belts** (`src/data/belts.ts`): small-body populations (asteroid +
  Kuiper) are a _separate_ seeded table — `BELTS` → `sampleBelt()` —
  because instanced fields don't fit `BodyDefinition`. Rendering lives in
  `src/render/belts.ts` (one InstancedMesh per belt); the data layer stays
  pure (no `three`/DOM) and fully deterministic (mulberry32 seed).
- Orbital math: heliocentric ecliptic J2000 frame. `positionAt(elements, daysSinceJ2000)`
  returns AU. Moons use the same math relative to their parent (`parent` id).
  Planets also carry JPL Table 2a secular `rates` and Table 2b periodic mean-anomaly
  terms (`periodicM`), applied by `periodicMOffset()` in `kepler.ts` on every
  time-evolution path (per-frame positions, orbit sampling). Long-range accuracy
  (±1500 y) is pinned by `tests/groundTruth.test.ts` against JPL Horizons DE441
  epochs (`tests/fixtures/ground_truth.json`).
- **Geocentric Moon** (`src/sim/moon.ts`, pure): Meeus ch.47 lunar
  longitude/latitude/distance (60-term L,R + 60-term B periodic tables)
  referred to the mean equinox _of date_; `moonGeocentricJ2000()` precesses it
  to the J2000 ecliptic via Meeus ch.22.1 so it composes with the heliocentric
  planet vectors. Gotcha: ch.47's sigma_B/1e6 is ALREADY in degrees — never
  multiply by R2D again.
- **Shadows** (`src/render/shadows.ts`): the Sun's `PointLight` is a shadow
  caster (PCFSoft cube map). Every body mesh casts+receives _except_ the star
  itself (a sphere centered on a point light would occlude the whole shadow
  pass). Rings use a lit `MeshStandardMaterial` and cast+receive — `RingGeometry`
  is a true annulus so no solid-disc alpha artifact. Belt InstancedMeshes
  deliberately skip shadows (2k instances would swamp a 2048 cube). Config
  lives in `shadows.ts` and is unit-tested in `tests/shadows.test.ts` (three.js
  lights/meshes construct in Node without a WebGL context).
- **Real textures** (`src/render/realTextures.ts`): optional drop-in NASA
  images at `public/textures/<bodyId>.jpg` (e.g. `earth.jpg`). At startup each
  body id is HEAD-probed (result cached per id) and, when present, a decoded
  `THREE.Texture` (sRGB, one decode per id for the page's lifetime) replaces
  the procedural `map` and the material is marked for recompile. Purely
  additive: missing file ⇒ procedural texture, no errors. fetch/loader are
  injectable; unit-tested in `tests/realTextures.test.ts`. Note: three.js
  `Material.needsUpdate` is a setter-only accessor (no getter) — assert on the
  write, never read it back.
- **Body search combobox** (`src/data/searchIndex.ts`, pure): the panel's
  "Find" input replaces the old native `#follow` select. `searchBodies()`
  is a case-insensitive substring matcher over `ALL_BODIES` with three
  alias sources — own name, kind label, and parent name — so "moon of
  mars" or a bare "mars" land on its satellites; a small `ALIASES` table
  adds colloquial names (luna, world, morning star). `groupedBodyMenu()`
  yields the display order (Sun → each planet with its moons → dwarf
  planets) used both for the unfiltered dropdown and as the tie-break
  order for empty queries. Selection drives the same `followId`/`flyTo`
  state as before, so the `f` URL param is unchanged. UI wiring +
  keyboard nav (↑/↓/Enter/Esc, click-outside close) live in `main.ts`;
  ground-truth behaviour pinned in `tests/searchIndex.test.ts`.
- **Shareable URL state** (`src/state/urlState.ts`): pure (only the WHATWG
  `URL` API) — `parseAppState(href)` / `encodeAppState(href, state)` round-trip
  time, speed, follow, scale, toggles, pause, and camera into the query string.
  `main.ts` restores it before `rebuildScene` and keeps the address bar in sync
  via a debounced `history.replaceState` (`syncUrl`) fired from the controls'
  `change` handlers and the OrbitControls `change` event. Unit-tested in
  `tests/urlState.test.ts`.
- **PWA / mobile** (`public/manifest.webmanifest`, `public/sw.js`,
  `public/icon-*.png`): installable app (standalone, dark theme). The service
  worker is registered from `main.ts` **only when `import.meta.env.PROD`**
  (vite dev/preview use a live server) — network-first, cache-fallback for
  same-origin GETs, shell precached on install. Icons are generated by
  `python3 scripts/make_icons.py` and the 1200×630 link-preview image
  (`public/og-image.png`, referenced by the `og:`/twitter meta tags in
  `index.html`) by `python3 scripts/make_og_image.py` — both pure-stdlib PNG
  writers (no ImageMagick in this sandbox — don't add PIL). Mobile:
  `touch-action: none` on the canvas, safe-area insets, coarse-pointer hit
  targets, and a collapsible control panel (auto-collapsed under 560 px).
- **Celestial events** (`src/sim/events.ts`, pure): deterministic scanner over a
  time window (default 0.5 d step, refines at 0.05 d) that finds solar/lunar
  eclipses, planetary transits (Mercury/Venus across the Sun), Sun–planet
  conjunctions, planet oppositions, and Saturn ring edge-on crossings. All
  geometry is geocentric ecliptic J2000 from the same `positionAt`/`moon.ts`
  math as the rest of the sim — no new ephemeris model. Solar eclipses use
  surface parallax (observer radius of Earth / lunar distance, ≈1.46°) not
  geocenter disc-overlap, and are classified total/annular/partial by
  apparent radii. Saturn edge-on uses the fixed IAU spin pole
  (RA 40.588°, Dec 83.537° J2000) rotated to the ecliptic with R_x(−ε);
  validated against JPL Horizons DE441 (2025-03-24 true zero). `findEvents()`
  is the aggregate entry point (pure, sorted, typed `CelestialEvent`); the UI
  wiring lives in `main.ts` (✦ Events toggle, ±1/5/10-yr range, clickable
  list → jumps sim clock + camera). Ground-truth dates pinned in
  `tests/events.test.ts` (transits, Saturn oppositions, Saturn edge-on 2009/
  2025/2038-39, solar eclipse dates 2018–2025).
- **WebGL context loss** (`main.ts` + `#gl-lost` overlay in `index.html`):
  three.js already owns the low-level recovery (it `preventDefault`s
  `webglcontextlost`, no-ops `render()` via its `_isContextLost` flag, and
  re-inits GPU state on `webglcontextrestored`). Our listeners layer the UX
  on top: set `contextLost`, show the "3D view paused" overlay, and make the
  `frame()` loop skip all sim+GPU work while down (the rAF chain stays alive,
  so the view self-resumes on restore — no forced reload). A manual
  "Reload page" button is the escape hatch if a restore never fires.
- **Shareable URL state** (`src/state/urlState.ts`): `main.ts` restores the
  full UI + camera state from the query string before building the scene, and
  keeps the address bar in sync (debounced `history.replaceState`) afterward.
  Pure + unit-tested (`tests/urlState.test.ts`) — no DOM, only `URL`. Keep it
  that way; new UI state (e.g. the events-panel `ev` flag) belongs here, not
  in ad-hoc localStorage. The true-scale tour is the one deliberate exception
  (transient, never encoded). The date picker (`#date-pick`) is two-way
  synced with the sim clock via `fmtDate()` — keep that sync guarded on
  `document.activeElement` so it never clobbers an in-progress edit.
- **Camera pick landing is top-down** (`src/render/cameraFlight.ts`):
  `frameBody()` lands DIRECTLY OVERHEAD — a pure 90° straight-down view along
  the ecliptic north pole (camera on +Y, looking −Y at the body's world
  position). This is the ONE standard for BOTH search-bar picks and
  click-picks (user decision 2026-08-20); satellites still frame their
  parent planet. Do not reintroduce bearing-relative landing (the old
  "keep the current side" behaviour was inconsistent across pick paths).
  Flight path (`makeFlight`) is unchanged — only the destination anchor.
- **Constellation sky** (`src/render/scene.ts` + `src/data/constellations.ts`):
  the dome is STATIC (the camera moves, not the sky). Each figure is ONE
  `LineSegments` with its own material so opacities can fade independently,
  plus a name sprite (spaced serif capitals + glow + flourish, from
  `makeConstellationNameTexture`) placed BESIDE the figure:
  `constellationLabelPose()` computes the star cloud's principal axis and
  pushes the label a fixed angular margin past the centroid along it. The
  per-frame highlight is driven by `constellationEmphasis()` — pure math, a
  fixed angular band around the camera forward (full emphasis < 15°, faded
  out by 40°) — throttled to a few Hz and gated on camera-pose change, so
  idle frames cost nothing. Name and lines share the SAME emphasis value:
  it resolves through the name-based `CONSTELLATION_NAME_INDEX` (do NOT go
  back to sequential child indexing — labels come after the line segments in
  each group, which caused an off-by-one where label k faded with figure
  k+1). Keep the math pure (no `three` in the emphasis/center/pose
  functions) so it stays unit-tested; the per-constellation split is what
  makes independent fading possible — don't merge the line meshes back into
  one.
- **True-scale toggle** (`main.ts` morph block + `scene.ts` scale morph):
  the single ⚖ Real-scale / Visible-scale button (`#scale-toggle`, replaced
  the old select + tour/return buttons in B3) is a TRANSIENT morph state
  (deliberately NOT url-encoded — only the terminal `scale` is):
  `morph = { p, dir, reframed }`, a 3 s eased blend
  `lerpScale(VISIBLE_SCALE, TRUE_SCALE, p)` applied to positions, belts and
  orbit lines, with `applyScaleMorph()` blending baked body radii. Toggling
  mid-morph REVERSES from the current p (no snap); a URL-restored
  `scale=true` load starts a morph BACK to visible. Parking at p=1 sets
  `scale = TRUE_SCALE` so URL and anchor framing agree — and the p=1 blend
  is EXACTLY `TRUE_SCALE`, so nothing snaps. `syncScaleUI()` keeps the
  button label + `.active` class in sync and runs at startup. Body labels
  are NEVER faded by the morph (`applyScaleMorph` sets opacity 1): at true
  scale planets are sub-pixel dots and the labels are the only way to tell
  them apart — the Labels toggle is their single on/off. Orbit-line
  re-projection (`reprojectOrbitLine`) maps each sample's heliocentric radius
  through the scale's distance function and re-scales the stored unit
  direction — the line must ALWAYS use the same distance factor as the body
  position (the D1 moon-line bug was exactly this: a `/km` where positions
  use `/d`).
- **Moon orbit line tracks the live path** (`src/render/scene.ts`): the
  Moon's drawn orbit loop is NOT a fixed ellipse — Meeus ch.47's node line
  regresses (~18.6 y) and apse precesses (~8.85 y) — so it is sampled once
  at a PLACEHOLDER epoch (`t0 = 0`) and re-sampled IN-PLACE by
  `resampleMoonOrbitLine()` in the frame loop, throttled to ~4 Hz
  (`lastMoonResampleMs`), at the LIVE sim time. Date jumps (picker, "Now",
  event rows) call `resampleMoonNow()` so the first frame after a jump is
  already correct. Never bake the epoch at load time — the original bug was
  `t0 = (5000 * (Date.now() - J2000)) / 86400000`, a stray 5000× that sampled
  the path ~132,000 y in the future (the "Moon not on its orbit line" bug).
  It writes the same position/unit-dir/km buffers `reprojectOrbitLine`
  reads, so the scale morph's re-projection stays consistent for free.
- **Time scrubbing** (`src/render/scrubMath.ts` pure + `src/render/yearEvents.ts`
  per-year cache + `SimClock` `beginScrub`/`endScrub` + `main.ts` pointer
  wiring): right-drag (mouse) or 3-finger drag (touch) is a 2D gesture.
  HORIZONTAL travels time SPEED-PROPORTIONAL (plan 023 F1):
  `Δdays = scrubSpanDays(startSpeed)·f(px/500)` with the zero-center-slope
  quadratic easing `f(x)=sign(x)·x²/(1+x²)` — slowest at the pressed epoch
  (a ±few-px wiggle barely moves time), saturating at the span edges;
  `scrubSpanDays = min(SCRUB_CLAMP_DAYS = 10 000, startSpeed×3600)` (one
  hour of sim at the gesture's STARTING speed — a simultaneous vertical
  speed-drag never rescales the time axis mid-gesture). The fixed
  `SCRUB_DAYS_PER_PX = 0.002` rate is GONE (plan 022, superseded).
  VERTICAL moves the speed slider at `SCRUB_SPEED_LOG_PER_PY = 0.01`
  log10(d/s)/px (up = faster) within the slider's
  `[SPEED_LOG_MIN, SPEED_LOG_MAX] = [−3, 2.5]` domain. Press freezes
  (`beginScrub` remembers the pre-scrub pause state), release resumes
  (`endScrub`) at the CURRENT slider speed and re-samples the Moon orbit
  line. A `<6 px` X / `<4 px` Y move is a no-op (dead zone) — the strip
  never lights up and a scrub release is never a pick. OrbitControls'
  right-drag is inert (`enablePan=false`) and its touch handlers only act
  on 1–2 pointers — but its `onPointerUp` has no `case 2`, so a 3→2 finger
  lift leaves the surviving pinch dead; the re-arm uses a synthetic
  pointerup+pointerdown bounce (`rearmBounce`-guarded). HUD (plan 023 F2):
  the bottom `#time-scrub` banner is DELETED — `#hud-mini` (top-right,
  always) carries the scrub feedback: a pulsing `.scrubbing` class (added
  only past the dead zone, removed via `clearScrubHud()` on every release
  path — mouse up, mouse pointercancel, 3-finger lift, 3-finger
  pointercancel), the travel sub-line (`+2.6 yrs · 1.0 d/s`), and a
  directional gauge (knob at `50% + (Δdays/span)·50%`, center notch = the
  press epoch; the fill spans center→knob). F3: while scrubbing,
  `#hud-timeline` (under the gauge, hidden otherwise) shows the CURRENT
  calendar year: 13 month ticks, the year label, that year's events as
  emoji at their day-of-year fraction (`timelineLayout` in scrubMath.ts;
  data from `yearEvents()` — a per-year `findEvents` sweep, ~0.1–0.3 s,
  computed lazily on first entry and cached, deferred to a rAF so the
  gesture's own frame paints first), and a "you are here" caret
  (`tlFrame()` keeps it glued to `clock.t` every frame). `#hud-mini` is
  written by the SAME `fmtDate()`/`fmtSpeed()` as the panel (never a
  second code path) and is deliberately NOT `aria-live` — the panel stays
  the accessible source of truth. All of these are `pointer-events: none`
  overlays (not in screenshots).

## Code style

- TypeScript strict (`tsconfig.json` is strict — do not loosen it).
- No runtime dependencies beyond `three`. Dev deps: vite, vitest, typescript.
  Before adding any dependency, check whether it's truly needed.
- Prefer small pure functions; keep them testable.
- Determinism matters: procedural textures use a seeded RNG keyed on body id.
  Do not introduce `Math.random()` in `src/render/textures.ts`.

## Workflow: plan first, commit per feature

Mandatory for any multi-feature request (two or more user-visible changes).
It exists because of 2026-08-21: three features were implemented in one
working tree and had to be split into three commits _afterwards_ — three
hand-reconstructed intermediate states, each re-gated, and several hours of
fragile surgery. Do not repeat that.

1. **Plan before code.** First write `plans/0NN-<slug>.md`: an explicit
   commit list — ONE feature per commit, in dependency order, each with its
   conventional-commit subject and a short design note. Add one line per
   feature to `todo.md` referencing the plan (e.g. `- [ ] P2 … — plan 003`).
   `todo.md` is a thin index; the detail lives in the plan file so it never
   bloats into a changelog.
2. **One feature in the tree at a time.** Feature N is implemented, gate-
   checked (all four gates below), committed and pushed BEFORE the first
   line of feature N+1 is written.
3. **Never retro-split.** Do not accumulate several features in one working
   tree and split them post-hoc. If a session must end mid-way, commit what
   is complete and gate-green and leave nothing half-baked in the tree.
4. **`todo.md` status discipline.** Tasks are added with `- [ ]` when they
   are planned; each is flipped to `- [x]` with its commit hash in a small
   follow-up `docs:` commit — the hash only exists AFTER the feature commit,
   and `--amend` invalidates any hash already recorded (don't use it for
   this). A task is `- [x]` only after gates + commit + push — never before.

## Git conventions

- Small, frequent commits; **push after each commit** (user requirement).
- Conventional-commit style: `feat(sim): ...`, `fix(render): ...`,
  `docs: ...`, `test: ...`, `chore: ...`.
- Never commit node_modules or build output (`.gitignore` covers this).
- Branch `main` is the working branch; open PRs only when the user asks.

## Quality gates (before declaring any task done)

1. `npm test` green.
2. `npm run build` green (type errors fail the build).
3. `npm run lint` and `npm run format:check` green (also enforced in CI).
4. For user-visible changes: verify in `npm run dev` (or at least confirm the
   built page serves via `npm run preview`).
5. Update `todo.md` and, if the change alters architecture, this file and
   `plans/`.
