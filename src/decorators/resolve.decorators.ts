import type { IHTTPClientConstuctor } from "../http-client/types/http-client.interface";
import type { IController, IControllerConstructor } from "../controller/index";
import type { IProvider, IProviderConstructor } from "../provider/index";
import type { ICoreModule } from "../module/index";
import type { IResolveDecorators } from "./types/resolve-decorators.interface";
import type { KeyUnionType } from "../module/core-module.interface";

export class ResolveDecorators implements IResolveDecorators {
  private module: ICoreModule | null = null;

  setModule(module: ICoreModule) {
    this.module = module;
  }

  resolve(injectableKey: KeyUnionType) {
    return (_: any, __: string | symbol): any => {
      const obj = this.module?.resolve(injectableKey);

      if (!obj) return;

      return this.defineProperty(obj);
    };
  }

  client(client?: IHTTPClientConstuctor) {
    return (_: any, __: string | symbol): any => {
      const clientObj = this.module?.resolveHttpClient(client);

      if (!clientObj) return;

      return this.defineProperty(clientObj);
    };
  }

  provider(provider: IProviderConstructor | string) {
    return (_: any, __: string | symbol): any => {
      const providerObj = this.module?.resolveProvider(provider);

      if (!providerObj) return;

      return this.defineProperty(providerObj);
    };
  }

  controller<TController extends IController, TProvider extends IProvider>(
    controller: IControllerConstructor<TController, TProvider> | string
  ) {
    return (_: any, __: string | symbol): any => {
      const controllerObj = this.module?.resolveController(controller);

      if (!controllerObj) return;

      return this.defineProperty(controllerObj);
    };
  }

  private defineProperty(newValue: any) {
    return {
      get() {
        return newValue;
      },
    };
  }
}
