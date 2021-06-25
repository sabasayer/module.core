import type { IEncyrptionUtil } from "./types";

class DefaultEncryptUtil implements IEncyrptionUtil {
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

export const defaultEncryptUtil = new DefaultEncryptUtil();
