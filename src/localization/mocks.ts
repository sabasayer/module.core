import { defaultLocalization } from "./default-localization";
import { globalModule } from "../global-module/global-module";

export const mockTranslations = (translations: Record<string, string>) => {
  defaultLocalization.setLang("en-us");
  defaultLocalization.setTranslations({
    "en-us": translations,
  });
  globalModule.setLocalization(defaultLocalization);
};
