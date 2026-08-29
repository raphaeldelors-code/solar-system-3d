# Plan 018 — Exclusive 2-finger gesture: twist rolls, pinch zooms (never both)

**User report (2026-08-29):** "2 finger rotate on phone is hard to get… when I try it
it works sometimes, but otherwise it zooms."

**Root cause:** a real 2-finger gesture always contains _both_ a small change in the
inter-finger distance (pinch) _and_ a small change in the inter-finger angle (twist).
Today both handlers fire on their component at once: the stock trackball zooms on the
distance while `createRollControls` rolls on the angle. The zoom is visually dominant,
so the user perceives "it zooms" unless the fingers twist cleanly.

**Design — one exclusive gesture per 2-finger touch-down:**
While a 2-finger gesture is in its startup window, the roll listener accumulates
the inter-finger ANGLE change and the relative DISTANCE change from the gesture's
first pose. Each is normalized by its own threshold; whichever has the LARGER
ratio (≥ 1) locks the gesture mode for the rest of the touch-down. This is
pace-robust: a slow pinch drifting a few degrees never loses to a slow twist,
and a fast twist that nudges the fingers inward is not swallowed by the pinch.
A true tie (equal ratios ≥ 1) goes to ROLL — the rarer, harder-to-trigger
gesture (the whole point of plan 018 is making it reachable):

- **Roll lock** (`|angle|/3.4° ≥ |Δdistance|/10% ≥ 1`): apply the twist 1:1
  (including the pre-lock accumulation) and suppress the trackball's zoom for
  the remainder of the gesture. Because the stock trackball zooms on every
  frame _before_ the race decides, the lock also undoes that pre-lock zoom by
  re-scaling the eye to its seed length (captured when the second finger
  landed) — position/target end EXACTLY where the gesture began.
- **Zoom lock** (`|Δdistance|/10% ≥ |angle|/3.4° ≥ 1`): the stock trackball
  pinch does everything; the roll listener stays silent for the rest of the
  gesture.
- Neither ratio reaches 1 (a micro-gesture) → the gesture is undecided; the
  next move re-measures against the original seed.
- **Release one finger** → the survivor becomes a 1-finger orbit (stock
  trackball TOUCH_ROTATE re-baselines; the race resets and a new second
  finger seeds a fresh gesture).

The race is a pure state machine over pointer events, so it is unit-testable in Node
with no DOM: `twistOrPinch` (classify a pair of poses) + `TwistPinchRace` (the
per-gesture state machine). The DOM layer in `rollControls.ts` is a thin adapter.

**Mouse path is unchanged:** right-drag = roll, left-drag = trackball orbit — already
exclusive (different buttons).

**Key constants (measured, not tuned by feel):**

- `TWO_FINGER_TWIST_THRESHOLD = 0.0592` rad (3.4°). Rationale: a deliberate twist
  gesture accumulates several degrees in its first 2–3 pointermove events (typical
  60 Hz pointermove spacing, fingers moving at normal speed ⇒ ≥1°/event), while
  incidental angle noise in a deliberate pinch stays <1°/event. 3.4° ≈ 3 events of
  deliberate twist, ≈ 150 ms at 60 Hz — fast enough to feel instant, far above
  noise. It is also below the 10°-ish angle drift a _deliberate_ pinch can produce
  over its whole duration: under the ratio rule a drifted pinch flips to roll
  only when its total drift exceeds 3.4° × (pinch ratio) — e.g. a 50% pinch
  would need >17° of drift — which means the user was twisting anyway.
- `TWO_FINGER_PINCH_THRESHOLD = 0.10` (10% relative distance change). A deliberate
  pinch moves 20–50% in a few events; a deliberate twist keeps distance within a few
  percent.
- Both thresholds are compared against the gesture's FIRST 2-finger pose
  (re-armed on every fresh 2-finger touch-down).

**Commit list (one feature, one commit):**

