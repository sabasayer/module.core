import { IApiOptions } from "@/api/api-options.interface";
import { IApi, IApiConstuctor } from "@/api/api.interface";
import { IProvider, IProviderConstructor } from "@/provider/provider.interface";

export interface ICoreModule {
  registerApi: (
    apiConstructor: IApiConstuctor,
    options: IApiOptions
  ) => ICoreModule;
  resolveApi: <T extends IApi>(
    apiConstructor?: IApiConstuctor
  ) => T | undefined;

  registerProvider: (
    key: string | IProviderConstructor,
    providerConstructor?: IProviderConstructor
  ) => ICoreModule;

  resolveProvider: <T extends IProvider>(
    key: string | IProviderConstructor
  ) => T | undefined;
}
