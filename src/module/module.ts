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
import {
  ICoreModule,
  RegisterControllerOptions,
  RegisterProviderOptions,
} from "./core-module.interface";
import { IDecorators } from "./decorators/decorators.interface";
import { ICache } from "@/cache";
import { ICacheConstructor } from "@/cache/cache.interface";

export class ModuleCore implements ICoreModule {
  private apis = new Map<string, IHTTPClient>();
  private providers = new Map<string, IProvider>();
  private controllers = new Map<string, IController>();
  private caches = new Map<string, ICache>();

  useDecorators(decorators: IDecorators) {
    decorators.setModule(this);
    return this;
  }

  registerApi(api: IHTTPClientConstuctor, options: IHTTPClientOptions) {
    const apiObj = new api(options);
    this.apis.set(api.name, apiObj);
    return this;
  }

  resolveApi<T extends IHTTPClient>(
    api?: IHTTPClientConstuctor
  ): T | undefined {
    if (api) return this.resolveByConstructor<T>(this.apis, api);
    else return this.apis.values().next().value;
  }

  registerProvider(
    provider: IProviderConstructor,
    options?: RegisterProviderOptions
  ) {
    const api = this.resolveApi(options?.prefferedApi);
    if (!api) throw new Error("Api is not registered.");

    const name = options?.key ?? provider.name;
    const providerObj = new provider(api);
    this.providers.set(name, providerObj);

    return this;
  }

  resolveProvider<T extends IProvider>(
    key: string | IProviderConstructor
  ): T | undefined {
    if (typeof key === "string") return this.providers.get(key) as T;
    else return this.resolveByConstructor<T>(this.providers, key);
  }

  registerController(
    controller: IControllerConstructor,
    options: RegisterControllerOptions
  ) {
    const provider = this.resolveProvider(options.provider);
    if (!provider) return this;

    const name = options.key ?? controller.name;
    const controllerObj = new controller(provider);
    this.controllers.set(name, controllerObj);

    return this;
  }

  resolveController<T extends IController>(
    key: string | IControllerConstructor
  ) {
    if (typeof key === "string") return this.controllers.get(key) as T;
    return this.resolveByConstructor<T>(this.controllers, key);
  }

  registerCache(cache: ICacheConstructor, key?: string) {
    const name = key ?? cache.name;
    const cacheObj = new cache();
    this.caches.set(name, cacheObj);

    return this;
  }

  resolveCache<T extends ICache>(key: string | ICacheConstructor) {
    if (typeof key === "string") return this.caches.get(key) as T;
    return this.resolveByConstructor<T>(this.caches, key);
  }

  clear() {
    this.apis.clear();
    this.providers.clear();
    this.controllers.clear();
    this.caches.clear();
  }

  private resolveByConstructor<T>(
    map: Map<string, any>,
    typeConstructor: new (...args: any[]) => any
  ) {
    return map.get(typeConstructor.name) as T | undefined;
  }
}
