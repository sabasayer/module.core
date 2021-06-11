import { IProvider } from "../provider/types/provider.interface";

export type IController = {};

export type IControllerConstructor<
  TController extends IController,
  TProvider extends IProvider | undefined
> = new (provider?: TProvider, ...args: any[]) => TController;
