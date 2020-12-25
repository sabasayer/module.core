import { createModule } from "../create-module/create-module";
import { IApi } from "../../api/api.interface";
import { IApiOptions } from "../../api/api-options.interface";
import { IProvider } from "../../provider/provider.interface";
import {
  createModuleAndRegisterTestApi,
  createRegisterApiAndProvider,
  TestProvider,
} from "../__mocks__/module.mock";

describe("Module Provider", () => {
  it("should throw error if api is not registered", () => {
    const module = createModule();

    expect(() => module.registerProvider(TestProvider)).toThrowError(
      "Api is not registered."
    );
  });

  it("should resolve provider with key", () => {
    const module = createRegisterApiAndProvider();
    const provider = module.resolveProvider<TestProvider>("TestProvider");

    expect(provider instanceof TestProvider).toBe(true);
  });

  it("should resolve provider with class", () => {
    const module = createRegisterApiAndProvider();
    const provider = module.resolveProvider(TestProvider);

    expect(provider instanceof TestProvider).toBe(true);
  });

  it("should register provider with class", () => {
    const module = createModuleAndRegisterTestApi();
    module.registerProvider(TestProvider);

    const provider = module.resolveProvider(TestProvider);

    expect(provider instanceof TestProvider).toBe(true);
  });

  it("should register provider with key", () => {
    const module = createModuleAndRegisterTestApi();
    module.registerProvider(TestProvider, { key: "test_provider" });

    const provider = module.resolveProvider("test_provider");

    expect(provider instanceof TestProvider).toBe(true);
  });

  it("should register provider with preffered Api", () => {
    const module = createModuleAndRegisterTestApi();
    let isInstanceOfTestApi2 = false;

    class TestApi2 implements IApi {
      constructor(options: IApiOptions) {}
    }

    class TestProvider2 implements IProvider {
      constructor(api: IApi) {
        isInstanceOfTestApi2 = api instanceof TestApi2;
      }
    }

    module.registerApi(TestApi2, {});

    module.registerProvider(TestProvider2, { prefferedApi: TestApi2 });

    expect(isInstanceOfTestApi2).toBe(true);
  });
});
