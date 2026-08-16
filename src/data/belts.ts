/**
 * Small-body populations: main asteroid belt + Kuiper belt.
 *
 * Every member receives J2000-style orbital elements sampled from a seeded
 * RNG (mulberry32), so the field is fully deterministic — the same seed
 * always produces the same belt, and the generator is unit-testable in
 * Node (no `three`, no DOM).
 *
 * Members are rendered by `src/render/belts.ts` (THREE.InstancedMesh) and
 * advanced with the same Kepler solver as planets (`src/sim/kepler.ts`).
 * `a` is in AU; mean motion comes from Kepler's third law:
 * P [days] = 365.25 · a^1.5, n = 360 / P.
 */
import type { OrbitalElements } from '../sim/types';

export interface BeltDefinition {
  id: string;
  name: string;
  /** Number of instances to render. */
  count: number;
  /** Seeded RNG seed (deterministic field). */
  seed: number;
  /** Semi-major axis range [AU]. */
  a: [number, number];
  /** Eccentricity range. */
  e: [number, number];
  /** Inclination range [deg]. */
  i: [number, number];
  /** Base instance radius in scene units. */
  baseSize: number;
  /** Size variation: actual size ∈ baseSize·(1-jitter … 1+jitter). */
  sizeJitter: number;
  /** Base color (0xrrggbb); per-instance brightness varies around it. */
  color: number;
}

export interface BeltObject {
  elements: OrbitalElements;
  /** Instance radius in scene units. */
  size: number;
  /** Fixed orientation [rad] — belt objects are not tidally locked. */
  spin: [number, number, number];
  /** 0..1 per-instance brightness jitter. */
  shade: number;
}

export const BELTS: BeltDefinition[] = [
  {
    id: 'asteroid-belt',
    name: 'Main asteroid belt',
    count: 1200,
    seed: 0x5eed,
    a: [2.1, 3.3], // between Mars and Jupiter
    e: [0.0, 0.25],
    i: [0, 12],
    baseSize: 0.04,
    sizeJitter: 0.5,
    color: 0x9a8f80,
  },
  {
    id: 'kuiper-belt',
    name: 'Kuiper belt',
    count: 900,
    seed: 0x1b0b,
    a: [30, 48], // beyond Neptune
    e: [0.0, 0.3],
    i: [0, 8],
    baseSize: 0.06,
    sizeJitter: 0.6,
    color: 0x8f9fb8,
  },
];

/**
 * Deterministic 32-bit PRNG (mulberry32). Returns floats in [0, 1).
 * Exported for tests; keep the seed handling here so belts stay reproducible.
 */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Sample `belt.count` belt objects with deterministic orbital elements.
 * node / peri / M0 are uniform on [0, 360); a/e/i uniform in their ranges.
 */
export function sampleBelt(belt: BeltDefinition): BeltObject[] {
  const rnd = mulberry32(belt.seed);
  const range = (lo: number, hi: number): number => lo + rnd() * (hi - lo);

  const out: BeltObject[] = [];
  for (let k = 0; k < belt.count; k++) {
    const a = range(belt.a[0], belt.a[1]);
    const e = range(belt.e[0], belt.e[1]);
    const i = range(belt.i[0], belt.i[1]);
    const periodDays = 365.25 * Math.pow(a, 1.5); // Kepler's third law
    out.push({
      elements: {
        a, e, i,
        node: range(0, 360),
        peri: range(0, 360),
        M0: range(0, 360),
        n: 360 / periodDays,
      },
      size: belt.baseSize * (1 - belt.sizeJitter + 2 * belt.sizeJitter * rnd()),
      spin: [rnd() * Math.PI * 2, rnd() * Math.PI * 2, rnd() * Math.PI * 2],
      shade: rnd(),
    });
  }
  return out;
}
