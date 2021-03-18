import { IProvider } from "../provider/types/provider.interface";

export type IController = {};

export type IControllerConstructor<TProvider extends IProvider | undefined> = new (
  provider?: TProvider
) => IController;
