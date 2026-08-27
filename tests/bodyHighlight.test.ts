import { describe, expect, it } from 'vitest';
import { bodyHighlightTargets } from '../src/render/scene';

// Plan 015 P6: bodyHighlightTargets is the PURE decision for which body's
// glow ring + orbit line get lit when a body is picked. It is the seam that
// lets the "which body is armed" logic be unit-tested without a scene. The
// satellite (moon) case must stay pixel-identical to the old
// updateSatelliteHighlight, and planets now share it (ring + own orbit lit).

const T0 = 0; // sin(0)=0 -> phase 0.5, deterministic
const PHASE05 = 0.5;
const GOLD = 0x7fd8ff;
const BASE = 0x5570a0;

describe('bodyHighlightTargets (plan 015 P6)', () => {
  it('arms only the picked body; every other body stays idle', () => {
    const picked = 'Mars';
    for (const id of ['Sun', 'Mercury', 'Venus', 'Mars', 'Jupiter']) {
      const t = bodyHighlightTargets(id, picked, true, T0);
      if (id === picked) {
        expect(t.ringVisible).toBe(true);
        expect(t.ringOpacity).toBeCloseTo(0.35 + 0.55 * PHASE05, 6);
        expect(t.ringBreath).toBeCloseTo(1 + 0.12 * PHASE05, 6);
        expect(t.orbitOpacity).toBeCloseTo(0.95, 6);
        expect(t.orbitColor).toBe(GOLD);
      } else {
        expect(t.ringVisible).toBe(false);
        expect(t.ringOpacity).toBe(0);
        expect(t.orbitOpacity).toBeCloseTo(0.45, 6);
        expect(t.orbitColor).toBe(BASE);
      }
    }
  });

  it('keeps the satellite (moon) case pixel-identical to the old behavior', () => {
    // Moon has an orbit line around its parent; old code lit the ring on the
    // moon and brightened its orbit to 0.95 / gold.
    const t = bodyHighlightTargets('Moon', 'Moon', true, T0);
    expect(t.ringVisible).toBe(true);
    expect(t.ringOpacity).toBeCloseTo(0.625, 3); // 0.35 + 0.55*0.5
    expect(t.orbitOpacity).toBeCloseTo(0.95, 3);
    expect(t.orbitColor).toBe(GOLD);
  });

  it('a planet pick lights the SAME ring and its own heliocentric orbit', () => {
    const t = bodyHighlightTargets('Earth', 'Earth', true, T0);
    expect(t.ringVisible).toBe(true);
    expect(t.orbitOpacity).toBeCloseTo(0.95, 3);
    expect(t.orbitColor).toBe(GOLD);
  });

  it('the Sun has no orbit line, so orbit fields are null (ring still shows)', () => {
    const t = bodyHighlightTargets('Sun', 'Sun', false, T0);
    expect(t.ringVisible).toBe(true);
    expect(t.orbitOpacity).toBeNull();
    expect(t.orbitColor).toBeNull();
  });

  it('clearing the pick (empty string) turns every ring off, orbits stay base', () => {
    for (const hasOrbit of [true, false]) {
      const t = bodyHighlightTargets('Mars', '', hasOrbit, T0);
      expect(t.ringVisible).toBe(false);
      if (hasOrbit) {
        expect(t.orbitOpacity).toBeCloseTo(0.45, 3);
        expect(t.orbitColor).toBe(BASE);
      } else {
        expect(t.orbitOpacity).toBeNull();
      }
    }
  });

  it('ring opacity/breath pulse with wall-clock time (deterministic phase)', () => {
    // At T0 phase=0.5; verify a second where sin is larger gives a bigger ring.
    const atT0 = bodyHighlightTargets('Mars', 'Mars', true, T0);
    // t such that sin(3.4 t)=1 -> t = (pi/2)/3.4
    const tMax = Math.PI / 2 / 3.4;
    const atMax = bodyHighlightTargets('Mars', 'Mars', true, tMax);
    expect(atMax.ringOpacity).toBeGreaterThan(atT0.ringOpacity);
    expect(atMax.ringBreath).toBeGreaterThan(atT0.ringBreath);
  });
});
