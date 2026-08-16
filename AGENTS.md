# AGENTS.md — solar-system-3d

Guidance for AI agents (and humans) working in this repo.

## Commands
```bash
npm install          # once
npm test             # vitest, node-only, fast — run before EVERY commit
npm run dev          # vite dev server → http://localhost:5173
npm run build        # tsc --noEmit (strict) + vite build — must stay green
```
No other test/build tooling is configured. Do not add it casually.

## Architecture invariants
- `src/sim/` and `src/data/` are **pure TS**: no `three`, no DOM. Everything in
  `tests/` relies on this. If you find DOM/three imports there, refactor out.
- All three.js / DOM code lives in `src/render/` and `src/main.ts`.
- **One data table**: `src/data/bodies.ts` is the single source of truth
  for bodies (`SUN`, `PLANETS`, `DWARF_PLANETS`, `MOONS` → `ALL_BODIES`).
  Sim and render derive everything from `BodyDefinition`. Adding a body
  (planet, dwarf, moon) = adding one object to the right array. Nothing
  else should need to change (scene, orbit lines, and follow dropdown
  all derive from `ALL_BODIES`).
- **Belts** (`src/data/belts.ts`): small-body populations (asteroid +
  Kuiper) are a *separate* seeded table — `BELTS` → `sampleBelt()` —
  because instanced fields don't fit `BodyDefinition`. Rendering lives in
  `src/render/belts.ts` (one InstancedMesh per belt); the data layer stays
  pure (no `three`/DOM) and fully deterministic (mulberry32 seed).
- Orbital math: heliocentric ecliptic J2000 frame. `positionAt(elements, daysSinceJ2000)`
  returns AU. Moons use the same math relative to their parent (`parent` id).
- **Shadows** (`src/render/shadows.ts`): the Sun's `PointLight` is a shadow
  caster (PCFSoft cube map). Every body mesh casts+receives *except* the star
  itself (a sphere centered on a point light would occlude the whole shadow
  pass). Rings use a lit `MeshStandardMaterial` and cast+receive — `RingGeometry`
  is a true annulus so no solid-disc alpha artifact. Belt InstancedMeshes
  deliberately skip shadows (2k instances would swamp a 2048 cube). Config
  lives in `shadows.ts` and is unit-tested in `tests/shadows.test.ts` (three.js
  lights/meshes construct in Node without a WebGL context).
- **Real textures** (`src/render/realTextures.ts`): optional drop-in NASA
  images at `public/textures/<bodyId>.jpg` (e.g. `earth.jpg`). At startup each
  body id is HEAD-probed (result cached per id) and, when present, a decoded
  `THREE.Texture` (sRGB, one decode per id for the page's lifetime) replaces
  the procedural `map` and the material is marked for recompile. Purely
  additive: missing file ⇒ procedural texture, no errors. fetch/loader are
  injectable; unit-tested in `tests/realTextures.test.ts`. Note: three.js
  `Material.needsUpdate` is a setter-only accessor (no getter) — assert on the
  write, never read it back.

## Code style
- TypeScript strict (`tsconfig.json` is strict — do not loosen it).
- No runtime dependencies beyond `three`. Dev deps: vite, vitest, typescript.
  Before adding any dependency, check whether it's truly needed.
- Prefer small pure functions; keep them testable.
- Determinism matters: procedural textures use a seeded RNG keyed on body id.
  Do not introduce `Math.random()` in `src/render/textures.ts`.

## Git conventions
- Small, frequent commits; **push after each commit** (user requirement).
- Conventional-commit style: `feat(sim): ...`, `fix(render): ...`,
  `docs: ...`, `test: ...`, `chore: ...`.
- Never commit node_modules or build output (`.gitignore` covers this).
- Branch `main` is the working branch; open PRs only when the user asks.

## Quality gates (before declaring any task done)
1. `npm test` green.
2. `npm run build` green (type errors fail the build).
3. For user-visible changes: verify in `npm run dev` (or at least confirm the
   built page serves via `npm run preview`).
4. Update `todo.md` and, if the change alters architecture, this file and
   `plans/`.
