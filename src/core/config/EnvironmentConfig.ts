import dotenv from 'dotenv';

dotenv.config();

if (!process.env.BASE_URL) {
  throw new Error('BASE_URL environment variable is required');
}

export const EnvironmentConfig = {
  baseUrl: process.env.BASE_URL,
  apiBaseUrl: process.env.API_BASE_URL ?? `${process.env.BASE_URL}/api/v1`,
  defaultTimeout: Number(process.env.DEFAULT_TIMEOUT ?? 30_000),
  retryCount: Number(process.env.RETRY_COUNT ?? 3),
  userToken: process.env.USER_TOKEN ?? '',
  userName: process.env.USER_NAME ?? '',
  projectName: process.env.PROJECT_NAME ?? '',
  apiKey: process.env.API_KEY ?? '',
} as const;
