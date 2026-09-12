import { describe, expect, it } from 'vitest';
import { maySkipRender, sceneIsStatic, type IdleFlags } from '../src/render/idle';

const STATIC: IdleFlags = {
  paused: true,
  cameraMoving: false,
  scrubbing: false,
  flightActive: false,
  morphActive: false,
  skyTourActive: false,
  introActive: false,
};

describe('sceneIsStatic', () => {
  it('is true when paused and nothing is animating', () => {
    expect(sceneIsStatic(STATIC)).toBe(true);
  });

  it.each([
    ['paused', { paused: false }],
    ['cameraMoving', { cameraMoving: true }],
    ['scrubbing', { scrubbing: true }],
    ['flightActive', { flightActive: true }],
    ['morphActive', { morphActive: true }],
    ['skyTourActive', { skyTourActive: true }],
    ['introActive', { introActive: true }],
  ] as const)('is false when %s', (_label, over) => {
    expect(sceneIsStatic({ ...STATIC, ...over })).toBe(false);
  });
});

describe('maySkipRender', () => {
  it('skips only when static AND not dirty', () => {
    expect(maySkipRender(STATIC, false)).toBe(true);
    expect(maySkipRender(STATIC, true)).toBe(false); // dirty mark forces a render
    expect(maySkipRender({ ...STATIC, cameraMoving: true }, false)).toBe(false);
  });
});
