/**
 * Regression tests for `reprojectOrbitLine` (true-scale tour, B3).
 *
 * The function re-maps a stored orbit line (per-sample radius + unit
 * direction) through a new VisualScale. Points must land at
 * `unitDir * distMap(r)` — the SAME magnitude `makeOrbitLine` produces —
 * with NO division by the sample radius. A stray `/r` (the "missing moon
 * orbit" bug, D1) silently shrinks outer orbits and grows inner ones, and
 * for the Moon (radii in km) collapses the line to sub-pixel size.
 *
 * three.js Line/BufferGeometry construct without a WebGL context, so these
 * run in plain Node via vitest.
 */
import { describe, it, expect } from 'vitest';
import * as THREE from 'three';
import { reprojectOrbitLine, type VisualScale } from '../src/render/scene';

/** Build a minimal orbit line the way makeOrbitLine / the Moon block do. */
function makeFakeLine(radii: number[], unitDirs: number[][]): THREE.Line {
  const geo = new THREE.BufferGeometry();
  const n = radii.length;
  const positions = new Float32Array(n * 3); // initial values irrelevant
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const line = new THREE.Line(geo, new THREE.LineBasicMaterial());
  line.userData.radii = new Float32Array(radii);
  const dirs = new Float32Array(n * 3);
  unitDirs.forEach((d, i) => {
    dirs[i * 3] = d[0];
    dirs[i * 3 + 1] = d[1];
    dirs[i * 3 + 2] = d[2];
  });
  line.userData.unitDirs = dirs;
  line.userData.geo = geo;
  return line;
}

const fakePlanetScale = (factor: number): VisualScale => ({
  bodyRadiusKm: (km) => km,
  moonRadiusKm: (km) => km,
  planetDistance: (au) => au * factor,
  moonDistance: (km, id) => (id ? 3 + km * 0.001 : 1 + km * 0.001),
  followDistanceKm: (km) => km,
});

function mags(line: THREE.Line): number[] {
  const pos = line.geometry.getAttribute('position') as THREE.BufferAttribute;
  const out: number[] = [];
  for (let i = 0; i < pos.count; i++)
    out.push(pos.getX(i) ** 2 + pos.getY(i) ** 2 + pos.getZ(i) ** 2);
  return out.map((v) => Math.sqrt(v));
}

describe('reprojectOrbitLine', () => {
  it('maps every point to unitDir * planetDistance(r) (no /r)', () => {
    const line = makeFakeLine(
      [1, 2, 4],
      [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
      ],
    );
    const scale = fakePlanetScale(10); // planetDistance(au) = 10*au
    reprojectOrbitLine(line, scale, null);
    const pos = line.geometry.getAttribute('position') as THREE.BufferAttribute;
    // magnitudes must be exactly 10, 20, 40 — NOT r*10/r = 10 for all.
    expect(mags(line)).toEqual([10, 20, 40]);
    expect(pos.getX(0)).toBeCloseTo(10, 9);
    expect(pos.getY(1)).toBeCloseTo(20, 9);
    expect(pos.getZ(2)).toBeCloseTo(40, 9);
  });

  it('uses moonDistance(r, moonId) in km for moon orbits', () => {
    // Moon radii are parent-distances in km (the moonDistance domain).
    const line = makeFakeLine(
      [384_400, 400_000],
      [
        [1, 0, 0],
        [0, 0, -1],
      ],
    );
    const scale = fakePlanetScale(1); // moonDistance(km,'moon') = 3 + km*0.001
    reprojectOrbitLine(line, scale, 'moon');
    // Positions are stored in a Float32 attribute, so compare within float32
    // epsilon of the float64 mapping.
    const got = mags(line);
    expect(got[0]).toBeCloseTo(3 + 384_400 * 0.001, 3);
    expect(got[1]).toBeCloseTo(3 + 400_000 * 0.001, 3);
  });

  it('marks the attribute dirty and refreshes the bounding sphere', () => {
    const line = makeFakeLine(
      [1, 3],
      [
        [1, 0, 0],
        [0, 1, 0],
      ],
    );
    reprojectOrbitLine(line, fakePlanetScale(2), null); // points (2,0,0), (0,6,0)
    const geo = line.geometry;
    expect(geo.boundingSphere).not.toBeNull();
    // center (1,3,0) → radius sqrt(1 + 9) = sqrt(10)
    expect(geo.boundingSphere!.center.x).toBeCloseTo(1, 5);
    expect(geo.boundingSphere!.center.y).toBeCloseTo(3, 5);
    expect(geo.boundingSphere!.radius).toBeCloseTo(Math.sqrt(10), 3);
  });

  it('is a no-op for lines without stored metadata', () => {
    const bare = new THREE.Line(new THREE.BufferGeometry(), new THREE.LineBasicMaterial());
    expect(() => reprojectOrbitLine(bare, fakePlanetScale(1), null)).not.toThrow();
  });
});
