import { IApiOptions } from "./api-options.interface";

export interface IApi {}

export type IApiConstuctor = new (options: IApiOptions) => IApi;
