import { test, expect } from '@tests/fixtures/test.fixture';
import { RandomHelper } from '@core/utils/RandomHelper';
import { EnvironmentConfig } from '@core/config/EnvironmentConfig';

const projectName = EnvironmentConfig.projectName;

test.describe('Dashboard integration', () => {
  let createdDashboardId: number | null = null;

  test.afterEach(async ({ dashboardApi }) => {
    if (createdDashboardId !== null) {
      await dashboardApi.delete(projectName, createdDashboardId);
      createdDashboardId = null;
    }
  });

  test('dashboard created via API appears in the UI', async ({ dashboardApi, dashboardPage }) => {
    const name = `API-${RandomHelper.string(8)}`;

    const { id } = await dashboardApi.create(projectName, {
      name,
      description: 'Created via API integration test',
    });
    createdDashboardId = id;

    await dashboardPage.selectProject(projectName);

    expect(await dashboardPage.isDashboardVisible(name)).toBe(true);
  });

  test('dashboard created via UI is retrievable via API', async ({
    dashboardApi,
    dashboardPage,
  }) => {
    const name = `UI-${RandomHelper.string(8)}`;
    const description = 'Created via UI integration test';

    await dashboardPage.selectProject(projectName);
    await dashboardPage.clickAddNewDashboard();
    await dashboardPage.fillName(name);
    await dashboardPage.fillDescription(description);
    await dashboardPage.submitDashboard();

    const found = await dashboardApi.findByName(projectName, name);
    if (found) createdDashboardId = found.id;

    expect(found).toBeDefined();
    expect(found?.name).toBe(name);
    expect(found?.description).toBe(description);
  });
});
