/* Service worker: offline support for the app shell (plan 044 D4).
 *
 * Strategy:
 *   - Precache the shell at install (index + offline page + manifest + icons).
 *   - Network-first with cache fallback for same-origin GETs, so a fresh
 *     deploy is picked up on the next navigation while offline still works.
 *   - The cache name is VERSIONED per build (BUILD_VERSION is injected at
 *     build time by the vite.config.ts closeBundle plugin). When a new SW
 *     installs, `activate` deletes every cache that isn't the current
 *     version, so stale shells from previous deploys are evicted and the
 *     runtime cache can't grow unbounded across deploys.
 *   - A count-based LRU cap trims the runtime cache within a single deploy's
 *     lifetime (e.g. many optional texture drops).
 *
 * BUILD_VERSION is a build-time placeholder replaced with a short content
 * hash of the emitted JS/CSS bundles (see vite.config.ts). In dev / an
 * un-built copy it stays the literal string, which is fine — the cache is
 * only used in production.
 */
const BUILD_VERSION = '213e01c8c7';
const CACHE = 'orrery-' + BUILD_VERSION;
// Max entries kept in the runtime cache before LRU eviction kicks in. The
// shell itself is a handful of entries; this headroom is for optional
// public/textures/*.jpg drops that get cached on first fetch.
const MAX_ENTRIES = 100;
const PRECACHE = ['./', 'offline.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Navigations (top-level document requests) fall back to the cached shell,
  // then to the dedicated offline page if even that is missing.
  const isNavigation = request.mode === 'navigate';

  event.respondWith(
    fetch(request)
      .then((response) => {
        // Cache successful responses (stale-while-revalidate-ish). Only cache
        // same-origin responses we actually served.
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE).then((cache) => {
            cache.put(request, copy);
            return trimCache(CACHE, MAX_ENTRIES);
          });
        }
        return response;
      })
      .catch(() => {
        // Offline (or network failed): serve from cache. Navigations fall back
        // to the shell, then the offline page.
        return caches
          .match(request)
          .then((hit) => hit || (isNavigation ? shellOrOffline(url) : undefined));
      }),
  );
});

/**
 * Offline navigation fallback: serve the cached app shell, then the dedicated
 * offline page.
 *
 * The shell is precached as `./` (the bare origin path). But a real navigation
 * almost always carries a query string — the app round-trips its state in the
 * URL (`/?intro=0&t=…&f=sun&…`), so the request URL is `/?intro=0`, NOT `/`.
 * `caches.match('./')` only matches the exact `/` URL, so a naive fallback
 * misses every query-string navigation and drops to the offline page even
 * though the shell is cached. Match the bare pathname first (the precached
 * shell), then the exact request, then the offline page. (Exposed by plan 044
 * D5, whose extra lazy chunk tipped the cache over the LRU cap and made this
 * miss observable in the offline smoke test.)
 */
async function shellOrOffline(url) {
  const shell = await caches.match('./');
  if (shell) return shell;
  const exact = await caches.match(requestFromUrl(url));
  if (exact) return exact;
  return caches.match('offline.html');
}

function requestFromUrl(url) {
  return new Request(url.origin + url.pathname, { method: 'GET' });
}

/**
 * Count-based LRU trim: CacheStorage returns keys in insertion order, so the
 * oldest entries are first. Drop the oldest RUNTIME entries until we're at or
 * under maxEntries.
 *
 * The precached shell (index + offline page + manifest + icons) is NEVER
 * evicted — it is the offline fallback, and it is the OLDEST entry (added at
 * install), so a naive "drop the oldest" would delete exactly the thing we
 * need when offline. Without this guard, once the runtime cache fills with
 * constellation figures / textures / lazy chunks, the shell gets trimmed away
 * and the offline reload falls through to a blank page. (Exposed by plan 044
 * D5, which added a lazy horizons chunk and tipped the cache over the cap.)
 */
async function trimCache(cacheName, maxEntries) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if (keys.length <= maxEntries) return;
  const precached = new Set(PRECACHE.map((p) => new Request(p).url));
  const evictable = keys.filter((req) => !precached.has(req.url));
  const toDelete = evictable.slice(0, Math.max(0, keys.length - maxEntries));
  await Promise.all(toDelete.map((req) => cache.delete(req)));
}

// Error handlers: the SW must never let an unhandled rejection or error take
// the worker down (that would break offline for the whole session). We can't
// do much beyond observing, but swallowing them keeps the worker alive.
self.addEventListener('error', (event) => {
  // Prevent the error from being treated as unhandled (which would terminate
  // the worker in some engines).
  if (event.error) event.preventDefault();
});

self.addEventListener('unhandledrejection', (event) => {
  event.preventDefault();
});
