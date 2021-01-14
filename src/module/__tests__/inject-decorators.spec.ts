import { IHTTPClientOptions } from "../../http-client/types/http-client-options.interface";
import { IHTTPClient } from "../../http-client/types/http-client.interface";
import { IController } from "../../controller/controller.interface";
import { IProvider } from "../../provider/types/provider.interface";
import { injectable } from "../decorators/inject.decorators";
import {
  createAndUseInject,
  createRegisterApiAndProvider,
  TestApi,
  TestProvider,
} from "../__mocks__/module.mock";
import { createModule } from "../create-module/create-module";
import { ICache } from "../../cache";
import { IRequestConfig } from "@/provider/types/request-config.interface";

describe("Inject Decorators", () => {
  it("should register api  with decorator", () => {
    const module = createAndUseInject();

    @injectable.client({})
    class TestApi implements IHTTPClient {
      constructor(options: IHTTPClientOptions) {}
      async get(url: string) {
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

    const api = module.resolveHttpClient();

    expect(api).toBeInstanceOf(TestApi);
  });

  it("should register provider with decorator", () => {
    const module = createAndUseInject();
    module.registerHttpClient(TestApi, {});

    @injectable.provider()
    class TestProvider implements IProvider {
      constructor(api: IHTTPClient) {}
      async get(url: string) {
        return null as any;
      }
      async post(config:IRequestConfig) {
        return null as any;
      }
      async upload(url: string, formData: FormData) {
        return null as any;
      }
    }

    const provider = module.resolveProvider(TestProvider);
    expect(provider).toBeInstanceOf(TestProvider);
  });

  it("should register provider with options", () => {
    const module = createAndUseInject();
    module.registerHttpClient(TestApi, {});

    @injectable.provider({ key: "test_p", client: TestApi })
    class TestProvider implements IProvider {
      constructor(api: IHTTPClient) {}
      async get(url: string) {
        return null as any;
      }
      async post(config:IRequestConfig) {
        return null as any;
      }
      async upload(url: string, formData: FormData) {
        return null as any;
      }
    }

    const provider = module.resolveProvider("test_p");
    expect(provider).toBeInstanceOf(TestProvider);
  });

  it("should register controller with decorator", () => {
    const module = createRegisterApiAndProvider();
    module.useDecorators(injectable);

    @injectable.controller({ provider: TestProvider })
    class TestController implements IController {
      constructor(provider: IProvider) {}
    }

    const controller = module.resolveController(TestController);

    expect(controller).toBeInstanceOf(TestController);
  });

  it("should register cache with decorator", () => {
    const module = createModule();
    module.useDecorators(injectable);

    @injectable.cache()
    class TestCache implements ICache {
      get<T>(key: string) {
        return null as any;
      }

      set(key: string, value: any) {}

      remove(key: string) {}

      clear() {}
    }

    const cache = module.resolveCache(TestCache);

    expect(cache).toBeInstanceOf(TestCache);
  });
});
