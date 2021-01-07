import { FetchHTTPClient } from "../fetch-http-client";
import fetchMock from "jest-fetch-mock";
import {
  mockFetchResponse,
  mockFetchResponseWithError,
  mockFetchResponseWithTimeout,
  mockRejectResponse,
} from "../__mocks__/fetch.mock";
import { EnumRequestErrorType } from "../statics/request-error-type.enum";
import { RequestError } from "../request-error";

describe("Api", () => {
  fetchMock.enableMocks();

  beforeEach(() => {
    fetchMock.mockClear();
  });

  describe("Get Method", () => {
    it("should call fetch with get method", async () => {
      mockFetchResponse({});

      const api = new FetchHTTPClient({ baseUrl: "http://test.com" });
      await api.get("test");

      expect(fetchMock).toBeCalledWith("http://test.com/test", {
        method: "GET",
      });
    });

    it("should call fetch with correct url", async () => {
      mockFetchResponse({});

      const api = new FetchHTTPClient({
        hostName: "my-site.net",
        prefix: "api",
        protocol: "https",
      });

      await api.get("test");

      expect(fetchMock).toBeCalledWith("https://my-site.net/api/test", {
        method: "GET",
      });
    });

    it("should call fetch with correct headers", async () => {
      mockFetchResponse({});

      const api = new FetchHTTPClient({
        hostName: "site.com",
        protocol: "http",
        headers: {
          "x-api-key": "12-23-455",
          "Content-Type": "application/json",
        },
      });

      await api.get("test");

      expect(fetchMock).toBeCalledWith("http://site.com/test", {
        method: "GET",
        headers: {
          "x-api-key": "12-23-455",
          "Content-Type": "application/json",
        },
      });
    });

    it("should get value from response", async () => {
      mockFetchResponse({ data: "test_result" });

      const api = new FetchHTTPClient({ baseUrl: "http://test.com" });
      const res = await api.get("test");

      expect(res).toEqual({ data: "test_result" });
    });

    it("should throw error for error", async () => {
      mockRejectResponse(Error("Some server error"));

      const api = new FetchHTTPClient({ baseUrl: "test.com" });

      await expect(api.get("test")).rejects.toEqual(
        new RequestError(EnumRequestErrorType.serverError, "Some server error")
      );
    });

    it("should throw error for not ok", async () => {
      mockFetchResponseWithError(500, "Not found");

      const api = new FetchHTTPClient({ baseUrl: "test.com" });

      await expect(api.get("test")).rejects.toEqual(
        new RequestError(EnumRequestErrorType.serverError, "500: Not found.")
      );
    });

    it("should throw error with status and body", async () => {
      mockFetchResponseWithError(500, "Not found", "Body Error Message");

      const api = new FetchHTTPClient({ baseUrl: "test.com" });

      await expect(api.get("test")).rejects.toEqual(
        new RequestError(
          EnumRequestErrorType.serverError,
          "500: Not found. Body Error Message"
        )
      );
    });

    it("should create error with createErrorFn when not ok", async () => {
      mockFetchResponseWithError(
        404,
        "Not found",
        JSON.stringify({ errorMessage: "test error" })
      );

      const api = new FetchHTTPClient({
        baseUrl: "test.com",
        createErrorFn: async (response: Response) => {
          const responseObj = await response.json();
          return Error(`${responseObj.errorMessage}`);
        },
      });

      await expect(api.get("test")).rejects.toEqual(
        new RequestError(EnumRequestErrorType.serverError, "test error")
      );
    });
  });

  describe("POST Method", () => {
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
        new RequestError(EnumRequestErrorType.serverError, "Some server error")
      );
    });

    it("should throw error for not ok", async () => {
      mockFetchResponseWithError(500, "Not found");

      const api = new FetchHTTPClient({ baseUrl: "test.com" });

      await expect(api.post("test")).rejects.toEqual(
        new RequestError(EnumRequestErrorType.serverError, "500: Not found.")
      );
    });
  });

  describe("Upload", () => {
    it("should call post with form data and content-type header", () => {
      mockFetchResponse({ id: 1 });

      const api = new FetchHTTPClient({
        baseUrl: "http://test.com",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const formData = new FormData();
      formData.append("file", new Blob());

      api.upload("upload", formData);

      expect(fetchMock).toBeCalledWith("http://test.com/upload", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });
    });
  });

  describe("Cancelation", () => {
    it("should cancel request for get", async () => {
      const api = new FetchHTTPClient({
        baseUrl: "http://test.com",
      });

      const abortController = api.createAbortController();
      abortController.abort();

      await expect(api.get("test", { abortController })).rejects.toEqual(
        new RequestError(EnumRequestErrorType.aborted)
      );
    });

    it("should cancel request for post", async () => {
      const api = new FetchHTTPClient({
        baseUrl: "http://test.com",
      });

      const abortController = api.createAbortController();
      abortController.abort();

      await expect(
        api.post("test", undefined, { abortController })
      ).rejects.toEqual(new RequestError(EnumRequestErrorType.aborted));
    });
  });

  describe("Prevent Request Duplication", () => {
    it("should prevent second same request for post", () => {
      mockFetchResponseWithTimeout({ id: 1 }, 4000);

      const api = new FetchHTTPClient({
        baseUrl: "test.com",
        preventRequestDuplication: true,
      });

      api.post("test", { id: 1 });
      api.post("test", { id: 1 });

      expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    it("should prevent second same request for get", () => {
      mockFetchResponseWithTimeout({ id: 1 }, 4000);

      const api = new FetchHTTPClient({
        baseUrl: "test.com",
        preventRequestDuplication: true,
      });

      api.get("test?id=1");
      api.get("test?id=1");

      expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    it("should clear from pending requests if there is an error", async () => {
      mockFetchResponseWithError(404);

      const api = new FetchHTTPClient({
        baseUrl: "test.com",
        preventRequestDuplication: true,
      });

      try {
        await api.post("test");
      } catch (e) {}

      const pendingRequests = api.getPendingRequests();

      expect(pendingRequests.size).toBe(0);
    });

    it("should not prevent second if preventRequestDuplication is false", () => {
      mockFetchResponse({ id: 1 });

      const api = new FetchHTTPClient({
        baseUrl: "test.com",
      });

      api.get("test?id=1");

      mockFetchResponse({ id: 1 });

      api.get("test?id=1");

      expect(fetchMock).toHaveBeenCalledTimes(2);
    });
  });
});
