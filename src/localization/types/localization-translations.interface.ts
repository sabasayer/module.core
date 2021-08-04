export interface Translations {
  [key: string]: string | string[] | Translations;
}

export interface LocalizationTranslations {
  [lang: string]: Translations;
}
