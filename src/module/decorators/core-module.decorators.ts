import { IApiOptions } from "@/api/api-options.interface";
import { IApiConstuctor } from "@/api/api.interface";
import { IControllerConstructor } from "@/controller/controller.interface";
import { IProviderConstructor } from "@/provider/provider.interface";
import {
  ICoreModule,
  RegisterControllerOptions,
  RegisterProviderOptions,
} from "../create-module/core-module.interface";
import { ICoreDecorators } from "./core-decorators.interface";

class CoreModuleDecorators implements ICoreDecorators {
  private module: ICoreModule | null = null;
  setModule(module: ICoreModule) {
    this.module = module;
  }
  api(options: IApiOptions) {
    return (apiConstructor: IApiConstuctor) => {
      this.module?.registerApi(apiConstructor, options);
    };
  }
  provider(options?: RegisterProviderOptions) {
    return (providerConstructor: IProviderConstructor) => {
      this.module?.registerProvider(providerConstructor, options);
    };
  }
  controller(options: RegisterControllerOptions) {
    return (controllerConstructor: IControllerConstructor) => {
      this.module?.registerController(controllerConstructor, options);
    };
  }
}

export const coreDecorators = new CoreModuleDecorators();
