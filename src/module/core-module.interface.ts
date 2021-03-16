import { IHTTPClientOptions } from "../http-client/types/http-client-options.interface";
import {
  IHTTPClient,
  IHTTPClientConstuctor,
} from "../http-client/types/http-client.interface";
import {
  IController,
  IControllerConstructor,
} from "../controller/controller.interface";
import {
  IProvider,
  IProviderConstructor,
} from "../provider/types/provider.interface";
import { IDecorators } from "./decorators/decorators.interface";
import { ICache } from "../cache";
import { ICacheConstructor } from "../cache/cache.interface";

export type RegisterProviderOptions = {
  key?: string;
  client?: IHTTPClientConstuctor;
};

export type RegisterControllerOptions = {
  provider: IProviderConstructor;
  key?: string;
};

export type ModuleBootstrapOptions<T = any> = {
  httpClient: IHTTPClient;
  httpClientKey: string | IHTTPClientConstuctor;
  config?: T;
};

export type ICoreModule = {
  bootstrap: (
    options?: ModuleBootstrapOptions
  ) => Promise<ICoreModule> | ICoreModule;

  useDecorators: (...decorators: IDecorators[]) => ICoreModule;

  resolve: <T extends IProvider | IController | ICache>(
    key:
      | string
      | IProviderConstructor
      | IControllerConstructor<any>
      | ICacheConstructor
  ) => T | undefined;

  registerHttpClient: (
    client: IHTTPClientConstuctor,
    options: IHTTPClientOptions
  ) => ICoreModule;

  registerHttpClientImplementation: (
    client: IHTTPClient,
    key: string | IHTTPClientConstuctor
  ) => ICoreModule;

  resolveHttpClient: <T extends IHTTPClient>(
    client?: IHTTPClientConstuctor
  ) => T | undefined;

  registerProvider: (
    provider: IProviderConstructor,
    options?: RegisterProviderOptions
  ) => ICoreModule;

  resolveProvider: <T extends IProvider>(
    key: string | IProviderConstructor
  ) => T | undefined;

  registerController: <TProvider extends IProvider>(
    controller: IControllerConstructor<TProvider>,
    options: RegisterControllerOptions
  ) => ICoreModule;

  resolveController: <T extends IController, TProvider extends IProvider>(
    key: string | IControllerConstructor<TProvider>
  ) => T | undefined;

  registerCache: (cache: ICacheConstructor, key?: string) => ICoreModule;

  resolveCache: <T extends ICache>(
    key: string | ICacheConstructor
  ) => T | undefined;

  clear: () => void;
};
