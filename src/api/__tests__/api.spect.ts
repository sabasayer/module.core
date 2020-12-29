import { FetchApi } from "../fetch.api";
import fetchMock from "jest-fetch-mock";
import { mockFetchResponse } from "../__mocks__/fetch.mock";

describe("Api", () => {
  fetchMock.enableMocks();

  describe("Get Method", () => {
    it("should call fetch with get method", async () => {
      mockFetchResponse({});

      const api = new FetchApi({ baseUrl: "http://test.com" });
      await api.get("test");

      expect(fetchMock).toBeCalledWith("http://test.com/test", {
        method: "GET",
      });
    });

    it("should get value from response", async () => {
      mockFetchResponse({ data: "test_result" });

      const api = new FetchApi({ baseUrl: "http://test.com" });
      const res = await api.get("test");

      expect(res).toEqual({ data: "test_result" });
    });
  });
});
