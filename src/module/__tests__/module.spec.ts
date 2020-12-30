import { createModule } from "../create-module/create-module";
import { IHTTPClient } from "../../api/http-client.interface";
import { IHTTPClientOptions } from "../../api/api-options.interface";
import {
  createRegisterApi,
  createRegisterController,
  TestApi,
  TestController,
  TestProvider,
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

      class TestApi2 implements IHTTPClient {
        constructor(options: IHTTPClientOptions) {}
        async get(url: string) {return null as any}
        async post(url: string) {return null as any}
      }

      module.registerApi(TestApi2, {});

      const api = module.resolveApi(TestApi);

      expect(api).toBeInstanceOf(TestApi);
    });

    it("should clear all registered types", () => {
      const module = createRegisterController();
      module.clear();

      const api = module.resolveApi();
      const provider = module.resolveProvider(TestProvider);
      const controller = module.resolveController(TestController);

      expect(api).toBeUndefined();
      expect(provider).toBeUndefined();
      expect(controller).toBeUndefined();
    });
  });
});
