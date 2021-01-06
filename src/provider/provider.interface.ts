import { IHTTPClient } from "@/http-client/types/http-client.interface";

export interface IProvider {}

export type IProviderConstructor = new (api: IHTTPClient) => IProvider;
