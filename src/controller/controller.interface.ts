import { IProvider } from "@/provider/provider.interface";

export type IController = {};

export type IControllerConstructor = new (provider: IProvider) => IController;
