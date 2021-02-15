export type IRequestConfig<TRequest = undefined, TResponse = undefined> = {
  url: string;
  cacheKey?: string;
};

export type ICachableRequestConfig<
  TRequest = undefined,
  TResponse = undefined
> = Required<IRequestConfig<TRequest, TResponse>>;
