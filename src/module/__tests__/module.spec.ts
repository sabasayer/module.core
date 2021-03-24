import { IHTTPClient } from "../../http-client/types/http-client.interface";
import { IHTTPClientOptions } from "../../http-client/types/http-client-options.interface";
import {
  createRegisterHttpClient,
  createRegisterProvider,
  createRegisterController,
  TestHttpClient,
  TestCache,
  TestController,
  TestProvider,
  createModule,
  TestModule,
} from "../__mocks__/module.mock";
import { globalModule } from "@/global-module/global-module";

describe("Module", () => {
  beforeEach(() => {
    globalModule.clear();
  });

  it("should register on constructor", () => {
    const module = createModule();

    const resolved = globalModule.getModule(TestModule);
    expect(resolved).toEqual(module);
  });

  describe("bootstrap method", () => {
    it("should register httpClient", () => {
      const module = createModule();
      const client = new TestHttpClient({ baseUrl: "test" });

      module.bootstrap({ httpClient: client });

      const resolvedClient = module.resolveHttpClient();

      expect(resolvedClient).toBeInstanceOf(TestHttpClient);
    });
  });

  describe("Http Client Algorithm", () => {
    it("should set http-client implementation", () => {
      const module = createModule();
      const client = new TestHttpClient({ baseUrl: "test.com" });

      module.registerHttpClientImplementation(client);

      const resolvedClient = module.resolveHttpClient(TestHttpClient);

      expect(resolvedClient).toEqual(client);
    });

    it("should resolve Http Client", () => {
      const module = createRegisterHttpClient();
      const api = module.resolveHttpClient();

      expect(api).toBeInstanceOf(TestHttpClient);
    });

    it("should resolve correct HttpClient", () => {
      const module = createRegisterHttpClient();

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
        removeHeader(key: string) {}
        setHeader(key: string) {}
      }

      module.registerHttpClient(TestApi2, {});

      const api = module.resolveHttpClient(TestHttpClient);

      expect(api).toBeInstanceOf(TestHttpClient);
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

  describe("Resolve Method", () => {
    it("should resolce HttpClient", () => {
      const module = createModule();
      module.registerHttpClient(TestHttpClient, { baseUrl: "test" });

      const client = module.resolve(TestHttpClient);
      expect(client).toBeInstanceOf(TestHttpClient);
    });

    it("should resolve Cache", () => {
      const module = createModule();
      module.registerCache(TestCache);

      const cache = module.resolve(TestCache);

      expect(cache).toBeInstanceOf(TestCache);
    });

    it("should resolve Provider", () => {
      const module = createRegisterHttpClient();

      module.registerProvider(TestProvider);

      const provider = module.resolve(TestProvider);

      expect(provider).toBeInstanceOf(TestProvider);
    });

    it("should resolve Controller", () => {
      const module = createRegisterProvider();

      module.registerController(TestController, { provider: TestProvider });

      const controller = module.resolve(TestController);

      expect(controller).toBeInstanceOf(TestController);
    });

    it("should resolve any simple class instance", () => {
      const module = createModule();

      class TestClass {}

      module.register(TestClass);
      const resolved = module.resolve(TestClass);
      expect(resolved).toBeInstanceOf(TestClass);
    });

    it("should resolve any simple class instance by key", () => {
      const module = createModule();

      class TestClass {}

      module.register(TestClass);
      const resolved = module.resolve("TestClass");
      expect(resolved).toBeInstanceOf(TestClass);
    });
  });
});
