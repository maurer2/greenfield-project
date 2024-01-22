import { defineConfig, devices } from '@playwright/experimental-ct-react';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* The base directory, relative to the config file, for snapshot files created with toMatchSnapshot and toHaveScreenshot. */
  snapshotDir: './__snapshots__',
  testDir: './',
  testMatch: '*.pw.spec.{ts,tsx,mts}',
  /* Maximum time one test can run for. */
  timeout: 10 * 1000,
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Port to use for Playwright component endpoint. */
    ctPort: 3100,

    ctViteConfig: {
      // vite version mismatch between vanillaExtractPlugin's vite 4.x and react() 5.0.12. Override to 5.0.12 breaks vanillaExtractPlugin
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      plugins: [react() as any, vanillaExtractPlugin()],
      resolve: {
        alias: {
          '@': resolve(__dirname, './src'),
        },
      },
    },
    locale: 'en-GB',
    timezoneId: 'Europe/London',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    viewport: { height: 720, width: 1280 },
  },

  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
});
