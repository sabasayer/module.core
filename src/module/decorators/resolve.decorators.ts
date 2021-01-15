import { IHTTPClientConstuctor } from "../../http-client/types/http-client.interface";
import { IControllerConstructor } from "../../controller/index";
import { IProvider, IProviderConstructor } from "../../provider/index";
import { ICoreModule } from "../index";
import { IResolveDecorators } from "./resolve-decorators.interface";
import { ICacheConstructor } from "../../cache/cache.interface";

export class ResolveDecorators implements IResolveDecorators {
  private module: ICoreModule | null = null;
  setModule(module: ICoreModule) {
    this.module = module;
  }

  client(client?: IHTTPClientConstuctor) {
    return (target: any, key: string | symbol) => {
      const clientObj = this.module?.resolveHttpClient(client);

      if (!clientObj) return;

      this.defineProperty(target, key, clientObj);
    };
  }

  provider(provider: IProviderConstructor | string) {
    return (target: any, key: string | symbol) => {
      const providerObj = this.module?.resolveProvider(provider);

      if (!providerObj) return;

      this.defineProperty(target, key, providerObj);
    };
  }

  controller<TProvider extends IProvider>(
    controller: IControllerConstructor<TProvider> | string
  ) {
    return (target: any, key: string | symbol) => {
      const controllerObj = this.module?.resolveController(controller);

      if (!controllerObj) return;

      this.defineProperty(target, key, controllerObj);
    };
  }

  cache(cache: ICacheConstructor | string) {
    return (target: any, key: string | symbol) => {
      const cacheObj = this.module?.resolveCache(cache);

      if (!cacheObj) return;

      this.defineProperty(target, key, cacheObj);
    };
  }

  private defineProperty(target: any, key: string | symbol, newValue: any) {
    Object.defineProperty(target, key, {
      get: () => newValue,
      enumerable: false,
      configurable: true,
    });
  }
}
