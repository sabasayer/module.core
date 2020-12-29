export const mockFetchResponse = (value: object) => {
  return fetchMock.mockResponse(
    () => new Promise((resolve) => resolve(JSON.stringify(value)))
  );
};
