# Plan 029 — True circular magnifier lens (radial zoom, transparent glass)

## User demand (2026-09-02)

> "I want like an effect as if the cursor adds a transparent lens on top of it
> making everything closer to the center bigger, so that we can see with more
> details the events and emojis as we scroll left or right and are able to
> pick accurately the one we want."

The current lens (plans 025/027) is a **rectangular 220×96 slice window**
hanging below the strip — the user explicitly rejects it ("absolutely not what
I want"). What they want is the classic **magnifying glass**:

- a circular **transparent glass disc** centered on the cursor, sitting ON the
  strip,
- content **closest to the disc center appears biggest**, zooming down
  smoothly to exactly 1× at the rim (radial zoom with falloff),
- so events packed together in the full-year view **fan out** under the glass
  and can be read/picked precisely (emoji visible, day readable),
- must work on **mouse hover** AND the **3-finger phone scrub** (plan 028
  wired the 3-finger path to the lens; it must drive the new lens identically).

## Design

### Shape & placement

- Disc Ø `LENS_R*2 = 112px`, `border-radius: 50%`, centered at
  `(clampedCursorX, lineY)` — i.e. its focal point is the point on the
  5px line under the cursor. `transform: translate(-50%,-50%)`.
- Glass look: 1px inset rim `rgba(180,210,255,.5)`, inner bottom glow,
  soft drop shadow, plus a static top-left gloss highlight (`::after`,
  radial gradient white → transparent). No other color fill — the disc is
  transparent apart from the magnified content, so it reads as "glass on top
  of the strip".
- Center clamp: disc center x is clamped to `[R, W-R]` so the full circle
  stays on screen at the edges (a real glass held at the edge lags).
- Date chip: small DOM chip inside the disc bottom (un-magnified) showing the
  day at the focal point — updates live per frame while hovering/scrubbing.

### Magnification (the "radial zoom with falloff")

Canvas-based inverse warp (the standard true-magnifier technique):

- **Source**: an offscreen canvas holds a 1× vector re-draw of the strip
  (5px rounded line, 12 month ticks, 45° month labels, centered year label,
  event emojis on the line, green fill + caret during scrub), rendered each
  frame in a window `[focalX ± (R+2)] × [lineY−14, lineY+34]` at 2×
  supersample. Same inputs as the DOM (`timelineLayout`, `tlBarEvents`,
  `scrubDay`), so it can't drift from what's on screen.
- **Warp**: for each disc pixel at offset `d` from center, sample the source
  at `focal + d / zoom(|d|)` (inverse map, bilinear), where
  `zoom(r) = 1 + (Z−1)·(1 − r/R)²` with `Z = 3` (max at center, exactly 1 at
  the rim → seamless blend with the real strip).
  → content near the center is 3× (a 13px emoji → ~40px), a packed cluster
  fans out, and the rim matches the live strip pixel-for-pixel.
- **Seamlessness / no double-draw**: while the lens is active, the real strip
  content under the disc is masked out with a per-frame CSS radial mask on
  `#hud-timeline-bar` and `#hud-timeline-scrub`
  (`mask: radial-gradient(circle Rpx at Xpx Ypx, transparent 98%, #000 100%)`),
  so the magnified copy is the only copy visible in the disc.
- Performance: disc rendered at `min(dpr, 2)` (224² px ≈ 50k px); precomputed
  zoom matrix (no per-frame sqrt); ≈ 1–3 ms/frame.

### Behavior

- **Mouse hover** (existing band handler): lens follows cursor x; tooltip
  (nearest event title + date) unchanged, below the strip.
- **3-finger scrub** (plan 028 path): lens follows the finger centroid x
  (clamped), same tooltip; hides on release. Drives the same state.
- Lens state = `{ active, x }`; rendered in the main `frame()` loop (rAF) so
  it tracks a fast clock/scrub with zero lag and disappears when the clock
  is not paused — no, it tracks whenever active (same as before).
- Hide on: pointer leaves band, scrub release, mouse leaves.

### Files

- `index.html` — replace the rectangular lens CSS block (`.tl-lens-*`) with
  the disc + canvas + gloss CSS; replace the lens HTML (canvas + date chip).
- `src/render/lensMath.ts` (new) — pure `lensZoomAt`, `lensSourceOffset`,
  `lensClampX`, `LENS_R`, `LENS_ZOOM` (unit-testable).
- `src/main.ts` — replace `tlTooltipAndLens`/`tlScrubLens`/`tlHideLens` lens
  parts with the state + per-frame canvas renderer + mask updater; keep
  tooltip logic.
- `tests/lensMath.test.ts` (new).

## Gates

`npm test` (old lens math tests removed/updated), `npm run build`,
`npm run lint`, `npx prettier --check` on touched files.
Live: headless desktop — hover shows circular disc, 3× center content,
seamless rim, tooltip intact, hides on leave; phone metrics — 3-finger scrub
rolls the disc along the strip, release hides. Screenshot QA.

## Features

- [x] F1 `feat(hud): true circular magnifier lens (radial zoom, transparent glass)` — per-element radial transform (lensDisplace) into a 112px circular canvas disc; 4× at center → 1× at rim; packed events fan out (4px→11px verified); mouse hover + 3-finger scrub drive it; mouse-leave + 3-finger lift hide it. Live-verified in headless Chrome (DOM + canvas-pixel checks).
- [x] `docs:` record hash in todo.md + this plan
