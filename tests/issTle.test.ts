import { describe, it, expect, vi, afterEach } from 'vitest';
import {
  parseTlePayload,
  tleEpoch,
  resolveIssTle,
  fetchIssTle,
  FALLBACK_ISS_TLE,
  CELESTRAK_ISS_URL,
} from '../src/data/issTle.js';

const SAMPLE = `ISS (ZARYA)
1 25544U 98067A   26259.14303184  .00007008  00000+0  13461-3 0  9990
2 25544  51.6310 209.9325 0004907 145.2560 214.8750 15.49133683585852
`;

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('issTle', () => {
  it('parses a well-formed CelesTrak payload', () => {
    const tle = parseTlePayload(SAMPLE);
    expect(tle).not.toBeNull();
    expect(tle!.name).toBe('ISS (ZARYA)');
    expect(tle!.noradId).toBe(25544);
    expect(tle!.line1.startsWith('1 25544U')).toBe(true);
    expect(tle!.line2.startsWith('2 25544')).toBe(true);
  });

  it('parses a payload without a name line', () => {
    const tle = parseTlePayload(SAMPLE.split('\n').slice(1).join('\n'));
    expect(tle).not.toBeNull();
    expect(tle!.noradId).toBe(25544);
    expect(tle!.name).toBe('NORAD 25544');
  });

  it('rejects a malformed payload', () => {
    expect(parseTlePayload('garbage\nno element lines')).toBeNull();
    expect(parseTlePayload('')).toBeNull();
    // Line 1 with a non-numeric catalog number.
    expect(
      parseTlePayload(
        '1 XXXXXU 98067A   26259.14303184  .00007008  00000+0  13461-3 0  9990\n2 25544  51.6310 209.9325 0004907 145.2560 214.8750 15.49133683585852',
      ),
    ).toBeNull();
  });

  it('parses the TLE epoch into a UTC Date', () => {
    const epoch = tleEpoch(FALLBACK_ISS_TLE);
    expect(epoch).not.toBeNull();
    // Epoch 26259.14303184 → 2026, day 259, 0.14303184 of a day.
    expect(epoch!.getUTCFullYear()).toBe(2026);
    const dayStart = Date.UTC(2026, 0, 1);
    const dayFrac = (epoch!.getTime() - dayStart) / 86_400_000;
    expect(dayFrac).toBeCloseTo(258.14303184, 4); // day 259 → 258 + frac
  });

  it('returns null for an unparseable epoch', () => {
    expect(
      tleEpoch({
        name: 'x',
        noradId: 1,
        line1: '1 00001U 00001A   bad-epoch-field  .00007008  00000+0  13461-3 0  9990',
        line2: '2 00001  51.6310 209.9325 0004907 145.2560 214.8750 15.49133683585852',
      }),
    ).toBeNull();
  });

  it('fetchIssTle returns the parsed TLE on success', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      text: async () => SAMPLE,
    });
    vi.stubGlobal('fetch', fetchMock);
    const tle = await fetchIssTle();
    expect(tle).not.toBeNull();
    expect(tle!.noradId).toBe(25544);
    expect(fetchMock).toHaveBeenCalledWith(
      CELESTRAK_ISS_URL,
      expect.objectContaining({ headers: { Accept: 'text/plain' } }),
    );
  });

  it('fetchIssTle returns null on HTTP error', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 503 }));
    expect(await fetchIssTle()).toBeNull();
  });

  it('fetchIssTle returns null on network failure', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));
    expect(await fetchIssTle()).toBeNull();
  });

  it('resolveIssTle falls back to the bundled TLE when offline', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));
    const payload = await resolveIssTle();
    expect(payload.live).toBe(false);
    expect(payload.tle).toBe(FALLBACK_ISS_TLE);
    expect(payload.epoch).not.toBeNull();
  });

  it('resolveIssTle prefers the live TLE when the fetch succeeds', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, text: async () => SAMPLE }));
    const payload = await resolveIssTle();
    expect(payload.live).toBe(true);
    expect(payload.tle.noradId).toBe(25544);
    expect(payload.epoch).not.toBeNull();
  });
});
