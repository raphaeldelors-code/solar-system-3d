# TODO — solar-system-3d

## Phase 1–3 (done — see `plans/001-core-solar-system.md`)

Core, realism, polish all shipped (PWA, URL state, shadows, belts, real-texture
loader, constellation tour, tooltips, screenshot button).

## Phase 4 — Review fixes + features (see `plans/002-review-fixes-and-features.md`)

- [x] Plan 002 written
- [x] A1 fix(render): kill per-frame Vector3 alloc in updatePositions
- [x] A2 fix(sim): JPL secular rates + long-range accuracy tests (Mars opp. 2027-02-19, Mercury transit 2032-11-13, eclipse 2026-08-12) — Table 2a/2b rates+periodic anomaly terms, geocentric Moon (Meeus ch.47), Horizons DE441 ground-truth fixture; `2995fbe`
- [x] A3 fix(web): og: meta + og-image + webglcontextlost handler — `og:`/twitter tags + 1200×630 `public/og-image.png` (`scripts/make_og_image.py`, pure stdlib) + graceful `webglcontextlost`/`restored` pause-overlay in `main.ts`
- [x] A4 fix(tools): ESLint + Prettier + CI lint step — flat `eslint.config.js` (TS+JS, Prettier-aware), `.prettierrc.json`, `lint`/`format`/`format:check` npm scripts, CI lint + format-check steps, one-time Prettier format sweep (34 files)
- [x] B1 feat(sim): celestial event engine (eclipses, transits, conjunctions, oppositions, Saturn edge-on) + Events UI
- [x] B2 feat(nav): body search combobox + clean grouped satellite menu
- [ ] B3 feat(render): true-scale tour (3 s morph + captions + return)
- [ ] B4 feat(render): real NASA/SSS textures committed + LICENSE credits
- [ ] C: update AGENTS.md, final gates, live-site verify

## User queue — 2026-08-20 (before B3)

- [x] D1 fix(render): moon orbit line regression — line no longer shown. ROOT CAUSE (was live since 2995fbe): moon orbit line used `/km` while the body position uses `/d` (AU) — line rendered 1/AU_KM ≈ 6.7e-9× the Moon's real distance = sub-pixel dot at Earth. Fixed to the body's d-based factor; B3 re-project path had the twin `/r` bug (fixed + 4 regression tests in tests/orbitReproject.test.ts). `c9f9bf4`
- [x] D2 fix(render): consistent camera anchors — search-bar pick + click-pick now share ONE landing standard: pure 90° straight-down along the ECLIPTIC NORTH POLE (camera directly overhead, body centered) — user decision 2026-08-20. frameBody is now top-down only (dropped the currentPos/bearing arg); both pick paths already shared camAnchorForBody→flyTo. Satellites still frame their parent planet.
- [x] D3 feat(render): constellation name labels — sprite per figure at its centroid (just inside the dome), follows the Labels toggle, baseline opacity 0.32 / peak 0.95 (D4)
- [x] D4 feat(render): constellation highlight — ONE LineSegments per figure (13, own material); per-frame emphasis = fixed angular band around the view axis (full <15°, faded out by 40°), pure math in constellationEmphasis (unit-tested); throttled ~5 Hz + pose-gated (13 dot-products when the camera actually moves — no perf cost while idle). Constellation name + line fade together.
- [ ] D5 feat(ui): Events panel as a collapsible toggle (show/hide whole panel)
- [ ] D6 feat(ui): date picker on top of Events — synced with sim clock, jump-to-date, live update as time advances

## Declined (user decision 2026-08-18)

- Hohmann probe missions — declined
- From-here viewpoints (Moon Earthrise etc.) — declined
