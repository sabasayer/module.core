import { createModule } from "../create-module/create-module";
import { IHTTPClient } from "../../http-client/types/http-client.interface";
import { IHTTPClientOptions } from "../../http-client/types/http-client-options.interface";
import { IProvider } from "../../provider/provider.interface";
import {
  createRegisterApi,
  createRegisterApiAndProvider,
  TestProvider,
} from "../__mocks__/module.mock";

describe("Module Provider", () => {
  it("should throw error if api is not registered", () => {
    const module = createModule();

    expect(() => module.registerProvider(TestProvider)).toThrowError(
      "Http-Client is not registered."
    );
  });

  it("should resolve provider with key", () => {
    const module = createRegisterApiAndProvider();
    const provider = module.resolveProvider<TestProvider>("TestProvider");

    expect(provider).toBeInstanceOf(TestProvider);
  });

  it("should resolve provider with class", () => {
    const module = createRegisterApiAndProvider();
    const provider = module.resolveProvider(TestProvider);

    expect(provider).toBeInstanceOf(TestProvider);
  });

  it("should register provider with class", () => {
    const module = createRegisterApi();
    module.registerProvider(TestProvider);

    const provider = module.resolveProvider(TestProvider);

    expect(provider).toBeInstanceOf(TestProvider);
  });

  it("should register provider with key", () => {
    const module = createRegisterApi();
    module.registerProvider(TestProvider, { key: "test_provider" });

    const provider = module.resolveProvider("test_provider");

    expect(provider).toBeInstanceOf(TestProvider);
  });

  it("should register provider with preffered Api", () => {
    const module = createRegisterApi();
    let isInstanceOfTestApi2 = false;

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

    class TestProvider2 implements IProvider {
      constructor(api: IHTTPClient) {
        isInstanceOfTestApi2 = api instanceof TestApi2;
      }
      async get(url: string) {
        return null as any;
      }
      async post(url: string) {
        return null as any;
      }
      async upload(url: string, formData: FormData) {
        return null as any;
      }
    }

    module.registerHttpClient(TestApi2, {});

    module.registerProvider(TestProvider2, { client: TestApi2 });

    expect(isInstanceOfTestApi2).toBe(true);
  });
});
