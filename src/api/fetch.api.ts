import { IApi } from "./index";

export class FetchApi implements IApi {
  private baseUrl: string;

  constructor(options: { baseUrl: string }) {
    this.baseUrl = options.baseUrl;
  }

  async get(url: string) {
    const response = await fetch(`${this.baseUrl}/${url}`, { method: "GET" });
    return await response.json();
  }
}
