import { IApiOptions } from "@/api/api-options.interface";
import { IApiConstuctor } from "@/api/api.interface";
import { IControllerConstructor } from "@/controller/controller.interface";
import { IProviderConstructor } from "@/provider/provider.interface";
import {
  ICoreModule,
  RegisterControllerOptions,
  RegisterProviderOptions,
} from "../create-module/core-module.interface";

export interface ICoreDecorators {
  setModule: (module: ICoreModule) => void;
  api: (options: IApiOptions) => (apiConstructor: IApiConstuctor) => void;
  provider: (
    options?: RegisterProviderOptions
  ) => (providerConstructor: IProviderConstructor) => void;
  controller: (
    options: RegisterControllerOptions
  ) => (controllerConstructor: IControllerConstructor) => void;
}
