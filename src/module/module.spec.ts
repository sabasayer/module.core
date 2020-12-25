import { createModule } from "./create-module/create-module";
import { IApi } from "../api/api.interface";
import { IApiOptions } from "../api/api-options.interface";
import { IProvider } from "../provider/provider.interface";

describe("Module", () => {
  it("should create module", () => {
    const module = createModule();

    expect(module).toBeDefined();
  });

  describe("Api Algorithm", () => {
    it("should resolve api", () => {
      const module = createModule();

      class TestApi implements IApi {
        constructor(options: IApiOptions) {}
      }

      module.registerApi(TestApi, {});

      const api = module.resolveApi();

      expect(api instanceof TestApi).toBe(true);
    });

    it("should resolve correct api", () => {
      const module = createModule();

      class TestApi implements IApi {
        constructor(options: IApiOptions) {}
      }

      class TestApi2 implements IApi {
        constructor(options: IApiOptions) {}
      }

      module.registerApi(TestApi, {});
      module.registerApi(TestApi2, {});

      const api = module.resolveApi(TestApi);

      expect(api instanceof TestApi).toBe(true);
    });
  });

  describe("Provider Algorithm", () => {
    class TestApi implements IApi {
      constructor(options: IApiOptions) {}
    }

    class TestProvider implements IProvider {
      constructor(api: IApi) {}
    }

    const createRegisterApiAndProvider = () => {
      const module = createModule();
      module.registerApi(TestApi, {});
      module.registerProvider("TestProvider", TestProvider);
      return module;
    };

    it("should throw error if api is not registered", () => {
      const module = createModule();

      expect(() =>
        module.registerProvider("TestProvider", TestProvider)
      ).toThrowError("Api is not registered.");
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
      const module = createModule();
      module.registerApi(TestApi, {});
      module.registerProvider(TestProvider);

      const provider = module.resolveProvider(TestProvider);

      expect(provider instanceof TestProvider).toBe(true);
    });
  });
});
