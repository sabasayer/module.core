import { IHTTPClient } from "@/api/http-client.interface";

export interface IProvider {}

export type IProviderConstructor = new (api: IHTTPClient) => IProvider;
