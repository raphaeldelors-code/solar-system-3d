# Solar System 3D

A realistic 3D solar system in the browser: the Sun, 8 planets, and 9 major
moons on physically-based Kepler orbits, with rings (Saturn, Uranus),
procedural textures, a starfield, and a full control panel.

- **Simulation:** pure TypeScript Kepler mechanics (J2000 mean elements from
  JPL/Standish) in `src/sim/` — no DOM, fully unit-tested in Node.
- **Rendering:** Three.js scene built from the same body table in
  `src/data/bodies.ts` — add a body there and it appears in the scene, the
  follow list, and the orbit lines automatically.

## Run

```bash
npm install
npm run dev        # http://localhost:5173
```

## Test / build

```bash
npm test           # vitest: Kepler solver, clock
npm run build      # type-check (tsc --noEmit) + vite production build
```

## Controls

| Control         | Action                                                                             |
| --------------- | ---------------------------------------------------------------------------------- |
| Drag            | Rotate camera                                                                      |
| Wheel           | Zoom                                                                               |
| Right-drag      | Pan                                                                                |
| Speed slider    | Sim speed, 0.01–100 days/sec (log scale)                                           |
| Pause / Now     | Freeze time / jump to today                                                        |
| Follow          | Lock camera to Sun, any planet, or moon                                            |
| Scale           | **Visible** (compressed distances, exaggerated sizes) or **True** (physical scale) |
| Orbits / Labels | Toggle orbit lines and name labels                                                 |

## Architecture

```
src/
  sim/       Pure orbital mechanics — testable in Node, no Three.js
    types.ts     Body/element types, J2000 epoch
    kepler.ts    solveKepler (radian-consistent), positionAt, sampleOrbit
    clock.ts     SimClock: simulated days since J2000, speed, pause
  data/
    bodies.ts    Single source of truth: Sun, 8 planets, 9 moons,
                 rings, colors, rotation, tilt (J2000 elements, JPL/Standish)
  render/
    textures.ts  Deterministic procedural 2D-canvas textures (no assets)
    scene.ts     Scene graph, visual scaling, per-frame position updates
  main.ts        Entry: renderer + control panel wiring + animation loop
tests/           Vitest suite for the sim layer
```

### Coordinate & unit conventions

- Time is **days since J2000.0** (`Date.UTC(2000, 0, 1, 12)`).
- Planet elements use `a` in **AU**; moon elements use `a` in **km**
  (positions are added to the parent's heliocentric position).
- `solveKepler` is radian-consistent: radians in, radians out.
- Ecliptic frame → three.js: ecliptic `x→-x`, `y→-z`, `z (north)→+y`,
  so the default view looks down from the ecliptic north pole.
- Retrograde orbits (Triton) are encoded as inclination `i > 90°` with
  positive `n`.

### Two visual scales

- **Visible:** `distance = 4 + log10(au/0.38)·11`, sizes log-scaled —
  everything on screen at once (default).
- **True:** 1 scene unit = 1 AU, radii to the same ratio — planets become
  dust; the follow camera compensates.

## Extending

**Add a body** (e.g. Pluto): append one `BodyDefinition` to `ALL_BODIES`
in `src/data/bodies.ts`:

```ts
{
  id: 'pluto', name: 'Pluto', kind: 'dwarf', parent: 'sun',
  radiusKm: 1188.3, rotationHours: 153.29, tiltDeg: 119.6,
  color: [0.72, 0.66, 0.60], color2: [0.45, 0.40, 0.38],
  elements: { a: 39.482, e: 0.2488, i: 17.16, node: 110.299, peri: 113.83, M0: 14.53, n: 0.003964 },
},
```

It will render, get an orbit line, and appear in the Follow dropdown with no
other changes.

**Swap in real textures:** drop NASA public-domain images at
`public/textures/<id>.jpg`; a texture loader in `src/render/textures.ts`
can load them over the procedural fallback (Phase 2).

**Add a test:** pure-sim logic goes in `tests/*.test.ts` and runs headless
(`npx vitest run`). Renderer code stays out of the test path on purpose.

## Status

See `todo.md` for the phase checklist and `plans/001-core-solar-system.md`
for the Phase 1 plan.
