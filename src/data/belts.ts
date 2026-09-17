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
  /**
   * Far-LOD point size in scene units (default 1.5). Belts that span a large
   * radius (Kuiper) set a smaller value so the dust cloud reads as a faint
   * band at overview distance instead of a second bright dotted ring.
   */
  farPointSize?: number;
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
    // 2026-09-12: 1800 → 1100. At the inner-system zoom the ring read as a
    // solid hot band — the busiest object on screen, above the planets.
    // Thinning the population (deterministic seed unchanged) breaks it up
    // into a believable scatter instead of a wall of dots.
    count: 1100,
    seed: 0x5eed,
    a: [2.1, 3.3], // between Mars and Jupiter
    e: [0.0, 0.25],
    i: [0, 12],
    // 2026-09-12: 0.05 → 0.027. At the inner-system zoom (out to Jupiter) the
    // sun-lit rocks read as a hot solid ring — brighter than the planets and
    // the orbit lines. Smaller rocks keep the belt present but let the
    // planets back into the foreground. (Kuiper was trimmed the same way.)
    baseSize: 0.027,
    sizeJitter: 0.5,
    // Warm tan dimmed ~15% so the lit rocks don't glow against the dark disk.
    color: 0xb0a289,
    // FAR-LOD fix (2026-09-12): at inner-system zoom (camera ≈ 150–200 units)
    // the LOD has already switched to the point cloud — 1,800 additive points
    // at size 1.5 read as a dense glowing dot ring, the busiest object on
    // screen. Halving the point size (0.75) cuts each dot's area ~4× so the
    // cloud reads as a faint dust band and the planets come back to the
    // foreground. (Kuiper already uses 0.7; the inner belt was left at the
    // 1.5 default — the actual cause of the "small belt around the sun is
    // too bright" report.)
    farPointSize: 0.75,
  },
  {
    id: 'kuiper-belt',
    name: 'Kuiper belt',
    count: 1400,
    seed: 0x1b0b,
    a: [30, 48], // beyond Neptune
    e: [0.0, 0.3],
    i: [0, 8],
    // 2026-09-12: 0.075 → 0.05. At overview distance the 1,400 rocks were the
    // brightest feature on screen (brighter than the orbit lines); a rock
    // this size at that distance reads as a dot, and 1,400 dots read as a
    // glowing ring. 0.05 keeps the belt visible in close-up without shouting
    // from the overview.
    baseSize: 0.05,
    sizeJitter: 0.6,
    color: 0xbcd2ee,
    // Far-LOD point size (scene units). The Kuiper belt spans ~2.4× the
    // asteroid belt's radius, so its dust cloud needs smaller points to read
    // as a faint band rather than a second bright dotted ring (2026-09-12).
    farPointSize: 0.7,
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
 *
 * `count` overrides the belt's full count (D6 quality tier). The result is a
 * PREFIX of the same seeded sequence — sampling `n < belt.count` objects yields
 * exactly the first `n` of the full belt, so a low-tier belt is a strict subset
 * of the high-tier belt (same positions, no visual pop on a watchdog rebuild).
 */
export function sampleBelt(belt: BeltDefinition, count?: number): BeltObject[] {
  const rnd = mulberry32(belt.seed);
  const range = (lo: number, hi: number): number => lo + rnd() * (hi - lo);
  const n = count == null ? belt.count : Math.max(0, Math.min(count, belt.count));

  const out: BeltObject[] = [];
  for (let k = 0; k < n; k++) {
    const a = range(belt.a[0], belt.a[1]);
    const e = range(belt.e[0], belt.e[1]);
    const i = range(belt.i[0], belt.i[1]);
    const periodDays = 365.25 * Math.pow(a, 1.5); // Kepler's third law
    out.push({
      elements: {
        a,
        e,
        i,
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
