export type ILocalization = {
  setLang(lang: string): ILocalization;
  getLang(): string | null;

  setTranslations(translations: any): ILocalization;
  /**
   * translate with registered translations
   * @param text string path access translation. ex: 'hello' or 'first.second[0]'
   * @param args args for dynamic translations. ex: 'hello %s %s', args will replace %s
   */
  translate(text?: string, ...args: string[]): string | null;

  clear(): void;
};
