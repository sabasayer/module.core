import { IApi } from "@/api/api.interface";

export interface IProvider {}

export type IProviderConstructor = new (api: IApi) => IProvider;
