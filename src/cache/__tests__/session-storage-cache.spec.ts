import { SessionStorageCache } from "../session-storage-cache";
describe("Session Storage Cache", () => {
  it("should return null for not stored key", () => {
    const cache = new SessionStorageCache();

    const value = cache.get("wololo");

    expect(value).toBeNull();
  });

  it("should store value to session storage", () => {
    const cache = new SessionStorageCache();

    cache.set("oww", { id: 12 });

    const value = cache.get<{ id: number }>("oww");

    expect(value).toEqual({ id: 12 });
  });

  it("should remove value", () => {
    const cache = new SessionStorageCache();
    const key = "arrayy";

    cache.set(key, []);
    cache.remove(key);

    const value = cache.get(key);

    expect(value).toBeNull();
  });

  it("should clear cache", () => {
    const cache = new SessionStorageCache();

    cache.set("asd", "asd");
    cache.set("num", 1);

    cache.clear();

    const value = cache.get("asd");
    const value2 = cache.get("num");
    expect(value).toBeNull();
    expect(value2).toBeNull();
  });
});