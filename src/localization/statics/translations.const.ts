import type { LocalizationTranslations } from "../types/localization-translations.interface";
import { EnumLocalizationKeys } from "./localization-keys.enum";

export const defaultTranslations: LocalizationTranslations = {
  "en-us": {
    [EnumLocalizationKeys.HostNameError]:
      "hostName or proper hostNames must be defined",
    [EnumLocalizationKeys.NotRegisteredError]:
      'There is no class registered with key "%s"',
  },
  "tr-tr": {
    [EnumLocalizationKeys.HostNameError]:
      "Uygun hostName veya hostNames tanımlanmalı",
    [EnumLocalizationKeys.NotRegisteredError]:
      '"%s" keyi ile bir sınıf kayıt edilmedi',
  },
};
