import { describe, it, expect } from 'vitest';
import { raDecToUnit, CONSTELLATIONS } from '../src/data/constellations';
import {
  constellationCenter,
  constellationEmphasis,
  constellationEmphasisOpacity,
  CONSTELLATION_EMPHASIS_PULSE,
  CONSTELLATION_EMPHASIS_PERIOD,
  CONSTELLATION_EMPHASIS_COLOR,
  buildConstellations,
} from '../src/render/scene';
import * as sceneModule from '../src/render/scene';

describe('raDecToUnit', () => {
  it('maps the equatorial pole straight up', () => {
    for (const ra of [0, 6, 12, 18]) {
      const [x, y, z] = raDecToUnit(ra, 90);
      expect(x).toBeCloseTo(0, 12);
      expect(y).toBeCloseTo(1, 12);
      expect(z).toBeCloseTo(0, 12);
    }
    const [x, y, z] = raDecToUnit(0, -90);
    expect(x).toBeCloseTo(0, 12);
    expect(y).toBeCloseTo(-1, 12);
    expect(z).toBeCloseTo(0, 12);
  });

  it('maps the celestial equator to unit vectors in the horizontal plane', () => {
    for (const ra of [0, 3, 6, 9, 12, 15, 18, 21]) {
      const [x, y, z] = raDecToUnit(ra, 0);
      expect(Math.hypot(x, y, z)).toBeCloseTo(1, 12);
      expect(y).toBeCloseTo(0, 12);
    }
  });

  it('returns a unit vector for arbitrary coordinates', () => {
    const [x, y, z] = raDecToUnit(5.9195, 7.407); // Betelgeuse
    expect(Math.hypot(x, y, z)).toBeCloseTo(1, 12);
  });

  it('keeps the north-up axis: positive declination is +y', () => {
    const [, y] = raDecToUnit(10, 30);
    expect(y).toBeCloseTo(Math.sin((30 * Math.PI) / 180), 12);
  });
});

describe('CONSTELLATIONS data', () => {
  it('every constellation has at least 2 stars and at least 1 line', () => {
    for (const c of CONSTELLATIONS) {
      expect(c.stars.length, c.name).toBeGreaterThanOrEqual(2);
      expect(c.lines.length, c.name).toBeGreaterThanOrEqual(1);
    }
  });

  it('all line endpoints are valid star indices', () => {
    for (const c of CONSTELLATIONS) {
      for (const [a, b] of c.lines) {
        expect(a, `${c.name} a=${a}`).toBeGreaterThanOrEqual(0);
        expect(b, `${c.name} b=${b}`).toBeGreaterThanOrEqual(0);
        expect(a, `${c.name} a`).toBeLessThan(c.stars.length);
        expect(b, `${c.name} b`).toBeLessThan(c.stars.length);
      }
    }
  });

  it('all stars have valid J2000 coordinates', () => {
    for (const c of CONSTELLATIONS) {
      for (const s of c.stars) {
        expect(s.raHours, `${c.name}/${s.name}`).toBeGreaterThanOrEqual(0);
        expect(s.raHours, `${c.name}/${s.name}`).toBeLessThan(24);
        expect(s.decDeg, `${c.name}/${s.name}`).toBeGreaterThanOrEqual(-90);
        expect(s.decDeg, `${c.name}/${s.name}`).toBeLessThanOrEqual(90);
      }
    }
  });

  it('no star is the (0h, 0°) vernal-equinox sentinel (plan 009)', () => {
    // The (0,0) coordinate is the equinox point in Pisces — a data
    // generation sentinel (missing catalog lookup) that renders a stray
    // dot/line in a completely wrong part of the sky. Guard against it
    // recurring (first instance: Ursa Major / Alula Australis).
    for (const c of CONSTELLATIONS) {
      for (const s of c.stars) {
        const isSentinel = Math.abs(s.raHours) < 1e-9 && Math.abs(s.decDeg) < 1e-9;
        expect(isSentinel, `${c.name}/${s.name} sits at the vernal-equinox sentinel (0,0)`).toBe(
          false,
        );
      }
    }
  });

  it('no line spans more than 30° of sky (plan 009)', () => {
    // Every IAU figure edge connects NEIGHBOURING stars. The widest real
    // edge in the whole set is ~14° (Draco Altais→Grumium). A segment over
    // 30° means a star (or its coordinate) was placed in the wrong region —
    // e.g. a line shooting from Ursa Major to the equinox point in Pisces.
    const angSep = (
      a: { raHours: number; decDeg: number },
      b: { raHours: number; decDeg: number },
    ) => {
      const [ax, ay, az] = raDecToUnit(a.raHours, a.decDeg);
      const [bx, by, bz] = raDecToUnit(b.raHours, b.decDeg);
      const d = Math.acos(Math.max(-1, Math.min(1, ax * bx + ay * by + az * bz)));
      return (d * 180) / Math.PI;
    };
    for (const c of CONSTELLATIONS) {
      for (const [a, b] of c.lines) {
        const sep = angSep(c.stars[a], c.stars[b]);
        expect(
          sep,
          `${c.name} line ${a}->${b} (${c.stars[a].name}–${c.stars[b].name}) spans ${sep.toFixed(1)}°`,
        ).toBeLessThan(30);
      }
    }
  });

  it('names within a constellation are unique', () => {
    for (const c of CONSTELLATIONS) {
      const names = new Set(c.stars.map((s) => s.name));
      expect(names.size, c.name).toBe(c.stars.length);
    }
  });
});

