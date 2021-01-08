import { IProvider } from "../provider/provider.interface";

export type IController = {};

export type IControllerConstructor<TProvider extends IProvider> = new (
  provider: TProvider
) => IController;
