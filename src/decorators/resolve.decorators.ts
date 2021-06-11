import { IHTTPClientConstuctor } from "../http-client/types/http-client.interface";
import { IController, IControllerConstructor } from "../controller/index";
import { IProvider, IProviderConstructor } from "../provider/index";
import { ICoreModule } from "../module/index";
import { IResolveDecorators } from "./types/resolve-decorators.interface";
import { ICacheConstructor } from "../cache/cache.interface";
import { KeyUnionType } from "../module/core-module.interface";

export class ResolveDecorators implements IResolveDecorators {
  private module: ICoreModule | null = null;

  setModule(module: ICoreModule) {
    this.module = module;
  }

  resolve(injectableKey: KeyUnionType) {
    return (target: any, key: string | symbol): any => {
      const obj = this.module?.resolve(injectableKey);

      if (!obj) return;

      return this.defineProperty(obj);
    };
  }

  client(client?: IHTTPClientConstuctor) {
    return (target: any, key: string | symbol): any => {
      const clientObj = this.module?.resolveHttpClient(client);

      if (!clientObj) return;

      return this.defineProperty(clientObj);
    };
  }

  provider(provider: IProviderConstructor | string) {
    return (target: any, key: string | symbol): any => {
      const providerObj = this.module?.resolveProvider(provider);

      if (!providerObj) return;

      return this.defineProperty(providerObj);
    };
  }

  controller<TController extends IController, TProvider extends IProvider>(
    controller: IControllerConstructor<TController, TProvider> | string
  ) {
    return (target: any, key: string | symbol): any => {
      const controllerObj = this.module?.resolveController(controller);

      if (!controllerObj) return;

      return this.defineProperty(controllerObj);
    };
  }

  cache(cache: ICacheConstructor | string) {
    return (target: any, key: string | symbol): any => {
      const cacheObj = this.module?.resolveCache(cache);

      if (!cacheObj) return;

      return this.defineProperty(cacheObj);
    };
  }

  private defineProperty(newValue: any) {
    return {
      get() {
        return newValue;
      },
    };
  }
}
