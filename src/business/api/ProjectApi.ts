import { HttpClient } from '@core/http/HttpClient';
import { EnvironmentConfig } from '@core/config/EnvironmentConfig';
import { Project } from '@business/models/Project';

export class ProjectApi {
  private readonly baseUrl = EnvironmentConfig.apiBaseUrl;

  constructor(private readonly http: HttpClient) {}

  async getProject(
    projectName: string,
    apiKey: string,
  ): Promise<{ status: number; body: Project }> {
    const response = await this.http.get(`${this.baseUrl}/project/${projectName}`, undefined, {
      Authorization: `Bearer ${apiKey}`,
    });
    const body = await response.json();
    return { status: response.status(), body };
  }

  async getProjectUnauthorized(projectName: string): Promise<{ status: number }> {
    const response = await this.http.get(`${this.baseUrl}/project/${projectName}`);
    return { status: response.status() };
  }
}
