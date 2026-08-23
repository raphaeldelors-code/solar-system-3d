import { describe, expect, it } from 'vitest';
import { figureTextureUrl } from '../src/render/scene';
import {
  FIGURE_BOX_PADDING,
  FIGURE_FITS,
  TANGENT_PLANE_SIZE,
  findFigureFit,
  figurePlacement,
  unitToRaDec,
  type FigureFit,
} from '../src/data/figures';

const dot = (a: number[], b: number[]) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const norm = (a: number[]) => Math.hypot(a[0], a[1], a[2]);
const approx = (v: number, n = 6) => Math.round(v * 10 ** n) / 10 ** n;

/** A unit direction pointing at RA 6h / Dec +40° in the scene frame. */
const CENTROID: [number, number, number] = [0.6428, 0.342, 0.6845]; // not exact — normalized below
const C = (CENTROID[0] ** 2 + CENTROID[1] ** 2 + CENTROID[2] ** 2) ** 0.5;
const CEN = CENTROID.map((v) => v / C) as [number, number, number];

describe('figures data', () => {
  it('prototype set is exactly 68 unique constellations (5 + batch 1 + batch 2 + batch 3a)', () => {
    expect(FIGURE_FITS).toHaveLength(68);
    const names = FIGURE_FITS.map((f) => f.constellation);
    expect(new Set(names).size).toBe(68);
  });

  it('fits have sane aspect ratios and plate sizes', () => {
    for (const f of FIGURE_FITS) {
      expect(f.aspect).toBeGreaterThan(0.2);
      expect(f.aspect).toBeLessThan(5);
      const size = f.sizeDeg ?? TANGENT_PLANE_SIZE;
      expect(size).toBeGreaterThan(10);
      expect(size).toBeLessThan(100);
    }
  });

  it('findFigureFit hits and misses', () => {
    expect(findFigureFit('Orion')?.aspect).toBeCloseTo(1.412, 3);
    expect(findFigureFit('Pavo')).toBeUndefined();
  });

  it('no duplicate constellation names in the fit table', () => {
    const names = FIGURE_FITS.map((f) => f.constellation);
    expect(names).toEqual([...new Set(names)]);
  });
});

describe('figureTextureUrl', () => {
  it('lowercases and underscores spaces', () => {
    expect(figureTextureUrl('Canis Major')).toBe('constellation-figures/canis_major.png');
    expect(figureTextureUrl('Pisces')).toBe('constellation-figures/pisces.png');
  });

  it('strips diacritics so Boötes maps to bootes.png', () => {
    expect(figureTextureUrl('Boötes')).toBe('constellation-figures/bootes.png');
  });
});

