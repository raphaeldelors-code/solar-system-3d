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
- [x] P3 fix(render): constellation names close to their figures (constant small gap) + compact sprite — `e04d346`
- [x] P4 feat(render): constellation presence fades with camera distance (faint in close-ups, full in sky view) — `9023da8`

## User queue — 2026-08-21 (night) — plan 004

- [x] Q1 fix(render): label distance anchored to the TEXT ink edge (constant 2° gap, every name) — `8399ae8`. Name side flips to the far tip; `layoutConstellationName` ink width drives `margin = halfExtent + (inkRad/2 + EDGE_GAP)`. See `plans/004-label-ink-distance-and-presence-middle.md`, Q1
- [x] Q2 fix(render): presence floor 0.25 → 0.5 (middle between "too much" and "too low"), ramp starts at default view — `51a8a63`. See plan 004, Q2

## User queue — 2026-08-22 — plan 005

- [x] Full IAU 88-constellation dataset — regenerated `constellations.ts` from Stellarium `modern_iau` skyculture figures + Hipparcos catalog (col8/9 = J2000 ICRF, sub-arcsecond verified vs 9 anchor stars; 61/61 HIP cross-check). 88 constellations / 757 figure stars / 752 segments (was 13/76). Orion belt test → name-based; new per-constellation star-count table locks all 88 figures; label threshold relaxed for elongated figures (Hydra). CDP headless verify: 88 line objects + 88 labels live, per-constellation vertex counts match the file exactly, Polaris at the celestial pole to 0.001 units, no console errors. `a7648ef`. See `plans/005-full-iau-88-constellations.md`

## User queue — 2026-08-22 (evening) — plan 006

- [x] R1 fix(render): constant label size — sprite width no longer follows figure angular span (was 13× different name sizes across 88). Cap height is now a fixed angular tier: 0.016 rad major / 0.011 rad minor, font auto-scaled per name so glyph height is identical for "Orion" and "Triangulum Australe". CDP verify: all 79 major-tier labels render at exactly 0.01152 rad ink cap (ratio 1.0000). See `plans/006-constellation-readability.md`
- [x] R2 fix(render): no overlapping names — deterministic `resolveConstellationLabels()` places the 88 labels biggest-first, trying near/far tip × 4 margin scales and rejecting any placement within ~0.7° of an already-placed label (sphere-rotated, so it moves around figures, not off the dome). CDP verify: 0 ink-box overlaps across all 88. 4 new unit tests
- [x] R3 fix(render): stronger camera-center emphasis — fade band widened 15°/40° → 22°/48°, base 0.28 / peak 1.0, and labels get a quadratic curve so center names are crisp (op 1.0) while edge names sit near 0.05. Background starfield dimmed (opacity 0.8→0.55, size 1.6→1.3) so figures pop in sky view. CDP verify: brightness ranks by view-center angle (Canis Major 1.00 → Aquarius 0.44 → Cygnus 0.15 at 42°)
- [x] R4 docs: plan 006 + todo entries — `acf2d9c`

## User queue — 2026-08-22 (night) — plan 007

- [x] S1 feat(render): classic constellation figures (Star Walk 2-style) — PUBLIC-DOMAIN BODE PLATES ONLY (user: "Forget about the ai route too complicated. Let's go with the classic route only"). 5 plates (Orion, Ursa Major, Cygnus, Scorpius, Leo — Lyra deferred, harp too small to isolate on its shared plate) extracted from Bode's Uranographia (1801, Wikimedia Commons) via density-clustering (`assets/constellation-figures/mkfig2.py`), rendered as RA-anchored tangent-plane meshes (aligned with stars under orbit, not billboards), same presence/emphasis fade as labels capped 0.85, "Figures" toggle (off by default) + `?fig=` URL state. Anchors/size fit to star patterns by grid search (`scripts/fit_figures.py`, min star→art 0.8–1.7°, max ≤3°). CDP verify: all 5 meshes at peak opacity when centered; text-first star/ink alignment check clean. PNGs 2.5 MB total. `f883db8`. See `plans/007-constellation-figures.md`
  - [x] S1-followup: scale to remaining 83 constellations — superseded and completed by plan 012 (all 88, `7a4c7be`)
- [x] S2 fix(render): kill constellation label see-through — labels/figures must not show through planets/satellites or the sun (occluded or hidden when a body is between camera and them); distracting in solar-system view — 93e01ea (plan 008). Fix: label SpriteMaterial depthTest false→true; opaque planet/satellite spheres write depth in the main pass so they occlude a label behind them, while the depthWrite:false sky lines/dots and the r≥5000 background starfield (behind the 4710 labels) never do. CDP-verified: 88/88 labels depthTest=true, constructed Mercury-over-Equuleus-label occlusion confirmed.
- [x] S3 fix(nav): natural planet approach — replace the straight-down top view on planet pick with a "travel to the planet" fly-in that lands at a distance where the FULL planet + its satellites fit with a safe margin (never fills/cuts the screen) — dd3dac3 (plan 008). Fix: frameBody lands at 38° ecliptic elevation (30–45° ask) on a +Z bearing instead of pure overhead, and solves distance against the tighter of vertical/horizontal half-FOV (live canvas aspect) with BODY_FILL 0.9→0.62. CDP-verified on all 8 planets: 34–38° tilt, non-top-down, ~0.62 fill (satellite systems exact), 0.46–0.62 for the four small worlds (build-time frameExtent margin).

