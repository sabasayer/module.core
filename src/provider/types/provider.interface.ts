import type { IHTTPClient } from "../../http-client/types/http-client.interface";
import type { ProviderRequestOptions } from "./provider-request-options.interface";
import type { IRequestConfig } from "./request-config.interface";

export interface IProvider {
  post<TRequest = undefined, TResponse = undefined>(
    config: IRequestConfig<TRequest,TResponse>,
    data?: TRequest,
    options?: ProviderRequestOptions
  ): Promise<TResponse | undefined>;

  get<TResponse = undefined>(
    url: string,
    options?: ProviderRequestOptions
  ): Promise<TResponse | undefined>;

  upload<TResponse = undefined>(
    url: string,
    formData: FormData
  ): Promise<TResponse | undefined>;
}

export type IProviderConstructor = new (client: IHTTPClient,...args:any[]) => IProvider;
