import { IHTTPClientOptions } from "../../http-client/types/http-client-options.interface";
import { IHTTPClientConstuctor } from "../../http-client/types/http-client.interface";
import {
  IController,
  IControllerConstructor,
} from "../../controller/controller.interface";
import {
  IProvider,
  IProviderConstructor,
} from "../../provider/types/provider.interface";
import {
  RegisterControllerOptions,
  RegisterProviderOptions,
} from "../../module/core-module.interface";
import { IDecorator } from "./decorator.interface";
import { ICacheConstructor } from "../../cache/cache.interface";

export type IInjectableDecorators = IDecorator & {
  client: (
    options: IHTTPClientOptions
  ) => (clientConstructor: IHTTPClientConstuctor) => void;
  provider: (
    options?: RegisterProviderOptions
  ) => (providerConstructor: IProviderConstructor) => void;
  controller: (
    options: RegisterControllerOptions
  ) => <TController extends IController, TProvider extends IProvider>(
    controllerConstructor: IControllerConstructor<IController, TProvider>
  ) => void;
  cache: (key?: string) => (cacheConstructor: ICacheConstructor) => void;
};
