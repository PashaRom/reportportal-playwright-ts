import { test, expect } from '@tests/fixtures/test.fixture';
import { EnvironmentConfig } from '@core/config/EnvironmentConfig';

test.describe('localStorage after auth', () => {
  test('applicationSettings key is present', async ({ localStorageHelper }) => {
    expect(await localStorageHelper.hasItem('applicationSettings')).toBe(true);
  });

  test(`${EnvironmentConfig.userName}_settings key is present`, async ({ localStorageHelper }) => {
    const userSettingsKey = `${EnvironmentConfig.userName}_settings`;
    expect(await localStorageHelper.hasItem(userSettingsKey)).toBe(true);
  });
});