describe('full IAU 88-constellation coverage (plan 005)', () => {
  // The exact IAU 1930 standard figure star count for each of the 88
  // constellations (source: Stellarium `skycultures/modern_iau`, edges_18.txt
  // IAU line set). This is the "double check the star count in each" gate:
  // if a figure ever gains or loses a star the test fails and names it.
  const IAU_STAR_COUNTS: Record<string, number> = {
    Andromeda: 16,
    Antlia: 3,
    Apus: 4,
    Aquarius: 16,
    Aquila: 11,
    Ara: 8,
    Aries: 4,
    Auriga: 9,
    Boötes: 12,
    Caelum: 4,
    Camelopardalis: 8,
    Cancer: 5,
    'Canes Venatici': 2,
    'Canis Major': 10,
    'Canis Minor': 2,
    Capricornus: 9,
    Carina: 15,
    Cassiopeia: 5,
    Centaurus: 21,
    Cepheus: 10,
    Cetus: 13,
    Chamaeleon: 5,
    Circinus: 3,
    Columba: 6,
    'Coma Berenices': 3,
    'Corona Australis': 5,
    'Corona Borealis': 7,
    Corvus: 5,
    Crater: 8,
    Crux: 4,
    Cygnus: 10,
    Delphinus: 5,
    Dorado: 6,
    Draco: 15,
    Equuleus: 3,
    Eridanus: 30,
    Fornax: 3,
    Gemini: 17,
    Grus: 7,
    Hercules: 21,
    Horologium: 6,
    Hydra: 21,
    Hydrus: 4,
    Indus: 5,
    Lacerta: 9,
    Leo: 13,
    'Leo Minor': 5,
    Lepus: 11,
    Libra: 6,
    Lupus: 9,
    Lynx: 8,
    Lyra: 6,
    Mensa: 2,
    Microscopium: 2,
    Monoceros: 9,
    Musca: 6,
    Norma: 4,
    Octans: 3,
    Ophiuchus: 17,
    Orion: 22,
    Pavo: 11,
    Pegasus: 13,
    Perseus: 19,
    Phoenix: 6,
    Pictor: 3,
    Pisces: 15,
    'Piscis Austrinus': 8,
    Puppis: 11,
    Pyxis: 4,
    Reticulum: 4,
    Sagitta: 4,
    Sagittarius: 14,
    Scutum: 4,
    Sculptor: 4,
    Scorpius: 18,
    Sextans: 4,
    Serpens: 14,
    Taurus: 12,
    Telescopium: 3,
    Triangulum: 3,
    'Triangulum Australe': 4,
    Tucana: 6,
    'Ursa Major': 19,
    'Ursa Minor': 7,
    Vela: 8,
    Virgo: 14,
    Volans: 5,
    Vulpecula: 2,
  };
  // Serpens (the one constellation split into two non-contiguous line groups,
  // Caput and Cauda) is a single entry here with its combined figure stars.

  it('contains exactly the 88 IAU constellations (by name)', () => {
    expect(CONSTELLATIONS.length).toBe(88);
    const names = new Set(CONSTELLATIONS.map((c) => c.name));
    expect(names.size).toBe(88);
    // Every IAU name is present and no name is invented.
    expect([...names].sort()).toEqual(Object.keys(IAU_STAR_COUNTS).sort());
  });

  it('matches the IAU standard figure star count for every constellation', () => {
    for (const c of CONSTELLATIONS) {
      const expected = IAU_STAR_COUNTS[c.name];
      expect(
        c.stars.length,
        `${c.name} has ${c.stars.length} stars, IAU figure has ${expected}`,
      ).toBe(expected);
    }
  });

  it('figure stars total the IAU grand total (757) and no star is duplicated within a figure', () => {
    const total = CONSTELLATIONS.reduce((n, c) => n + c.stars.length, 0);
    expect(total).toBe(757);
  });
});

