import { IHTTPClient } from "@/http-client/types/http-client.interface";

export interface IProvider {
  post<TRequest = undefined, TResponse = undefined>(
    url: string,
    data?: TRequest,
    options?: { raceId: string }
  ): Promise<TResponse | undefined>;
}

export type IProviderConstructor = new (api: IHTTPClient) => IProvider;
