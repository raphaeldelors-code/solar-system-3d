/**
 * Regression tests for the Moon's orbit line (the "Moon not following its
 * orbit line" bug, reported post-D1).
 *
 * Two root causes were fixed:
 *  1. The line was baked at `5000 * (Date.now() - J2000)` days — the Moon's
 *     path ~132,000 years in the future — so the drawn loop and the Moon's
 *     live position never matched.
 *  2. The Meeus ch.47 geocentric orbit is not a fixed ellipse (node line
 *     regresses ~18.6 y, apse line precesses ~8.85 y), so even a correctly
 *     epoched static line drifts off the Moon as the sim runs. The line is
 *     now re-sampled at the LIVE sim time (resampleMoonOrbitLine).
 *
 * three.js Line/BufferGeometry construct without a WebGL context, so these
 * run in plain Node via vitest.
 */
import { describe, it, expect } from 'vitest';
import * as THREE from 'three';
import { resampleMoonOrbitLine, VISIBLE_SCALE } from '../src/render/scene';
import { moonGeocentricJ2000 } from '../src/sim/moon';
import { AU_KM } from '../src/sim/types';

const N = 129;

/** Build a Moon orbit line the way buildScene does (metadata only). */
function makeMoonLine(): THREE.Line {
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(N * 3), 3));
  const line = new THREE.Line(geo, new THREE.LineBasicMaterial());
  line.userData.radii = new Float32Array(N);
  line.userData.unitDirs = new Float32Array(N * 3);
  line.userData.geo = geo;
  return line;
}

function posOf(line: THREE.Line): THREE.BufferAttribute {
  return line.geometry.getAttribute('position') as THREE.BufferAttribute;
}

function mag(line: THREE.Line, i: number): number {
  const p = posOf(line);
  return Math.hypot(p.getX(i), p.getY(i), p.getZ(i));
}

describe('resampleMoonOrbitLine', () => {
  it("puts the k=0 vertex on the Moon's live position at the same scale", () => {
    const t = 1234.567; // an arbitrary sim epoch (days since J2000)
    const line = makeMoonLine();
    resampleMoonOrbitLine(line, t, VISIBLE_SCALE);

    const live = moonGeocentricJ2000(t);
    const dAu = Math.hypot(live[0], live[1], live[2]);
    const expectR = VISIBLE_SCALE.moonDistance(dAu * AU_KM, 'moon');

    // The line's first vertex is the Moon right now: identical magnitude and
    // direction to the body placement in updatePositions.
    const p = posOf(line);
    expect(mag(line, 0)).toBeCloseTo(expectR, 3);
    // Same unit direction (scene-frame mapping of the ecliptic vector).
    const dirX = -live[0] / dAu,
      dirY = live[2] / dAu,
      dirZ = -live[1] / dAu;
    const got = mag(line, 0);
    expect(p.getX(0) / got).toBeCloseTo(dirX, 4);
    expect(p.getY(0) / got).toBeCloseTo(dirY, 4);
    expect(p.getZ(0) / got).toBeCloseTo(dirZ, 4);
  });

  it('draws one full closed loop around the geocenter', () => {
    const line = makeMoonLine();
    resampleMoonOrbitLine(line, 0, VISIBLE_SCALE);
    const p = posOf(line);

    // The Moon's distance from Earth stays in [356,000; 406,000] km, so every
    // vertex maps into a narrow band — the line is a near-circle of the
    // right size, not a degenerate blob or a fly-off.
    let min = Infinity,
      max = -Infinity;
    for (let i = 0; i < N; i++) {
      min = Math.min(min, mag(line, i));
      max = Math.max(max, mag(line, i));
    }
    const rMid = (min + max) / 2;
    expect(max / rMid - min / rMid).toBeLessThan(0.35); // < ±17.5% around the mean

    // Closed loop: after one sidereal month the geocentric path closes.
    // The Meeus ch.47 path is not a rigid circle (node line regresses,
    // apse precesses, lunar distance varies 356k→406k km), so the last
    // vertex lands within a small chord of the first — a tight bound that
    // still rejects an open / drifting curve.
    const p0 = [p.getX(0), p.getY(0), p.getZ(0)];
    const pEnd = [p.getX(N - 1), p.getY(N - 1), p.getZ(N - 1)];
    const gap = Math.hypot(pEnd[0] - p0[0], pEnd[1] - p0[1], pEnd[2] - p0[2]);
    expect(gap).toBeLessThan(0.1 * rMid);
  });

  it('the line FOLLOWS the Moon — a different sim time yields a different path', () => {
    const a = makeMoonLine();
    const b = makeMoonLine();
    resampleMoonOrbitLine(a, 0, VISIBLE_SCALE);
    resampleMoonOrbitLine(b, 1000, VISIBLE_SCALE);

    const pa = posOf(a),
      pb = posOf(b);
    // After ~1000 days the node line has regressed ~53°, so the loops are
    // visibly rotated relative to each other (the old static line was frozen
    // at one epoch and drifted off the Moon as time ran).
    const diff0 = Math.hypot(
      pa.getX(0) - pb.getX(0),
      pa.getY(0) - pb.getY(0),
      pa.getZ(0) - pb.getZ(0),
    );
    expect(diff0).toBeGreaterThan(0.3 * mag(a, 0));
  });

  it('refreshes the stored km radii + unit dirs so reprojectOrbitLine keeps working', () => {
    const line = makeMoonLine();
    resampleMoonOrbitLine(line, 500, VISIBLE_SCALE);
    const radii = line.userData.radii as Float32Array;
    const dirs = line.userData.unitDirs as Float32Array;
    for (let k = 0; k < N; k++) {
      // Stored radius is the geocentric distance in KM (the moonDistance
      // domain), within the physical band.
      expect(radii[k]).toBeGreaterThan(3.5e5);
      expect(radii[k]).toBeLessThan(4.1e5);
      // Stored direction is a unit vector.
      const l = Math.hypot(dirs[k * 3], dirs[k * 3 + 1], dirs[k * 3 + 2]);
      expect(l).toBeCloseTo(1, 5);
    }
  });

  it('is a no-op for lines without stored metadata', () => {
    const bare = new THREE.Line(new THREE.BufferGeometry(), new THREE.LineBasicMaterial());
    expect(() => resampleMoonOrbitLine(bare, 0, VISIBLE_SCALE)).not.toThrow();
  });
});
