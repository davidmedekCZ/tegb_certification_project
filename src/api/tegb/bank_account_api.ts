import { APIRequestContext } from "@playwright/test";

export class BankAccountApi {
  readonly request: APIRequestContext;
  readonly apiUrl = "https://tegb-backend-877a0b063d29.herokuapp.com/tegb";

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async createBankAccount(
    startBalance: number,
    type: string,
    access_token: string
  ) {
    const response = await this.request.post(this.apiUrl + "/accounts/create", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      data: {
        startBalance,
        type,
      },
    });

    return response;
  }
}
