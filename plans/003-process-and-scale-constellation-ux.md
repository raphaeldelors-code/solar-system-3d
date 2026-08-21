# Plan 003 — Process guardrails + scale/constellation UX (2026-08-21)

User queue, 2026-08-21 evening. Four features, each its own commit, committed
**in order** before the next one starts. No feature may touch the working tree
before the previous one is committed (the process below is the one the user
asked to codify — this plan practices it).

**Commit order (strict):**

1. **P1** `docs:` plan-first workflow + per-feature commit invariant (AGENTS.md)
   - `todo.md` process section + THIS plan file.
2. **P2** `feat(ui):` scale control → segment switch with both options visible
   (index.html + main.ts).
3. **P3** `fix(render):` constellation labels close to their figures (scene.ts
   - tests).
4. **P4** `feat(render):` constellation sky presence fades with zoom (scene.ts
   - main.ts + tests).

Each step: full gates (`npm test`, `npm run build`, `npm run lint`,
`npm run format:check`) → commit → push → then start the next feature.

---

## P1 — Process guardrails in AGENTS.md

**Problem this prevents:** the 2026-08-21 session implemented three features
(E1–E3) in one working tree and had to split them into three commits
_afterwards_, hand-reconstructing three intermediate states. Painful, error-
prone (dangling fragments, missing blocks), and it burned a whole session.

**Changes:**

- `AGENTS.md` — new section **"Workflow: plan first, commit per feature"**
  (placed before "Git conventions", since it governs how those commits are
  formed):
  1. _Plan before code._ Any multi-feature request first gets a `plans/0NN-*.md`
     with an explicit commit list — one feature per commit, in dependency
     order, each with a conventional-commit subject. `todo.md` gets one line
     per feature that references the plan (e.g. `see plans/003-*.md, P2`) —
     detail lives in the plan file so `todo.md` stays a thin index, not a
     changelog.
  2. _One feature in the working tree at a time._ Feature N is implemented,
     gate-checked (all four gates), committed, and pushed BEFORE feature N+1's
     first line of code is written.
  3. _No retroactive splits._ Never accumulate several features in one tree
     and split them post-hoc. If a session must end mid-way, commit whatever
     is complete and gate-green; leave nothing half-baked in the tree.
  4. _todo.md status discipline._ Tasks are added to `todo.md` (referencing
     the plan) with `[ ]` when planned; flipped to `[x]` + commit hash in the
     SAME commit as the feature. A task is `[x]` only after gates + commit +
     push.
- `todo.md` — new short "Process (in force)" section stating the four rules
  (2–3 lines; the detail lives in AGENTS.md) + the four P-entries for this
  plan.

## P2 — Scale control: segment switch (both options always visible)

**User request:** visible vs real scale must be a toggle switch where both
options are always visible and the active one is unmistakable when toggling.
Today's `#scale-toggle` is a single button whose label _flips_ between the two
names — the current state is implied by reading text, not shown by position.

**Design** (keeps the existing morph engine untouched):

- `index.html`: replace the single `<button id="scale-toggle">` with a segment
  control in the same `.row`:
  ```html
  <div id="scale-switch" role="radiogroup" aria-label="Scale">
    <button id="scale-visible" type="button" class="seg active">Visible scale</button>
    <button id="scale-real" type="button" class="seg">Real scale</button>
  </div>
  ```
  Both labels are always on screen; the active one is lit (`.seg.active`
  reuses the existing `#panel button.active` palette + a stronger treatment:
  filled background, the other one dimmed). CSS: two joined pills (shared
  border radius, 1 px gap, min-width so "Visible scale" / "Real scale" never
  wrap), focus-visible outline for keyboard, 44 px hit target on coarse
  pointers.
- `src/main.ts`:
  - `syncScaleUI()` now lights the button matching the **current target
    state** (which the user is morphing _toward_), not just the parked
    `scale`: active = `morph ? (morph.dir === -1 || morph.p >= 0.5 ? visible
: real) : (scale === TRUE_SCALE ? real : visible)`. During a morph the
    lit option is where the view is heading, so the switch reads like a real
    toggle the moment it's clicked. Update the title/aria states on both
    buttons; drop the old single-button label-swap logic.
  - Click handlers: `#scale-real` → `toggleScale()` only if not already
    going-to/at real (idempotent: clicking the already-active option does
    nothing — no accidental mid-morph reverse); `#scale-visible` → same for
    the other direction. A small `requestScale(target)` helper wraps
    `toggleScale()` so the mid-morph reverse path is only reachable by
    clicking the _other_ option.
  - Keep `#scale-caption` narration as-is (it still shows during the morph).
