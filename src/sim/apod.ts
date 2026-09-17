/**
 * Plan 044 B8 — APOD (Astronomy Picture of the Day) daily panel.
 *
 * A daily return hook: one button opens today's NASA APOD (image + title +
 * description + source link). The API is CORS-open (verified:
 * `access-control-allow-origin: *`), so this is a LIVE fetch — no
 * bake-and-bundle.
 *
 * Key policy: the app ships with NASA's public DEMO_KEY (30 req/hour per IP,
 * 50/day) — fine for a static site's "one card per day" usage. A personal key
 * can be supplied via `?nasa_key=...` in the URL (it is NOT persisted) or by
 * editing DEFAULT_KEY here. Results are cached in localStorage for 12 h so
 * the rate limit is never the bottleneck for a returning visitor.
 */

export interface ApodItem {
  /** ISO date the item belongs to (YYYY-MM-DD). */
  date: string;
  title: string;
  /** Image URL (videos are excluded at fetch time). */
  url: string;
  /** Copyright holder, when NASA provides one. */
  copyright: string | null;
  /** Full description (may be long). */
  description: string;
  /** Short blurb for the collapsed card (first sentence). */
  blurb: string;
  /** The NASA page for the full story. */
  pageUrl: string;
}

const API = 'https://api.nasa.gov/planetary/apod';
const DEFAULT_KEY = 'DEMO_KEY';
const CACHE_KEY = 'solar3d.apod.v1';
const CACHE_TTL_MS = 12 * 3600 * 1000;

interface CacheEntry {
  fetchedAt: number;
  item: ApodItem;
}

/** Build the APOD request URL for a date (defaults to today, UTC). */
export function apodUrl(date?: string, key: string = DEFAULT_KEY): string {
  const d = date ?? new Date().toISOString().slice(0, 10);
  return `${API}?api_key=${key}&date=${d}&thumbs=true`;
}

function blurbOf(description: string): string {
  const first = description.split(/(?<=[.!?])\s+/)[0] ?? description;
  return first.length > 180 ? `${first.slice(0, 177)}…` : first;
}

interface RawApod {
  date: string;
  title: string;
  url?: string;
  media_type?: string;
  copyright?: string;
  /** The APOD API calls the description field "explanation". */
  explanation: string;
  hdurl?: string;
}

function toItem(raw: RawApod): ApodItem {
  const url = raw.hdurl ?? raw.url ?? '';
  return {
    date: raw.date,
    title: raw.title,
    url,
    copyright: raw.copyright ?? null,
    description: raw.explanation,
    blurb: blurbOf(raw.explanation),
    pageUrl: `https://apod.nasa.gov/apod/ap${raw.date.replaceAll('-', '')}.html`,
  };
}

/**
 * Fetch today's APOD (or a specific date). Videos are rejected with a
 * friendly error (the panel is image-only). `fetchImpl` is injectable for
 * tests.
 */
export async function fetchApod(
  date?: string,
  opts: { key?: string; now?: () => number; fetchImpl?: typeof fetch } = {},
): Promise<ApodItem> {
  const now = opts.now ?? (() => Date.now());
  const fetchImpl = opts.fetchImpl ?? fetch;
  const d = date ?? new Date(now()).toISOString().slice(0, 10);

  // Cache hit (same date, fresh) — skip the network entirely.
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (raw) {
      const entry: CacheEntry = JSON.parse(raw);
      if (entry.item.date === d && now() - entry.fetchedAt < CACHE_TTL_MS) {
        return entry.item;
      }
    }
  } catch {
    // corrupt cache — refetch
  }

  const res = await fetchImpl(apodUrl(d, opts.key ?? DEFAULT_KEY));
  if (!res.ok) {
    throw new Error(`APOD request failed (HTTP ${res.status})`);
  }
  const raw = (await res.json()) as RawApod;
  if (raw.media_type === 'video' || !raw.url) {
    throw new Error("Today's APOD is a video — the panel shows images only.");
  }
  const item = toItem(raw);
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ fetchedAt: now(), item }));
  } catch {
    // storage full/blocked — non-fatal
  }
  return item;
}