1. `feat(touch): exclusive 2-finger gesture — twist vs pinch race locks one mode per gesture (plan 018)` — SHIPPED `338c274`
   - `src/render/rollControls.ts`: add `twistOrPinch` + `TwistPinchRace` pure core;
     rewrite the touch branch of `createRollControls` to drive the race; keep
     `twistDelta` (still used by the race's roll application).
   - `tests/rollControls.test.ts`: 9 new unit tests — `twistOrPinch` (pure pinch
     → zoom, pure twist → roll, below both → pending, drifting pinch still zoom)
     and `TwistPinchRace` (roll lock applies the FULL pre-lock accumulation then
     1:1 increments, zoom lock never rolls, micro-gesture re-races from the
     original seed, reset releases the latch + re-arms, pre-seed update is a no-op).

**Implementation record (what actually shipped vs. the draft above):**

- **Tie-break became a ratio race, not a first-crossing race.** The original
  draft said "whichever crosses its threshold first" — but a slow pinch that
  drifts a few degrees of angle would have locked as roll once the angle
  accumulated past 3.4°, even though the user was pinching. Final rule: each
  component is normalized by its own threshold and the LARGER ratio wins (it
  must be ≥ 1); a true tie goes to roll. Pace-robust, still one algorithm.
- **The pre-lock zoom has to be undone, and the undo is by seed eye length.**
  The stock trackball owns the gesture until the race decides and zooms on
  every `update()` before the lock (a pure-twist gesture still has a few
  percent of incidental distance change). `seedEyeLen` is captured when the
  second finger lands; the roll lock re-scales the eye back to exactly that
  length, so a roll gesture ends with position/target exactly where it began.
  (An earlier draft tried to recompute the undo from the inter-finger
  distance ratio — rejected: it measures the pinch, not the zoom actually
  applied, and breaks when the pinch is negative.)
- **Tests 268/268** (was 259); tsc clean; build clean; `prettier --check .` clean.

**Live CDP verification (headless Chrome, stubbed `setPointerCapture`, each
scenario on a FRESH load after the camera pose settles; asserts on deltas,
not absolute poses — the boot pose is not the scene.ts default):**

- Pure 24° twist (r=60 constant): eye 23.3118 → 23.3118 (ratio 1.0000, drift 0),
  `noZoom` true while locked / false after release; up rotation 1:1 exact —
  measured ΔupDeg 19.103 equals a computed 24° roll under the boot-pose view
  projection (independent Python check, same formula: −16.699 → 2.404).
- Pure 25% pinch: up Δ = 0.0000 (no roll leak), eye ×1.3333 = exactly the
  stock 1/0.75 factor (pinch-in → dolly-out, stock convention).
- Mixed 12° twist + 12% pinch (the user's real case): roll wins the race
  (twist ratio 3.53 vs pinch ratio 1.2), eye restored to seed EXACTLY
  (23.3118 → 23.3118), up 1:1 exact (Δ 8.913 == computed 12° roll).
- Mouse right-drag regression (250 px, 10 steps): posDrift 0, tgtDrift 0, up
  rotated, `noZoom` never touched.
- Handoff (2-finger roll → lift one finger → move survivor): roll latch
  releases on release (`noZoom` true → false), survivor move is a stock
  1-finger orbit (pos changes on the sphere, eye constant 23.3118, up NOT
  rolled by the roll listener).

**Pitfalls discovered (for the next gesture work):**

- The boot camera pose is NOT the scene.ts default: on a clean `/?` load the
  camera settles at eye ≈ 23.31, pos ≈ (15.17, 9.10, 15.17) (the Sun follow
  anchor). CDP checks must settle the pose first (sample until byte-stable)
  and assert on DELTAS, or results look wrong.
- `upDeg = atan2(up_x, up_y)` of the up vector's in-view-plane component is a
  NON-LINEAR measurement of roll (the projection depends on the view
  direction); compare measured vs computed roll with the same projection,
  never against the raw radian input.
- Scenario hygiene: each gesture scenario needs a fresh page load (or an
  explicit pose restore) — a roll applied by scenario N changes the baseline
  of scenario N+1.

**Design notes / non-goals:**

- No new `three` internals: zoom suppression uses the stock `controls.noZoom` flag,
  set/unset around the locked roll gesture. `update()` gates `_zoomCamera()` on it
  (verified in three 0.168 source), and `_checkDistances` also skips when
  `noZoom && noPan` — with `noPan` permanently true, distance clamping is skipped
  only during a locked roll gesture, which is safe (no distance change happens then).
- No velocity/duration heuristics beyond the two threshold races — one algorithm,
  no per-gesture hand-tuning.
- 3+ fingers are still collapsed to the same 2-finger pair (stock trackball
  behaviour); the race tracks the same pair the roll listener tracks.
