import { Browser, BrowserContext, Page, chromium, BrowserType } from '@playwright/test';

export class BrowserFactory {
  static async createBrowser(browserType: BrowserType = chromium): Promise<Browser> {
    return browserType.launch();
  }

  static async createContext(browser: Browser): Promise<BrowserContext> {
    return browser.newContext();
  }

  static async createPage(context: BrowserContext): Promise<Page> {
    return context.newPage();
  }
}
