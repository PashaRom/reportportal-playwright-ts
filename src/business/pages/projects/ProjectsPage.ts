import { Page } from '@playwright/test';
import { BasePage } from '@business/pages/base/BasePage';

export class ProjectsPage extends BasePage {
  private readonly searchInput = this.page.locator('[placeholder*="Project"]');
  private readonly addProjectButton = this.page.locator('[class*="addProject"]');
  private readonly projectCards = this.page.locator('[class*="projectCard"]');
  private readonly userMenu = this.page.locator('[class*="userBlock"]');

  constructor(page: Page) {
    super(page);
  }

  async goto(baseUrl: string): Promise<void> {
    await this.navigate(`${baseUrl}/ui/`);
    await this.waitForPageLoad();
  }

  async searchProject(name: string): Promise<void> {
    await this.searchInput.fill(name);
  }

  async getProjectCard(name: string) {
    return this.projectCards.filter({ hasText: name });
  }

  async openProject(name: string): Promise<void> {
    await (await this.getProjectCard(name)).click();
  }

  async getProjectCount(): Promise<number> {
    return this.projectCards.count();
  }

  async isProjectVisible(name: string): Promise<boolean> {
    return (await this.getProjectCard(name)).isVisible();
  }
}
