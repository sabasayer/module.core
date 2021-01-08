import { IAbortController } from "./abort-controller.interface";
import { IHTTPClientOptions } from "./http-client-options.interface";
import { RequestOptions } from "./request-options.interface";

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

  createAbortController?: () => IAbortController;
};

export type IHTTPClientConstuctor = new (
  options: IHTTPClientOptions
) => IHTTPClient;
