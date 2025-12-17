import { Locator, Page, test } from "@playwright/test";
import { LoginPage } from "./login_page.ts";

export class RegistrationPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly emailInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator("[data-testid='username-input']");
    this.passwordInput = page.locator("[data-testid='password-input']");
    this.emailInput = page.locator("[data-testid='email-input']");
    this.submitButton = page.locator("[data-testid='submit-button']");
  }

  async fillUsername(username: string) {
    await this.usernameInput.fill(username);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async clickSubmit() {
    await this.submitButton.click();
    return new LoginPage(this.page);
  }

  async registration(
    username: string,
    password: string,
    email: string
  ): Promise<LoginPage> {
    await test.step("Registration to TEGB", async () => {
      await this.fillUsername(username);
      await this.fillPassword(password);
      await this.fillEmail(email);
      await this.clickSubmit();
    });
    return new LoginPage(this.page);
  }
}
