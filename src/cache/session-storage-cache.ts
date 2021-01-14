import { SessionStorageUtil } from "@sabasayer/utils";
import { ICache } from ".";

export class SessionStorageCache implements ICache {
  set<T>(key: string, value: T) {
    const stringValue = JSON.stringify(value);
    SessionStorageUtil.setItem(key, stringValue);
  }

  get<T>(key: string) {
    const value = SessionStorageUtil.getItem(key);
    if (!value) return null;
    return JSON.parse(value) as T;
  }

  remove(key: string) {
    SessionStorageUtil.removeItem(key);
  }

  clear() {
    SessionStorageUtil.clear();
  }
}
