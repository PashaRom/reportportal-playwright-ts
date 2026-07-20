import { test, expect } from '@core/fixtures/base.fixture';
import { ProjectApi } from '@business/api/ProjectApi';
import { EnvironmentConfig } from '@core/config/EnvironmentConfig';
import { ProjectData } from '@tests/data/project.data';

test.describe('GET /project/{projectName}', () => {
  let projectApi: ProjectApi;

  test.beforeEach(({ httpClient }) => {
    projectApi = new ProjectApi(httpClient);
  });

  test('returns 200 and valid project data for an existing project', async () => {
    const { status, body } = await projectApi.getProject(
      ProjectData.projectName,
      EnvironmentConfig.apiKey,
    );

    expect(status).toBe(200);
    expect(body.projectName).toBe(ProjectData.projectName);
    expect(typeof body.projectId).toBe('number');
    expect(typeof body.creationDate).toBe('string');
    expect(body.configuration).toBeDefined();
  });

  test('returns 401 when no authorization header is provided', async () => {
    const { status } = await projectApi.getProjectUnauthorized(ProjectData.projectName);

    expect(status).toBe(401);
  });

  test('returns 403 or 404 for a non-existent project', async () => {
    const { status } = await projectApi.getProject(
      ProjectData.nonExistentProject,
      EnvironmentConfig.apiKey,
    );

    expect([403, 404]).toContain(status);
  });
});
