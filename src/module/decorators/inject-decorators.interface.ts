import { IHTTPClientOptions } from "@/http-client/types/http-client-options.interface";
import { IHTTPClientConstuctor } from "@/http-client/types/http-client.interface";
import { IControllerConstructor } from "@/controller/controller.interface";
import { IProviderConstructor } from "@/provider/provider.interface";
import {
  RegisterControllerOptions,
  RegisterProviderOptions,
} from "../core-module.interface";
import { IDecorators } from "./decorators.interface";
import { ICacheConstructor } from "@/cache/cache.interface";

export type IInjectDecorators = IDecorators & {
  api: (
    options: IHTTPClientOptions
  ) => (apiConstructor: IHTTPClientConstuctor) => void;
  provider: (
    options?: RegisterProviderOptions
  ) => (providerConstructor: IProviderConstructor) => void;
  controller: (
    options: RegisterControllerOptions
  ) => (controllerConstructor: IControllerConstructor) => void;
  cache: (key?: string) => (cacheConstructor: ICacheConstructor) => void;
};
