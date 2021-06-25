import type { LocalizationTranslations } from "./types/localization-translations.interface";
import type { ILocalization } from "./types/localization.interface";

class DefaultLocalization implements ILocalization {
  private lang: string = "";
  private translations: LocalizationTranslations = {};

  setLang(lang: string) {
    this.lang = lang;
    return this;
  }

  getLang() {
    return this.lang;
  }

  setTranslations(translations: LocalizationTranslations) {
    for (const lang in translations) {
      const langTranslations = translations[lang] ?? {};

      if (this.translations[lang]) this.combineLang(lang, langTranslations);
      else this.translations[lang] = langTranslations;
    }

    return this;
  }

  translate(text?: string) {
    if (!text) return null;
    return this.translations[this.lang]?.[text] ?? null;
  }

  clear() {
    this.lang = "";
    this.translations = {};
  }

  private combineLang(
    lang: string,
    langTranslations: { [key: string]: string }
  ) {
    this.translations[lang] = {
      ...this.translations[lang],
      ...langTranslations,
    };
  }
}

export const defaultLocalization = new DefaultLocalization();
