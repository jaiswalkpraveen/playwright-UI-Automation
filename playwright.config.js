const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests/e2e',
  testMatch: '**/*.test.js',
  outputDir: './test-results',
  use: {
    baseURL: 'https://staging-website.privilee.ae',
    screenshot: 'only-on-failure',
  },
  reporter: [
    ['html', { outputFolder: './test-reports/html' }],
    ['json', { outputFile: './test-reports/results.json' }]
  ],
});