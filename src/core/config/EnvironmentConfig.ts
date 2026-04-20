export const EnvironmentConfig = {
  baseUrl: process.env.BASE_URL ?? 'https://example.com',
  apiBaseUrl: process.env.API_BASE_URL ?? 'https://example.com/api/v1',
  defaultTimeout: Number(process.env.DEFAULT_TIMEOUT ?? 30_000),
  retryCount: Number(process.env.RETRY_COUNT ?? 3),
} as const;
