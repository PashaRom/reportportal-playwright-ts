import { defineConfig, devices } from '@playwright/test';
import { EnvironmentConfig } from './src/core/config/EnvironmentConfig';

export default defineConfig({
  testDir: './src/tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    [
      '@reportportal/agent-js-playwright',
      {
        apiKey: EnvironmentConfig.apiKey,
        endpoint: EnvironmentConfig.rpEndpoint,
        project: EnvironmentConfig.projectName,
        launch: `${EnvironmentConfig.rpLaunchName} ${new Date().toISOString().replace('T', ' ').slice(0, 19)}`,
        attributes: [{ value: 'playwright' }],
        description: 'Automated Playwright test run',
        includeTestSteps: true,
        skippedIssue: false,
      },
    ],
  ],
  use: {
    baseURL: EnvironmentConfig.baseUrl,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
