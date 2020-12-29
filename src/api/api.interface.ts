import { IApiOptions } from "./api-options.interface";

export interface IApi {
  get: (url: string) => Promise<void>;
}

export type IApiConstuctor = new (options: IApiOptions) => IApi;
