import { globalModule } from "../global-module/global-module";
import { SessionStorageUtil } from "@sabasayer/utils";
import type { ICache } from ".";

export class SessionStorageCache implements ICache {
  set<T>(key: string, value: T) {
    let stringValue = JSON.stringify(value);

    stringValue =
      globalModule.getEncryptionUtil()?.encrypt(stringValue) ?? stringValue;

    SessionStorageUtil.setItem(key, stringValue);
  }

  get<T>(key: string) {
    let value = SessionStorageUtil.getItem(key);
    if (!value) return null;

    value = globalModule.getEncryptionUtil()?.decrypt(value) ?? value;

    return JSON.parse(value) as T;
  }

  remove(key: string) {
    SessionStorageUtil.removeItem(key);
  }

  clear() {
    SessionStorageUtil.clear();
  }
}
