import { IHTTPClient } from "../../http-client/index";
import { IController } from "../../controller/index";
import { IProvider } from "../../provider/index";
import { resolve } from "../decorators/resolve.decorators";
import {
  createRegisterApiAndUseResolve,
  createRegisterCache,
  createRegisterController,
  TestApi,
  TestCache,
  TestController,
  TestProvider,
} from "../__mocks__/module.mock";
import { ICache } from "../../cache";

describe("Resolve Decoratros", () => {
  it("should resolve api", () => {
    createRegisterApiAndUseResolve();

    class Test {
      @resolve.client()
      api!: IHTTPClient;
    }

    const test = new Test();

    expect(test.api).toBeInstanceOf(TestApi);
  });

  it("should resolve api with class", () => {
    const module = createRegisterApiAndUseResolve();

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
      @resolve.client(TestApi2)
      api!: IHTTPClient;
    }

    const test = new Test();

    expect(test.api).toBeInstanceOf(TestApi2);
  });

  it("should resolve provider", () => {
    const module = createRegisterApiAndUseResolve();
    module.registerProvider(TestProvider);

    class Test {
      @resolve.provider(TestProvider)
      provider!: IProvider;
    }

    const test = new Test();
    expect(test.provider).toBeInstanceOf(TestProvider);
  });

  it("should resolve provider with key", () => {
    const module = createRegisterApiAndUseResolve();
    module.registerProvider(TestProvider, { key: "test_prov" });

    class Test {
      @resolve.provider("test_prov")
      provider!: IProvider;
    }

    const test = new Test();
    expect(test.provider).toBeInstanceOf(TestProvider);
  });

  it("should resolve controller", () => {
    const module = createRegisterController();
    module.useDecorators(resolve);

    class Test {
      @resolve.controller(TestController)
      controller!: IController;
    }

    const test = new Test();
    expect(test.controller).toBeInstanceOf(TestController);
  });

  it("should resolve controller with key", () => {
    const module = createRegisterController();
    module.useDecorators(resolve);

    class Test {
      @resolve.controller("TestController")
      controller!: IController;
    }

    const test = new Test();
    expect(test.controller).toBeInstanceOf(TestController);
  });

  it("should resolve cache", () => {
    const module = createRegisterCache();
    module.useDecorators(resolve);

    class Test {
      @resolve.cache(TestCache)
      cache!: ICache;
    }

    const test = new Test();
    expect(test.cache).toBeInstanceOf(TestCache);
  });
});
