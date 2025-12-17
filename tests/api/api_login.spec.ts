import { expect, test } from "@playwright/test";
import { UserApi } from "../../src/api/tegb/user_api.ts";

test("Login existing user via API Objects", async ({ request }) => {
  const userApi = new UserApi(request);

  const username = "qwerty";
  const password = "123456";

  const loginResponse = await userApi.loginUser(username, password);

  expect(loginResponse.status(), "Status Code to be 201").toBe(201);

  const loginResponseBody = await loginResponse.json();
  const accessToken = loginResponseBody.access_token;

  expect(accessToken, "Access Token to be Defined").toBeDefined();
  expect(typeof accessToken, "Access Token to be String").toBe("string");
});
