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
  RegisterClassOptions,
  RegisterControllerOptions,
  RegisterProviderOptions,
} from "./core-module.interface";
import type { IDecorator } from "../decorators/types/decorator.interface";
import { coreLogger } from "../logger/core.logger";
import { globalModule } from "../global-module/global-module";
import { EnumCustomErrorType, CustomModuleError } from "../custom-errors";
import type { IClassConstructor } from "../shared";

type OtherConstructorOptions = {
  constructor: new (...args: any[]) => any;
  dependencies?: any[];
};

type HttpClientConstructorOptions = {
  constructor: IHTTPClientConstuctor;
  options: IHTTPClientOptions;
};

type ProviderConstructorOptions = {
  constructor: IProviderConstructor;
  client?: string;
} & OtherConstructorOptions;

type ControllerConstructorOptions = {
  constructor: IControllerConstructor<any>;
} & OtherConstructorOptions;

export class CoreModule implements ICoreModule {
  private readonly providerSuffix = "Provider";
  private readonly controllerSuffix = "Controller";
  private readonly clientSuffix = "HttpClient";

  private clientConstructors = new Map<string, HttpClientConstructorOptions>();
  private providerConstructors = new Map<string, ProviderConstructorOptions>();
  private controllerConstructors = new Map<
    string,
    ControllerConstructorOptions
  >();
  private othersConstructors = new Map<string, OtherConstructorOptions>();

