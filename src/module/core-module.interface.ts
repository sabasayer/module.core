import { IApiOptions } from "@/api/api-options.interface";
import { IApi, IApiConstuctor } from "@/api/api.interface";
import {
  IController,
  IControllerConstructor,
} from "@/controller/controller.interface";
import { IProvider, IProviderConstructor } from "@/provider/provider.interface";
import { IDecorators } from "./decorators/decorators.interface";

export interface RegisterProviderOptions {
  key?: string;
  prefferedApi?: IApiConstuctor;
}

export interface RegisterControllerOptions {
  provider: IProviderConstructor;
  key?: string;
}

export interface ICoreModule {
  useDecorators: (decorators: IDecorators) => ICoreModule;

  registerApi: (
    api: IApiConstuctor,
    options: IApiOptions
  ) => ICoreModule;
  resolveApi: <T extends IApi>(
    api?: IApiConstuctor
  ) => T | undefined;

  registerProvider: (
    provider: IProviderConstructor,
    options?: RegisterProviderOptions
  ) => ICoreModule;

  resolveProvider: <T extends IProvider>(
    key: string | IProviderConstructor
  ) => T | undefined;

  registerController: (
    controller: IControllerConstructor,
    options: RegisterControllerOptions
  ) => ICoreModule;

  resolveController: <T extends IController>(
    key: string | IControllerConstructor
  ) => T | undefined;

  clear: () => void;
}
