# TODO — solar-system-3d

## Phase 1 — Core (see `plans/001-core-solar-system.md`)
- [x] Repo scaffold: Vite + TypeScript (strict) + Vitest
- [x] Kepler orbital mechanics (J2000 elements, Newton solver) — `src/sim/kepler.ts`
- [x] Simulation clock (speed, pause, "jump to now") — `src/sim/clock.ts`
- [x] Data: Sun + 8 planets + 9 major moons, one extensible table — `src/data/bodies.ts`
- [x] Renderer: procedural textures, starfield, sun glow, Saturn/Uranus rings — `src/render/`
- [x] UI: time controls, camera follow, orbit/label toggles, scale presets — `src/main.ts`
- [x] Tests: Kepler solver, clock, data validation, scale — `tests/`
- [x] README: run / test / extend guide

## Phase 2 — Realism
- [ ] Optional real textures: drop NASA (public domain) images in `public/textures/<id>.jpg`, auto-loaded over procedural
- [ ] Orbit period / current distance readout in info panel
- [ ] More moons (Ceres, Charon, Nereid, Proteus, Dione, Tethys, Enceladus, Mimas...)
- [ ] Dwarf planets: Pluto (+ Charon), Eris, Ceres — `kind: 'dwarf'` already supported
- [ ] Asteroid belt + Kuiper belt (instanced meshes, seeded positions)
- [ ] Real point-light shadows (eclipses: Moon on Earth, Io on Jupiter)
- [ ] Saturn ring shadow on planet / planet shadow in rings

## Phase 3 — Polish
- [ ] Shareable URL state (time + camera + follow + speed)
- [ ] Mobile touch polish / PWA
- [ ] Constellation lines + planet name tooltips on hover
- [ ] Screenshot button (PNG export)
