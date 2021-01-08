import { IHTTPClient } from "../http-client/types/http-client.interface";
import { ProviderRequestOptions } from "./provider-request-options.interface";

export interface IProvider {
  post<TRequest = undefined, TResponse = undefined>(
    url: string,
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

export type IProviderConstructor = new (api: IHTTPClient) => IProvider;
