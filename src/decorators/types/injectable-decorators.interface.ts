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
import type { IClassConstructor } from "@/shared";

export type IInjectableDecorators = IDecorator & {
  client: (
    options: IHTTPClientOptions
  ) => (clientConstructor: IHTTPClientConstuctor) => void;
  provider: (
    options?: Omit<RegisterProviderOptions, "dependencies">
  ) => (providerConstructor: IProviderConstructor) => void;
  controller: (
    options: Omit<RegisterControllerOptions, "dependencies">
  ) => <TController extends IController, TProvider extends IProvider>(
    controllerConstructor: IControllerConstructor<TController, TProvider>
  ) => void;
  other: (key?: string) => (constructor: IClassConstructor) => void;
};
