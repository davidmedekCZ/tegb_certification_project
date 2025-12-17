import { expect, Locator, Page } from "@playwright/test";
import { LoginPage } from "./login_page.ts";

export class DashboardPage {
  readonly page: Page;
  readonly logo: Locator;
  readonly titleHeader: Locator;
  readonly logoutButton: Locator;
  readonly sidebarHome: Locator;
  readonly sidebarAccounts: Locator;
  readonly sidebarTransactions: Locator;
  readonly sidebarSupport: Locator;
  readonly profileSummary: Locator;
  readonly profileTitle: Locator;
  readonly profileFirstName: Locator;
  readonly profileLastName: Locator;
  readonly profileEmail: Locator;
  readonly profilePhone: Locator;
  readonly profileAge: Locator;
  readonly editProfileToggle: Locator;
  readonly updateSuccessMessage: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly ageInput: Locator;
  readonly saveButton: Locator;
  readonly accountTitle: Locator;
  readonly accountNumber: Locator;
  readonly accountNumberLabel: Locator;
  readonly balance: Locator;
  readonly balanceLabel: Locator;
  readonly accountType: Locator;
  readonly accountTypeLabel: Locator;
  readonly addAccountButton: Locator;
  readonly footerCopyright: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.locator("[data-testid='logo-img']");
    this.titleHeader = page.locator("[data-testid='app-title']");
    this.logoutButton = page.locator("[data-testid='logout-button']");
    this.sidebarHome = page.locator("//li[contains(text(),'Domů')]");
    this.sidebarAccounts = page.locator("//li[contains(text(),'Účty')]");
    this.sidebarTransactions = page.locator(
      "//li[contains(text(),'Transakce')]"
    );
    this.sidebarSupport = page.locator("//li[contains(text(),'Podpora')]");
    this.profileSummary = page.locator("[data-testid='account-summary']");
    this.profileTitle = page.locator("[data-testid='profile-details-title']");
    this.profileFirstName = page.locator("[data-testid='name']");
    this.profileLastName = page.locator("[data-testid='surname']");
    this.profileEmail = page.locator("[data-testid='email']");
    this.profilePhone = page.locator("[data-testid='phone']");
    this.profileAge = page.locator("[data-testid='age']");
    this.editProfileToggle = page.locator(
      "[data-testid='toggle-edit-profile-button']"
    );
    this.updateSuccessMessage = page.locator("//div[@class='update-message']");
    this.firstNameInput = page.locator("[data-testid='chage-name-input']");
    this.lastNameInput = page.locator("[data-testid='chage-surname-input']");
    this.emailInput = page.locator("[data-testid='chage-email-input']");
    this.phoneInput = page.locator("[data-testid='chage-phone-input']");
    this.ageInput = page.locator("[data-testid='chage-age-input']");
    this.saveButton = page.locator("[data-testid='save-changes-button']");
    this.accountTitle = page.locator("[data-testid='accounts-title']");
    this.accountNumber = page.locator(
      "tr[data-testid='account-row-0'] td[data-testid='account-number']"
    );
    this.accountNumberLabel = page.locator(
      "[data-testid='account-number-heading']"
    );
    this.balance = page.locator(
      "tr[data-testid='account-row-0'] td[data-testid='account-balance']"
    );
    this.balanceLabel = page.locator("[data-testid='account-balance-heading']");
    this.accountType = page.locator(
      "tr[data-testid='account-row-0'] td[data-testid='account-type']"
    );
    this.accountTypeLabel = page.locator(
      "[data-testid='account-type-heading']"
    );
    this.addAccountButton = page.locator("[data-testid='add-account-button']");
    this.footerCopyright = page.locator("footer[class='dashboard-footer']");
  }

  async clickLogout() {
    await this.logoutButton.click();
    return new LoginPage(this.page);
  }

  async clickEditProfile() {
    await this.editProfileToggle.click();
    return this;
  }

  async fillFirstName(firstName: string) {
    await this.firstNameInput.fill(firstName);
    return this;
  }

  async fillLastName(lastName: string) {
    await this.lastNameInput.fill(lastName);
    return this;
  }

  async fillEmail(email: string) {
    await this.emailInput.fill(email);
    return this;
  }

  async fillPhone(phone: string) {
    await this.phoneInput.fill(phone);
    return this;
  }

  async fillAge(age: string) {
    await this.ageInput.fill(age);
    return this;
  }

  async clickSaveButton() {
    await this.saveButton.click();
    return this;
  }

  async successEditAssert(expectedText: string) {
    await expect(
      this.updateSuccessMessage,
      "Success Message is Visible"
    ).toBeVisible();
    await expect(
      this.updateSuccessMessage,
      "Success Message has Text"
    ).toHaveText(expectedText);
    return this;
  }

  async bankAccountAssert(expectedText: string) {
    await expect(this.balance, "Balance be Visible").toBeVisible();
    await expect(this.balance, "Balance has Text").toHaveText(expectedText);
    return this;
  }

  async firstNameAssert(expectedText: string) {
    await expect(
      this.profileFirstName,
      "First Name Label + Input is Visible"
    ).toBeVisible();
    await expect(
      this.profileFirstName,
      "First Name Label + Input has Text"
    ).toHaveText(expectedText);
    return this;
  }

  async lastNameAssert(expectedText: string) {
    await expect(
      this.profileLastName,
      "Last Name Label + Input is Visible"
    ).toBeVisible();
    await expect(
      this.profileLastName,
      "Last Name Label + Input has Text"
    ).toHaveText(expectedText);
    return this;
  }

  async emailAssert(expectedText: string) {
    await expect(
      this.profileEmail,
      "Email Label + Input is Visible"
    ).toBeVisible();
    await expect(this.profileEmail, "Email Label + Input has Text").toHaveText(
      expectedText
    );
    return this;
  }

  async phoneAssert(expectedText: string) {
    await expect(
      this.profilePhone,
      "Phone Label + Input is Visible"
    ).toBeVisible();
    await expect(this.profilePhone, "Phone Label + Input has Text").toHaveText(
      expectedText
    );
    return this;
  }

  async ageAssert(expectedText: string) {
    await expect(this.profileAge, "Age Label + Input is Visible").toBeVisible();
    await expect(this.profileAge, "Age Label + Input has Text").toHaveText(
      expectedText
    );
    return this;
  }
}
