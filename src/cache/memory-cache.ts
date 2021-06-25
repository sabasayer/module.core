import type { ICache } from "./cache.interface";

export class MemoryCache implements ICache {
  private store = new Map<string, any>();

  set<T>(key: string, value: T): void {
    this.store.set(key, value);
  }

  get(key: string) {
    return this.store.get(key) ?? null;
  }

  remove(key: string): void {
    this.store.delete(key);
  }

  clear() {
    this.store.clear();
  }
}