describe('known-figure sanity', () => {
  it('Orion belt stars are collinear-ish (Alnitak-Alnilam-Mintaka)', () => {
    const orion = CONSTELLATIONS.find((c) => c.name === 'Orion')!;
    // Look up by NAME (not array index): the IAU figure data may order the
    // stars arbitrarily (plan 005 — the full 88-constellation set).
    const byName = (n: string) => orion.stars.find((s) => s.name === n)!;
    const mintaka = raDecToUnit(byName('Mintaka').raHours, byName('Mintaka').decDeg);
    const alnilam = raDecToUnit(byName('Alnilam').raHours, byName('Alnilam').decDeg);
    const alnitak = raDecToUnit(byName('Alnitak').raHours, byName('Alnitak').decDeg);
    // The belt spans only ~1.4 degrees between adjacent stars: the three
    // unit vectors are nearly parallel (dot > 0.999).
    const dot = (u: number[], v: number[]) => u[0] * v[0] + u[1] * v[1] + u[2] * v[2];
    expect(dot(mintaka, alnilam)).toBeGreaterThan(0.999);
    expect(dot(alnilam, alnitak)).toBeGreaterThan(0.999);
  });

  it('Polaris projects near the north pole', () => {
    const umi = CONSTELLATIONS.find((c) => c.name === 'Ursa Minor')!;
    const pol = umi.stars.find((s) => s.name === 'Polaris')!;
    const [, y] = raDecToUnit(pol.raHours, pol.decDeg);
    expect(y).toBeGreaterThan(0.9999);
  });
});

describe('constellationCenter', () => {
  it('is a unit vector pointing at the figure', () => {
    for (const c of CONSTELLATIONS) {
      const [x, y, z] = constellationCenter(c);
      expect(Math.hypot(x, y, z), c.name).toBeCloseTo(1, 12);
    }
  });
  it('matches the mean star direction (Orion, near +x/−z sky)', () => {
    const orion = CONSTELLATIONS.find((c) => c.name === 'Orion')!;
    const [cx, cy, cz] = constellationCenter(orion);
    // Independent recomputation from the raw star data.
    let mx = 0,
      my = 0,
      mz = 0;
    for (const s of orion.stars) {
      const [sx, sy, sz] = raDecToUnit(s.raHours, s.decDeg);
      mx += sx;
      my += sy;
      mz += sz;
    }
    const len = Math.hypot(mx, my, mz);
    expect(cx).toBeCloseTo(mx / len, 12);
    expect(cy).toBeCloseTo(my / len, 12);
    expect(cz).toBeCloseTo(mz / len, 12);
  });
  it('Ursa Minor sits near the north celestial pole', () => {
    // Its 7 stars span declination 71.8°…89.3°, so the centroid direction is
    // a few degrees off the pole — but unmistakably a north-pole figure.
    const umi = CONSTELLATIONS.find((c) => c.name === 'Ursa Minor')!;
    const [, y] = constellationCenter(umi);
    expect(y).toBeGreaterThan(0.98);
  });
});

