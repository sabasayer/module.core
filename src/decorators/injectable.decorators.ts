import type { IHTTPClientOptions } from "../http-client/types/http-client-options.interface";
import type { IHTTPClientConstuctor } from "../http-client/types/http-client.interface";
import type {
  IController,
  IControllerConstructor,
} from "../controller/controller.interface";
import type {
  IProvider,
  IProviderConstructor,
} from "../provider/types/provider.interface";
import type {
  ICoreModule,
  RegisterControllerOptions,
  RegisterProviderOptions,
} from "../module/core-module.interface";
import type { IInjectableDecorators } from "./types/injectable-decorators.interface";
import type { ICacheConstructor } from "../cache/cache.interface";

export class InjectableDecorators implements IInjectableDecorators {
  private module: ICoreModule | null = null;
  setModule(module: ICoreModule) {
    this.module = module;
  }
  client(options: IHTTPClientOptions) {
    return (clientConstructor: IHTTPClientConstuctor) => {
      this.module?.registerHttpClient(clientConstructor, options);
    };
  }
  provider(options?: RegisterProviderOptions) {
    return (providerConstructor: IProviderConstructor) => {
      this.module?.registerProvider(providerConstructor, options);
    };
  }
  controller(options: RegisterControllerOptions) {
    return <TController extends IController, TProvider extends IProvider>(
      controllerConstructor: IControllerConstructor<TController, TProvider>
    ) => {
      this.module?.registerController(controllerConstructor, options);
    };
  }
  cache(key?: string) {
    return (cacheConstructor: ICacheConstructor) => {
      this.module?.registerCache(cacheConstructor, key);
    };
  }
  other(key?: string) {
    return (cacheConstructor: new () => any) => {
      this.module?.register(cacheConstructor, key);
    };
  }
}
