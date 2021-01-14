import { MemoryCache } from "./memory-cache";
import { SessionStorageCache } from "./session-storage-cache";
import { ICache, ICacheConstructor } from "./cache.interface";

export type { ICache, ICacheConstructor };
export { MemoryCache, SessionStorageCache };
