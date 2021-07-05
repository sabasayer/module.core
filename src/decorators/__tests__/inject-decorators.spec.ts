import type { IHTTPClient } from "../../http-client/types/http-client.interface";
import type { IController } from "../../controller/controller.interface";
import type { IProvider } from "../../provider/types/provider.interface";
import {
  createModule,
  createRegisterProvider,
  TestHttpClient,
  TestProvider,
} from "../../module/__mocks__/module.mock";
import type { ICache } from "../../cache";
import { InjectableDecorators } from "..";

describe("Inject Decorators", () => {
  const injectable = new InjectableDecorators();

  const createAndUseInject = () => {
    const module = createModule();
    module.useDecorators(injectable);
    return module;
  };

  it("should register api  with decorator", () => {
    const module = createAndUseInject();

    @injectable.client({})
    class TestApi implements IHTTPClient {
      constructor() {}
      async get() {
        return null as any;
      }
      async post() {
        return null as any;
      }
      async upload() {
        return null as any;
      }
      setHeader() {}
      removeHeader() {}
    }

    const api = module.resolveHttpClient();

    expect(api).toBeInstanceOf(TestApi);
  });

  it("should register provider with decorator", () => {
    const module = createAndUseInject();
    module.registerHttpClient(TestHttpClient, {});

    @injectable.provider()
    class TestProvider implements IProvider {
      constructor() {}
      async get() {
        return null as any;
      }
      async post() {
        return null as any;
      }
      async upload() {
        return null as any;
      }
    }

    const provider = module.resolveProvider(TestProvider);
    expect(provider).toBeInstanceOf(TestProvider);
  });

  it("should register provider with options", () => {
    const module = createAndUseInject();
    module.registerHttpClient(TestHttpClient, {});

    @injectable.provider({ key: "test_p", client: TestHttpClient })
    class TestProvider implements IProvider {
      constructor() {}
      async get() {
        return null as any;
      }
      async post() {
        return null as any;
      }
      async upload() {
        return null as any;
      }
    }

    const provider = module.resolveProvider("test_p");
    expect(provider).toBeInstanceOf(TestProvider);
  });

  it("should register controller with decorator", () => {
    const module = createRegisterProvider();
    module.useDecorators(injectable);

    @injectable.controller({ provider: TestProvider })
    class TestController implements IController {
      constructor() {}
    }

    const controller = module.resolveController(TestController);

    expect(controller).toBeInstanceOf(TestController);
  });

  it("should register cache with decorator", () => {
    const module = createModule();
    module.useDecorators(injectable);

    @injectable.cache()
    class TestCache implements ICache {
      get() {
        return null as any;
      }

      set() {}

      remove() {}

      clear() {}
    }

    const cache = module.resolveCache(TestCache);

    expect(cache).toBeInstanceOf(TestCache);
  });

  it("should register any other class with decorator", () => {
    const module = createModule();

    @injectable.other()
    class Test {}

    const resolved = module.resolve(Test);
    expect(resolved).toBeInstanceOf(Test);
  });
});
