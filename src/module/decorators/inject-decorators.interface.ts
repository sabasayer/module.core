import { IHTTPClientOptions } from "@/api/api-options.interface";
import { IHTTPClientConstuctor } from "@/api/http-client.interface";
import { IControllerConstructor } from "@/controller/controller.interface";
import { IProviderConstructor } from "@/provider/provider.interface";
import {
  RegisterControllerOptions,
  RegisterProviderOptions,
} from "../core-module.interface";
import { IDecorators } from "./decorators.interface";

export interface IInjectDecorators extends IDecorators {
  api: (options: IHTTPClientOptions) => (apiConstructor: IHTTPClientConstuctor) => void;
  provider: (
    options?: RegisterProviderOptions
  ) => (providerConstructor: IProviderConstructor) => void;
  controller: (
    options: RegisterControllerOptions
  ) => (controllerConstructor: IControllerConstructor) => void;
}
