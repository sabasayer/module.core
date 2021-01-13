import { IHTTPClientOptions } from "../../http-client/types/http-client-options.interface";
import { IHTTPClient } from "../../http-client/types/http-client.interface";
import { IController } from "../../controller/controller.interface";
import { IProvider } from "../../provider/provider.interface";
import { createModule } from "../create-module/create-module";
import { injectable } from "../decorators/inject.decorators";
import { resolve } from "../decorators/resolve.decorators";
import { ICoreModule } from "../index";
import { ICache } from "../../cache";

export class TestApi implements IHTTPClient {
  constructor(options: IHTTPClientOptions) {}

  async get<TResponse = null>(url: string): Promise<TResponse> {
    return null as any;
  }

  async post(url: string) {
    return null as any;
  }
  async upload(url: string, formData: FormData) {
    return null as any;
  }

  setHeader(key: string) {}
}

export class TestProvider implements IProvider {
  constructor(api: IHTTPClient) {}

  post(url: string) {
    return null as any;
  }

  get(url: string) {
    return null as any;
  }

  upload(url: string, formData: FormData) {
    return null as any;
  }
}

export class TestController implements IController {
  constructor(provider: IProvider) {}
}

export class TestCache implements ICache {
  get<T>(key: string) {
    return null as any;
  }

  set(key: string, value: any) {}

  remove(key: string) {}

  clear() {}
}

export const createRegisterCache = () => {
  const module = createModule();
  module.registerCache(TestCache);
  return module;
};

export const createRegisterApi = (moduleArg?: ICoreModule) => {
  const module = moduleArg ?? createModule();
  module.registerHttpClient(TestApi, {});
  return module;
};

export const createAndUseInject = () => {
  const module = createModule();
  module.useDecorators(injectable);
  return module;
};

export const createAndUseResolve = () => {
  const module = createModule();
  module.useDecorators(resolve);
  return module;
};

export const createRegisterApiAndUseResolve = () => {
  const module = createAndUseResolve();
  return createRegisterApi(module);
};

export const createRegisterApiAndProvider = () => {
  const module = createRegisterApi();
  module.registerProvider(TestProvider);
  return module;
};

export const createRegisterController = () => {
  const module = createRegisterApiAndProvider();
  module.registerController(TestController, {
    provider: TestProvider,
  });
  return module;
};
