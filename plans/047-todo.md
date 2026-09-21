# Plan 047 — Todo (check off as each lands green)

## Phase 0 — Revert low-value noise
- [ ] P0.1 CUT: NEO "Next Asteroid" feed (UI row + applyNeo wiring)
- [ ] P0.2 CUT: Space-Weather Kp row
- [ ] P0.3 CUT: APOD row
- [ ] P0.4 CUT: exoplanet "Systems" second-app (Sky/System/Systems -> Sky/System)
- [ ] P0.5 CUT: ISS satellite + orbit line
- [ ] P0.6 CUT: DSO/Messier markers + toggle
- [ ] P0.7 CUT: DOF toggle
- [ ] P0.8 HIDE: Events/Share/About/scale/belts/figures into one "More" disclosure
- [ ] P0.9 Panel default = collapsed pill; <=6 visible rows when open

## Phase 1 — Scene de-clutter
- [x] P1.1 Orbit lines: faint + depth-fade + picked/hover emphasis (scene.ts, main.ts)
- [x] P1.2 Sun: remove anamorphic streak + shrink corona (post.ts)
- [x] P1.3 Kill "+" star spikes (skybox.ts)
- [ ] P1.4 Labels: one language, cap 4, mode-gated (planet/constellation labels, textures.ts, main.ts)
- [ ] P1.5 Starfield: 9000->3500, dim tail, subtle twinkle, MW desaturate (skybox.ts, starfield.ts)

## Phase 2 — UI / material / type
- [ ] P2.1 Unify glass + palette tokens (index.html :root + all surfaces)
- [ ] P2.2 Panel: 300px, collapse-to-pill, <=6 rows
- [ ] P2.3 Emoji -> 16px line icons
- [ ] P2.4 Motion: single easing, kill competing pulses
- [ ] P2.5 Typography pass (title/heads/body/tabular-nums)
- [ ] P2.6 Planet polish: Earth rim 1.15 + rocky specular glint

## Phase 3 — Gate & loop
- [ ] P3.1 Screenshot boot/wide/mobile (headless Chrome + vision)
- [ ] P3.2 Score vs 047-rubric.md; record per-criterion + total
- [ ] P3.3 If <95: implement single highest-ROI gap, re-score (loop)
