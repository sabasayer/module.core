export type ILocalization = {
  setLang(lang: string): ILocalization;
  getLang(): string | null;

  setTranslations(translations: any): ILocalization;
  translate(text?: string, ...args: string[]): string | null;

  clear(): void;
};
