/**
 * E2E smoke spec (plan 044 D3).
 *
 * Boots the production build (see playwright.config.ts webServer) and smoke-
 * tests the five things a user actually touches: the scene renders, shareable
 * URLs round-trip, the Find combobox picks a body, the WebGL context-loss
 * overlay toggles, and the app shell reloads offline via the service worker.
 *
 * WebGL runs on SwiftShader (software) in headless Chromium — see the launch
 * args in playwright.config.ts. Assertions are DOM/state-based (plus one
 * pixel-variance check) so they are deterministic under software rendering.
 */
import { test, expect, type Page } from '@playwright/test';

/** Fail the test if the page throws an uncaught exception. */
function watchPageErrors(page: Page): void {
  page.on('pageerror', (err) => {
    throw new Error(`Uncaught page error: ${err.message}`);
  });
}

/** Wait until the WebGL canvas has painted at least one non-blank frame. */
async function waitForRender(page: Page): Promise<void> {
  await expect
    .poll(
      async () => {
        return page.evaluate(() => {
          const c = document.getElementById('app') as HTMLCanvasElement | null;
          if (!c || c.width === 0) return false;
          const probe = document.createElement('canvas');
          probe.width = 64;
          probe.height = 64;
          const ctx = probe.getContext('2d');
          if (!ctx) return false;
          ctx.drawImage(c, 0, 0, 64, 64);
          const { data } = ctx.getImageData(0, 0, 64, 64);
          // A blank/uninitialized canvas is uniform; a rendered scene has
          // pixel variance (stars, planets, glow).
          let min = 255;
          let max = 0;
          for (let i = 0; i < data.length; i += 4) {
            const v = data[i];
            if (v < min) min = v;
            if (v > max) max = v;
          }
          return max - min > 8;
        });
      },
      { timeout: 30_000 },
    )
    .toBe(true);
}

test('boots and renders the scene', async ({ page }) => {
  watchPageErrors(page);
  await page.goto('/?intro=0', { waitUntil: 'domcontentloaded' });
  await waitForRender(page);
  // The default view anchors on the Sun.
  await expect(page.locator('#find')).toHaveValue('Sun');
});

test('shareable URL round-trips state', async ({ page }) => {
  watchPageErrors(page);
  // Pin Mars follow + a specific time + true scale + paused (p=1) so the sim
  // clock doesn't advance and the time param round-trips exactly.
  await page.goto('/?intro=0&f=mars&t=1758000000000&sc=t&p=1', {
    waitUntil: 'domcontentloaded',
  });
  await waitForRender(page);
  // The restored follow lands in the Find box.
  await expect(page.locator('#find')).toHaveValue('Mars');
  // The address bar keeps the state params (encodeAppState rewrites them).
  const url = new URL(page.url());
  expect(url.searchParams.get('f')).toBe('mars');
  expect(url.searchParams.get('sc')).toBe('t');
  expect(url.searchParams.get('t')).toBe('1758000000000');
  expect(url.searchParams.get('p')).toBe('1');
});

test('Find combobox filters and picks a body', async ({ page }) => {
  watchPageErrors(page);
  await page.goto('/?intro=0', { waitUntil: 'domcontentloaded' });
  await waitForRender(page);

  const input = page.locator('#find');
  await input.click();
  await input.fill('mars');
  // The dropdown lists Mars (plus its moons).
  const rows = page.locator('#find-list .fr');
  await expect(rows.first()).toBeVisible();
  await expect(rows.first()).toContainText('Mars');

  // Pick the first row → the Find box shows the body name and the URL
  // records the follow.
  await rows.first().click();
  await expect(input).toHaveValue('Mars');
  await expect
    .poll(() => new URL(page.url()).searchParams.get('f'), { timeout: 5_000 })
    .toBe('mars');
});

test('WebGL context-loss overlay toggles', async ({ page }) => {
  watchPageErrors(page);
  await page.goto('/?intro=0', { waitUntil: 'domcontentloaded' });
  await waitForRender(page);

  const overlay = page.locator('#gl-lost');
  await expect(overlay).toBeHidden();

  // Simulate the browser losing the WebGL context: the app-level listener
  // (src/app/contextLoss.ts) preventDefaults and shows the overlay.
  await page.evaluate(() => {
    const c = document.getElementById('app') as HTMLCanvasElement;
    const ev = new Event('webglcontextlost', { cancelable: true });
    c.dispatchEvent(ev);
  });
  await expect(overlay).toBeVisible();

  // Restore: the overlay hides again.
  await page.evaluate(() => {
    const c = document.getElementById('app') as HTMLCanvasElement;
    c.dispatchEvent(new Event('webglcontextrestored'));
  });
  await expect(overlay).toBeHidden();
});

