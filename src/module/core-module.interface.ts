import { IHTTPClientOptions } from "@/http-client/types/http-client-options.interface";
import {
  IHTTPClient,
  IHTTPClientConstuctor,
} from "@/http-client/types/http-client.interface";
import {
  IController,
  IControllerConstructor,
} from "@/controller/controller.interface";
import { IProvider, IProviderConstructor } from "@/provider/provider.interface";
import { IDecorators } from "./decorators/decorators.interface";
import { ICache } from "@/cache";
import { ICacheConstructor } from "@/cache/cache.interface";

export interface RegisterProviderOptions {
  key?: string;
  prefferedApi?: IHTTPClientConstuctor;
}

export interface RegisterControllerOptions {
  provider: IProviderConstructor;
  key?: string;
}

export interface ICoreModule {
  useDecorators: (decorators: IDecorators) => ICoreModule;

  registerApi: (
    api: IHTTPClientConstuctor,
    options: IHTTPClientOptions
  ) => ICoreModule;
  resolveApi: <T extends IHTTPClient>(
    api?: IHTTPClientConstuctor
  ) => T | undefined;

  registerProvider: (
    provider: IProviderConstructor,
    options?: RegisterProviderOptions
  ) => ICoreModule;

  resolveProvider: <T extends IProvider>(
    key: string | IProviderConstructor
  ) => T | undefined;

  registerController: (
    controller: IControllerConstructor,
    options: RegisterControllerOptions
  ) => ICoreModule;

  resolveController: <T extends IController>(
    key: string | IControllerConstructor
  ) => T | undefined;

  registerCache: (cache: ICacheConstructor, key?: string) => ICoreModule;

  resolveCache: <T extends ICache>(
    key: string | ICacheConstructor
  ) => T | undefined;

  clear: () => void;
}
