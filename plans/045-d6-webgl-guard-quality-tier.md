# Plan 045 — D6: WebGL-availability guard + low-end quality tier

Part of plan 044 (prod-readiness), phase D. D1–D5 are done (this is D6).

## Problem

The app assumes WebGL works and that the device can afford the full-quality
render (DPR 2, HDR post stack, 2500 belt instances, PCF-soft shadow cube maps).
On a low-end phone or a browser with WebGL disabled, that means either a crash
(`new THREE.WebGLRenderer` throws → unhandled → blank page) or a 10 fps crawl.
Neither is acceptable for a product we intend to sell.

## Design

Two independent, composable pieces. Both keep the pure logic in a testable
module (`src/render/quality.ts`, no three/DOM) so the selection + downgrade
math is unit-testable in Node, mirroring the `beltLod.ts` pattern.

### 1. Quality tier (static select + one-shot fps watchdog)

Three tiers, each a pure config object:

| tier   | pixelRatio cap | shadows | belt count scale | post stack |
| ------ | -------------- | ------- | ---------------- | ---------- |
| high   | 2.0            | on      | 1.0 (2500)       | on         |
| medium | 1.5            | on      | 0.6 (1500)       | on         |
| low    | 1.0            | off     | 0.35 (875)       | off        |

- **Static select** from `navigator.deviceMemory` (GB): `≤4 → low`,
  `≥8 → high`, else `medium`. `deviceMemory` is undefined on Firefox/Safari →
  default `high` (the current behaviour; we never make a capable device worse).
- **One-shot fps watchdog**: after boot, sample _active_ frame durations
  (the F6 static-frame skip already prevents parked frames from polluting the
  sample). If the rolling average over a 60-frame window exceeds a threshold
  (e.g. 33 ms ≈ 30 fps) for a sustained window, downgrade one tier and rebuild
  the scene ONCE. No oscillation: the watchdog only ever downgrades, and only
  once (a device that is slow at `high` is slow at `medium` too — we don't
  ping-pong). The rebuild reuses the existing `rebuildScene(scale)` path.
- **Belt count scale** is applied at `sampleBelt` time (a prefix of the same
  seeded sequence, so a low-tier belt is a strict subset of the high-tier belt —
  the rocks that survive are in the same positions, no visual pop on rebuild).

### 2. WebGL-availability guard

- **Pre-flight**: before `buildScene`, probe `canvas.getContext('webgl2') ||
canvas.getContext('webgl')`. If both are null, WebGL is unavailable — show a
  themed fallback (mirrors the existing `#gl-lost` styling) and do NOT start the
  frame loop.
- **try/catch**: wrap `buildScene` in `rebuildScene`'s caller with a try/catch;
  if `new THREE.WebGLRenderer` throws (context creation failed), show the same
  fallback. The frame loop is gated on a `bootOk` flag so it never runs against
  a null renderer.
- The fallback message is honest: "This app needs WebGL. Your browser or device
  doesn't support it (or it's disabled)." + a reload button.

## Commits (one feature each, in dependency order)

1. `feat(quality): pure quality-tier module + belt count scaling` —
   `src/render/quality.ts` (tiers, `selectQualityTier`, `fpsWatchdog`,
   `scaledBeltCount`) + `tests/quality.test.ts`. `sampleBelt` gains an optional
   `count` param (prefix of the seeded sequence). No render/DOM changes yet.
2. `feat(quality): apply tier in buildScene (DPR/shadows/belt/post)` —
   `buildScene` accepts an optional `QualityTier`; sets `setPixelRatio` cap,
   `shadowMap.enabled`, belt counts, and skips the post stack on `low`.
   `BuiltScene.post` becomes optional.
3. `feat(quality): boot select + one-shot fps watchdog + WebGL guard` —
   main.ts: pre-flight WebGL probe + try/catch around `buildScene`, themed
   `#gl-unavailable` fallback, `bootOk` gate on the frame loop, tier select at
   boot, fps watchdog that downgrades once. `window.__debug.qualityTier` handle.
4. `test(e2e): quality tier + WebGL guard smoke` — E2E: app boots at the
   selected tier (read `__debug.qualityTier`); the `#gl-unavailable` fallback is
   hidden on a WebGL-capable browser.

## Verification

- Unit: `tests/quality.test.ts` (tier select thresholds, watchdog downgrade
  once, belt count scaling, prefix property).
- Gate: tsc / lint / vitest / build / format all green.
- E2E: 6 existing + 1 new (tier boots, guard hidden) all pass.
- Live: deploy, confirm the live bundle carries the new tier constants and the
  `#gl-unavailable` element id.

## Out of scope (follow-ups)

- Per-tier texture resolution (1k vs 2k planet maps) — needs a texture-size
  knob; separate feature.
- User-facing quality toggle in the menu — the tier is auto; a manual override
  is a nice-to-have, not prod-blocking.
- Exo-scene (B6) quality tier — it runs on its own renderer; can adopt the same
  tier later.
