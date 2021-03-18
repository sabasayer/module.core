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
import { IDecorator } from "../decorators/types/decorator.interface";
import { ICache } from "../cache";
import { ICacheConstructor } from "../cache/cache.interface";

export type RegisterProviderOptions = {
  key?: string;
  client?: IHTTPClientConstuctor;
};

export type RegisterControllerOptions = {
  provider?: IProviderConstructor;
  key?: string;
};

export type ModuleBootstrapOptions<T = any> = {
  httpClient: IHTTPClient;
  httpClientKey?: string;
  config?: T;
};

export type KeyUnionType =
  | string
  | IProviderConstructor
  | IControllerConstructor<any>
  | ICacheConstructor
  | IHTTPClientConstuctor;

export type AppLayerUnionType = IProvider | IController | ICache | IHTTPClient;

export type ModuleConstructor = new (options?: any) => ICoreModule;

export type ICoreModule = object & {
  bootstrap: (
    options?: ModuleBootstrapOptions
  ) => Promise<ICoreModule> | ICoreModule;

  useDecorators: (...decorators: IDecorator[]) => ICoreModule;

  resolve: <T extends AppLayerUnionType>(key: KeyUnionType) => T | undefined;

  registerHttpClient: (
    client: IHTTPClientConstuctor,
    options: IHTTPClientOptions
  ) => ICoreModule;

  registerHttpClientImplementation: (
    client: IHTTPClient,
    key?: string
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
    options?: RegisterControllerOptions
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
