/**
 * D6 quality tier — pure decision layer, no three/DOM (unit-testable in Node).
 *
 * The app assumes WebGL works and that the device can afford the full-quality
 * render (DPR 2, HDR post stack, 2500 belt instances, PCF-soft shadow cube
 * maps). On a low-end phone or a browser with WebGL disabled that means either
 * a crash or a 10 fps crawl. This module decides the tier from cheap device
 * signals and a one-shot fps watchdog, so the render layer can apply a
 * bounded, testable quality profile.
 *
 * The tier is selected ONCE at boot (static) and may be downgraded ONCE by the
 * fps watchdog. It never oscillates: a device slow at `high` is slow at
 * `medium` too, so the watchdog only ever steps down and only once.
 */

export type QualityTier = 'high' | 'medium' | 'low';

export interface QualityProfile {
  /** Cap applied to `renderer.setPixelRatio` (devicePixelRatio is clamped to this). */
  pixelRatioCap: number;
  /** Whether the Sun point light casts shadow cube maps. */
  shadows: boolean;
  /** Multiplier on each belt's object count (1 = full 2500, 0.35 = ~875). */
  beltCountScale: number;
  /** Whether the HDR→bloom→SMAA post stack is built (false = direct render). */
  post: boolean;
}

/** Ordered high→low so the watchdog can step down by index. */
export const QUALITY_TIERS: readonly QualityTier[] = ['high', 'medium', 'low'];

export const QUALITY_PROFILES: Record<QualityTier, QualityProfile> = {
  high: { pixelRatioCap: 2.0, shadows: true, beltCountScale: 1.0, post: true },
  medium: { pixelRatioCap: 1.5, shadows: true, beltCountScale: 0.6, post: true },
  low: { pixelRatioCap: 1.0, shadows: false, beltCountScale: 0.35, post: false },
};

/**
 * Static tier select from `navigator.deviceMemory` (GB, rounded down by the
 * browser). `≤4 → low`, `≥8 → high`, else `medium`. `deviceMemory` is
 * undefined on Firefox/Safari → `high` (the current behaviour; we never make a
 * capable device worse).
 */
export function selectQualityTier(deviceMemoryGb: number | undefined): QualityTier {
  if (deviceMemoryGb == null) return 'high';
  if (deviceMemoryGb <= 4) return 'low';
  if (deviceMemoryGb >= 8) return 'high';
  return 'medium';
}

/**
 * Scale a belt's object count for a tier. The result is a PREFIX of the same
 * seeded sequence (see `sampleBelt`), so a low-tier belt is a strict subset of
 * the high-tier belt — the surviving rocks are in the same positions, no visual
 * pop on a watchdog rebuild.
 */
export function scaledBeltCount(fullCount: number, tier: QualityTier): number {
  const scale = QUALITY_PROFILES[tier].beltCountScale;
  return Math.max(1, Math.round(fullCount * scale));
}

/**
 * One-shot fps watchdog. Feed it the duration (ms) of each ACTIVE frame (the
 * F6 static-frame skip already keeps parked frames out of the sample). It
 * keeps a rolling window of the last `windowSize` durations and, once the
 * window is full and the rolling average exceeds `slowFrameMs` for `sustained`
 * consecutive full windows, it fires `onDowngrade` exactly once and returns
 * the tier to step down to.
 *
 * Properties (asserted in tests):
 *  - never fires before the window is full;
 *  - fires at most once (the watchdog only ever downgrades, never ping-pongs);
 *  - a fast frame stream (avg < slowFrameMs) never fires;
 *  - the returned tier is one step below the current one (never skips).
 */
export interface FpsWatchdog {
  /** Feed one active frame's duration in ms. Returns the tier to downgrade to, or null. */
  sample(frameMs: number): QualityTier | null;
  /** The tier the watchdog will downgrade to if it fires (one step below `from`). */
  readonly nextTier: QualityTier | null;
}

export function createFpsWatchdog(opts: {
  /** The tier the app is currently running at. */
  from: QualityTier;
  /** Rolling window of frame durations to average over. */
  windowSize?: number;
  /** A frame is "slow" if the rolling average exceeds this (ms). 33 ≈ 30 fps. */
  slowFrameMs?: number;
  /** Consecutive full windows that must all be slow before firing. */
  sustained?: number;
  /** Called exactly once when the watchdog fires. */
  onDowngrade: (to: QualityTier) => void;
}): FpsWatchdog {
  const windowSize = opts.windowSize ?? 60;
  const slowFrameMs = opts.slowFrameMs ?? 33;
  const sustained = opts.sustained ?? 2;

  const fromIdx = QUALITY_TIERS.indexOf(opts.from);
  const nextIdx = fromIdx + 1;
  const nextTier: QualityTier | null =
    nextIdx < QUALITY_TIERS.length ? QUALITY_TIERS[nextIdx] : null;

  const ring: number[] = [];
  let sum = 0;
  let slowWindows = 0;
  let fired = false;

  return {
    nextTier,
    sample(frameMs: number): QualityTier | null {
      if (fired || nextTier == null) return null;
      ring.push(frameMs);
      sum += frameMs;
      if (ring.length > windowSize) {
        sum -= ring.shift() as number;
      }
      if (ring.length < windowSize) return null; // window not full yet
      const avg = sum / windowSize;
      if (avg > slowFrameMs) {
        slowWindows += 1;
      } else {
        slowWindows = 0; // a fast window resets the sustained streak
      }
      if (slowWindows >= sustained) {
        fired = true;
        opts.onDowngrade(nextTier);
        return nextTier;
      }
      return null;
    },
  };
}
