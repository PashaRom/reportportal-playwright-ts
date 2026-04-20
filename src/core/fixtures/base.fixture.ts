import { test as base, APIRequestContext } from '@playwright/test';
import { HttpClient } from '@core/http/HttpClient';
import { EnvironmentConfig } from '@core/config/EnvironmentConfig';

type BaseFixtures = {
  httpClient: HttpClient;
  baseUrl: string;
};

export const test = base.extend<BaseFixtures>({
  // eslint-disable-next-line no-empty-pattern
  baseUrl: async ({}: Record<string, never>, use) => {
    await use(EnvironmentConfig.baseUrl);
  },

  httpClient: async ({ request }: { request: APIRequestContext }, use) => {
    await use(new HttpClient(request));
  },
});

export { expect } from '@playwright/test';
