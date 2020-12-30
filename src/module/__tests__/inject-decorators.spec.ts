import { IHTTPClientOptions } from "@/api/api-options.interface";
import { IHTTPClient } from "@/api/http-client.interface";
import { IController } from "@/controller/controller.interface";
import { IProvider } from "@/provider/provider.interface";
import { inject } from "../decorators/inject.decorators";
import {
  createAndUseInject,
  createRegisterApiAndProvider,
  TestApi,
  TestProvider,
} from "../__mocks__/module.mock";

describe("Inject Decorators", () => {
  it("should register api  with decorator", () => {
    const module = createAndUseInject();

    @inject.api({})
    class TestApi implements IHTTPClient {
      constructor(options: IHTTPClientOptions) {}
      async get(url: string) {
        return null as any;
      }
      async post(url: string) {
        return null as any;
      }
    }

    const api = module.resolveApi();

    expect(api).toBeInstanceOf(TestApi);
  });

  it("should register provider with decorator", () => {
    const module = createAndUseInject();
    module.registerApi(TestApi, {});

    @inject.provider()
    class TestProvider implements IProvider {
      constructor(api: IHTTPClient) {}
    }

    const provider = module.resolveProvider(TestProvider);
    expect(provider).toBeInstanceOf(TestProvider);
  });

  it("should register provider with options", () => {
    const module = createAndUseInject();
    module.registerApi(TestApi, {});

    @inject.provider({ key: "test_p", prefferedApi: TestApi })
    class TestProvider implements IProvider {
      constructor(api: IHTTPClient) {}
    }

    const provider = module.resolveProvider("test_p");
    expect(provider).toBeInstanceOf(TestProvider);
  });

  it("should register controller with decorator", () => {
    const module = createRegisterApiAndProvider();
    module.useDecorators(inject);

    @inject.controller({ provider: TestProvider })
    class TestController implements IController {
      constructor(provider: IProvider) {}
    }

    const controller = module.resolveController(TestController);

    expect(controller).toBeInstanceOf(TestController);
  });
});
