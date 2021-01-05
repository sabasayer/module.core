import { IAbortController } from "./abort-controller.interface";
import { IHTTPClientOptions } from "./api-options.interface";

export interface IHTTPClient {
  get: <TResponse = undefined>(
    url: string,
    options?: { abortController: IAbortController }
  ) => Promise<TResponse | undefined>;
  post: <TRequest, TResponse = undefined>(
    url: string,
    data?: TRequest
  ) => Promise<TResponse | undefined>;
  upload:(url:string,formData:FormData) => Promise<Response |undefined>
  createAbortController?: () => IAbortController;
}

export type IHTTPClientConstuctor = new (
  options: IHTTPClientOptions
) => IHTTPClient;
