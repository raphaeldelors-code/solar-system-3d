import { describe, expect, it } from 'vitest';
import { figureTextureUrl } from '../src/render/scene';
import { raDecToUnit } from '../src/data/constellations';
import { FIGURE_FITS, findFigureFit, figurePlacement, type FigureFit } from '../src/data/figures';

const dot = (a: number[], b: number[]) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const norm = (a: number[]) => Math.hypot(a[0], a[1], a[2]);
const approx = (v: number, n = 6) => Math.round(v * 10 ** n) / 10 ** n;

/** A registered figure used for placement-shape tests. */
const FIT: FigureFit = {
  constellation: 'Test',
  centerRAHours: 6.0,
  centerDecDeg: 40.0,
  sizeW: 20,
  sizeH: 12,
  rotationDeg: 30,
};
const CEN = raDecToUnit(FIT.centerRAHours, FIT.centerDecDeg);

describe('figures data (plan 012)', () => {
  it('covers exactly 88 unique constellations', () => {
    expect(FIGURE_FITS).toHaveLength(88);
    const names = FIGURE_FITS.map((f) => f.constellation);
    expect(new Set(names).size).toBe(88);
    expect(names).toEqual([...new Set(names)]);
  });

  it('fits have sane solved centers, sizes, and rotations', () => {
    for (const f of FIGURE_FITS) {
      const ra = ((f.centerRAHours % 24) + 24) % 24;
      expect(ra).toBeGreaterThanOrEqual(0);
      expect(ra).toBeLessThan(24);
      expect(f.centerDecDeg).toBeGreaterThanOrEqual(-90);
      expect(f.centerDecDeg).toBeLessThanOrEqual(90);
      expect(f.sizeW).toBeGreaterThan(0.5);
      expect(f.sizeH).toBeGreaterThan(0.5);
      // Largest figure (Serpens, a cloud-center fit) is the only one this
      // wide; every anchor-registered figure is far smaller.
      expect(Math.max(f.sizeW, f.sizeH)).toBeLessThan(70);
      expect(Math.abs(f.rotationDeg)).toBeLessThanOrEqual(180);
    }
  });

  it('findFigureFit hits and misses', () => {
    expect(findFigureFit('Orion')).toBeDefined();
    expect(findFigureFit('Puppis')).toBeDefined();
    expect(findFigureFit('Not A Constellation')).toBeUndefined();
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
  it('position is the scene direction of the solved center', () => {
    const p = figurePlacement(FIT);
    expect(p.position.map(approx)).toEqual(CEN.map(approx));
    expect(norm(p.position)).toBeCloseTo(1, 6);
  });

  it('upHint is perpendicular to position (tangent plane)', () => {
    const p = figurePlacement(FIT);
    expect(Math.abs(dot(p.position, p.upHint))).toBeLessThan(1e-9);
    expect(norm(p.upHint)).toBeCloseTo(1, 6);
  });

  it('upHint at zero rotation points to celestial north on the tangent plane', () => {
    const p = figurePlacement({ ...FIT, rotationDeg: 0 });
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
    const base = figurePlacement({ ...FIT, rotationDeg: 0 });
    const rot = figurePlacement(FIT);
    expect(rot.upHint.map(approx)).toEqual(base.upHint.map(approx));
    expect(Math.abs(dot(rot.position, rot.upHint))).toBeLessThan(1e-9);
    expect(rot.rotationRad).toBeCloseTo((30 * Math.PI) / 180, 6);
  });

  it('planeSize is the solved size in radians', () => {
    const p = figurePlacement(FIT);
    expect(p.planeSize[0]).toBeCloseTo((20 * Math.PI) / 180, 6);
    expect(p.planeSize[1]).toBeCloseTo((12 * Math.PI) / 180, 6);
  });

  it('handles the celestial pole without NaN', () => {
    const p = figurePlacement({ ...FIT, centerDecDeg: 90, rotationDeg: 30 });
    expect(Number.isFinite(p.position[0] + p.upHint[0] + p.planeSize[0])).toBe(true);
    expect(norm(p.position)).toBeCloseTo(1, 6);
    expect(norm(p.upHint)).toBeCloseTo(1, 6);
  });

  it('placement is independent of constellation data (pure fit math)', () => {
    const p1 = figurePlacement(FIT);
    const p2 = figurePlacement(FIT);
    expect(p1.position.map(approx)).toEqual(p2.position.map(approx));
    expect(p1.planeSize.map(approx)).toEqual(p2.planeSize.map(approx));
  });
});
