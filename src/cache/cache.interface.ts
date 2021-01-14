export type ICacheConstructor = new () => ICache;

export type ICache = {
  set<T>(key: string, value: T): void;
  get<T>(key: string): T | null;
  remove(key: string): void;
  clear(): void;
};
