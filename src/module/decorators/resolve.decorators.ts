import { IHTTPClientConstuctor } from "@/api/http-client.interface";
import { IControllerConstructor } from "@/controller/index";
import { IProviderConstructor } from "@/provider/index";
import { ICoreModule } from "../index";
import { IResolveDecorators } from "./resolve-decorators.interface";

class ResolveDecorators implements IResolveDecorators {
  private module: ICoreModule | null = null;
  setModule(module: ICoreModule) {
    this.module = module;
  }

  api(api?: IHTTPClientConstuctor) {
    return (target: any, key: string | symbol) => {
      const apiObj = this.module?.resolveApi(api);

      if (!apiObj) return;

      Object.defineProperty(target, key, {
        get: () => apiObj,
        enumerable: false,
        configurable: true,
      });
    };
  }

  provider(provider: IProviderConstructor | string) {
    return (target: any, key: string | symbol) => {
      const providerObj = this.module?.resolveProvider(provider);

      if (!providerObj) return;

      Object.defineProperty(target, key, {
        get: () => providerObj,
        enumerable: false,
        configurable: true,
      });
    };
  }

  controller(controller: IControllerConstructor | string) {
    return (target: any, key: string | symbol) => {
      const controllerObj = this.module?.resolveController(controller);

      if (!controllerObj) return;

      Object.defineProperty(target, key, {
        get: () => controllerObj,
        enumerable: false,
        configurable: true,
      });
    };
  }
}

export const resolve = new ResolveDecorators();
