/**
 * D7: privacy-first telemetry — pure core (plan 044).
 *
 * This module holds the testable logic with NO three.js / DOM dependencies,
 * mirroring the `quality.ts` pattern so it runs in Node under vitest:
 *
 *   - consent state (opt-in, persisted to localStorage)
 *   - the fps histogram (bucket active-frame durations)
 *   - the report payload shape (what a sink would receive)
 *
 * The DOM-facing wiring (window.onerror capture, the in-app error toast, the
 * consent toggle, the fps sampler hook) lives in `main.ts` and calls into
 * these pure functions. The external sink is pluggable: by default telemetry
 * is LOCAL-ONLY (console + in-app toast — nothing leaves the browser). A
 * privacy-respecting owner can drop in a real endpoint (Sentry / GlitchTip /
 * a custom serverless function) by passing a `sink` to `createTelemetry` —
 * the consent gate + payload shape stay the same.
 */

/** The three consent states. `declined` is explicit; `unset` is the default. */
export type ConsentState = 'unset' | 'granted' | 'declined';

/** localStorage key for the consent choice (versioned so a schema change can
 *  re-prompt without clobbering an old value). */
export const CONSENT_KEY = 'orrery.telemetry.consent.v1';

/**
 * Read the persisted consent state. Returns 'unset' when nothing is stored or
 * the stored value is not one of the three known states (e.g. a corrupted or
 * future value) — we never treat unknown data as consent.
 */
export function readConsent(storage: Pick<Storage, 'getItem'>): ConsentState {
  const raw = storage.getItem(CONSENT_KEY);
  if (raw === 'granted' || raw === 'declined') return raw;
  return 'unset';
}

/** Persist a consent choice. No-op for 'unset' (that's the absence of a
 *  choice, not a choice to store). */
export function writeConsent(storage: Pick<Storage, 'setItem'>, state: ConsentState): void {
  if (state === 'unset') return;
  storage.setItem(CONSENT_KEY, state);
}

/**
 * Whether external reporting is allowed for a given consent state. Only an
 * explicit 'granted' enables it — 'unset' and 'declined' both keep telemetry
 * local. This is the single gate the sink consults, so a misconfigured sink
 * can never leak data without consent.
 */
export function consentAllowsExternal(state: ConsentState): boolean {
  return state === 'granted';
}

/**
 * The fps histogram buckets. Each is a half-open range [min, max) in ms of
 * ACTIVE frame duration (the static-frame skip already excludes parked
 * frames). The last bucket is open-ended. Buckets are ordered from "smooth"
 * to "severe jank" so a sink can read the distribution at a glance.
 */
export const FPS_BUCKETS: readonly { label: string; min: number; max: number }[] = [
  { label: '<16ms (60fps)', min: 0, max: 16 },
  { label: '16-33ms (30fps)', min: 16, max: 33 },
  { label: '33-66ms (15fps)', min: 33, max: 66 },
  { label: '66-100ms', min: 66, max: 100 },
  { label: '>=100ms (jank)', min: 100, max: Infinity },
];

/**
 * Bucket a single frame duration (ms) into an fps-histogram index. Returns
 * the index into `FPS_BUCKETS`. Negative durations (clock skew) clamp to the
 * first bucket; they're a measurement artifact, not real jank.
 */
export function fpsBucketIndex(frameMs: number): number {
  const ms = frameMs < 0 ? 0 : frameMs;
  for (let i = 0; i < FPS_BUCKETS.length; i++) {
    if (ms < FPS_BUCKETS[i].max) return i;
  }
  return FPS_BUCKETS.length - 1;
}

/**
 * A running fps histogram. Feed it active-frame durations; read the bucket
 * counts + total at report time. Kept as a small object (not a class) so it's
 * trivial to serialize and to test.
 */
export interface FpsHistogram {
  /** One count per `FPS_BUCKETS` entry. */
  counts: number[];
  /** Total active frames sampled. */
  total: number;
}

/** Create an empty histogram (all buckets zero). */
export function createFpsHistogram(): FpsHistogram {
  return { counts: FPS_BUCKETS.map(() => 0), total: 0 };
}

/** Record one active frame. Mutates the histogram in place. */
export function recordFrame(h: FpsHistogram, frameMs: number): void {
  h.counts[fpsBucketIndex(frameMs)]++;
  h.total++;
}

/**
 * The payload a telemetry sink receives. Deliberately minimal + privacy-first:
 * no URLs, no body names, no geolocation, no identifiers — just the error
 * message/stack (for errors) or a counter label, the app version, and the
 * quality tier (so a slow report can be correlated with the render profile).
 * A sink may attach its own envelope (dsn, release, etc.) on top.
 */
export interface TelemetryReport {
  /** 'error' for an uncaught error, 'counter' for an event counter. */
  kind: 'error' | 'counter';
  /** For 'error': the message. For 'counter': the event label. */
  name: string;
  /** For 'error': the stack (may be empty). */
  stack?: string;
  /** The quality tier active when the report was made (high|medium|low). */
  qualityTier: string;
  /** The app version (build hash) — so reports can be tied to a deploy. */
  version: string;
  /** For 'counter': the value (e.g. 1 per context-loss event). */
  value?: number;
  /** Optional fps histogram snapshot (attached to periodic error reports). */
  fps?: FpsHistogram;
}

/**
 * Build a report payload. Centralizes the shape so the sink and the tests
 * agree on it. `version` is the build hash (injected at build time; 'dev' in
 * the dev server / tests).
 */
export function buildReport(
  kind: 'error' | 'counter',
  name: string,
  qualityTier: string,
  version: string,
  extra?: { stack?: string; value?: number; fps?: FpsHistogram },
): TelemetryReport {
  const r: TelemetryReport = { kind, name, qualityTier, version };
  if (extra?.stack !== undefined) r.stack = extra.stack;
  if (extra?.value !== undefined) r.value = extra.value;
  if (extra?.fps !== undefined) r.fps = extra.fps;
  return r;
}
