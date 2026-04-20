import { Page } from '@playwright/test';

export class LocalStorageHelper {
  constructor(private readonly page: Page) {}

  async getItem(key: string): Promise<string | null> {
    return this.page.evaluate((k) => localStorage.getItem(k), key);
  }

  async hasItem(key: string): Promise<boolean> {
    return (await this.getItem(key)) !== null;
  }

  async getAllKeys(): Promise<string[]> {
    return this.page.evaluate(() => Object.keys(localStorage));
  }
}
