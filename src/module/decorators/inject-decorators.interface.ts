import { IApiOptions } from "@/api/api-options.interface";
import { IApiConstuctor } from "@/api/api.interface";
import { IControllerConstructor } from "@/controller/controller.interface";
import { IProviderConstructor } from "@/provider/provider.interface";
import {
  RegisterControllerOptions,
  RegisterProviderOptions,
} from "../core-module.interface";
import { IDecorators } from "./decorators.interface";

export interface IInjectDecorators extends IDecorators {
  api: (options: IApiOptions) => (apiConstructor: IApiConstuctor) => void;
  provider: (
    options?: RegisterProviderOptions
  ) => (providerConstructor: IProviderConstructor) => void;
  controller: (
    options: RegisterControllerOptions
  ) => (controllerConstructor: IControllerConstructor) => void;
}
