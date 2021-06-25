import fetchMock from "jest-fetch-mock";

export const mockFetchResponse = (value: object) => {
  return fetchMock.mockResponseOnce(
    () => new Promise((resolve) => resolve(JSON.stringify(value)))
  );
};

export const mockFetchResponseWithError = (
  status: number,
  statusText?: string,
  bodyErrorMessage?: string
) => {
  return fetchMock.mockResponseOnce(
    () =>
      new Promise((resolve) =>
        resolve({
          body: bodyErrorMessage,
          init: {
            status,
            statusText,
          },
        })
      )
  );
};

export const mockFetchResponseWithTimeout = (
  value: object,
  timeout: number
) => {
  return fetchMock.mockResponseOnce(
    () =>
      new Promise((resolve) =>
        setTimeout(() => resolve(JSON.stringify(value)), timeout)
      )
  );
};

export const mockRejectResponse = (error: Error) => {
  return fetchMock.mockRejectOnce(
    () => new Promise((_, reject) => reject(error))
  );
};
