// @ts-check
const { devices } = require('@playwright/test');

const config = {
  testDir: './tests',
  retries: 1,
  workers: 3,
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  
  reporter: 'html',
  projects: [
    {
      name: 'safari',
      use: {
        browserName: 'webkit',
        headless: true,
        screenshot: 'off',
        trace: 'on',
        ...devices['iPhone 11'],    
      }
    },
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        // Highlights: true when running in GitHub Actions, false when running locally
        headless: process.env.CI ? true : false, 
        screenshot: 'on',
        video: 'retain-on-failure',
        ignoreHttpsErrors: true,
        permissions: ['geolocation'],
        trace: 'on',
        viewport: { width: 1000, height: 1000 }
      }
    }
  ]
};

module.exports = config;