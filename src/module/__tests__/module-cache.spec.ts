import { createModule } from "../create-module/create-module";
import { TestCache } from "../__mocks__/module.mock";

describe("Module Cache Methods", () => {
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
