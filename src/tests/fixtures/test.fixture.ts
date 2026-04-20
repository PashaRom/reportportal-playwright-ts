import { test as base, expect } from '@core/fixtures/base.fixture';
import { LoginPage } from '@business/pages/login/LoginPage';

type TestFixtures = {
  loginPage: LoginPage;
};

export const test = base.extend<TestFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});

export { expect };
