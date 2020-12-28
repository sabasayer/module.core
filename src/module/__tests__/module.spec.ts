import { createModule } from "../create-module/create-module";
import { IApi } from "../../api/api.interface";
import { IApiOptions } from "../../api/api-options.interface";
import {
  createRegisterApi,
  createRegisterController,
  TestApi,
  TestController,
  TestProvider
} from "../__mocks__/module.mock";

describe("Module", () => {
  it("should create module", () => {
    const module = createModule();

    expect(module).toBeDefined();
  });

  describe("Api Algorithm", () => {
    it("should resolve api", () => {
      const module = createRegisterApi();
      const api = module.resolveApi();

      expect(api).toBeInstanceOf(TestApi);
    });

    it("should resolve correct api", () => {
      const module = createRegisterApi();

      class TestApi2 implements IApi {
        constructor(options: IApiOptions) {}
      }

      module.registerApi(TestApi2, {});

      const api = module.resolveApi(TestApi);

      expect(api).toBeInstanceOf(TestApi);
    });

    it("should clear all registered types",() => {
      const module = createRegisterController();
      module.clear();

      const api = module.resolveApi();
      const provider = module.resolveProvider(TestProvider);
      const controller = module.resolveController(TestController);

      expect(api).toBeUndefined();
      expect(provider).toBeUndefined();
      expect(controller).toBeUndefined();
    })
  });
});
