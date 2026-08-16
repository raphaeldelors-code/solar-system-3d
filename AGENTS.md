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
- `src/render/scale.ts` is also pure (it's unit-tested).
- All three.js / DOM code lives in `src/render/`, `src/ui/`, `src/main.ts`.
- **One data table**: `src/data/solarSystem.ts` is the single source of truth
  for bodies. Sim and render derive everything from `BodyDefinition`. Adding a
  body (planet, moon, dwarf) = adding one object to `BODIES`. Nothing else
  should need to change.
- Orbital math: heliocentric ecliptic J2000 frame. `positionAt(elements, daysSinceJ2000)`
  returns AU. Moons use the same math relative to their parent (`parent` id).

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
