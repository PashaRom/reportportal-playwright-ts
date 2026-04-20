import { test, expect } from '@tests/fixtures/test.fixture';

test.describe('Login page smoke', () => {
  test.beforeEach(async ({ loginPage, baseUrl }) => {
    await loginPage.goto(baseUrl);
  });

  test('login form controls are visible', async ({ loginPage }) => {
    expect(await loginPage.isUsernameInputVisible()).toBe(true);
    expect(await loginPage.isPasswordInputVisible()).toBe(true);
    expect(await loginPage.isSubmitButtonVisible()).toBe(true);
  });

  test('submit button is enabled by default', async ({ loginPage }) => {
    expect(await loginPage.isSubmitButtonEnabled()).toBe(true);
  });

  test('"Login with EPAM" button is visible', async ({ loginPage }) => {
    expect(await loginPage.isEpamLoginButtonVisible()).toBe(true);
  });
});