test('quality tier boots + WebGL guard hidden (D6)', async ({ page }) => {
  watchPageErrors(page);
  await page.goto('/?intro=0', { waitUntil: 'domcontentloaded' });
  await waitForRender(page);

  // The __debug handle exposes the selected quality tier + boot guard.
  const debug = await page.evaluate(() => {
    const d = (window as unknown as { __debug?: { qualityTier?: string; bootOk?: boolean } })
      .__debug;
    return d ? { qualityTier: d.qualityTier, bootOk: d.bootOk } : null;
  });
  expect(debug, '__debug handle missing').not.toBeNull();
  expect(debug!.qualityTier).toMatch(/^(high|medium|low)$/);
  expect(debug!.bootOk).toBe(true);

  // The WebGL-unavailable fallback is hidden on a WebGL-capable browser.
  await expect(page.locator('#gl-unavailable')).toBeHidden();
});

test('?q=low override selects the low tier (D6)', async ({ page }) => {
  watchPageErrors(page);
  await page.goto('/?intro=0&q=low', { waitUntil: 'domcontentloaded' });
  await waitForRender(page);

  const tier = await page.evaluate(
    () =>
      (window as unknown as { __debug?: { qualityTier?: string } }).__debug?.qualityTier ?? null,
  );
  expect(tier).toBe('low');
});

test('telemetry consent is opt-in + persists (D7)', async ({ page }) => {
  watchPageErrors(page);
  await page.goto('/?intro=0', { waitUntil: 'domcontentloaded' });
  await waitForRender(page);

  // Default: unset (opt-in — nothing is sent until the user grants).
  const initial = await page.evaluate(
    () =>
      (window as unknown as { __debug?: { telemetryConsent?: string } }).__debug?.telemetryConsent,
  );
  expect(initial).toBe('unset');

  // Open the About dialog and grant consent.
  await page.click('#about-btn');
  await expect(page.locator('#about')).toBeVisible();
  await page.click('#telemetry-consent');
  const granted = await page.evaluate(
    () =>
      (window as unknown as { __debug?: { telemetryConsent?: string } }).__debug?.telemetryConsent,
  );
  expect(granted).toBe('granted');

  // The choice persists across a reload (localStorage).
  await page.reload({ waitUntil: 'domcontentloaded' });
  await waitForRender(page);
  const persisted = await page.evaluate(
    () =>
      (window as unknown as { __debug?: { telemetryConsent?: string } }).__debug?.telemetryConsent,
  );
  expect(persisted).toBe('granted');
});

test('i18n: en default + fr via navigator locale (D9)', async ({ browser }) => {
  // English (default): the panel is stamped from the en catalog.
  const enPage = await browser.newPage();
  watchPageErrors(enPage);
  await enPage.goto('/?intro=0', { waitUntil: 'domcontentloaded' });
  await waitForRender(enPage);
  expect(await enPage.evaluate(() => document.documentElement.lang)).toBe('en');
  expect(await enPage.locator('#pause').textContent()).toBe('Pause');
  expect(await enPage.locator('[data-i18n="sectionTime"]').textContent()).toBe('Time');
  await enPage.close();

  // French: navigator.language = fr-FR → the fr catalog is applied.
  const frContext = await browser.newContext({ locale: 'fr-FR' });
  const frPage = await frContext.newPage();
  watchPageErrors(frPage);
  await frPage.goto('/?intro=0', { waitUntil: 'domcontentloaded' });
  await waitForRender(frPage);
  expect(await frPage.evaluate(() => document.documentElement.lang)).toBe('fr');
  expect(await frPage.locator('#pause').textContent()).toBe('Pause'); // "Pause" in both
  expect(await frPage.locator('[data-i18n="sectionTime"]').textContent()).toBe('Temps');
  expect(await frPage.locator('[data-i18n="sectionView"]').textContent()).toBe('Vue');
  // A JS-set string (speed unit) also follows the locale.
  const speed = await frPage.locator('#speed-value').textContent();
  expect(speed).toContain('j/s'); // French "jours/seconde"
  await frContext.close();
});

test('NEO row: hidden by default (plan 047 — low-ROI feed demoted)', async ({ page }) => {
  watchPageErrors(page);
  await page.goto('/?intro=0', { waitUntil: 'domcontentloaded' });
  await waitForRender(page);

  // Plan 047: the live CNEOS feed is hidden from the default panel (noise).
  // The row stays in the DOM (shareable state + future "More" destination)
  // but is not visible at rest.
  const row = await page.evaluate(() => {
    const el = document.getElementById('neo-row');
    return { hasRow: !!el, hidden: el?.hidden ?? false };
  });
  expect(row.hasRow).toBe(true);
  expect(row.hidden).toBe(true);
});

