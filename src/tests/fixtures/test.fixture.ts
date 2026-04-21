import { test as base, expect } from '@core/fixtures/base.fixture';
import { applyStorageAuth } from '@core/utils/StorageAuth';
import { EnvironmentConfig } from '@core/config/EnvironmentConfig';
import { LocalStorageHelper } from '@core/utils/LocalStorageHelper';
import { LoginPage } from '@business/pages/login/LoginPage';
import { ProjectsPage } from '@business/pages/projects/ProjectsPage';
import { DashboardPage } from '@business/pages/dashboard/DashboardPage';
import { DashboardApi } from '@business/api/DashboardApi';

type TestFixtures = {
  loginPage: LoginPage;
  storageAuth: void;
  projectsPage: ProjectsPage;
  localStorageHelper: LocalStorageHelper;
  dashboardPage: DashboardPage;
  dashboardApi: DashboardApi;
};

export const test = base.extend<TestFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  storageAuth: async ({ page, baseUrl }, use) => {
    await applyStorageAuth(page, EnvironmentConfig.apiKey, baseUrl);
    await use();
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  projectsPage: async ({ page, storageAuth: _ }, use) => {
    await use(new ProjectsPage(page));
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  localStorageHelper: async ({ page, storageAuth: _ }, use) => {
    await use(new LocalStorageHelper(page));
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  dashboardPage: async ({ page, storageAuth: _ }, use) => {
    await use(new DashboardPage(page));
  },

  dashboardApi: async ({ httpClient }, use) => {
    await use(new DashboardApi(httpClient, EnvironmentConfig.apiKey));
  },
});

export { expect };
