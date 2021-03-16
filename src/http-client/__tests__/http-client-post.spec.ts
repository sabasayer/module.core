import { FetchHTTPClient } from "../fetch-http-client";
import fetchMock from "jest-fetch-mock";
import {
  mockFetchResponse,
  mockFetchResponseWithError,
  mockRejectResponse,
} from "../__mocks__/fetch.mock";
import { CustomServerError } from "../../custom-errors/custom-server-error";

describe("Http Client Post Method", () => {
  fetchMock.enableMocks();

  beforeEach(() => {
    fetchMock.mockClear();
  });

  it("should call fetch with post method", async () => {
    mockFetchResponse({ data: "test" });

    const api = new FetchHTTPClient({
      baseUrl: "http://test.com",
    });

    const res = await api.post<{ data: number }, { data: string }>("go", {
      data: 1,
    });

    expect(fetchMock).toBeCalledWith("http://test.com/go", {
      method: "POST",
      body: JSON.stringify({ data: 1 }),
    });

    expect(res).toEqual({ data: "test" });
  });

  it("should throw error for error", async () => {
    mockRejectResponse(Error("Some server error"));

    const api = new FetchHTTPClient({ baseUrl: "test.com" });

    await expect(api.post("test")).rejects.toEqual(
      new CustomServerError({ message: "Some server error" })
    );
  });

  it("should throw error for not ok", async () => {
    mockFetchResponseWithError(500, "Not found");

    const api = new FetchHTTPClient({ baseUrl: "test.com" });

    await expect(api.post("test")).rejects.toEqual(
      new CustomServerError({ message: "500: Not found." })
    );
  });
});
