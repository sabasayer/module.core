import { defaultLocalization } from "./default-localization";
import { globalModule } from "../global-module/global-module";
import type { Translations } from "./types";

export const mockTranslations = (translations: Translations) => {
  defaultLocalization.setLang("en-us");
  defaultLocalization.setTranslations({
    "en-us": translations,
  });
  globalModule.setLocalization(defaultLocalization);
};
