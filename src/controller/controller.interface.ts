import { IProvider } from "@/provider/provider.interface";

export interface IController {}

export type IControllerConstructor = new (provider: IProvider) => IController;
