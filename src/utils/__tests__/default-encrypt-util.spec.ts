import { defaultEncryptUtil } from "../default-encrypt.util";

describe("Default Encrypt Util", () => {
  it("should encrypt value", () => {
    const value = "wololo";

    const encrypted = defaultEncryptUtil.encrypt(value);
    const expected = "xpmpmp";

    expect(encrypted).toBe(expected);
  });

  it("should decrypt value", () => {
    const value = "xpmpmp";

    const decrypted = defaultEncryptUtil.decrypt(value);
    const expected = "wololo";

    expect(decrypted).toBe(expected);
  });
});
