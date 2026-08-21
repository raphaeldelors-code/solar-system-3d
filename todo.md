# TODO — solar-system-3d

## Process (in force — full rules in AGENTS.md)

Multi-feature work: plan in `plans/0NN-*.md` BEFORE code, one feature per
commit in the tree at a time, no retroactive splits, and every line below
gets `- [x]` + commit hash only after gates + commit + push. Detail lives in
the plan files — this file stays a thin index.

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
- [x] B3 feat(render): true-scale tour (3 s morph + captions + return) — `4e7ec45`. "⚖ Real scale" eases the whole scene visible↔true (sizes, distances, belts, orbit lines) over 3 s with staged captions; "↩ Return" reverses from wherever (even mid-morph). Parking at p=1 sets scale=TRUE_SCALE (authoritative for select/URL/framing; the p=1 blend IS TRUE_SCALE so nothing snaps). Tour is transient (not url-encoded); any manual camera input ends it. UI: index.html #scale-tour / #scale-return / #scale-caption. SUPERSEDED by the single toggle (user queue 2026-08-21, first item).
- [ ] B4 feat(render): real NASA/SSS textures committed + LICENSE credits
- [x] C: update AGENTS.md (toggle, moon live-resample, constellation label invariants), final gates, live-site verify — 2026-08-21 (E1–E3 docs)

## User queue — 2026-08-20 (before B3)

- [x] D1 fix(render): moon orbit line regression — line no longer shown. ROOT CAUSE (was live since 2995fbe): moon orbit line used `/km` while the body position uses `/d` (AU) — line rendered 1/AU_KM ≈ 6.7e-9× the Moon's real distance = sub-pixel dot at Earth. Fixed to the body's d-based factor; B3 re-project path had the twin `/r` bug (fixed + 4 regression tests in tests/orbitReproject.test.ts). `c9f9bf4`
- [x] D2 fix(render): consistent camera anchors — search-bar pick + click-pick now share ONE landing standard: pure 90° straight-down along the ECLIPTIC NORTH POLE (camera directly overhead, body centered) — user decision 2026-08-20. frameBody is now top-down only (dropped the currentPos/bearing arg); both pick paths already shared camAnchorForBody→flyTo. Satellites still frame their parent planet.
- [x] D3 feat(render): constellation name labels — sprite per figure at its centroid (just inside the dome), follows the Labels toggle, baseline opacity 0.32 / peak 0.95 (D4)
- [x] D4 feat(render): constellation highlight — ONE LineSegments per figure (13, own material); per-frame emphasis = fixed angular band around the view axis (full <15°, faded out by 40°), pure math in constellationEmphasis (unit-tested); throttled ~5 Hz + pose-gated (13 dot-products when the camera actually moves — no perf cost while idle). Constellation name + line fade together.
- [x] D5 feat(ui): Events panel as a collapsible toggle — existing ✨ button collapses the whole Events section; state now PERSISTED in the URL (`ev=1/0`) and restored on load (recomputes the list when a shared link opens the panel)
- [x] D6 feat(ui): date picker on top of Events — `<input type="date">` in the Time row, two-way synced with the sim clock (fmtDate updates it every frame, change jumps the clock keeping the current time of day, re-flashes the date readout, refreshes events if open); focus-guarded so the per-frame sync never clobbers an in-progress edit

## User queue — 2026-08-21

- [x] E1 feat(ui): single Real/Visible scale TOGGLE — replaced the Visible/True select + "⚖ Real scale" + "↩ Return" with one `#scale-toggle` button (B3 redesign, per user request). Morphs visible↔true over 3 s in either direction, reverses smoothly mid-morph, works from a URL-restored scale=true load (morphs back to visible). `syncScaleUI()` syncs label + `.active` and runs at startup. Labels now stay fully legible at EVERY scale (removed the true-scale fade in `applyScaleMorph` — planets are sub-pixel at true scale, labels are the only way to tell them apart). `6630eca`
- [x] E2 fix(render): Moon orbit line — Moon was not following its orbit line. ROOT CAUSE: line baked at `t0 = (5000 * (Date.now() - J2000)) / 86400000` — stray 5000× sampled the Meeus ch.47 geocentric path ~132,000 y in the future; plus the path precesses (node ~18.6 y, apse ~8.85 y) so any static line drifts. Now sampled at placeholder epoch + re-sampled IN-PLACE (`resampleMoonOrbitLine`) at live sim time, throttled ~4 Hz in the frame loop (~1 ms / 129 samples); date jumps call `resampleMoonNow()`. Writes the same buffers `reprojectOrbitLine` uses, so the scale morph stays consistent. 5 regression tests. `e71c3e9`
- [x] E3 feat(render): constellation names in elegant letters BESIDE each figure — `makeConstellationNameTexture()` (spaced serif capitals, starlight glow, hairline flourish; font auto-scaled so all 13 names share one glyph size) + `constellationLabelPose()` (fixed angular margin past the centroid along the star cloud's principal axis — beside, not on top). Same emphasis fade as the figure lines, now resolved through name-based `CONSTELLATION_NAME_INDEX` — fixes an off-by-one where label k faded with figure k+1 (labels come after the 12 line segments in each group). 5 regression tests. `b952d4f`

## User queue — 2026-08-21 (evening) — plan 003

- [x] P1 docs: AGENTS.md "plan first, commit per feature" workflow + this plan file + todo process section — `a38b743`
- [x] P2 feat(ui): scale control → segment switch, both options visible, active lit — `8b65a97`
- [ ] P3 fix(render): constellation names close to their figures (constant small gap)
- [ ] P4 feat(render): constellation presence fades with camera distance (faint in close-ups, full in sky view)

## Declined (user decision 2026-08-18)

- Hohmann probe missions — declined
- From-here viewpoints (Moon Earthrise etc.) — declined
