import {
  EnumRequestErrorType,
  FetchHTTPClient,
  RequestError,
} from "@/http-client";
import {
  mockFetchResponse,
  mockFetchResponseWithTimeout,
} from "@/http-client/__mocks__/fetch.mock";
import { CoreProvider } from "../core-provider";
import fetchMock from "jest-fetch-mock";

describe("Data Provider", () => {
  const client = new FetchHTTPClient({ baseUrl: "http://test.com" });

  fetchMock.enableMocks();

  beforeEach(() => {
    fetchMock.mockClear();
  });
  it("should post using options", () => {
    mockFetchResponse({ id: 1 });

    const provider = new CoreProvider(client);
    provider.post("getPatient", { id: 1 });

    expect(fetchMock).toBeCalledWith("http://test.com/getPatient", {
      method: "POST",
      body: JSON.stringify({ id: 1 }),
    });
  });

  it("should get using options", () => {
    mockFetchResponse({ id: 1 });

    const provider = new CoreProvider(client);
    provider.get("getTest");

    expect(fetchMock).toBeCalledWith("http://test.com/getTest", {
      method: "GET",
    });
  });

  it("should upload ", () => {
    mockFetchResponse({ id: 1 });
    const provider = new CoreProvider(client);

    const formData = new FormData();
    formData.append("file", new Blob());

    provider.upload("upload", formData);

    expect(fetchMock).toBeCalledWith("http://test.com/upload", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });
  });

  it("should prevent race condition and abort previous not finished requests", async () => {
    const provider = new CoreProvider(client);

    mockFetchResponseWithTimeout({ id: 1 }, 200);
    const firstRequest = provider.post(
      "testRace",
      { search: "t" },
      { raceId: "1" }
    );

    mockFetchResponseWithTimeout({ id: 2 }, 300);
    const secondRequest = provider.post(
      "testRace",
      { search: "tes" },
      { raceId: "1" }
    );

    mockFetchResponseWithTimeout({ id: 12 }, 100);
    const response = await provider.post(
      "testRace",
      { search: "test" },
      { raceId: "1" }
    );

    await expect(async () => await firstRequest).rejects.toEqual(
      new RequestError(EnumRequestErrorType.serverError)
    );

    await expect(async () => await secondRequest).rejects.toEqual(
      new RequestError(EnumRequestErrorType.serverError)
    );

    expect(response).toEqual({ id: 12 });
  });

  it("should not abort finished request on race condition", async () => {
    const provider = new CoreProvider(client);

    mockFetchResponseWithTimeout({ id: 1 }, 100);
    const firstResponse = await provider.get("testRace?search=te", {
      raceId: "1",
    });

    mockFetchResponseWithTimeout({ id: 2 }, 110);
    const secondResponse = await provider.get("testRace?search=test", {
      raceId: "1",
    });

    expect(firstResponse).toEqual({ id: 1 });
    expect(secondResponse).toEqual({ id: 2 });
  });
});
