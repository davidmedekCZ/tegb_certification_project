import { test, expect } from "@playwright/test";
import { UserApi } from "../../src/api/tegb/user_api.ts";
import { BankAccountApi } from "../../src/api/tegb/bank_account_api.ts";
import bankAccounts from "../../assets/ddt/bank_account_balance_data.json";
import { faker } from "@faker-js/faker";
import { LoginPage } from "../../src/pages/tegb/login_page.ts";

test.describe("Data Driven Tests - Create bank account per user", () => {
  bankAccounts.forEach(({ startBalance, type }, index) => {
    test(`${
      index + 1
    } DDT: Create bank account | type=${type} | balance=${startBalance}`, async ({
      request,
      page,
    }) => {
      const userApi = new UserApi(request);
      const bankApi = new BankAccountApi(request);

      const username = faker.internet.username();
      const password = "Password123!";
      const email = `${username}@test.cz`;

      const registerRes = await userApi.createUser(username, password, email);
      expect(registerRes.status(), "Status to be 201").toBe(201);

      const loginRes = await userApi.loginUser(username, password);
      expect(loginRes.status(), "Status to be 201").toBe(201);

      const { access_token } = await loginRes.json();

      const accountRes = await bankApi.createBankAccount(
        startBalance,
        type,
        access_token
      );
      expect(accountRes.status(), "Status to be 201").toBe(201);

      const loginPage = new LoginPage(page);
      await loginPage.open();
      const dashboard = await loginPage.login(username, password);
      await expect(
        dashboard.balance,
        `Balance to be ${startBalance}`
      ).toContainText(startBalance.toString());
    });
  });
});
