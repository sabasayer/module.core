import { IApiOptions } from "@/api/api-options.interface";
import { IApi } from "@/api/api.interface";
import { IController } from "@/controller/controller.interface";
import { IProvider } from "@/provider/provider.interface";
import { coreDecorators } from "../decorators/core-module.decorators";
import {
  createAndUseDecorators,
  createRegisterApiAndProvider,
  TestApi,
  TestProvider,
} from "../__mocks__/module.mock";

describe("Module Decorators", () => {
  it("should register api  with decorator", () => {
    const module = createAndUseDecorators();

    @coreDecorators.api({})
    class TestApi implements IApi {
      constructor(options: IApiOptions) {}
    }

    const api = module.resolveApi();

    expect(api instanceof TestApi).toBe(true);
  });

  it("should register provider with decorator", () => {
    const module = createAndUseDecorators();
    module.registerApi(TestApi, {});

    @coreDecorators.provider()
    class TestProvider implements IProvider {
      constructor(api: IApiOptions) {}
    }

    const provider = module.resolveProvider(TestProvider);
    expect(provider instanceof TestProvider).toBe(true);
  });

  it("should register provider with options", () => {
    const module = createAndUseDecorators();
    module.registerApi(TestApi, {});

    @coreDecorators.provider({ key: "test_p", prefferedApi: TestApi })
    class TestProvider implements IProvider {
      constructor(api: IApiOptions) {}
    }

    const provider = module.resolveProvider("test_p");
    expect(provider instanceof TestProvider).toBe(true);
  });

  it("should register controller with decorator", () => {
    const module = createRegisterApiAndProvider();
    module.useDecorators(coreDecorators);

    @coreDecorators.controller({ provider: TestProvider })
    class TestController implements IController {
      constructor(provider: IProvider) {}
    }

    const controller = module.resolveController(TestController);

    expect(controller instanceof TestController).toBe(true);
  });
});