## User queue — 2026-08-26 (overnight) — plan 012

- [x] F1 feat(render): constellation figures — replace hand-fitted Bode 1801 scan crops with Stellarium `western` sky-culture illustrations (85 professional transparent figures, each 3-anchored to Hipparcos stars), registered to the sky by a data-driven least-squares similarity transform (center+rotation+scale) — zero hand-tuning, anchor error ≤0.44°. The 3 with no pre-1922 figure (Puppis/Serpens/Vela) use original generated SVG art (ship's stern, two-mast sails, serpent) on the rotated star-cloud extent. Soft tinted underlay behind the IAU star lines. `7a4c7be`. `plans/012-constellation-figures-stellarium.md`

## User queue — 2026-08-26 — plan 013 (pilot gate)

- [x] F1 fix(figures): semantic re-anchor pilot — Delphinus, Ursa Major, Draco misplaced (3-anchor similarity can't fix chirality; true residuals 2–18°). Mirror the 3 art PNGs (renderer has no flip param) + head/tail Procrustes anchor + center refinement until every star sits on the ink (max 0.07°). User validates the pilot before rollout to all 88. `plans/013-semantic-reanchor-pilot.md`

## User queue — 2026-08-26 — plan 014 (rollout + de-collision)

- [x] F1 fix(figures): generalise to all 88 — re-solve every figure from Stellarium's 3-anchor correspondences (closed-form similarity, no vision/search). Anchor chirality test: 80 figures' stored art is the horizontal mirror of the sky pattern → mirror those 80 PNGs in place (renderer has no flip param). Self-selecting rule keeps 3 already-optimal fits (pilots from plan 013). Star match: 742/757 stars now on the art (was 380/757). Then a de-collision pass (per-figure center/size nudges minimizing art-on-art overlap on the sphere, star match guarded) cuts the worst figure overlap from 22.4% (Carina/Vela) to 12.9% with no pair above 13%; A/B vision-verified at in-app opacity. `plans/014-generalize-all88-and-decollide.md`

## User queue — 2026-08-27 — plan 015 (360° cam, giraffe, labels, highlights)

- [x] P1 fix(sky): clear the constellation pick when a global anchor / free camera is chosen (stuck gold) — `plans/015-36...[truncated]
- [x] P2 feat(camera): TrackballControls for full 360° rotation past the poles — `1b054a4`
- [x] P3 fix(figures): Camelopardalis — verified, NO change: shipped entry == standard plan-014 pipeline output (anchor LS + de-collide, drift 0.0000°); ad-hoc re-fit candidates (0.387/0.090/0.0786) rejected as policy breaks per user decision, 0.0786 also vision-rejected (wraps star cloud). Docs in plan 015 P3
- [x] P4 fix(sky): bring constellation labels closer to their star paths (long figures: cap the far-tip margin) — `447776d`
- [x] P5 feat(sky): gold proximity highlight for the nearest constellation (fades with motion) — `05e32d1`
- [x] P6 feat(bodies): blue pick ring + orbit-path highlight for planets (already for satellites) — `ca5e237`

## User queue — 2026-08-27 — plan 016 (screen-space labels, green emphasis, Serpens)

- [x] P1 feat(sky): screen-space constellation name labels — 2D canvas overlay replaces the 88 label sprites (no flicker, no through-figure); labels projected every frame at the plan-006 solver dirs; occlusion by bodies kept via per-label raycast; Save-screenshot composites the overlay so PNGs still contain the labels. `plans/016-screen-space-labels-green-emphasis-plate-audit.md` — `1444b3d`
- [x] P2 feat(sky): apple-green emphasis (0x7cfc5a) + per-constellation glowing star overlay + green picked/nearest label — `ee1c224`
- [x] P3 fix(figures): remove generated Serpens silhouette (duplicates the snake already in the Ophiuchus plate; 87 fits); Puppis/Vela audited + kept — `8afbcb0`
- [x] P4 docs: record P1–P3 hashes + live-deploy verify (CI 3×push success + gh-pages deploy success; live bundle has cst-labels + constellation-stars-emph + green constant 0x7cfc5a, gold ffc46b and sprite labels gone, serpens.png 404)

## User queue — 2026-08-28 — plan 017 (no-jump emphasis, phone labels, roll controls, selection anchor)

`plans/017-no-jump-emphasis-phone-labels-roll-controls-selection-anchor.md` — no free view: the view center is always the current selection; panning is deleted.

- [x] F1 fix(sky): only picked constellations get emphasis — remove the per-frame nearest-argmin (the "jump" the user didn't ask for); D4 center-fade kept — `e1295db`
- [x] F2 feat(sky): phone-legible labels — view-cone filter + screen de-collision, max 8 names drawn — `ce251f4`
- [x] F3 feat(camera): right-drag / 2-finger = roll around view Z; `noPan = true` kills all pan paths (mouse/2-finger/keyboard); 1-finger stays full trackball — `5868677`
- [x] F4 feat(camera): Sky + System anchors select the Sun (two zooms); Free camera removed; pick = new center — `f0f3ba7`
- [x] P5 docs: record F1–F4 hashes + implementation record in the plan file — this commit (all four features live-verified on the headless build before commit)

## User queue — 2026-08-29 — plan 018 (exclusive 2-finger gesture: twist vs pinch)

`plans/018-exclusive-2finger-gesture-twist-vs-pinch.md` — a 2-finger gesture used to drive zoom and roll at once (the zoom won perceptually: "works sometimes, otherwise it zooms"); now a per-gesture race locks ONE mode.

- [x] F1 feat(touch): exclusive 2-finger gesture — twist (3.4°) vs pinch (10%) race, larger ratio wins, ties → roll; roll lock suppresses pinch zoom + restores the seed eye length (position/target exactly fixed); zoom lock = stock pinch; one-finger release hands back to 1-finger orbit — `338c274`

## User queue — 2026-08-29 — plan 019 (constellation-label DPR fix)

`plans/019-fix-constellation-label-dpr-mismatch.md` — constellation labels crammed into the top-left quadrant at half size on hi-DPI displays (the "worse than v1" regression); the 2D overlay's device-pixel buffer was addressed with CSS-pixel coords.

- [x] F1 fix(sky): DPR-matched 2D label overlay — `ctx.setTransform(dpr,0,0,dpr,0,0)` so CSS-px label coords land at full size across the whole viewport; `selectVisibleLabels` de-collision untouched (scale-invariant). CDP dpr=2 before/after: top-left half-size cluster → full-screen normal-size labels. `105c393`

## User queue — 2026-08-29 — plan 020 (panel width, stale hints, pick-view labels)

`plans/020-panel-width-stale-hints-pick-label-pull-in.md` — visual-audit follow-up: the control panel covers 38% of the viewport and hides the view center (the Sun in the boot view, every pick's figure); the hint still teaches panning (removed in plan 017); and pick-view names float ~185px (median) from their figures.

- [x] F1 fix(ui): control hints describe the actual gestures (right-drag / 2-finger twist = roll; panning was removed in plan 017) — `c1517ae`
- [x] F2 fix(ui): cap #panel width (360px) — right edge 689→402 at 1280 wide, un-occludes the view center and the picked figure + its green label (measured: Andromeda/Vela/Lyra/Puppis labels were inside the panel rect) — `4c367bb`
- [x] F3 fix(sky): pull pick-view constellation labels toward their figures in screen space (measure-after-F2 gate in the plan; only if the median distance is still user-visible) — DROPPED, gate fired: post-F2 median 87.5px ≤ 100px (n=10, see plan)

## User queue — 2026-08-30 — plan 021 (restore OrbitControls camera, keep panning off)

`plans/021-restore-orbit-camera-keep-nopan.md` — after living with plans 015–018, the user wants the OLD OrbitControls free-view back (polar-clamped at 180°, no Z-roll) but keeps panning disabled (the one good part). One user-visible change → one commit.

- [x] F1 revert(camera): restore OrbitControls free-view (polar-clamped, no roll); keep panning off (`enablePan=false`); delete rollControls + rewrite tests; hints fixed — `bdcaa8e`

## User queue — 2026-08-30 — plan 022 (time scrubbing: right-drag / 3-finger, live HUD, mini strip)

`plans/022-time-scrub-right-drag-3finger-hud.md` — right-drag (mouse) and 3-finger drag (touch) are a 2D gesture: horizontal travels time (fixed rate, ±27 yrs clamp), vertical moves the speed slider (log scale); press freezes, release resumes at the current slider speed.

- [x] F1 feat(time): right-drag scrubs time (X) and speed (Y); press freezes, release resumes at current speed — `9709e6c` (live CDP 9/9: travel frozen-mid-hold exact, speed/camera untouched, URL t/sp, resume-speed exact state, sub-threshold no-op, paused/reversed restore, contextmenu prevented via real input path)
- [x] F2 feat(time): 3-finger drag = same 2D scrub on touch — `1e9c107` (live CDP 7/7 incl. the 3→2 re-arm bounce: surviving pinch verified dollied 23.3→9.99 after lift; OrbitControls r168 `case 2` gap documented in the plan)
- [x] F3 feat(hud): always-visible mini date/speed strip (top-right) — `d0aa102` (live CDP 5/5: identical to panel via atomic same-call snapshot, tracks running clock, slider/Reverse incl. ← arrow, tracks F1 scrub overlay mid-hold, 375 px day-only + bounding boxes disjoint from full-width panel toggle bar (measured 57.5 px tall → strip at 68 px))

## Declined (user decision 2026-08-18)

- Hohmann probe missions — declined
- From-here viewpoints (Moon Earthrise etc.) — declined
