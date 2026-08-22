# Plan 004 — Label ink-anchored distance + presence middle (2026-08-21 night)

User queue, 2026-08-21 night (after plan 003 shipped): two problems, two
features, each its own commit, committed **in order**.

**Commit order (strict):**

1. **Q1** `fix(render):` anchor constellation label distance to the TEXT ink,
   not a fixed sprite block (scene.ts + textures.ts + tests).
2. **Q2** `fix(render):` constellation presence floor 0.25 → 0.5 ("the middle
   between too much and too low") (scene.ts + tests).

Each step: full gates (`npm test`, `npm run build`, `npm run lint`,
`npm run format:check`) → commit → push → then start the next feature.
Hash lines in `todo.md` go in ONE small follow-up `docs:` commit at the end
(no `--amend`).

---

## Q1 — Label distance anchored to the actual text ink

**Assessment of how the distance is decided today (measured, 2026-08-21):**

The position math in `buildConstellations`:

1. `margin = halfExtent + CONSTELLATION_LABEL_GAP_RAD (0.12)` — the label
   **sprite block center** sits 6.9° past `halfExtent`, where `halfExtent` =
   the max ABSOLUTE star projection on the principal axis.
2. The sprite block is 11.5° wide (0.2 rad floor) for 12 of the 13 figures,
   and the texture's **ink** (the actual letters) fills only 28–100% of the
   512 px canvas depending on name length (Leo 28%, Orion 48%, Lyra 38%,
   Ursa Major ~99%). The ink is centered in the block, so the _visible_ gap
   from the figure's far edge to the first letter is
   `6.9° − inkRad/2` ≈ **1.2° (Ursa Major) … 5.3° (Leo)** — and Lyra 4.7°,
   Orion 4.1°, Taurus 3.6°: exactly the names the user flagged.
3. Worse: for 5 figures (Orion, Cygnus, Canis Major, Scorpius, Taurus) the
   max extent is on the OPPOSITE side of the axis from the label (signed dump:
   Cygnus +8.4°/−13.7°). The label is then pushed 6.9° past a PHANTOM edge —
   Cygnus's name floats ~8.9° past its real cross.

**Fix — anchor to the real tip and the ink, one rule for every name:**

- `textures.ts`: new pure `layoutConstellationName(name)` — Georgia uppercase
  advances as em-fractions (single source of truth) → `fontSize`, `inkStartX`,
  `inkWidthPx`, `charWidths`. `makeConstellationNameTexture` draws from this
  layout (same fit math, glow, flourish — deterministic across platforms,
  no `measureText` drift).
- `scene.ts`:
  - `constellationLabelPose` keeps `halfExtent = max(extPlus, extMinus)` BUT
    flips the principal axis so the **label side carries the far tip**
    (`extPlus = halfExtent` after the flip) — the name always goes past the
    REAL far edge, never a phantom one. Returns the (possibly flipped) axis.
  - new `CONSTELLATION_LABEL_EDGE_GAP_RAD = 0.035` (~2°) — the gap is defined
    from the figure's far tip to the **ink's near edge**, constant for all 13;
  - new `constellationLabelInkWidthRad(c)` = `inkPx/512 · spriteWidth/labelR`;
  - new `constellationLabelMargin(c)` = `halfExtent + EDGE_GAP + inkRad/2`
    (the block center, so the ink edge lands exactly EDGE_GAP past the tip);
  - sprite width/height UNCHANGED (user is not complaining about text size —
    `constellationLabelWidth`/`_MIN_WIDTH_RAD`/`_SPAN` stay);
  - `constellationLabelPose` axis+halfExtent stay the geometry of record
    ("beside, not on top" invariant intact); `buildConstellations` uses
    `constellationLabelMargin`.

**Expected visible gap (far tip → first letter): exactly 2.0° for every
name** (was 1.2–5.3°, and 8.9° for Cygnus). Margins shrink for the
short-inked figures (Lyra 10.7°→7.9°, Orion 16.4°→14.3°, Taurus 17.5°→15.9°
from center) and Cygnus moves to its real tip.

**Tests:** `tests/constellationLabels.test.ts` — the margin test becomes the
INK-EDGE invariant: for all 13, `margin − inkRad/2 − halfExtent ≈
CONSTELLATION_LABEL_EDGE_GAP_RAD` (the user-visible constant); add:
(a) `constellationLabelInkWidthRad(c)` > 0 and equals
`(inkPx/512)·width(c)/labelR`; (b) label side carries the far tip: max signed
star projection on `pose.axis` equals `halfExtent` for all 13; (c) no overlap:
`margin − inkRad/2 > halfExtent`. Keep sprite-width tests, side-of-sky test,
highlight tests.

## Q2 — Presence floor to the middle (0.25 → 0.5)

**User report:** before plan 003 the sky was too present in close-ups; after
P4 (floor 0.25) it is "almost not there anymore" when moving toward a body —
need the middle.

**Model reminder:** `presence(camera.position.length())` is keyed on distance
from the SUN (the origin), not the picked body. Measured anchors: default
camera `(0,16,30)` = 34, System anchor = 232, Sky anchor = 2756. Because
`FAR` is 2756, the smoothstep is so gentle over the 2→2756 span that every
close-up AND overview view (≈15–232) already sits within a hair of the
floor — so the floor value is exactly what the user sees "when zoomed in."
Raising the floor is the whole fix; NEAR/FAR need not move.

**Fix (scene.ts, one constant + docstring — the smoothstep shape stays):**

- `CONSTELLATION_PRESENCE_FLOOR = 0.5` (was 0.25) — the middle of the 0–1
  range, i.e. between "too much" (≈1.0, pre-P4) and "too low" (0.25, P4).
  Lines/labels/dots at half strength in a close-up: clearly present, clearly
  subordinate to the planet; the existing base/peak emphasis (0.32 → 0.95)
  works inside that (visible range 0.16 → 0.48 at the floor, 0.32 → 0.95 in
  the sky view).
- `NEAR` (2.0) and `FAR` (2756) UNCHANGED: the default/system views are
  already on the floor, so moving NEAR would be invisible churn; FAR keeps
  the Sky anchor / tour at exactly 1.0.

**Tests:** `tests/constellationPresence.test.ts` — the existing tests are
constant-driven and keep passing; add an intent test that pins the fix: the
floor is 0.5 (the middle), a close-up/overview distance (default camera 34)
yields the floor, and the Sky anchor (2756) still yields 1.0. This makes a
revert to 0.25 a visible regression.

---

## Definition of done (per feature)

- [ ] full gates green (`npm test` / `npm run build` / `npm run lint` /
      `npm run format:check`)
- [ ] conventional commit, pushed
- [ ] only then start the next feature

Final: ONE `docs:` commit recording both hashes in `todo.md` + patch the
AGENTS.md constellation invariant (label anchored to ink edge, presence
floor 0.5 / near 34), then live-site verify (new constants in the deployed
bundle).
