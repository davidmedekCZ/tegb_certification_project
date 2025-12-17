import { expect, test } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { UserApi } from "../../src/api/tegb/user_api.ts";
import { BankAccountApi } from "../../src/api/tegb/bank_account_api.ts";
import { LoginPage } from "../../src/pages/tegb/login_page.ts";

test("E2E: Register, Create Bank Account(API), Login, Edit, Logout", async ({
  page,
  request,
}) => {
  const username = faker.internet.username();
  const password = "Password123!";
  const email = `${username}@test.cz`;

  const loginPage = new LoginPage(page);
  await loginPage.open();

  const registration = await loginPage.clickRegistration();
  await registration.registration(username, password, email);
  await expect(loginPage.successMessage).toBeVisible();

  const userApi = new UserApi(request);
  const bankApi = new BankAccountApi(request);

  const loginResponse = await userApi.loginUser(username, password);
  const { access_token } = await loginResponse.json();
  await bankApi.createBankAccount(10000, "test", access_token);

  await loginPage
    .login(username, password)
    .then((dashboard) => dashboard.bankAccountAssert("10000.00 Kč"))
    .then((dashboard) => dashboard.clickEditProfile())
    .then((dashboard) => dashboard.fillFirstName("Jan"))
    .then((dashboard) => dashboard.fillLastName("Novak"))
    .then((dashboard) => dashboard.fillEmail("jan.novak@test.cz"))
    .then((dashboard) => dashboard.fillPhone("+42098765431"))
    .then((dashboard) => dashboard.fillAge("48"))
    .then((dashboard) => dashboard.clickSaveButton())
    .then((dashboard) =>
      dashboard.successEditAssert("Profile updated successfully!")
    )
    .then((dashboard) => dashboard.firstNameAssert("Jméno: Jan"))
    .then((dashboard) => dashboard.lastNameAssert("Příjmení: Novak"))
    .then((dashboard) => dashboard.emailAssert("Email: jan.novak@test.cz"))
    .then((dashboard) => dashboard.phoneAssert("Telefon: +42098765431"))
    .then((dashboard) => dashboard.ageAssert("Věk: 48"))
    .then((dashboard) =>
      dashboard.clickLogout().then((login) => login.titleAssert("TEG#B"))
    );
});
