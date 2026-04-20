import { APIRequestContext, APIResponse } from '@playwright/test';

export class HttpClient {
  constructor(private readonly request: APIRequestContext) {}

  async get(url: string, params?: Record<string, string>): Promise<APIResponse> {
    return this.request.get(url, { params });
  }

  async post(url: string, body: unknown): Promise<APIResponse> {
    return this.request.post(url, { data: body });
  }

  async put(url: string, body: unknown): Promise<APIResponse> {
    return this.request.put(url, { data: body });
  }

  async delete(url: string): Promise<APIResponse> {
    return this.request.delete(url);
  }
}
