# Plan 047 — Todo (check off as each lands green)

## Phase 0 — Revert low-value noise
- [x] P0.1 CUT: NEO "Next Asteroid" feed (UI row + applyNeo wiring)
- [x] P0.2 CUT: Space-Weather Kp row
- [x] P0.3 CUT: APOD row
- [x] P0.4 CUT: exoplanet "Systems" second-app (Sky/System/Systems -> Sky/System)
- [x] P0.5 CUT: ISS satellite + orbit line
- [x] P0.6 CUT: DSO/Messier markers + toggle
- [x] P0.7 CUT: DOF toggle
- [ ] P0.8 HIDE: Events/Share/About/scale/belts/figures into one "More" disclosure
- [ ] P0.9 Panel default = collapsed pill; <=6 visible rows when open

## Phase 1 — Scene de-clutter
- [x] P1.1 Orbit lines: faint + depth-fade + picked/hover emphasis (scene.ts, main.ts)
- [x] P1.2 Sun: remove anamorphic streak + shrink corona (post.ts)
- [x] P1.3 Kill "+" star spikes (skybox.ts)
- [x] P1.4 Labels: one language, cap 4, mode-gated (planet/constellation labels, textures.ts, main.ts)
- [ ] P1.5 Starfield: 9000->3500, dim tail, subtle twinkle, MW desaturate (skybox.ts, starfield.ts)

## Phase 2 — UI / material / type
 - [x] P2.1 Unify glass + palette tokens (index.html :root + all surfaces)
 - [x] P2.2 Panel: 300px, collapse-to-pill, <=6 rows
 - [x] P2.3 Emoji -> 16px line icons
 - [x] P2.4 Motion: single easing, kill competing pulses
- [ ] P2.5 Typography pass (title/heads/body/tabular-nums)
- [ ] P2.6 Planet polish: Earth rim 1.15 + rocky specular glint

## Phase 3 — Gate & loop
- [ ] P3.1 Screenshot boot/wide/mobile (headless Chrome + vision)
- [ ] P3.2 Score vs 047-rubric.md; record per-criterion + total
- [ ] P3.3 If <95: implement single highest-ROI gap, re-score (loop)

## Judge rounds (gate = >=95 AND 12/12 checklist)
- R1 baseline: 57.6 FAIL (pre-redesign)
- R2: 42.8 FAIL — STALE screenshots (pre P0/P1 fixes); invalid
- R3: 58.7 FAIL — 8/12. Fixes applied: orbit fade calibrated (40-110u, DOM-verified 0.10→0.03), emoji removed at i18n source, glass opacity unified.
- R4: pending
