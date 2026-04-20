import { Page } from '@playwright/test';
import { BasePage } from '@business/pages/base/BasePage';

export class LoginPage extends BasePage {
  private readonly usernameInput = this.page.locator('[name="login"]');
  private readonly passwordInput = this.page.locator('[name="password"]');
  private readonly submitButton = this.page.locator('[type="submit"]');
  private readonly errorMessage = this.page.locator('.login__error');

  constructor(page: Page) {
    super(page);
  }

  async goto(baseUrl: string): Promise<void> {
    await this.navigate(`${baseUrl}/ui/#login`);
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async getErrorText(): Promise<string> {
    return this.errorMessage.innerText();
  }
}
