import { IHTTPClient } from "../../http-client/index";
import { IController } from "../../controller/index";
import { IProvider } from "../../provider/index";
import { ResolveDecorators } from "../resolve.decorators";
import {
  createRegisterCache,
  createRegisterController,
  TestHttpClient,
  TestCache,
  TestController,
  TestProvider,
  createRegisterHttpClient,
  createModule,
} from "../../module/__mocks__/module.mock";
import { ICache } from "../../cache";

describe("Resolve Decoratros", () => {
  const resolver = new ResolveDecorators();

  const createAndUseResolve = () => {
    const module = createModule();
    module.useDecorators(resolver);
    return module;
  };

  const createClientAndUseResolve = () => {
    const module = createAndUseResolve();
    return createRegisterHttpClient(module);
  };

  it("should resolve api", () => {
    createClientAndUseResolve();

    class Test {
      @resolver.client()
      api!: IHTTPClient;
    }

    const test = new Test();

    expect(test.api).toBeInstanceOf(TestHttpClient);
  });

  it("should resolve api with class", () => {
    const module = createClientAndUseResolve();

    class TestApi2 implements IHTTPClient {
      async get(url: string) {
        return null as any;
      }
      async post(url: string) {
        return null as any;
      }
      async upload(url: string, formData: FormData) {
        return null as any;
      }

      removeHeader(key: string) {}
      setHeader(key: string) {}
    }

    module.registerHttpClient(TestApi2, {});

    class Test {
      @resolver.client(TestApi2)
      api!: IHTTPClient;
    }

    const test = new Test();

    expect(test.api).toBeInstanceOf(TestApi2);
  });

  it("should resolve provider", () => {
    const module = createClientAndUseResolve();
    module.registerProvider(TestProvider);

    class Test {
      @resolver.provider(TestProvider)
      provider!: IProvider;
    }

    const test = new Test();
    expect(test.provider).toBeInstanceOf(TestProvider);
  });

  it("should resolve provider with key", () => {
    const module = createClientAndUseResolve();
    module.registerProvider(TestProvider, { key: "test_prov" });

    class Test {
      @resolver.provider("test_prov")
      provider!: IProvider;
    }

    const test = new Test();
    expect(test.provider).toBeInstanceOf(TestProvider);
  });

  it("should resolve controller", () => {
    const module = createRegisterController();
    module.useDecorators(resolver);

    class Test {
      @resolver.controller(TestController)
      controller!: IController;
    }

    const test = new Test();
    expect(test.controller).toBeInstanceOf(TestController);
  });

  it("should resolve controller with key", () => {
    const module = createRegisterController();
    module.useDecorators(resolver);

    class Test {
      @resolver.controller("TestController")
      controller!: IController;
    }

    const test = new Test();
    expect(test.controller).toBeInstanceOf(TestController);
  });

  it("should resolve cache", () => {
    const module = createRegisterCache();
    module.useDecorators(resolver);

    class Test {
      @resolver.cache(TestCache)
      cache!: ICache;
    }

    const test = new Test();
    expect(test.cache).toBeInstanceOf(TestCache);
  });

  it("should resolve provider with resolve method", () => {
    const module = createClientAndUseResolve();
    module.registerProvider(TestProvider);

    class Test {
      @resolver.resolve(TestProvider)
      provider!: IProvider;
    }

    const test = new Test();
    expect(test.provider).toBeInstanceOf(TestProvider);
  });
});
