import { EnvironmentConfig } from '@core/config/EnvironmentConfig';

export const DashboardData = {
  projectName: EnvironmentConfig.projectName,
  newDashboard: {
    name: 'Test Dashboard',
    description: 'Test Dashboard for creating one',
  },
} as const;
