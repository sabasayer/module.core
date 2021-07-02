import "reflect-metadata";
import type { IHTTPClientOptions } from "../http-client/types/http-client-options.interface";
import type {
  IHTTPClient,
  IHTTPClientConstuctor,
} from "../http-client/types/http-client.interface";
import type {
  IController,
  IControllerConstructor,
} from "../controller/controller.interface";
import type {
  IProvider,
  IProviderConstructor,
} from "../provider/types/provider.interface";
import type {
  AppLayerUnionType,
  ICoreModule,
  KeyUnionType,
  ModuleBootstrapOptions,
  RegisterControllerOptions,
  RegisterProviderOptions,
} from "./core-module.interface";
import type { IDecorator } from "../decorators/types/decorator.interface";
import type { ICache } from "../cache";
import type { ICacheConstructor } from "../cache/cache.interface";
import { coreLogger } from "../logger/core.logger";
import { globalModule } from "../global-module/global-module";

export class CoreModule implements ICoreModule {
  private readonly providerSuffix = "Provider";
  private readonly controllerSuffix = "Controller";
  private readonly cacheSuffix = "Cache";
  private readonly clientSuffix = "HttpClient";

  private clients = new Map<string, IHTTPClient>();
  private providers = new Map<string, IProvider>();
  private controllers = new Map<string, IController>();
  private caches = new Map<string, ICache>();
  private others = new Map<string, any>();

  constructor() {
    const registeredModule = globalModule.getModule(
      this.constructor as new () => CoreModule
    );
    if (registeredModule) return registeredModule as CoreModule;

    globalModule.registerModule(this);
  }

  bootstrap(options?: ModuleBootstrapOptions) {
    if (options) {
      this.registerHttpClientImplementation(
        options.httpClient,
        options.httpClientKey
      );
    }

    return this;
  }

  @coreLogger.logMethod()
  useDecorators(...decorators: IDecorator[]) {
    decorators.forEach((decorator) => decorator.setModule(this));
    return this;
  }

  register<T>(constructor: new () => T): ICoreModule {
    const name = this.getName(constructor);
    const obj = new constructor();
    this.others.set(name, obj);

    return this;
  }

  /**
   * One resolve for all types
   * @param key must contain 'Provider' | 'Controller' | 'Cache' | 'HttpClient'
   * suffix to be resolved
   */
  resolve<T extends AppLayerUnionType>(key: KeyUnionType<T>): T | undefined {
    let name = this.getName(key);

    if (name.includes(this.clientSuffix))
      return this.resolveHttpClient(key as IHTTPClientConstuctor) as
        | T
        | undefined;

    if (name.includes(this.providerSuffix))
      return this.resolveProvider(key as IProviderConstructor) as T | undefined;

    if (name.includes(this.controllerSuffix))
      return this.resolveController(key as IControllerConstructor<any, any>) as
        | T
        | undefined;

    if (name.includes(this.cacheSuffix))
      return this.resolveCache(key as ICacheConstructor) as T | undefined;

    return this.resolveOther<T>(key);
  }

  registerHttpClientImplementation(client: IHTTPClient, key?: string) {
    const name: string = this.getName(key ?? client.constructor.name);
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

  registerController<
    TController extends IController,
    TProvider extends IProvider
  >(
    controller: IControllerConstructor<TController, TProvider>,
    options?: RegisterControllerOptions
  ) {
    const provider = options?.provider
      ? (this.resolveProvider(options.provider) as TProvider)
      : undefined;

    const name = options?.key ?? controller.name;
    const controllerObj = new controller(provider);
    this.controllers.set(name, controllerObj);

    return this;
  }

  resolveController<T extends IController, TProvider extends IProvider>(
    key: string | IControllerConstructor<T, TProvider>
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
    this.others.clear();
  }

  private resolveOther<T>(key: KeyUnionType): T | undefined {
    const name = this.getName(key);
    return this.others.get(name) as T | undefined;
  }

  private resolveByConstructor<T>(
    map: Map<string, any>,
    typeConstructor: new (...args: any[]) => any
  ) {
    return map.get(typeConstructor.name) as T | undefined;
  }

  private getName(key: string | (new (options?: any) => any)) {
    return typeof key === "string" ? key : key.name;
  }
}