  private clients = new Map<string, IHTTPClient>();
  private providers = new Map<string, IProvider>();
  private controllers = new Map<string, IController>();
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
      this.registerHttpClientInstance(
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

  register<T>(
    constructor: new (...args: any[]) => T,
    options?: RegisterClassOptions
  ): ICoreModule {
    const name = this.getName(options?.key ?? constructor);
    this.othersConstructors.set(name, {
      constructor,
      dependencies: options?.dependencies,
    });

    return this;
  }

  registerInstance<T extends object>(obj: T, key?: string) {
    const name: string = this.getName(key ?? obj.constructor.name);
    this.others.set(name, obj);
    return this;
  }

  /**
   * Checks 'Provider' | 'Controller' | 'HttpClient' suffix for key or name of class.
   * @param key
   */
  resolve<T extends AppLayerUnionType>(key: KeyUnionType<T>): T | undefined {
    let name = this.getName(key);

    if (this.isClient(name))
      return this.resolveHttpClient(key as IHTTPClientConstuctor) as
        | T
        | undefined;

    if (this.isProvider(name))
      return this.resolveProvider(key as IProviderConstructor) as T | undefined;

    if (this.isController(name))
      return this.resolveController(key as IControllerConstructor<any>) as
        | T
        | undefined;

    return this.resolveOther<T>(key);
  }

  registerHttpClientInstance(client: IHTTPClient, key?: string) {
    const name: string = this.getName(key ?? client.constructor.name);
    this.clients.set(name, client);

    return this;
  }

  registerHttpClient(
    client: IHTTPClientConstuctor,
    options: IHTTPClientOptions
  ) {
    coreLogger.log("registerHttpClient", client, options);

    this.clientConstructors.set(client.name, { constructor: client, options });
    return this;
  }

  resolveHttpClient<T extends IHTTPClient>(
    client?: IHTTPClientConstuctor | string
  ): T | undefined {
    let instance = this.resolveHttpClientInstance(client);
    if (instance) return instance;

    return this.createHttpClientInstance(client) as T;
  }

  private resolveHttpClientInstance<T extends IHTTPClient>(
    client?: IHTTPClientConstuctor | string
  ) {
    if (client) {
      const name = this.getName(client);
      return this.clients.get(name) as T;
    } else return this.clients.values().next().value;
  }

  private createHttpClientInstance(client?: IHTTPClientConstuctor | string) {
    const constructorObj = client
      ? this.clientConstructors.get(this.getName(client))
      : this.clientConstructors.values().next().value;

    if (!constructorObj) return;

    const instance = new constructorObj.constructor(constructorObj.options);
    this.registerHttpClientInstance(instance);

    return instance;
  }

  registerProvider(
    provider: IProviderConstructor,
    options?: RegisterProviderOptions
  ) {
    const name = options?.key ?? provider.name;

    const clientName = options?.client
      ? this.getName(options.client)
      : undefined;

    this.providerConstructors.set(name, {
      client: clientName,
      constructor: provider,
      dependencies: options?.dependencies,
    });

    return this;
  }

  resolveProvider<T extends IProvider>(
    key: string | IProviderConstructor
  ): T | undefined {
    const instance = this.resolveProviderInstance<T>(key);
    if (instance) return instance;

    return this.createProviderInstance(key) as T;
  }

  private resolveProviderInstance<T extends IProvider>(
    key: string | IProviderConstructor
  ): T | undefined {
    if (typeof key === "string") return this.providers.get(key) as T;
    else return this.resolveByConstructor<T>(this.providers, key);
  }

  private createProviderInstance(key: string | IProviderConstructor) {
    return this.createInstance(
      this.providerConstructors,
      this.providers,
      key,
      (dependencies: any[], constructorObj: ProviderConstructorOptions) => {
        const client = this.resolveHttpClient(constructorObj.client);
        if (!client)
          throw new CustomModuleError({
            message: "Http-Client is not registered.",
            type: EnumCustomErrorType.Construction,
          });

        return [client, ...dependencies];
      }
    );
  }

  registerController<TController extends IController>(
    controller: IControllerConstructor<TController>,
    options?: RegisterControllerOptions
  ) {
    const name = options?.key ?? controller.name;

    let dependencies = options?.dependencies;

    this.controllerConstructors.set(name, {
      constructor: controller,
      dependencies: dependencies,
    });

    return this;
  }

  resolveController<T extends IController>(
    key: string | IControllerConstructor<T>
  ): T | undefined {
    const instance = this.resolveControllerInstance(key);
    if (instance) return instance;

    return this.createControllerInstance(key) as T;
  }

  private resolveControllerInstance<T extends IController>(
    key: string | IControllerConstructor<T>
  ) {
    if (typeof key === "string") return this.controllers.get(key) as T;
    return this.resolveByConstructor<T>(this.controllers, key);
  }

  private createControllerInstance(key: string | IControllerConstructor<any>) {
    return this.createInstance(
      this.controllerConstructors,
      this.controllers,
      key
    );
  }

  @coreLogger.logMethod()
  clear() {
    this.clientConstructors.clear();
    this.clients.clear();

    this.providerConstructors.clear();
    this.providers.clear();

    this.controllerConstructors.clear();
    this.controllers.clear();

    this.othersConstructors.clear();
    this.others.clear();
  }

  private resolveOther<T>(key: KeyUnionType): T | undefined {
    const instance = this.resolveOtherInstance<T>(key);
    if (instance) return instance;

    return this.createOtherInstance(key);
  }

  private resolveOtherInstance<T>(key: KeyUnionType): T | undefined {
    const name = this.getName(key);
    return this.others.get(name) as T | undefined;
  }

  private createOtherInstance(key: KeyUnionType) {
    return this.createInstance(this.othersConstructors, this.others, key);
  }

  private createInstance(
    constructorMap: Map<string, OtherConstructorOptions>,
    instanceMap: Map<string, any>,
    key: string | IClassConstructor,
    dependenciesMapFn?: (dependencies: any[], constructorObj: any) => any[]
  ) {
    const name = this.getName(key);
    const constructorObj = constructorMap.get(name);
    if (!constructorObj) return;

    let dependencies = this.resolveDependencies(
      constructorObj.dependencies ?? []
    );

    if (dependenciesMapFn)
      dependencies = dependenciesMapFn(dependencies, constructorObj);

    const instance = new constructorObj.constructor(...dependencies);
    instanceMap.set(name, instance);
    return instance;
  }

  private resolveDependencies(dependencies: any[]): any[] {
    return dependencies.map((e) => {
      if (typeof e === "function" || typeof e === "string")
        return this.resolve(e);
      else e;
    });
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

  private isProvider(key: string | IProviderConstructor) {
    return this.getName(key).includes(this.providerSuffix);
  }

  private isController(key: string | IControllerConstructor<any>) {
    return this.getName(key).includes(this.controllerSuffix);
  }

  private isClient(key: string | IHTTPClientConstuctor) {
    return this.getName(key).includes(this.clientSuffix);
  }
}
