# Plan 001 — Core 3D Solar System

**Status:** implemented · **Branch:** `main` · **Owner:** Hermes Agent

## Goal

A browser-based 3D solar system that is as realistic as practical for a
client-side app: the Sun, 8 planets and 16 major moons moving on their real
Keplerian orbits (J2000 elements), with correct relative sizes (in a
"visible" preset) and true scale (in a "true" preset), axial tilts, rotation,
rings, and a starfield.

## Key decisions (all made up-front)

| #   | Decision       | Choice                                                                                                                                                         | Why                                                                                                                              |
| --- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Language/build | **TypeScript (strict) + Vite**                                                                                                                                 | One `npm install && npm run dev` to run; type-safe; Vite is the de-facto standard and pairs with Vitest for free                 |
| 2   | 3D engine      | **Three.js** (only runtime dep)                                                                                                                                | Mature, huge ecosystem, `npm i three`                                                                                            |
| 3   | Physics        | **Keplerian orbits from real J2000 elements** (a, e, i, Ω, ω, M₀, n) with Newton–Raphson Kepler solver                                                         | Deterministic, analytic, testable, no n-body sim needed for display fidelity; matches real planet positions on real dates        |
| 4   | Testing        | **Vitest** (node env)                                                                                                                                          | Tests pure logic only (Kepler, clock, data, scale); zero DOM/canvas in tests → fast, stable                                      |
| 5   | Textures       | **Procedural, seeded (deterministic) canvas textures**; optional drop-in real textures later (`public/textures/<id>.jpg`)                                      | No network/CDN dependency, no license risk, small repo; real-photo upgrade path kept open                                        |
| 6   | Scale          | Two presets: **Visible** (distance ∝ a^0.6, size ∝ r^0.42) and **True** (linear AU, true relative sizes). Pure function in `src/render/scale.ts` → unit-tested | Real scale is unusable (Earth ≈ 0.001 px at 1 AU); visible preset keeps everything readable, true preset stays physically honest |
| 7   | UI             | **Vanilla TS + small DOM panel** (no framework)                                                                                                                | Fewer deps, easier to extend; a framework would be overkill for ~6 controls                                                      |
| 8   | Extensibility  | **One data table** `src/data/solarSystem.ts`; render/sim derive everything from it                                                                             | Adding a body = adding one object; validation test catches mistakes                                                              |
| 9   | Commits        | Small, conventional commits, pushed after each logical step                                                                                                    | Per user request                                                                                                                 |

## Architecture

```
src/
  sim/        pure orbital mechanics + time (no DOM, no three)
    types.ts        BodyDefinition, OrbitalElements
    kepler.ts       solveKepler(), positionAt(), sampleOrbit()
    clock.ts        SimClock (time since J2000, speed, pause)
  data/
    solarSystem.ts  the single extensible table + validators
  render/     three.js layer (DOM/canvas only here)
    scale.ts      ScaleMode: visible | true (pure → tested)
    textures.ts   procedural canvas textures (seeded RNG)
    starfield.ts  4000-point starfield
    scene.ts      scene graph, orbit lines, labels, rings, follow
  ui/
    controls.ts   DOM panel wiring (speed, follow, toggles, scale)
  main.ts     entry: renderer + loop + clock
tests/        vitest: kepler, clock, data, scale
```

## Milestones → commits

1. `chore: scaffold` — package.json, tsconfig, vite/vitest configs, index.html, docs
2. `feat(sim): kepler + clock` — with unit tests
3. `feat(data): solar system table` — with validation test
4. `feat(render): scene, textures, starfield, UI` — with scale test; `npm run build` green
5. `docs: README`

## Acceptance criteria

- `npm install && npm test` → all green (node only, no browser needed)
- `npm run build` → tsc strict + vite build succeed
- `npm run dev` → Sun + 8 planets + 16 moons visible, moving on correct orbits
- Earth at J2000 (2000-01-01 12:00 UTC) is ≈0.983 AU from the Sun at ecliptic
  longitude ≈100.5° (unit-tested)
- Adding a new body to the data table requires no changes to sim/render code
- Every commit pushed to GitHub

## Out of scope (Phase 2+)

Real photo textures, n-body perturbations, dwarf planets, belts, shadows,
mobile polish — tracked in `todo.md`.
