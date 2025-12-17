import { expect, test } from "@playwright/test";
import { DashboardPage } from "../../src/pages/tegb/dashboard_page.ts";
import { LoginPage } from "../../src/pages/tegb/login_page.ts";

test.describe("Atomic Tests: Dashboard", () => {
  let dashboard: DashboardPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    dashboard = await loginPage
      .open()
      .then((login) => login.login("qwerty", "123456"));
  });

  test("Header and Footer test", async () => {
    await test.step("HeaderTitle", async () => {
      await expect.soft(dashboard.titleHeader).toBeVisible();
      await expect.soft(dashboard.titleHeader).toHaveText("TEG#B Dashboard");
    });

    await test.step("Logo", async () => {
      await expect.soft(dashboard.logo).toBeVisible();
      await expect.soft(dashboard.logo).toHaveAttribute("alt", "Tredgate Logo");
    });

    await test.step("Logout Button", async () => {
      await expect.soft(dashboard.logoutButton).toBeVisible();
      await expect.soft(dashboard.logoutButton).toHaveText("Odhlásit se");
    });

    await test.step("Copyright", async () => {
      await expect.soft(dashboard.footerCopyright).toBeVisible();
      await expect
        .soft(dashboard.footerCopyright)
        .toHaveText("© 2023 Banking App");
    });
  });

  test("Sidebar Menu", async () => {
    await test.step("Menu sections: Home, Accounts, Transactions,Support", async () => {
      await expect.soft(dashboard.sidebarHome).toBeVisible();
      await expect.soft(dashboard.sidebarHome).toHaveText("Domů");
      await expect.soft(dashboard.sidebarAccounts).toBeVisible();
      await expect.soft(dashboard.sidebarAccounts).toHaveText("Účty");
      await expect.soft(dashboard.sidebarTransactions).toBeVisible();
      await expect.soft(dashboard.sidebarTransactions).toHaveText("Transakce");
      await expect.soft(dashboard.sidebarSupport).toBeVisible();
      await expect.soft(dashboard.sidebarSupport).toHaveText("Podpora");
    });
  });

  test("User Profile", async () => {
    await test.step("Profile Title", async () => {
      await expect.soft(dashboard.profileTitle).toBeVisible();
      await expect.soft(dashboard.profileTitle).toHaveText("Detaily Profilu");
    });
    await test.step("Labels: Values for FirstName, LastName, Email, Phone, Age", async () => {
      await expect.soft(dashboard.profileFirstName).toBeVisible();
      await expect.soft(dashboard.profileFirstName).toHaveText("Jméno: Jan");
      await expect.soft(dashboard.profileLastName).toBeVisible();
      await expect
        .soft(dashboard.profileLastName)
        .toHaveText("Příjmení: Novák");
      await expect.soft(dashboard.profileEmail).toBeVisible();
      await expect
        .soft(dashboard.profileEmail)
        .toHaveText("Email: jan.novak@seznam.cz");
      await expect.soft(dashboard.profilePhone).toBeVisible();
      await expect
        .soft(dashboard.profilePhone)
        .toHaveText("Telefon: +420 987 654 321");
      await expect.soft(dashboard.profileAge).toBeVisible();
      await expect.soft(dashboard.profileAge).toHaveText("Věk: 48");
    });
    await test.step("Edit Profile Button", async () => {
      await expect.soft(dashboard.editProfileToggle).toBeVisible();
      await expect
        .soft(dashboard.editProfileToggle)
        .toHaveText("Upravit profil");
    });
  });

  test("Bank Account", async () => {
    await test.step("Account Title", async () => {
      await expect.soft(dashboard.accountTitle).toBeVisible();
      await expect.soft(dashboard.accountTitle).toHaveText("Účty");
    });

    await test.step("Bank Account Number Label, Value", async () => {
      await expect.soft(dashboard.accountNumberLabel).toBeVisible();
      await expect.soft(dashboard.accountNumberLabel).toHaveText("Číslo účtu");
      await expect.soft(dashboard.accountNumber).toBeVisible();
      await expect.soft(dashboard.accountNumber).toHaveText("1018151");
    });

    await test.step("Balance Label, Value", async () => {
      await expect
        .soft(dashboard.balanceLabel, "Balance Label be Visible")
        .toBeVisible();
      await expect.soft(dashboard.balanceLabel).toHaveText("Zůstatek");
      await expect.soft(dashboard.balance).toBeVisible();
      await expect.soft(dashboard.balance).toHaveText("10000.00 Kč");
    });

    await test.step("Account Type Label, Value", async () => {
      await expect.soft(dashboard.accountTypeLabel).toBeVisible();
      await expect.soft(dashboard.accountTypeLabel).toHaveText("Typ účtu");
      await expect.soft(dashboard.accountType).toBeVisible();
      await expect.soft(dashboard.accountType).toHaveText("test");
    });
  });

  test("Edit Toggle On and Off", async () => {
    await dashboard.clickEditProfile();
    await expect(dashboard.saveButton).toBeVisible();
    await expect(dashboard.saveButton).toHaveText("Uložit změny");
    await dashboard.clickEditProfile();
    await expect(dashboard.editProfileToggle).toBeVisible();
    await expect(dashboard.editProfileToggle).toHaveText("Upravit profil");
  });

  test("Save Button", async () => {
    await dashboard.clickEditProfile();
    await expect(dashboard.saveButton).toBeVisible();
    await expect(dashboard.saveButton).toHaveText("Uložit změny");
    await dashboard.clickSaveButton();
    await expect(dashboard.editProfileToggle).toBeVisible();
    await expect(dashboard.editProfileToggle).toHaveText("Upravit profil");
  });

  test("Logout", async () => {
    const loginPage = await dashboard.clickLogout();
    await expect(loginPage.loginButton).toBeVisible();
    await expect(loginPage.loginButton).toHaveText("Přihlásit se");
  });
});