describe('constellationEmphasis', () => {
  const at = (deg: number) => {
    const a = (deg * Math.PI) / 180;
    return constellationEmphasis([Math.sin(a), Math.cos(a), 0], [0, 1, 0]);
  };
  it('is 1 when the figure is dead center', () => {
    expect(constellationEmphasis([0, 0, 1], [0, 0, 1])).toBeCloseTo(1, 12);
    expect(at(0)).toBeCloseTo(1, 12);
  });
  it('is 0 at/behind the fade ring (48°) and for the whole sky behind', () => {
    expect(at(48)).toBeCloseTo(0, 9);
    expect(at(60)).toBeCloseTo(0, 12);
    expect(constellationEmphasis([0, 0, -1], [0, 0, 1])).toBeCloseTo(0, 12);
  });
  it('is full inside the inner band (22°) and linear in between', () => {
    expect(at(10)).toBeCloseTo(1, 9);
    expect(at(22)).toBeCloseTo(1, 9);
    // band midpoint (22+48)/2 = 35° => exactly half emphasis
    expect(at(35)).toBeCloseTo(0.5, 9);
    // rises monotonically toward the center (sampled INSIDE the fade band,
    // where the value is strictly between 0 and 1)
    expect(at(46)).toBeLessThan(at(44));
    expect(at(44)).toBeLessThan(at(40));
    expect(at(40)).toBeLessThan(at(30));
    expect(at(30)).toBeLessThan(at(24));
  });
});

describe('constellationEmphasisOpacity (pick pulse, plan 010 S4)', () => {
  it('breathes between 1 and 1 − PULSE, never losing the figure', () => {
    // Peak: sin = 1 at t = PERIOD/4. Trough: sin = −1 at t = 3·PERIOD/4.
    const peak = constellationEmphasisOpacity(CONSTELLATION_EMPHASIS_PERIOD / 4);
    const trough = constellationEmphasisOpacity((3 * CONSTELLATION_EMPHASIS_PERIOD) / 4);
    expect(peak).toBeCloseTo(1, 12);
    expect(trough).toBeCloseTo(1 - CONSTELLATION_EMPHASIS_PULSE, 12);
  });
  it('stays in [1 − PULSE, 1] for arbitrary times (including negatives)', () => {
    for (const t of [-7.3, -1, 0, 0.5, 1, 2.49, 13.7]) {
      const v = constellationEmphasisOpacity(t);
      expect(v, `t=${t}`).toBeGreaterThanOrEqual(1 - CONSTELLATION_EMPHASIS_PULSE - 1e-12);
      expect(v, `t=${t}`).toBeLessThanOrEqual(1 + 1e-12);
    }
  });
  it('is periodic with the configured period', () => {
    const a = constellationEmphasisOpacity(0.37);
    expect(constellationEmphasisOpacity(0.37 + CONSTELLATION_EMPHASIS_PERIOD)).toBeCloseTo(a, 12);
  });
});

describe('plan 017 F1: no proximity auto-emphasis', () => {
  it('the nearest-figure machinery is gone from the module', () => {
    // The plan-015 P5 proximityGoldMix export and the per-frame nearest-argmin
    // were the source of the green highlight "jumping" between constellations
    // on small camera nudges. If either resurfaces, this import/type surface
    // changes and the build fails.
    const keys = Object.keys(sceneModule);
    expect(keys).not.toContain('proximityGoldMix');
    expect(keys).not.toContain('PROXIMITY_GOLD_MIN_EMPH');
  });
});

describe('plan 016 P2: apple-green emphasis', () => {
  it('pins the emphasis color to light apple green (0x7cfc5a), not the old gold', () => {
    // 124/252/90: G is the dominant channel by a wide margin, R < G, B < G —
    // a green, not the warm gold (255/196/107, R > G) it replaced.
    expect(CONSTELLATION_EMPHASIS_COLOR).toBe(0x7cfc5a);
    const r = (CONSTELLATION_EMPHASIS_COLOR >> 16) & 0xff;
    const g = (CONSTELLATION_EMPHASIS_COLOR >> 8) & 0xff;
    const b = CONSTELLATION_EMPHASIS_COLOR & 0xff;
    expect(g).toBeGreaterThanOrEqual(200);
    expect(r).toBeLessThan(g);
    expect(b).toBeLessThan(g);
  });

  it('builds one per-constellation emphasis-star Points, idle-invisible, in green', () => {
    const group = buildConstellations();
    const emph = group.children.filter((c) => c.name.startsWith('constellation-stars-emph:'));
    expect(emph.length).toBe(CONSTELLATIONS.length);
    for (const c of emph) {
      const p = c as unknown as {
        visible: boolean;
        material: { opacity: number; color: { getHex(): number } };
      };
      expect(p.visible).toBe(false);
      expect(p.material.opacity).toBe(0);
      expect(p.material.color.getHex()).toBe(CONSTELLATION_EMPHASIS_COLOR);
    }
  });
});
