import { expect, test } from "@playwright/test";
import { DashboardPage } from "../../src/pages/tegb/dashboard_page.ts";
import { LoginPage } from "../../src/pages/tegb/login_page.ts";

test.describe("Visual Test: Profile Summary", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.open().then((login) => login.login("qwerty", "123456"));
  });

  test("Profile Summary", async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    await expect(dashboardPage.profileSummary).toHaveScreenshot(
      "profile_test.png"
    );
  });
});
