import { describe, it, expect } from 'vitest';
import {
  parseAppState, encodeAppState, type ViewState,
} from '../src/state/urlState';

const BASE = 'http://localhost:4173/index.html';

describe('parseAppState', () => {
  it('returns empty for a bare URL', () => {
    expect(parseAppState(BASE)).toEqual({});
  });

  it('parses all scalar params', () => {
    const s = parseAppState(
      `${BASE}?t=1758000000000&sp=0.5&f=earth&sc=t&o=0&l=1&b=0&p=1`,
    );
    expect(s).toEqual({
      timeMs: 1758000000000,
      speedLog: 0.5,
      follow: 'earth',
      scale: 'true',
      orbits: false,
      labels: true,
      belts: false,
      paused: true,
    });
  });

  it('parses the camera triple', () => {
    const s = parseAppState(`${BASE}?cam=1,2,3,4,5,6`);
    expect(s.cam).toEqual({ pos: [1, 2, 3], target: [4, 5, 6] });
  });

  it('treats absent follow as free camera (no key)', () => {
    expect('follow' in parseAppState(`${BASE}?t=1`)).toBe(false);
  });

  it('defaults visible scale when sc=v', () => {
    expect(parseAppState(`${BASE}?sc=v`).scale).toBe('visible');
  });

  it('ignores malformed numbers and triples', () => {
    const s = parseAppState(`${BASE}?t=abc&sp=&cam=1,2&cam2=x`);
    expect('timeMs' in s).toBe(false);
    expect('speedLog' in s).toBe(false);
    expect('cam' in s).toBe(false);
  });

  it('ignores a 7-element cam', () => {
    expect('cam' in parseAppState(`${BASE}?cam=1,2,3,4,5,6,7`)).toBe(false);
  });
});

describe('encodeAppState', () => {
  it('produces a clean absolute URL with ordered params', () => {
    const out = encodeAppState(BASE, {
      timeMs: 1758000000000.4, speedLog: 0.5, follow: 'earth', scale: 'true',
      orbits: false, labels: true, belts: false, paused: true,
    });
    const u = new URL(out);
    expect(u.origin).toBe('http://localhost:4173');
    expect(u.pathname).toBe('/index.html');
    expect(u.searchParams.get('t')).toBe('1758000000000'); // rounded
    expect(u.searchParams.get('sp')).toBe('0.5');
    expect(u.searchParams.get('f')).toBe('earth');
    expect(u.searchParams.get('sc')).toBe('t');
    expect(u.searchParams.get('o')).toBe('0');
    expect(u.searchParams.get('l')).toBe('1');
    expect(u.searchParams.get('b')).toBe('0');
    expect(u.searchParams.get('p')).toBe('1');
  });

  it('omits undefined keys entirely', () => {
    const out = encodeAppState(BASE, { follow: 'moon' });
    const u = new URL(out);
    expect(u.searchParams.has('f')).toBe(true);
    expect(u.searchParams.has('t')).toBe(false);
    expect(u.searchParams.has('cam')).toBe(false);
  });

  it('encodes and drops the camera', () => {
    const withCam = encodeAppState(BASE, {
      cam: { pos: [1.0000001, 2, 3], target: [4, 5, 6.0000002] },
    });
    expect(new URL(withCam).searchParams.get('cam')).toBe('1,2,3,4,5,6');
    // re-encode without cam removes it
    const u = new URL(withCam);
    const roundtrip = encodeAppState(withCam, {});
    expect(new URL(roundtrip).searchParams.has('cam')).toBe(false);
    expect(u.searchParams.get('cam')).toBe('1,2,3,4,5,6');
  });

  it('round-trips a full state through parse', () => {
    const s: ViewState = {
      timeMs: 1758000000000, speedLog: 1.25, follow: 'jupiter', scale: 'true',
      orbits: true, labels: false, belts: true, paused: false,
      cam: { pos: [10, 20, 30], target: [0, 0, 0] },
    };
    const out = encodeAppState(BASE, s);
    const back = parseAppState(out);
    expect(back).toEqual(s);
  });
});