- URL state unchanged (`scale=1` at rest only — the switch is transient by
  design, same as the old toggle).

**Tests:** no pure-logic change (morph math untouched) → existing suite must
stay green; the change is DOM wiring. Gates + a manual check that the built
page contains both `seg` buttons and the old button is gone.

## P3 — Constellation names: close to their figures

**Measured geometry** (real run, `constellationLabelPose` over all 13):
halfExtent 0.043 (Aquila) … 0.284 (Leo). Current code puts the label at
`margin = max(0.35, halfExtent·1.15)` past the centroid and the sprite half-
width at `max(0.5, halfExtent·1.5)`:

- every margin hits the 0.35 floor (10.3°) — for compact figures that is
  0.2–0.31 rad away: the name floats far off the figure (Aquila, Lyra, Aries
  especially);
- every sprite half-width hits the 0.5 floor (28.6°) while the names are tiny
  — the _text_ is small, but the sprite's 4:1 canvas means the name occupies
  only ~20–30% of a 57°-wide sprite, so the visible ink sits at the sprite
  center = 10° from centroid with ~15° of empty padding toward the figure,
  i.e. the lettering reads as detached;
- for large figures (Leo, Scorpius, Ursa Major, Cygnus) margin 0.35 <
  halfExtent → the label overlaps the figure's far edge.

**Fix (scene.ts, `buildConstellations`):**

- margin: `halfExtent + 0.12` (fixed 6.9° gap past the figure's far edge —
  close enough to read as "this name", never overlapping; replaces the 0.35
  floor that ignored figure size);
- sprite half-width: `max(0.12, halfExtent * 0.35)` so the 4:1 sprite spans
  roughly the figure's own angular size (name ink ~25% of that = ~0.08–0.1 rad
  of text) — a compact sprite whose center IS the label position, so the
  lettering sits a constant small gap from the figure in every case;
- keep: exact spherical offset along the principal axis (beside, not on top),
  depthTest off, same emphasis fade, same name-based index.

**Tests:** update `tests/constellationLabels.test.ts` — the margin assertion
becomes `ang ≈ halfExtent + 0.12`; add an assertion that the label's angular
gap past the figure's far edge is the constant 0.12 (±eps) for all 13, and
that margin > halfExtent always (no overlap).

## P4 — Constellation presence fades with zoom

**User request:** in solar-system view (zoomed in on a planet) the
constellation sky is too present and the names too big; in sky view they
should be exactly as today. The sky dome is static and the camera distance
varies from ~0.35 (planet close-ups) to ~3936 (Sky anchor, `frameConstellations`
caps at `0.82 · CONSTELLATION_RADIUS`), so drive a presence factor from
camera distance.

**Design:**

- `scene.ts` (pure, testable):
  - `CONSTELLATION_SHELL_INNER = 120` — below this (any planet close-up) the
    sky is at minimum presence;
  - `constellationPresence(dist: number): number` — `0.3` (floor: faintly
    visible, never fully gone — the user likes the sky) at `dist ≤ 120`,
    easing to `1.0` at `dist ≥ 0.82·CONSTELLATION_RADIUS`, smoothstep in
    between. Export + unit-test the three anchors and monotonicity.
  - `updateConstellationHighlight(group, emphases, presence)`: multiply the
    final opacity by presence for lines, dots and labels together (labels get
    a gentler curve `0.5 + 0.5·presence` so a name stays faintly readable
    even at the floor — pure ink, still small); the existing base/peak
    emphasis math is untouched.
- `main.ts`: `updateConstellationHighlightThrottled` passes
  `constellationPresence(built.camera.position.length())` (already computed
  per throttle tick; add distance to the pose key so a dolly-zoom with an
  unchanged position key still re-fades). The sky tour / Sky anchor sits at
  ~3936 → presence exactly 1.0, so the dedicated sky experience is
  unchanged.

**Tests:** `tests/constellations.test.ts` (or the labels file) — presence
anchors (≤120 → 0.3, ≥0.82·R → 1.0), monotonic, highlight opacities scale
with presence while the emphasis ordering is preserved.

---

## Definition of done (per feature)

- [ ] full gates green (`npm test` / `npm run build` / `npm run lint` /
      `npm run format:check`)
- [ ] conventional commit, pushed
- [ ] `todo.md` line flipped `[x]` with the commit hash (same commit)
- [ ] only then start the next feature

Final: live-site verify (bundle contains the new switch markup, old button
gone), then a closing note. No docs commit needed — AGENTS.md was updated in
P1 and P2–P4 are covered by the existing constellation/toggle invariant
paragraphs (patched in their respective commits if behaviour shifts).
