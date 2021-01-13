import { IHTTPClientOptions } from "../../http-client/types/http-client-options.interface";
import { IHTTPClientConstuctor } from "../../http-client/types/http-client.interface";
import { IControllerConstructor } from "../../controller/controller.interface";
import {
  IProvider,
  IProviderConstructor,
} from "../../provider/provider.interface";
import {
  ICoreModule,
  RegisterControllerOptions,
  RegisterProviderOptions,
} from "../core-module.interface";
import { IInjectDecorators } from "./inject-decorators.interface";
import { ICacheConstructor } from "../../cache/cache.interface";

class InjectDecorators implements IInjectDecorators {
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
    return <TProvider extends IProvider>(
      controllerConstructor: IControllerConstructor<TProvider>
    ) => {
      this.module?.registerController(controllerConstructor, options);
    };
  }
  cache(key?: string) {
    return (cacheConstructor: ICacheConstructor) => {
      this.module?.registerCache(cacheConstructor, key);
    };
  }
}

export const inject = new InjectDecorators();
