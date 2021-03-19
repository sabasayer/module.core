import { globalModule } from "@/global-module/global-module";
import { IEncyrptionUtil } from "@/utils/types/encryption-util.interface";
import { SessionStorageCache } from "../session-storage-cache";

describe("Session Storage Cache", () => {
  beforeEach(() => {
    globalModule.clear();
  });

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

  it("should run registered ecryption algorithm", () => {
    class TestEncryption implements IEncyrptionUtil {
      encrypt(value: string) {
        return value
          .split("")
          .map((e) => String.fromCharCode(e.charCodeAt(0) + 1))
          .join("");
      }

      decrypt(value: string) {
        return value
          .split("")
          .map((e) => String.fromCharCode(e.charCodeAt(0) - 1))
          .join("");
      }
    }

    const encryption = new TestEncryption();
    const cache = new SessionStorageCache();

    globalModule.setEncryptionUtil(encryption);

    const key = "test";
    const value = "ali";

    cache.set(key, value);

    const stored = sessionStorage.getItem(key);

    const result = cache.get(key);

    expect(stored).toBe("#bmj#");
    expect(result).toBe(value);
  });
});
