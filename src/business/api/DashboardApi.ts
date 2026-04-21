import { HttpClient } from '@core/http/HttpClient';
import { EnvironmentConfig } from '@core/config/EnvironmentConfig';
import {
  CreateDashboardRequest,
  CreateDashboardResponse,
  DashboardListResponse,
  DashboardResource,
} from '@business/models/Dashboard';

export class DashboardApi {
  private readonly baseUrl = EnvironmentConfig.apiBaseUrl;
  private readonly authHeader: Record<string, string>;

  constructor(
    private readonly http: HttpClient,
    apiKey: string,
  ) {
    this.authHeader = { Authorization: `Bearer ${apiKey}` };
  }

  async create(
    projectName: string,
    data: CreateDashboardRequest,
  ): Promise<CreateDashboardResponse> {
    const response = await this.http.post(
      `${this.baseUrl}/${projectName}/dashboard`,
      data,
      this.authHeader,
    );
    return response.json();
  }

  async getById(projectName: string, id: number): Promise<DashboardResource> {
    const response = await this.http.get(
      `${this.baseUrl}/${projectName}/dashboard/${id}`,
      undefined,
      this.authHeader,
    );
    return response.json();
  }

  async findByName(projectName: string, name: string): Promise<DashboardResource | undefined> {
    const response = await this.http.get(
      `${this.baseUrl}/${projectName}/dashboard`,
      { 'filter.eq.name': name, 'page.size': '300' },
      this.authHeader,
    );
    const body: DashboardListResponse = await response.json();
    return body.content.find((d) => d.name === name);
  }

  async delete(projectName: string, id: number): Promise<void> {
    await this.http.delete(`${this.baseUrl}/${projectName}/dashboard/${id}`, this.authHeader);
  }
}
