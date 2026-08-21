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

- [ ] D1 fix(render): moon orbit line regression — line no longer shown (B3 orbit-line rework)
- [ ] D2 fix(render): consistent camera anchors — search-bar pick + click-pick both use the same eased flight; NEW standard landing = pure 90° straight-down along the ECLIPTIC NORTH POLE (camera directly overhead, body centered, target at body) — user decision 2026-08-20. frameBody gains a top-down variant (or a `fromNorth: true` flag) used by camAnchorForBody; satellites still frame their parent planet.
- [ ] D3 feat(render): constellation name labels (static sprite at each constellation centroid)
- [ ] D4 feat(render): constellation highlight — per-constellation line opacity fades in/out with view-center proximity
- [ ] D5 feat(ui): Events panel as a collapsible toggle (show/hide whole panel)
- [ ] D6 feat(ui): date picker on top of Events — synced with sim clock, jump-to-date, live update as time advances

## Declined (user decision 2026-08-18)

- Hohmann probe missions — declined
- From-here viewpoints (Moon Earthrise etc.) — declined
