import { HttpClient } from '@core/http/HttpClient';
import { EnvironmentConfig } from '@core/config/EnvironmentConfig';

export class AuthApi {
  constructor(private readonly http: HttpClient) {}

  async login(login: string, password: string): Promise<string> {
    const response = await this.http.post(`${EnvironmentConfig.apiBaseUrl}/user/login`, {
      login,
      password,
    });
    const body = await response.json();
    return body.access_token as string;
  }
}
