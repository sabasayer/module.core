import type { IHTTPClientOptions } from "../../http-client/types/http-client-options.interface";
import type { IHTTPClientConstuctor } from "../../http-client/types/http-client.interface";
import type {
  IController,
  IControllerConstructor,
} from "../../controller/controller.interface";
import type {
  IProvider,
  IProviderConstructor,
} from "../../provider/types/provider.interface";
import type {
  RegisterControllerOptions,
  RegisterProviderOptions,
} from "../../module/core-module.interface";
import type { IDecorator } from "./decorator.interface";
import type { ICacheConstructor } from "../../cache/cache.interface";

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
    controllerConstructor: IControllerConstructor<TController, TProvider>
  ) => void;
  cache: (key?: string) => (cacheConstructor: ICacheConstructor) => void;
};
