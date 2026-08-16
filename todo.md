# TODO — solar-system-3d

## Phase 1 — Core (see `plans/001-core-solar-system.md`)
- [x] Repo scaffold: Vite + TypeScript (strict) + Vitest
- [x] Kepler orbital mechanics (J2000 elements, Newton solver) — `src/sim/kepler.ts`
- [x] Simulation clock (speed, pause, "jump to now") — `src/sim/clock.ts`
- [x] Data: Sun + 8 planets + 22 moons, one extensible table — `src/data/bodies.ts`
- [x] Renderer: procedural textures, starfield, sun glow, Saturn/Uranus rings — `src/render/`
- [x] UI: time controls, camera follow, orbit/label toggles, scale presets — `src/main.ts`
- [x] Tests: Kepler solver, clock, data validation (element sanity, periods, orbits finite) — `tests/`
- [x] README: run / test / extend guide

## Phase 2 — Realism
- [x] Optional real textures: drop NASA (public domain) images in `public/textures/<id>.jpg`, auto-loaded over procedural — `src/render/realTextures.ts` (HEAD-probe + cache, fire-and-forget attach)
- [x] Orbit period / current distance readout in info panel — `src/sim/orbitInfo.ts` (pure), shown for the Follow target
- [x] More moons: +13 (Charon, Amalthea, Janus, Mimas, Tethys, Dione, Rhea, Iapetus, Phoebe, Proteus, Ariel, Umbriel, Oberon, Titania, Miranda, Nereid) — 22 total
- [x] Dwarf planets: Pluto, Ceres, Eris, Haumea, Makemake — `kind: 'dwarf'`, heliocentric orbits
- [x] Asteroid belt + Kuiper belt (instanced meshes, seeded positions) — `src/data/belts.ts` + `src/render/belts.ts`, "Belts" toggle
- [x] Real point-light shadows (eclipses: Moon on Earth, Io on Jupiter) — `src/render/shadows.ts`, PCFSoft shadow cube from the sun
- [x] Saturn ring shadow on planet / planet shadow in rings — ring annulus casts+receives (RingGeometry is a true hole, no alpha-disc artifact)

## Phase 3 — Polish
- [ ] Shareable URL state (time + camera + follow + speed)
- [ ] Mobile touch polish / PWA
- [ ] Constellation lines + planet name tooltips on hover
- [ ] Screenshot button (PNG export)
