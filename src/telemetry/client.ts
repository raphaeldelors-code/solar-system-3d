/**
 * D7: privacy-first telemetry — DOM-facing client (plan 044).
 *
 * Wraps the pure core (`./telemetry`) with the browser wiring:
 *   - `window.onerror` + `unhandledrejection` capture
 *   - event counters (context-loss, etc.)
 *   - the fps histogram sampler
 *   - the consent gate
 *
 * PRIVACY MODEL (the whole point of D7):
 *   - Telemetry is OPT-IN. Nothing is sent externally until the user explicitly
 *     grants consent in the About dialog. Until then, every report is LOCAL-ONLY:
 *     it goes to the console (for the owner debugging) and, for errors, an
 *     in-app toast so the user knows something went wrong. No network request,
 *     no third party, no data leaves the browser.
 *   - The external sink is PLUGGABLE. By default there is NO external sink —
 *     `createTelemetry` with no `sink` is purely local. A privacy-respecting
 *     owner who wants real error reporting passes a `sink` (a function that
 *     takes a `TelemetryReport` and ships it to Sentry / GlitchTip / a custom
 *     endpoint). The consent gate is enforced HERE, so a misconfigured sink can
 *     never leak data without an explicit grant.
 *
 * This module is DOM-only (it touches window/console) so it is NOT unit-tested
 * in Node — the pure logic it delegates to is tested in `tests/telemetry.test.ts`.
 */
import {
  type ConsentState,
  type FpsHistogram,
  type TelemetryReport,
  consentAllowsExternal,
  createFpsHistogram,
  readConsent,
  recordFrame,
  buildReport,
  writeConsent,
} from './telemetry';

/** A function that ships a report to an external endpoint. The owner provides
 *  this (Sentry / GlitchTip / a custom serverless function). It is only ever
 *  called when consent is granted. */
export type TelemetrySink = (report: TelemetryReport) => void;

export interface TelemetryDeps {
  /** The app version / build hash (injected at build time; 'dev' otherwise). */
  version: string;
  /** Read the current quality tier (high|medium|low) at report time. */
  getQualityTier: () => string;
  /** The consent storage (defaults to localStorage). */
  storage?: Pick<Storage, 'getItem' | 'setItem'>;
  /** Optional external sink. Omit for local-only telemetry (the default). */
  sink?: TelemetrySink;
  /** Called after an error is captured, so the UI can show a toast. Receives
   *  the human-readable message. Not called for counters. */
  onError?: (message: string) => void;
}

export interface Telemetry {
  /** The current consent state. */
  consent(): ConsentState;
  /** Set the consent state (persists it). Returns the new state. */
  setConsent(state: ConsentState): ConsentState;
  /** Report an uncaught error (from window.onerror / unhandledrejection). */
  reportError(message: string, stack?: string): void;
  /** Report an event counter (e.g. a context-loss). */
  count(name: string, value?: number): void;
  /** Feed an active frame's duration (ms) into the fps histogram. */
  sampleFrame(frameMs: number): void;
  /** The current fps histogram snapshot (for a report or debug). */
  fpsHistogram(): FpsHistogram;
  /** Install the window.onerror + unhandledrejection listeners. Call once at
   *  boot. Returns a teardown that removes them. */
  install(): () => void;
}

export function createTelemetry(deps: TelemetryDeps): Telemetry {
  const storage = deps.storage ?? globalThis.localStorage;
  let consent: ConsentState = readConsent(storage);
  const fps = createFpsHistogram();

  /** Route a report: always local (console + onError toast for errors);
   *  external only when consent is granted AND a sink is configured. */
  function dispatch(report: TelemetryReport): void {
    // Local: always. console.error for errors (visible in devtools),
    // console.debug for counters (quiet). This is the owner's debug channel.
    if (report.kind === 'error') {
      console.error('[orrery:telemetry]', report.name, report.stack ?? '');
      deps.onError?.(report.name);
    } else {
      console.debug('[orrery:telemetry]', report.name, report.value ?? 1);
    }
    // External: only with explicit consent + a configured sink.
    if (consentAllowsExternal(consent) && deps.sink) {
      try {
        deps.sink(report);
      } catch (err) {
        // A failing sink must never take the app down.
        console.warn('[orrery:telemetry] sink threw:', err);
      }
    }
  }

  // Named (not an object method) so `install()`'s window listeners can call it
  // directly without a `this` alias (the @typescript-eslint/no-this-alias rule).
  function reportError(message: string, stack?: string): void {
    dispatch(
      buildReport('error', message, deps.getQualityTier(), deps.version, {
        stack,
        fps,
      }),
    );
  }

  return {
    consent() {
      return consent;
    },
    setConsent(state) {
      consent = state;
      writeConsent(storage, state);
      return consent;
    },
    reportError,
    count(name, value = 1) {
      dispatch(buildReport('counter', name, deps.getQualityTier(), deps.version, { value }));
    },
    sampleFrame(frameMs) {
      recordFrame(fps, frameMs);
    },
    fpsHistogram() {
      return fps;
    },
    install() {
      const onerror = (ev: ErrorEvent) => {
        // ErrorEvent carries the message + the Error object (when the error
        // was thrown); resource-load errors (img/script) have message only.
        reportError(ev.message, ev.error?.stack);
      };
      const onrejection = (ev: PromiseRejectionEvent) => {
        const reason = ev.reason;
        const msg =
          reason instanceof Error
            ? reason.message
            : typeof reason === 'string'
              ? reason
              : String(reason);
        const stack = reason instanceof Error ? reason.stack : undefined;
        reportError(msg, stack);
        // Swallow the rejection so the browser's default "unhandled rejection"
        // console noise doesn't double-report; the app already logged it.
        ev.preventDefault();
      };
      window.addEventListener('error', onerror);
      window.addEventListener('unhandledrejection', onrejection);
      return () => {
        window.removeEventListener('error', onerror);
        window.removeEventListener('unhandledrejection', onrejection);
      };
    },
  };
}
