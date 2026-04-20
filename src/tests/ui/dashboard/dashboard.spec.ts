import { expect } from '@playwright/test';
import { test } from '@tests/fixtures/test.fixture';
import { DashboardData } from '@tests/data/dashboard.data';

test.describe('Dashboard creation', () => {
  test('should create a new dashboard', async ({ dashboardPage }) => {
    await dashboardPage.selectProject(DashboardData.projectName);

    await dashboardPage.clickAddNewDashboard();

    await dashboardPage.fillName(DashboardData.newDashboard.name);
    await dashboardPage.fillDescription(DashboardData.newDashboard.description);

    await dashboardPage.submitDashboard();

    expect(await dashboardPage.isDashboardVisible(DashboardData.newDashboard.name)).toBe(true);
  });
});
