import type { IHTTPClient } from "../../http-client/types/http-client.interface";
import {
  createRegisterHttpClient,
  createRegisterProvider,
  createRegisterController,
  TestHttpClient,
  TestController,
  TestProvider,
  createModule,
  TestModule,
} from "../__mocks__/module.mock";
import { globalModule } from "@/global-module/global-module";
import { defaultLocalization, EnumLocalizationKeys } from "@/localization";

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

    it("should set translations", () => {
      globalModule.setLocalization(defaultLocalization);
      const client = new TestHttpClient({ baseUrl: "test" });

      const module = createModule();
      module.bootstrap({
        httpClient: client,
        translations: {
          tr: { test: "test" },
        },
      });

      defaultLocalization.setLang("tr");
      const res = defaultLocalization.translate("test");
      expect(res).toBe("test");
    });
  });

  describe("Http Client Algorithm", () => {
    it("should set http-client implementation", () => {
      const module = createModule();
      const client = new TestHttpClient({ baseUrl: "test.com" });

      module.registerHttpClientInstance(client);

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
        removeHeader() {}
        setHeader() {}
      }

      module.registerHttpClient(TestApi2, {});

      const api = module.resolveHttpClient(TestHttpClient);

      expect(api).toBeInstanceOf(TestHttpClient);
    });

    it("should clear all registered types", () => {
      const module = createRegisterController();

      class Test {}

      module.register(Test);
      module.clear();

      expect(() => module.resolveHttpClient()).toThrow();
      expect(() => module.resolveProvider(TestProvider)).toThrow();
      expect(() => module.resolveController(TestController)).toThrow();
      expect(() => module.resolve(Test)).toThrow();
    });
  });

  describe("Resolve Method", () => {
    it("should resolce HttpClient", () => {
      const module = createModule();
      module.registerHttpClient(TestHttpClient, { baseUrl: "test" });

      const client = module.resolve(TestHttpClient);
      expect(client).toBeInstanceOf(TestHttpClient);
    });

    it("should resolve Provider", () => {
      const module = createRegisterHttpClient();

      module.registerProvider(TestProvider);

      const provider = module.resolve(TestProvider);

      expect(provider).toBeInstanceOf(TestProvider);
    });

    it("should resolve Provider with dependencies", () => {
      const module = createRegisterHttpClient();

      class Test {
        constructor() {}
      }
      module.register(Test);
      module.registerProvider(TestProvider, { dependencies: [Test] });

      const provider = module.resolve(TestProvider);
      expect(provider?.args?.[0]).toBeInstanceOf(Test);
    });

    it("should resolve Controller", () => {
      const module = createRegisterProvider();

      module.registerController(TestController, {
        dependencies: [TestProvider],
      });

      const controller = module.resolve(TestController);

      expect(controller).toBeInstanceOf(TestController);
    });

    it("should resolve Controller with dependencies", () => {
      const module = createRegisterProvider();

      class Test {
        constructor() {}
      }

      module.register(Test);

      module.registerController(TestController, {
        dependencies: [TestProvider, Test],
      });
      const controller = module.resolve(TestController);

      expect(controller?.args?.[0]).toBeInstanceOf(Test);
    });

    it("should resolve any simple class instance", () => {
      const module = createModule();

      class TestClass {}

      module.register(TestClass);
      const resolved = module.resolve(TestClass);
      expect(resolved).toBeInstanceOf(TestClass);
    });

    it("should register and resolve class instance", () => {
      const module = createModule();

      class TestClass {}
      const instance = new TestClass();
      module.registerInstance(instance);

      const resolved = module.resolve(TestClass);
      expect(resolved).toEqual(instance);
    });

    it("should resolve any simple class instance by key", () => {
      const module = createModule();

      class TestClass {}

      module.register(TestClass);
      const resolved = module.resolve("TestClass");
      expect(resolved).toBeInstanceOf(TestClass);
    });

    it("should resolve any simple class with dependencies at constructor", () => {
      const module = createModule();

      class DepClass {}
      class TestClass {
        dep: DepClass;
        constructor(dep: DepClass) {
          this.dep = dep;
        }
      }

      module.register(DepClass);
      module.register(TestClass, { dependencies: [DepClass] });

      const resolved = module.resolve(TestClass);
      expect(resolved?.dep).toBeInstanceOf(DepClass);
    });

    it("should resolve any simple class with dependency strings at constructor", () => {
      const module = createModule();

      class DepClass {}
      class TestClass {
        dep: DepClass;
        constructor(dep: DepClass) {
          this.dep = dep;
        }
      }

      module.register(DepClass);
      module.register(TestClass, { dependencies: ["DepClass"] });

      const resolved = module.resolve(TestClass);
      expect(resolved?.dep).toBeInstanceOf(DepClass);
    });

    it("should throw error if cannot resolve because not registered", async () => {
      const module = createModule();
      defaultLocalization.setLang("en-us");
      defaultLocalization.setTranslations({
        "en-us": {
          [EnumLocalizationKeys.NotRegisteredError]: "error %s",
        },
      });
      globalModule.setLocalization(defaultLocalization);

      expect(() => module.resolve("test")).toThrowError("error test");
    });
  });
});
