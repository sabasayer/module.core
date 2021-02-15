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
import {
  ICoreModule,
  RegisterControllerOptions,
  RegisterProviderOptions,
} from "./core-module.interface";
import { IDecorators } from "./decorators/decorators.interface";
import { ICache } from "../cache";
import { ICacheConstructor } from "../cache/cache.interface";
import { coreLogger } from "../logger/core.logger";

export class ModuleCore implements ICoreModule {
  private clients = new Map<string, IHTTPClient>();
  private providers = new Map<string, IProvider>();
  private controllers = new Map<string, IController>();
  private caches = new Map<string, ICache>();

  bootstrap() {
    return this;
  }

  @coreLogger.logMethod()
  useDecorators(...decorators: IDecorators[]) {
    decorators.forEach((decorator) => decorator.setModule(this));
    return this;
  }

  registerHttpClientImplementation(
    client: IHTTPClient,
    key: string | IHTTPClientConstuctor
  ) {
    const name: string = typeof key === "string" ? key : key.name;
    this.clients.set(name, client);

    return this;
  }

  registerHttpClient(
    client: IHTTPClientConstuctor,
    options: IHTTPClientOptions
  ) {
    coreLogger.log("registerHttpClient", client, options);

    const clientObj = new client(options);
    this.clients.set(client.name, clientObj);
    return this;
  }

  resolveHttpClient<T extends IHTTPClient>(
    client?: IHTTPClientConstuctor
  ): T | undefined {
    if (client) return this.resolveByConstructor<T>(this.clients, client);
    else return this.clients.values().next().value;
  }

  registerProvider(
    provider: IProviderConstructor,
    options?: RegisterProviderOptions
  ) {
    const client = this.resolveHttpClient(options?.client);
    if (!client) throw new Error("Http-Client is not registered.");

    const name = options?.key ?? provider.name;
    const providerObj = new provider(client);
    this.providers.set(name, providerObj);

    return this;
  }

  resolveProvider<T extends IProvider>(
    key: string | IProviderConstructor
  ): T | undefined {
    if (typeof key === "string") return this.providers.get(key) as T;
    else return this.resolveByConstructor<T>(this.providers, key);
  }

  registerController<TProvider extends IProvider>(
    controller: IControllerConstructor<TProvider>,
    options: RegisterControllerOptions
  ) {
    const provider = this.resolveProvider(options.provider) as TProvider;
    if (!provider) return this;

    const name = options.key ?? controller.name;
    const controllerObj = new controller(provider);
    this.controllers.set(name, controllerObj);

    return this;
  }

  resolveController<T extends IController, TProvider extends IProvider>(
    key: string | IControllerConstructor<TProvider>
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

  @coreLogger.logMethod()
  clear() {
    this.clients.clear();
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
