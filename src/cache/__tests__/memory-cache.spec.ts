import { MemoryCache } from "../memory-cache";

describe("Cache", () => {
  it("should return null for not stored key", () => {
    const cache = new MemoryCache();

    const value = cache.get("test");

    expect(value).toBe(null);
  });

  it("should return value", () => {
    const cache = new MemoryCache();

    cache.set("test", "testValue");

    const value = cache.get("test");

    expect(value).toBe("testValue");
  });

  it("should remove value", () => {
    const cache = new MemoryCache();
    cache.set("test", "testAsd");
    cache.remove("test");

    const value = cache.get("test");

    expect(value).toBe(null);
  });

  it("should clear all cache", () => {
    const cache = new MemoryCache();
    cache.set("1", "1");
    cache.set("2", 2);

    cache.clear();

    const value1 = cache.get("1");
    const value2 = cache.get("2");

    expect(value1).toBe(null);
    expect(value2).toBe(null);
  });
});
