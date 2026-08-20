# TODO — solar-system-3d

## Phase 1–3 (done — see `plans/001-core-solar-system.md`)
Core, realism, polish all shipped (PWA, URL state, shadows, belts, real-texture
loader, constellation tour, tooltips, screenshot button).

## Phase 4 — Review fixes + features (see `plans/002-review-fixes-and-features.md`)
- [x] Plan 002 written
- [x] A1 fix(render): kill per-frame Vector3 alloc in updatePositions
- [x] A2 fix(sim): JPL secular rates + long-range accuracy tests (Mars opp. 2027-02-19, Mercury transit 2032-11-13, eclipse 2026-08-12) — Table 2a/2b rates+periodic anomaly terms, geocentric Moon (Meeus ch.47), Horizons DE441 ground-truth fixture; `2995fbe`
- [ ] A3 fix(web): og: meta + og-image + webglcontextlost handler
- [ ] A4 fix(tools): ESLint + Prettier + CI lint step
- [ ] B1 feat(sim): celestial event engine (eclipses, transits, conjunctions, oppositions, Saturn edge-on) + Events UI
- [ ] B2 feat(nav): body search combobox + clean grouped satellite menu
- [ ] B3 feat(render): true-scale tour (3 s morph + captions + return)
- [ ] B4 feat(render): real NASA/SSS textures committed + LICENSE credits
- [ ] C: update AGENTS.md, final gates, live-site verify

## Declined (user decision 2026-08-18)
- Hohmann probe missions — declined
- From-here viewpoints (Moon Earthrise etc.) — declined
