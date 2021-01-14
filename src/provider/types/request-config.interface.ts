export type IRequestConfig<Request = undefined, Response = undefined> = {
  url: string;
  cacheKey?: string;
};

export type ICachableRequestConfig<
  Request = undefined,
  Response = undefined
> = IRequestConfig<Request, Response> & { cacheKey: string };
