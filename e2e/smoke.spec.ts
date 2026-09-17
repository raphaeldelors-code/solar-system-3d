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
