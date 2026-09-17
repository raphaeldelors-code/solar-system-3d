import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright E2E config (plan 044 D3).
 *
 * The spec boots the PRODUCTION build (via `vite preview`) so the service
 * worker registers (`import.meta.env.PROD`) and the offline test is meaningful.
 * The webServer builds then previews; `reuseExistingServer` is off in CI so
 * every run gets a clean server.
 *
 * WebGL: headless Chromium has no GPU, so we force the ANGLE/SwiftShader
 * software path (the same flags used by the local verification scripts). The
 * scene is software-rendered, which is slower but deterministic enough for
 * smoke assertions (boot, DOM state, overlay toggling, offline reload).
 */
export default defineConfig({
  testDir: './e2e',
  timeout: 60_000,
  expect: { timeout: 10_000 },
  fullyParallel: false,
  workers: 1,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: 'http://localhost:4173',
    viewport: { width: 1280, height: 800 },
    // Force software WebGL so the scene renders in headless CI.
    launchOptions: {
      args: [
        '--enable-unsafe-swiftshader',
        '--use-gl=angle',
        '--use-angle=swiftshader',
        '--no-sandbox',
      ],
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm run build && npx vite preview --port 4173 --strictPort',
    url: 'http://localhost:4173',
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