describe('figurePlacement', () => {
  const fit: FigureFit = { constellation: 'Test', aspect: 1.2 };

  it('position is the normalized centroid', () => {
    const p = figurePlacement(fit, CEN);
    expect(p.position.map(approx)).toEqual(CEN.map(approx));
    expect(norm(p.position)).toBeCloseTo(1, 6);
  });

  it('upHint is perpendicular to position (tangent plane)', () => {
    const p = figurePlacement(fit, CEN);
    expect(Math.abs(dot(p.position, p.upHint))).toBeLessThan(1e-9);
    expect(norm(p.upHint)).toBeCloseTo(1, 6);
  });

  it('upHint at zero rotation points to celestial north on the tangent plane', () => {
    const p = figurePlacement({ constellation: 'T', aspect: 1 }, CEN);
    // North on the tangent plane = component of world-up perpendicular to n.
    const n = p.position;
    const north = [-n[1] * n[0], 1 - n[1] * n[1], -n[1] * n[2]];
    const m = norm(north) || 1;
    expect(
      dot(
        p.upHint,
        north.map((v) => v / m),
      ),
    ).toBeCloseTo(1, 6);
  });

  it('rotationDeg sets rotationRad but leaves upHint as the north projection', () => {
    // The renderer applies the in-plane rotation via mesh.rotateZ, so the
    // pure placement must NOT pre-rotate upHint (that would double-apply it).
    const base = figurePlacement({ constellation: 'T', aspect: 1 }, CEN);
    const rot = figurePlacement({ constellation: 'T', aspect: 1, rotationDeg: 90 }, CEN);
    expect(rot.upHint.map(approx)).toEqual(base.upHint.map(approx));
    expect(Math.abs(dot(rot.position, rot.upHint))).toBeLessThan(1e-9);
    expect(rot.rotationRad).toBeCloseTo(Math.PI / 2, 6);
  });

  it('plane size fills the padded box preserving aspect', () => {
    const p = figurePlacement({ constellation: 'T', aspect: 4 / 3 }, CEN);
    const box = (TANGENT_PLANE_SIZE * Math.PI) / 180;
    const usable = box * (1 - 2 * FIGURE_BOX_PADDING);
    const expectedW = usable * Math.sqrt(4 / 3);
    const expectedH = usable / Math.sqrt(4 / 3);
    // W>U*... aspect 4/3 => w>h and w<=usable? w = usable*1.155 > usable!
    // The clamp caps the wider dimension at `usable`.
    expect(Math.max(p.planeSize[0], p.planeSize[1])).toBeCloseTo(usable, 6);
    expect(p.planeSize[0] / p.planeSize[1]).toBeCloseTo(expectedW / expectedH, 6);
  });

  it('aspect 1 gives a square of the full padded box', () => {
    const p = figurePlacement({ constellation: 'T', aspect: 1 }, CEN);
    const usable = ((TANGENT_PLANE_SIZE * Math.PI) / 180) * (1 - 2 * FIGURE_BOX_PADDING);
    expect(p.planeSize[0]).toBeCloseTo(usable, 6);
    expect(p.planeSize[1]).toBeCloseTo(usable, 6);
  });

  it('sizeDeg scales the plate box (default is TANGENT_PLANE_SIZE)', () => {
    const small = figurePlacement({ constellation: 'T', aspect: 1 }, CEN);
    const big = figurePlacement({ constellation: 'T', aspect: 1, sizeDeg: 30 }, CEN);
    expect(big.planeSize[0] / small.planeSize[0]).toBeCloseTo(30 / 15, 6);
    expect(big.planeSize[1] / small.planeSize[1]).toBeCloseTo(30 / 15, 6);
  });

  it('wide plates clamp width to the box', () => {
    const p = figurePlacement({ constellation: 'T', aspect: 3 }, CEN);
    const usable = ((TANGENT_PLANE_SIZE * Math.PI) / 180) * (1 - 2 * FIGURE_BOX_PADDING);
    expect(p.planeSize[0]).toBeCloseTo(usable, 6);
    expect(p.planeSize[1]).toBeCloseTo(usable / 3, 6);
  });

  it('handles the celestial pole without NaN', () => {
    const p = figurePlacement({ constellation: 'T', aspect: 1, rotationDeg: 30 }, [0, 1, 0]);
    expect(Number.isFinite(p.position[0] + p.upHint[0] + p.planeSize[0])).toBe(true);
    expect(norm(p.position)).toBeCloseTo(1, 6);
  });

  it('unnormalizable centroid still yields a unit position (degenerate)', () => {
    const p = figurePlacement({ constellation: 'T', aspect: 1 }, [0, 0, 0]);
    expect(norm(p.position)).toBeCloseTo(1, 6);
  });
});

describe('unitToRaDec', () => {
  it('round-trips raDecToUnit', async () => {
    const { raDecToUnit } = await import('../src/data/constellations');
    for (const [ra, dec] of [
      [0, 0],
      [5.5877, -1.2],
      [10.68, 56.3],
      [19.98, 42.3],
      [23.9, -43.1],
    ]) {
      const [backRa, backDec] = unitToRaDec(raDecToUnit(ra, dec));
      expect(backDec).toBeCloseTo(dec, 5);
      // RA is periodic; compare modulo 24h.
      const diff = (backRa - ra + 24) % 24;
      expect(Math.min(diff, 24 - diff)).toBeLessThan(1e-5);
    }
  });
});
