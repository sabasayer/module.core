import type { IHTTPClient } from "../../http-client/types/http-client.interface";
import type { IController } from "../../controller/controller.interface";
import type { IProvider } from "../../provider/types/provider.interface";
import {
  createModule,
  createRegisterProvider,
  TestHttpClient,
  TestProvider,
} from "../../module/__mocks__/module.mock";
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

  it("should register provider with options and dependencies", () => {
    const module = createAndUseInject();
    module.registerHttpClient(TestHttpClient, {});

    class Test {}
    module.register(Test);

    @injectable.provider({ key: "test_p", client: TestHttpClient })
    class TestProvider implements IProvider {
      test: Test;
      client: IHTTPClient;
      constructor(client: IHTTPClient, test: Test) {
        this.test = test;
        this.client = client;
      }
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

    const provider = module.resolveProvider<TestProvider>("test_p");
    expect(provider).toBeInstanceOf(TestProvider);
    expect(provider?.client).toBeInstanceOf(TestHttpClient);
    expect(provider?.test).toBeInstanceOf(Test);
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

  it("should register controller with dependencies", () => {
    const module = createRegisterProvider();
    module.useDecorators(injectable);

    class Test {}
    module.register(Test);

    @injectable.controller({ provider: TestProvider })
    class TestController implements IController {
      provider?: IProvider;
      test?: Test;
      constructor(provider?: TestProvider, test?: Test) {
        this.provider = provider;
        this.test = test;
      }
    }

    const controller = module.resolveController(TestController);

    expect(controller?.provider).toBeInstanceOf(TestProvider);
    expect(controller?.test).toBeInstanceOf(Test);
  });

  it("should register any other class with decorator", () => {
    const module = createAndUseInject();

    @injectable.other()
    class Test {}

    const resolved = module.resolve(Test);
    expect(resolved).toBeInstanceOf(Test);
  });

  it("should register any other class with dependencies injected", () => {
    const module = createAndUseInject();

    @injectable.other()
    class DepClass {}

    @injectable.other()
    class Test {
      dep: DepClass;
      constructor(dep: DepClass) {
        this.dep = dep;
      }
    }

    const resolved = module.resolve(Test);
    expect(resolved?.dep).toBeInstanceOf(DepClass);
  });
});
