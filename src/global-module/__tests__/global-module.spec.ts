import { ILocalization } from "@/localization/types/localization.interface";
import { globalModule } from "../global-module";

describe("Global Module", () => {
  class Testlocalization implements ILocalization {
    clear() {}
    getLang() {
      return null;
    }
    setLang(lang: string) {
      return this;
    }
    setTranslations(t: any) {
      return this;
    }
    translate(t: string) {
      return null;
    }
  }

  const localization = new Testlocalization();

  it("should get registered localization", () => {
    globalModule.setLocalization(localization);

    const resolved = globalModule.getLocalization();
    expect(resolved).toEqual(localization);
  });

  it("should clear", () => {
    globalModule.setLocalization(localization);
    globalModule.clear();

    const resolved = globalModule.getLocalization();
    expect(resolved).toBe(null);
  });
});
