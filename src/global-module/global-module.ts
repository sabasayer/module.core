import { ILocalization } from "@/localization/types/localization.interface";

class GlobalModule {
  private localization: ILocalization | null = null;

  setLocalization(localization: ILocalization) {
    this.localization = localization;
    return this;
  }

  getLocalization() {
    return this.localization;
  }

  clear() {
    this.localization = null;
  }
}

export const globalModule = new GlobalModule();
