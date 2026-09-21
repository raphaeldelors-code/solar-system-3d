import { describe, it, expect } from 'vitest';
import { apodUrl, fetchApod } from '../src/sim/apod';

const NOW = Date.parse('2026-09-17T12:00:00Z');

function rawApod(overrides: Record<string, unknown> = {}) {
  return {
    date: '2026-09-17',
    title: 'Test APOD',
    url: 'https://example.com/a.jpg',
    hdurl: 'https://example.com/a-hd.jpg',
    media_type: 'image',
    copyright: 'NASA',
    explanation: 'A description. Second sentence here.',
    ...overrides,
  };
}

function okFetch(body: unknown): typeof fetch {
  return (async () =>
    ({
      ok: true,
      status: 200,
      json: async () => body,
    }) as Response) as unknown as typeof fetch;
}

describe('apodUrl', () => {
  it('builds the API URL with date and key', () => {
    expect(apodUrl('2026-09-17', 'KEY123')).toBe(
      'https://api.nasa.gov/planetary/apod?api_key=KEY123&date=2026-09-17&thumbs=true',
    );
  });

  it('defaults to today (UTC) and DEMO_KEY', () => {
    const url = apodUrl(undefined, undefined);
    expect(url).toContain('api_key=DEMO_KEY');
    expect(url).toContain(`date=${new Date().toISOString().slice(0, 10)}`);
  });
});

describe('fetchApod', () => {
  it('maps the raw API response to an ApodItem (hdurl preferred)', async () => {
    const item = await fetchApod('2026-09-17', {
      now: () => NOW,
      fetchImpl: okFetch(rawApod()),
    });
    expect(item.url).toBe('https://example.com/a-hd.jpg');
    expect(item.title).toBe('Test APOD');
    expect(item.copyright).toBe('NASA');
    expect(item.blurb).toBe('A description.');
    expect(item.pageUrl).toBe('https://apod.nasa.gov/apod/ap20260917.html');
  });

  it('falls back to url when hdurl is absent', async () => {
    const item = await fetchApod('2026-09-17', {
      now: () => NOW,
      fetchImpl: okFetch(rawApod({ hdurl: undefined })),
    });
    expect(item.url).toBe('https://example.com/a.jpg');
  });

  it('rejects video APODs with a friendly error', async () => {
    await expect(
      fetchApod('2026-09-17', {
        now: () => NOW,
        fetchImpl: okFetch(rawApod({ media_type: 'video', url: undefined })),
      }),
    ).rejects.toThrow(/video/i);
  });

  it('throws on HTTP error', async () => {
    const bad = (async () =>
      ({ ok: false, status: 429, json: async () => ({}) }) as Response) as unknown as typeof fetch;
    await expect(fetchApod('2026-09-17', { now: () => NOW, fetchImpl: bad })).rejects.toThrow(
      /429/,
    );
  });

  it('truncates long blurbs to one sentence + ellipsis', async () => {
    const long = 'x'.repeat(300);
    const item = await fetchApod('2026-09-17', {
      now: () => NOW,
      fetchImpl: okFetch(rawApod({ explanation: `${long}. More. More.` })),
    });
    expect(item.blurb.length).toBeLessThanOrEqual(180);
    expect(item.blurb.endsWith('…')).toBe(true);
  });
});
