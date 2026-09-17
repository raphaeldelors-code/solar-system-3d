/**
 * Plan 044 B5 — space weather + aurora shader (NOAA Kp).
 *
 * Live, dynamic, shareable: the app fetches the current NOAA/SWPC planetary
 * Kp index at runtime (the endpoint is CORS-open, unlike the JPL APIs) and
 * renders an aurora band around Earth's poles whose intensity + colour track
 * the live Kp. Kp ≥ 5 = geomagnetic storm → the aurora brightens and shifts
 * green→red as the storm deepens.
 *
 * This module is PURE (no THREE, no DOM, no fetch) so the Kp→visual mapping,
 * the NOAA JSON parsing, and the G-scale classification are unit-testable.
 * The shader + fetch wiring live in src/render/aurora.ts and src/main.ts.
 */

/** One row of the NOAA/SWPC 3-hour Kp JSON (products/noaa-planetary-k-index.json). */
export interface KpSample {
  /** ISO timestamp of the 3-hour interval start (e.g. "2026-09-16T21:00:00"). */
  time_tag: string;
  /** Planetary Kp for the interval (0–9, one decimal). */
  Kp: number;
  /** Running A-index (nT). */
  a_running?: number;
  /** Number of contributing observatories. */
  station_count?: number;
}

/**
 * Parse the NOAA/SWPC Kp JSON. Accepts the array form the endpoint returns
 * (a list of 3-hour samples, oldest→newest). Returns [] for anything that
 * isn't a non-empty array of {time_tag, Kp} objects — never throws, so a
 * malformed/empty payload degrades to "no data" (aurora off) instead of
 * crashing the app.
 */
export function parseKpJson(raw: unknown): KpSample[] {
  if (!Array.isArray(raw) || raw.length === 0) return [];
  const out: KpSample[] = [];
  for (const item of raw) {
    if (
      item &&
      typeof item === 'object' &&
      typeof (item as KpSample).time_tag === 'string' &&
      typeof (item as KpSample).Kp === 'number' &&
      Number.isFinite((item as KpSample).Kp)
    ) {
      out.push(item as KpSample);
    }
  }
  return out;
}

/** The most recent Kp sample (the array is oldest→newest). Null if empty. */
export function latestKp(samples: KpSample[]): KpSample | null {
  return samples.length ? samples[samples.length - 1] : null;
}

/**
 * NOAA G-scale geomagnetic storm classification from Kp.
 *  - Kp < 5  → 'quiet'  (no storm)
 *  - 5–6     → 'G1'     (minor)
 *  - 7       → 'G2'     (moderate)
 *  - 8       → 'G3'     (strong)
 *  - 9       → 'G4'     (severe)
 * (G5 would require Kp > 9, which is off the 0–9 scale.)
 */
export type GScale = 'quiet' | 'G1' | 'G2' | 'G3' | 'G4';

export function gScale(kp: number): GScale {
  if (kp < 5) return 'quiet';
  if (kp < 7) return 'G1';
  if (kp < 8) return 'G2';
  if (kp < 9) return 'G3';
  return 'G4';
}

/** Human label for a G-scale (for the panel indicator). */
export function gScaleLabel(g: GScale): string {
  switch (g) {
    case 'quiet':
      return 'Quiet';
    case 'G1':
      return 'G1 · Minor storm';
    case 'G2':
      return 'G2 · Moderate storm';
    case 'G3':
      return 'G3 · Strong storm';
    case 'G4':
      return 'G4 · Severe storm';
  }
}

/**
 * Map a Kp value to the aurora's visual parameters.
 *  - intensity: 0 below Kp 4 (no visible aurora), ramping to 1 at Kp 9.
 *  - color: green (calm aurora) → red (deep storm), interpolated over Kp 4–9.
 * Returns a 0-intensity, green colour for Kp < 4 so the band is invisible.
 */
export interface AuroraVisual {
  /** 0–1 band brightness (0 = invisible). */
  intensity: number;
  /** [r,g,b] 0–1 band colour. */
  color: [number, number, number];
}

export function auroraVisual(kp: number): AuroraVisual {
  if (kp < 4) return { intensity: 0, color: [0.2, 0.9, 0.4] };
  const t = Math.min(1, (kp - 4) / 5); // 0 at Kp4 → 1 at Kp9
  const intensity = 0.25 + 0.75 * t; // never fully black once active
  // green (0.2,0.9,0.4) → red (0.95,0.25,0.2)
  const color: [number, number, number] = [
    0.2 + (0.95 - 0.2) * t,
    0.9 + (0.25 - 0.9) * t,
    0.4 + (0.2 - 0.4) * t,
  ];
  return { intensity, color };
}
