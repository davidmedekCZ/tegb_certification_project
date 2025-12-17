import { APIRequestContext } from "@playwright/test";

export class UserApi {
  readonly request: APIRequestContext;
  readonly apiUrl = "https://tegb-backend-877a0b063d29.herokuapp.com/tegb";

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async createUser(username: string, password: string, email: string) {
    const response = await this.request.post(this.apiUrl + "/register", {
      data: {
        username,
        password,
        email,
      },
    });
    return response;
  }

  async loginUser(username: string, password: string) {
    const response = await this.request.post(this.apiUrl + "/login", {
      data: {
        username,
        password,
      },
    });
    return response;
  }
}
