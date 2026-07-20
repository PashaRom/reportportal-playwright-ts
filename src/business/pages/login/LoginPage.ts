import { Page } from '@playwright/test';
import { BasePage } from '@business/pages/base/BasePage';

export class LoginPage extends BasePage {
  private readonly usernameInput = this.page.locator('[name="login"]');
  private readonly passwordInput = this.page.locator('[name="password"]');
  private readonly submitButton = this.page.locator('[type="submit"]');
  private readonly epamLoginButton = this.page.getByRole('button', { name: /login with epam/i });

  constructor(page: Page) {
    super(page);
  }

  async goto(baseUrl: string): Promise<void> {
    await this.navigate(`${baseUrl}/ui/#login`);
  }

  async isUsernameInputVisible(): Promise<boolean> {
    return this.usernameInput.isVisible();
  }

  async isPasswordInputVisible(): Promise<boolean> {
    return this.passwordInput.isVisible();
  }

  async isSubmitButtonVisible(): Promise<boolean> {
    return this.submitButton.isVisible();
  }

  async isSubmitButtonEnabled(): Promise<boolean> {
    return this.submitButton.isEnabled();
  }

  async isEpamLoginButtonVisible(): Promise<boolean> {
    return this.epamLoginButton.isVisible();
  }
}
