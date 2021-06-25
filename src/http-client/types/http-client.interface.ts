import type { IAbortController } from "./abort-controller.interface";
import type { IHTTPClientOptions } from "./http-client-options.interface";
import type { RequestOptions } from "./request-options.interface";

export type IHTTPClient = {
  get: <TResponse = undefined>(
    url: string,
    options?: RequestOptions
  ) => Promise<TResponse | undefined>;

  post: <TRequest, TResponse = undefined>(
    url: string,
    data?: TRequest,
    options?: RequestOptions
  ) => Promise<TResponse | undefined>;

  upload: <TResponse = undefined>(
    url: string,
    formData: FormData
  ) => Promise<TResponse | undefined>;

  setHeader(key: string, value: string): void;
  removeHeader(key: string): void;

  createAbortController?: () => IAbortController;
};

export type IHTTPClientConstuctor = new (
  options: IHTTPClientOptions
) => IHTTPClient;
