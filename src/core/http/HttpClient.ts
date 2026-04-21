import { APIRequestContext, APIResponse } from '@playwright/test';

export class HttpClient {
  constructor(private readonly request: APIRequestContext) {}

  async get(
    url: string,
    params?: Record<string, string>,
    headers?: Record<string, string>,
  ): Promise<APIResponse> {
    return this.request.get(url, { params, headers });
  }

  async post(url: string, body: unknown, headers?: Record<string, string>): Promise<APIResponse> {
    return this.request.post(url, { data: body, headers });
  }

  async put(url: string, body: unknown, headers?: Record<string, string>): Promise<APIResponse> {
    return this.request.put(url, { data: body, headers });
  }

  async delete(url: string, headers?: Record<string, string>): Promise<APIResponse> {
    return this.request.delete(url, { headers });
  }
}
