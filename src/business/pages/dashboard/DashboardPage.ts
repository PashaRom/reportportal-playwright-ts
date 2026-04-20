import { type Locator, type Page } from '@playwright/test';
import { BasePage } from '@business/pages/base/BasePage';

export class DashboardPage extends BasePage {
  private readonly addNewDashboardButton: Locator = this.page.locator('[class*="addDashboard"] button');
  private readonly modal: Locator = this.page.locator('[class*="modalLayout__modal-window"]');
  private readonly nameInput: Locator = this.modal.locator('input[placeholder*="dashboard name"]');
  private readonly descriptionInput: Locator = this.modal.locator('textarea[placeholder*="dashboard description"]');
  private readonly addButton: Locator = this.modal.getByRole('button', { name: 'Add', exact: true });

  constructor(page: Page) {
    super(page);
  }

  private readonly projectSelectorTrigger: Locator = this.page.locator('[class*="projectSelector__current-project-block"]').first();

  private sidebarProjectLink(projectName: string): Locator {
    return this.page.locator(`a[href="#${projectName}"]`).first();
  }

  private dashboardNameCell(name: string): Locator {
    return this.page.locator('[class*="dashboardTable__name"]').filter({ hasText: name });
  }

  async selectProject(projectName: string): Promise<void> {
    await this.projectSelectorTrigger.click();
    await this.sidebarProjectLink(projectName).click();
    await this.waitForPageLoad();
  }

  async clickAddNewDashboard(): Promise<void> {
    await this.addNewDashboardButton.click();
  }

  async fillName(name: string): Promise<void> {
    await this.nameInput.fill(name);
  }

  async fillDescription(description: string): Promise<void> {
    await this.descriptionInput.fill(description);
  }

  async submitDashboard(): Promise<void> {
    await this.addButton.click();
    await this.waitForPageLoad();
  }

  async isDashboardVisible(name: string): Promise<boolean> {
    return this.dashboardNameCell(name).isVisible();
  }
}
