import { Page } from '@playwright/test';
import { WaitHelper } from '@core/utils/WaitHelper';

export async function applyStorageAuth(page: Page, apiKey: string, baseUrl: string): Promise<void> {
  const token = JSON.stringify({ type: 'bearer', value: apiKey });
  await page.goto(baseUrl);
  await page.evaluate(
    ({ token, activityTimestamp }) => {
      localStorage.setItem('token', token);
      localStorage.setItem('activityTimestamp', activityTimestamp);
    },
    { token, activityTimestamp: String(Date.now()) },
  );
  await page.reload();
  await WaitHelper.waitForNetworkIdle(page);
}
