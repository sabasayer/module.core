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

  setHeader(key: string, value: string): void;
<<<<<<< HEAD
  removeHeader(key: string): void;
=======
>>>>>>> a4d0e8cff15630a08845a7a6bcfb6121dbbede7b

  createAbortController?: () => IAbortController;
};

export type IHTTPClientConstuctor = new (
  options: IHTTPClientOptions
) => IHTTPClient;
