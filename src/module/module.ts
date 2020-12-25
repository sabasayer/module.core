import { IApiOptions } from "@/api/api-options.interface";
import { IApi, IApiConstuctor } from "@/api/api.interface";
import { IProvider, IProviderConstructor } from "@/provider/provider.interface";
import { ICoreModule } from "./core-module.interface";

export class ModuleCore implements ICoreModule {
  private apis: Map<string, IApi> = new Map();
  private providers: Map<string, IProvider> = new Map();

  registerApi(apiConstructor: IApiConstuctor, options: IApiOptions) {
    const api = new apiConstructor(options);
    this.apis.set(apiConstructor.name, api);
    return this;
  }

  resolveApi<T extends IApi>(apiConstructor?: IApiConstuctor): T | undefined {
    if (apiConstructor)
      return this.resolveByConstructor<T>(this.apis, apiConstructor);
    else return this.apis.values().next().value;
  }

  registerProvider(
    keyOrConstructor: string | IProviderConstructor,
    providerConstructor?: IProviderConstructor
  ) {
    const api = this.resolveApi();
    if (!api) throw new Error("Api is not registered.");

    if (typeof keyOrConstructor === "string")
      this.registerProviderWithKey(keyOrConstructor, api, providerConstructor);
    else this.registerProviderWithConstructor(keyOrConstructor, api);

    return this;
  }

  resolveProvider<T extends IProvider>(
    key: string | IProviderConstructor
  ): T | undefined {
    if (typeof key === "string") return this.providers.get(key) as T;
    else return this.resolveByConstructor<T>(this.providers, key);
  }

  private resolveByConstructor<T>(
    map: Map<string, any>,
    typeConstructor: new (...args: any[]) => any
  ) {
    return map.get(typeConstructor.name) as T | undefined;
  }

  private registerProviderWithKey(
    key: string,
    api: IApi,
    providerConstructor?: IProviderConstructor
  ) {
    if (!providerConstructor)
      throw new Error("providerConstructor is needed for registering by key");

    const provider = new providerConstructor(api);
    this.providers.set(key, provider);
  }

  private registerProviderWithConstructor(
    constructor: IProviderConstructor,
    api: IApi
  ) {
    const provider = new constructor(api);
    this.providers.set(constructor.name, provider);
  }
}
