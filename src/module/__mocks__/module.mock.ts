import type { IHTTPClientOptions } from "../../http-client/types/http-client-options.interface";
import type { IHTTPClient } from "../../http-client/types/http-client.interface";
import type { IController } from "../../controller/controller.interface";
import type { IProvider } from "../../provider/types/provider.interface";
import { CoreModule, ICoreModule } from "../index";
import type { ICache } from "../../cache";
import type { IRequestConfig } from "../../provider/types/request-config.interface";

export class TestModule extends CoreModule {}

export class TestHttpClient implements IHTTPClient {
  constructor(_: IHTTPClientOptions) {}

  async get<TResponse = null>(_: string): Promise<TResponse> {
    return null as any;
  }

  async post(_: string) {
    return null as any;
  }
  async upload(_: string, __: FormData) {
    return null as any;
  }

  setHeader(_: string) {}
  removeHeader(_: string) {}
}

export class TestProvider implements IProvider {
  args: any[] | undefined;
  constructor(_: IHTTPClient, ...args: any[]) {
    this.args = args;
  }

  post<TRequest = undefined, TResponse = undefined>(
    _: IRequestConfig<TRequest, TResponse>
  ): Promise<TResponse | undefined> {
    return null as any;
  }

  get(_: string) {
    return null as any;
  }

  upload(_: string, __: FormData) {
    return null as any;
  }
}

export class TestController implements IController {
  args: any[] | undefined;

  constructor(_?: IProvider, ...args: any[]) {
    this.args = args;
  }
}

export class TestCache implements ICache {
  get(_: string) {
    return null as any;
  }

  set(_: string, __: any) {}

  remove(_: string) {}

  clear() {}
}

export const createModule = () => {
  const testModule = new TestModule();
  testModule.clear();
  return testModule;
};

export const createRegisterHttpClient = (moduleArg?: ICoreModule) => {
  const module = moduleArg ?? createModule();
  module.registerHttpClient(TestHttpClient, {});
  return module;
};

export const createRegisterProvider = () => {
  const module = createRegisterHttpClient();
  module.registerProvider(TestProvider);
  return module;
};

export const createRegisterController = () => {
  const module = createRegisterProvider();
  module.registerController(TestController, {
    dependencies: [TestProvider],
  });
  return module;
};
