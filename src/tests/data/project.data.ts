import { EnvironmentConfig } from '@core/config/EnvironmentConfig';

export const ProjectData = {
  projectName: EnvironmentConfig.projectName,
  nonExistentProject: 'non_existent_project_12345',
} as const;
