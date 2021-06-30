import { globalModule } from "../global-module/global-module";
import { sessionStorageUtil } from "@sabasayer/utils";
import type { ICache } from ".";

export class SessionStorageCache implements ICache {
  set<T>(key: string, value: T) {
    let stringValue = JSON.stringify(value);

    stringValue =
      globalModule.getEncryptionUtil()?.encrypt(stringValue) ?? stringValue;

    sessionStorageUtil.setItem(key, stringValue);
  }

  get<T>(key: string) {
    let value = sessionStorageUtil.getItem(key);
    if (!value) return null;

    value = globalModule.getEncryptionUtil()?.decrypt(value) ?? value;

    return JSON.parse(value) as T;
  }

  remove(key: string) {
    sessionStorageUtil.removeItem(key);
  }

  clear() {
    sessionStorageUtil.clear();
  }
}
