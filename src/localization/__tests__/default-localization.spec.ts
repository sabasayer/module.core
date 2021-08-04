import { defaultLocalization } from "../default-localization";

describe("Default Localization", () => {
  beforeEach(() => {
    defaultLocalization.clear();
  });

  it("should set language", () => {
    defaultLocalization.setLang("tr");
    const lang = defaultLocalization.getLang();
    expect(lang).toEqual("tr");
  });

  it("should translate by registered translations", () => {
    defaultLocalization.setLang("tr");
    defaultLocalization.setTranslations({
      tr: {
        hello: "Merhaba",
      },
    });
    const res = defaultLocalization.translate("hello");
    expect(res).toBe("Merhaba");
  });

  it("should access deep object and translate", () => {
    defaultLocalization.setLang("tr");
    defaultLocalization.setTranslations({
      tr: {
        first: {
          second: "second",
        },
      },
    });
    const res = defaultLocalization.translate("first.second");
    expect(res).toBe("second");
  });

  it("should access array and translate", () => {
    defaultLocalization.setLang("tr");
    defaultLocalization.setTranslations({
      tr: {
        first: {
          arr: ["first", "second"],
        },
      },
    });
    const res = defaultLocalization.translate("first.arr[1]");
    expect(res).toBe("second");
  });

  it("should translate with arguments", () => {
    defaultLocalization.setLang("tr");
    defaultLocalization.setTranslations({
      tr: {
        hello: "Merhaba %s %s",
      },
    });

    const res = defaultLocalization.translate("hello", "salih", "baki");
    expect(res).toBe("Merhaba salih baki");
  });

  it("should return null for non existence translation", () => {
    defaultLocalization.setLang("en");

    const res = defaultLocalization.translate("Test");
    expect(res).toBe(null);
  });

  it("should merge translations", () => {
    defaultLocalization.setLang("en");
    defaultLocalization.setTranslations({
      en: {
        hi: "hi",
      },
    });

    defaultLocalization.setTranslations({
      en: {
        by: "by",
      },
    });

    const hi = defaultLocalization.translate("hi");
    const by = defaultLocalization.translate("by");

    expect(hi).toBe("hi");
    expect(by).toBe("by");
  });

  it;
});
