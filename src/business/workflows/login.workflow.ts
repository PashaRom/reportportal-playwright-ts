import { LoginPage } from '@business/pages/login/LoginPage';

export async function loginWorkflow(
  loginPage: LoginPage,
  baseUrl: string,
  username: string,
  password: string,
): Promise<void> {
  await loginPage.goto(baseUrl);
  await loginPage.login(username, password);
}
