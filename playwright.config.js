// @ts-check
import { defineConfig, devices } from '@playwright/test';

// playwright.config.js
module.exports = {
  use: {
    // Runs headless in CI, but allows headed locally if you override it
    headless: process.env.CI ? true : false,
  },
};

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: false,
  
  reporter: 'html',
  
  use: {
    
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], headless: false },
    },
  ],


});

