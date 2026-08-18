# Plan 002 — Review fixes + new features

Date: 2026-08-18 · Status: **IN PROGRESS** · Branch: `main` (deployed to GitHub Pages on push)

## Background
After the honest review (see conversation), the user approved this scope.
Spin (review fix #1) was verified already implemented (`applySpin`, main.ts:650) — dropped.
Hohmann missions and from-here viewpoints (features 2, 5) were declined.

## Quality gates (per AGENTS.md, every step)
1. `npm test` green · 2. `npm run build` green · 3. browser-verify user-visible changes
4. commit (conventional) + `git push origin main` **between each step**
5. keep `todo.md` + this file updated

---

## Phase A — Fixes

### A1. `fix(render)`: kill per-frame Vector3 allocation in `updatePositions` ✅ DONE
- `eclipticToScene` allocated a `new THREE.Vector3` per body per frame (~36/frame); belt
  update allocated 5 objects × ~3200 instances/frame.
- Added module-level scratch (`UPDATE_POS_SCRATCH`/`BELT_*`) + `positionAtInto`/
  `positionAtMeanAnomalyInto` (out-params) + `eclipticToSceneInto`; `updatePositions`
  now caches the sorted body order per `BuiltScene` (`built.userData.updateOrder`).
- No behavior change — 113 tests green; browser-verified: positions advance, belts
  spread (3200 instances), moon–Earth distance stable, 0 JS errors.

### A2. `fix(sim)`: JPL secular rates + long-range accuracy tests
- Add `rates` (per century) for all 8 planets from JPL SSD "approximate positions",
  **Table 2a: 3000 BC – 3000 AD** (source: `https://ssd.jpl.nasa.gov/planets/approx_pos.html`).
  JPL table → app mapping: `peri = long.peri − long.node`, `M0 = L − long.peri`,
  rate(peri) = rate(long.peri) − rate(long.node), rate(M0) = rate(L) − rate(long.peri),
  `n = 360/√(a³)` deg/day (recompute at t=0; n itself gets no rate).
- Note: JPL "EM Bary" row is used for Earth (heliocentric).
- If the page documents the Table 2b extra M-terms for Jupiter–Neptune, include them
  (pure, tested); otherwise document the limitation in `kepler.ts` comments.
- **Ground-truth tests** (real-world dates verified via web search before coding):
  - Mars opposition 2027-02-19 (±1 d), Mercury transit 2032-11-13 (±1 d),
    solar eclipse 2026-08-12 (geocentric Sun–Moon sep < 0.55°).
  - Test asserts our ephemeris reproduces these; also a t+100y sanity test
    (positions finite, Earth r ∈ [0.98, 1.02] AU).

### A3. `fix(web)`: share meta + WebGL context-loss recovery
- `index.html`: add `og:` + `twitter:` meta tags; generate `public/og-image.png`
  (1200×630, stdlib PNG script in `scripts/` like `make_icons.py`).
- `main.ts`: `webglcontextlost` → preventDefault + overlay "Context lost, reloading…";
  `webglcontextrestored` → reload.

### A4. `fix(tools)`: ESLint + Prettier (user-approved; CI gets a lint step)
- Flat `eslint.config.mjs` with `typescript-eslint` recommended; `.prettierrc`;
  scripts `lint` / `format`; run once, fix findings, commit.
- `.github/workflows/ci.yml`: add `npm run lint` before test.

## Phase B — Features

### B1. `feat(sim)`: celestial event engine — **the killer feature**
- `src/sim/events.ts` (pure): detect over [t0, t0+50y]:
  - Solar/lunar eclipses: geocentric Sun–Moon angular separation vs apparent-radius
    thresholds (synodic-window search: candidate new/full moons from Moon mean
    longitude, ±2 d refine at 1 h).
  - Transits (Mercury, Venus): inferior conjunction + sep < Sun radius + planet radius.
  - Conjunctions (geocentric planet pairs, sep < 1°) & oppositions (outer planets,
    sep from Sun > 178°): 1-day coarse scan + 2-h refinement + parabolic min.
  - Saturn rings edge-on: Earth line-of-sight vs Saturn ring plane < 2°.
- Output: sorted `Event[] {type, dateMs, title, bodyId?, detail}`.
- Tests: known real events (same ground-truth dates as A2, verified via web).
- UI: "✨ Events" button → collapsible list of next events from current sim time
  (recomputed on time jumps > 1 y); click → `clock.setDate` + `flyTo` the involved body.

### B2. `feat(nav)`: body search + clean satellite menu (replaces ugly follow `<select>`)
- Custom combobox in the panel: input with typeahead (name + aliases like
  "earth's moon", parent names) + grouped dropdown tree (planet header, indented
  moons with satellite dot), keyboard nav (↑/↓/Enter/Esc), click select.
- `src/data/searchIndex.ts` (pure): `searchBodies(query)` + alias table — unit tested.
- Selection drives the same state as the old select (`flyTo` + follow arm); URL state
  unchanged (`f` param). Remove the native `#follow` select.

### B3. `feat(render)`: true-scale tour ("wow moment")
- `⚖ Real scale` button in the anchor row: 3 s eased morph
  `scale(s) = lerp(VISIBLE, TRUE, ease(s))` (factory in `scene.ts` returning a
  `VisualScale`), with staged captions (sizes exaggerated ~×N, distances compressed →
  "at true scale Neptune is 4.3 B km away…"). Ends at TRUE_SCALE with a "Return"
  button (morph back). Not URL-encoded (transient).
- Unit test the blend factory (pure part); browser-verify the morph.

### B4. `feat(render)`: real NASA textures committed to `public/textures/`
- ~10 major bodies (sun, mercury, venus, earth, moon, mars, jupiter, saturn,
  uranus, neptune) + Galilean moons + titan/triton if available, 1k equirectangular.
- Source with license: prefer NASA PD (visibleearth) else Solar System Scope (CC BY 4.0).
  Add `public/textures/LICENSE.md` with per-file attribution (required by CC BY).
- Loader already probes `public/textures/<id>.jpg` — no code change expected.
- Verify: file sizes sane (< ~8 MB total), browser shows real Earth/Mars.

## Phase C — Wrap-up
- Update `todo.md`, `AGENTS.md` (new modules: events, searchIndex, scale tour), this file.
- Full gate run + live-site verification of the deployed build.
- Final commit + push.

## Risks / notes
- JPL horizons API is 404-blocked from this sandbox — ground truth for A2/B1 comes
  from the JPL elements page + web-verified real event dates, not the API.
- Texture licensing: CC BY needs the credits file; NASA PD needs nothing but we
  attribute anyway.
- Custom combobox (B2) is the biggest UI surface — keep the native-select code path
  removable in one pass; verify keyboard + touch in browser.