test('DSO toggle: hidden by default (plan 047 — low-ROI markers demoted)', async ({ page }) => {
  watchPageErrors(page); // fails the test on any uncaught error (e.g. building 109 sprites)
  await page.goto('/?intro=0', { waitUntil: 'domcontentloaded' });
  await waitForRender(page);

  // Plan 047: the Messier DSO markers + toggle are hidden from the default
  // panel (noise). The control stays in the DOM (shareable state) but is not
  // visible at rest.
  const before = await page.evaluate(() => {
    const el = document.getElementById('dso') as HTMLInputElement | null;
    const label = el?.closest('label');
    return { hasToggle: !!el, checked: el?.checked ?? false, hidden: label?.hidden ?? false };
  });
  expect(before.hasToggle).toBe(true);
  expect(before.checked).toBe(false); // off by default
  expect(before.hidden).toBe(true); // hidden by default (plan 047)
});

test('pause-on-visibilitychange: hidden flag tracks the tab (D10)', async ({ page }) => {
  watchPageErrors(page);
  await page.goto('/?intro=0', { waitUntil: 'domcontentloaded' });
  await waitForRender(page);

  // Initially visible (headless page is foreground) → hidden is false.
  expect(
    await page.evaluate(
      () => (window as unknown as { __debug?: { hidden?: boolean } }).__debug?.hidden,
    ),
  ).toBe(false);

  // Simulate the tab going hidden: override document.hidden, fire the event.
  await page.evaluate(() => {
    Object.defineProperty(document, 'hidden', { configurable: true, get: () => true });
    document.dispatchEvent(new Event('visibilitychange'));
  });
  expect(
    await page.evaluate(
      () => (window as unknown as { __debug?: { hidden?: boolean } }).__debug?.hidden,
    ),
  ).toBe(true);

  // Simulate returning to the tab: hidden false again.
  await page.evaluate(() => {
    Object.defineProperty(document, 'hidden', { configurable: true, get: () => false });
    document.dispatchEvent(new Event('visibilitychange'));
  });
  expect(
    await page.evaluate(
      () => (window as unknown as { __debug?: { hidden?: boolean } }).__debug?.hidden,
    ),
  ).toBe(false);
});

test('app shell reloads offline via the service worker', async ({ page, context }) => {
  watchPageErrors(page);
  // First load (online): the SW installs, precaches the shell, and the
  // network-first fetch handler caches index + assets.
  await page.goto('/?intro=0', { waitUntil: 'domcontentloaded' });
  await waitForRender(page);

  // Wait for the service worker to be registered + controlling.
  await expect
    .poll(
      async () => {
        return page.evaluate(async () => {
          const reg = await navigator.serviceWorker.getRegistration();
          return Boolean(reg && reg.active);
        });
      },
      { timeout: 20_000 },
    )
    .toBe(true);

  // Second load so the fetch handler has cached the shell + JS assets.
  await page.reload({ waitUntil: 'domcontentloaded' });
  await waitForRender(page);

  // Go offline and reload: the SW serves the cached shell.
  await context.setOffline(true);
  await page.reload({ waitUntil: 'domcontentloaded' });
  // The app shell comes back from cache (canvas present, no crash).
  await expect(page.locator('#app')).toBeVisible();
  await expect(page.locator('#find')).toBeVisible();
  await context.setOffline(false);
});

test('offline fallback page is precached and renders offline', async ({ page, context }) => {
  watchPageErrors(page);
  // Load the app once so the SW installs and precaches offline.html.
  await page.goto('/?intro=0', { waitUntil: 'domcontentloaded' });
  await waitForRender(page);
  await expect
    .poll(
      async () => {
        return page.evaluate(async () => {
          const reg = await navigator.serviceWorker.getRegistration();
          return Boolean(reg && reg.active);
        });
      },
      { timeout: 20_000 },
    )
    .toBe(true);

  // Confirm offline.html is in the SW cache. Read the build version straight
  // from the live sw.js so we open the right (versioned) cache.
  const inCache = await page.evaluate(async () => {
    const res = await fetch('./sw.js');
    const text = await res.text();
    const m = text.match(/const BUILD_VERSION = '([a-f0-9]{10})'/);
    if (!m) return false;
    const cache = await caches.open('orrery-' + m[1]);
    const keys = await cache.keys();
    return keys.some((r) => r.url.endsWith('offline.html'));
  });
  expect(inCache).toBe(true);

  // Go offline and load the fallback page directly: it must render from cache.
  await context.setOffline(true);
  await page.goto('/offline.html', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('h1')).toHaveText("You're offline");
  await expect(page.locator('button')).toContainText('Retry');
  await context.setOffline(false);
});
