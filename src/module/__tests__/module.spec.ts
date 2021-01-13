import { createModule } from "../create-module/create-module";
import { IHTTPClient } from "../../http-client/types/http-client.interface";
import { IHTTPClientOptions } from "../../http-client/types/http-client-options.interface";
import {
  createRegisterApi,
  createRegisterController,
  TestApi,
  TestCache,
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
      const api = module.resolveHttpClient();

      expect(api).toBeInstanceOf(TestApi);
    });

    it("should resolve correct api", () => {
      const module = createRegisterApi();

      class TestApi2 implements IHTTPClient {
        constructor(options: IHTTPClientOptions) {}
        async get(url: string) {
          return null as any;
        }
        async post(url: string) {
          return null as any;
        }
        async upload(url: string, formData: FormData) {
          return null as any;
        }
      setHeader(key:string){}

      }

      module.registerHttpClient(TestApi2, {});

      const api = module.resolveHttpClient(TestApi);

      expect(api).toBeInstanceOf(TestApi);
    });

    it("should clear all registered types", () => {
      const module = createRegisterController();
      module.registerCache(TestCache);
      module.clear();

      const api = module.resolveHttpClient();
      const provider = module.resolveProvider(TestProvider);
      const controller = module.resolveController(TestController);
      const cache = module.resolveCache(TestCache);

      expect(api).toBeUndefined();
      expect(provider).toBeUndefined();
      expect(controller).toBeUndefined();
      expect(cache).toBeUndefined();
    });
  });

  describe("Cache", () => {
    it("should return undefined at resolve when not registered", () => {
      const module = createModule();
      const cache = module.resolveCache("TestCache");

      expect(cache).toBeUndefined();
    });

    it("should register cache", () => {
      const module = createModule();
      module.registerCache(TestCache);

      const cache = module.resolveCache(TestCache);

      expect(cache).toBeInstanceOf(TestCache);
    });

    it("should register cache by key", () => {
      const module = createModule();
      module.registerCache(TestCache, "Tooty");

      const cache = module.resolveCache("Tooty");

      expect(cache).toBeInstanceOf(TestCache);
    });
  });
});
