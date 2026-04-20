import { test as base, expect } from '@core/fixtures/base.fixture';
import { applyStorageAuth } from '@core/utils/StorageAuth';
import { EnvironmentConfig } from '@core/config/EnvironmentConfig';
import { LocalStorageHelper } from '@core/utils/LocalStorageHelper';
import { LoginPage } from '@business/pages/login/LoginPage';
import { ProjectsPage } from '@business/pages/projects/ProjectsPage';
import { DashboardPage } from '@business/pages/dashboard/DashboardPage';

type TestFixtures = {
  loginPage: LoginPage;
  storageAuth: void;
  projectsPage: ProjectsPage;
  localStorageHelper: LocalStorageHelper;
  dashboardPage: DashboardPage;
};

export const test = base.extend<TestFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  storageAuth: async ({ page, baseUrl }, use) => {
    await applyStorageAuth(page, EnvironmentConfig.userToken, baseUrl);
    await use();
  },

  projectsPage: async ({ page, storageAuth: _ }, use) => {
    await use(new ProjectsPage(page));
  },

  localStorageHelper: async ({ page, storageAuth: _ }, use) => {
    await use(new LocalStorageHelper(page));
  },

  dashboardPage: async ({ page, storageAuth: _ }, use) => {
    await use(new DashboardPage(page));
  },
});

export { expect };
