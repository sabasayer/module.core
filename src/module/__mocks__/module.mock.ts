import { IHTTPClientOptions } from "../../http-client/types/http-client-options.interface";
import { IHTTPClient } from "../../http-client/types/http-client.interface";
import { IController } from "../../controller/controller.interface";
import { IProvider } from "../../provider/types/provider.interface";
import { CoreModule, ICoreModule } from "../index";
import { ICache } from "../../cache";
import { IRequestConfig } from "../../provider/types/request-config.interface";

export class TestModule extends CoreModule {}

export class TestHttpClient implements IHTTPClient {
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
  removeHeader(key: string) {}
}

export class TestProvider implements IProvider {
  constructor(api: IHTTPClient) {}

  post<TRequest = undefined, TResponse = undefined>(
    config: IRequestConfig<TRequest, TResponse>
  ): Promise<TResponse | undefined> {
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
  constructor(provider?: IProvider) {}
}

export class TestCache implements ICache {
  get<T>(key: string) {
    return null as any;
  }

  set(key: string, value: any) {}

  remove(key: string) {}

  clear() {}
}

export const createModule = () => {
  return new TestModule();
};

export const createRegisterCache = () => {
  const module = createModule();
  module.registerCache(TestCache);
  return module;
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
    provider: TestProvider,
  });
  return module;
};
