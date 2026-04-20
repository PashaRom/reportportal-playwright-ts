import { Page } from '@playwright/test';
import { WaitHelper } from '@core/utils/WaitHelper';

export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  async navigate(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async waitForPageLoad(): Promise<void> {
    await WaitHelper.waitForNetworkIdle(this.page);
  }

  getTitle(): Promise<string> {
    return this.page.title();
  }
}
