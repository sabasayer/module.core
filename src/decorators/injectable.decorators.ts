import "reflect-metadata";

import type { IHTTPClientOptions } from "../http-client/types/http-client-options.interface";
import type { IHTTPClientConstuctor } from "../http-client/types/http-client.interface";
import type {
  IController,
  IControllerConstructor,
} from "../controller/controller.interface";
import type { IProviderConstructor } from "../provider/types/provider.interface";
import type {
  ICoreModule,
  RegisterControllerOptions,
  RegisterProviderOptions,
} from "../module/core-module.interface";
import type { IInjectableDecorators } from "./types/injectable-decorators.interface";
import type { IClassConstructor } from "@/shared";
import {
  getConstructorArgNames,
  getConstructorArgNamesAfterFirst,
} from "@/decorators/reflection.helper";

export class InjectableDecorators implements IInjectableDecorators {
  private module: ICoreModule | null = null;
  setModule(module: ICoreModule) {
    this.module = module;
  }
  client(options: IHTTPClientOptions) {
    return (clientConstructor: IHTTPClientConstuctor) => {
      this.module?.registerHttpClient(clientConstructor, options);
    };
  }
  provider(options?: Omit<RegisterProviderOptions, "dependencies">) {
    return (target: IProviderConstructor) => {
      const dependencies = getConstructorArgNamesAfterFirst(target);
      this.module?.registerProvider(target, { ...options, dependencies });
    };
  }
  controller(options?: Omit<RegisterControllerOptions, "dependencies">) {
    return <TController extends IController>(
      target: IControllerConstructor<TController>
    ) => {
      const dependencies = getConstructorArgNames(target);
      this.module?.registerController(target, { ...options, dependencies });
    };
  }

  other(key?: string) {
    return (target: IClassConstructor) => {
      const dependencies = getConstructorArgNames(target);
      this.module?.register(target, {
        key,
        dependencies,
      });
    };
  }
}
