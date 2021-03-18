import { ICloneUtil } from "../utils/types/clone-util.interface";
import { ILocalization } from "../localization/types/localization.interface";
import { ICoreModule } from "../module";
import { ModuleConstructor } from "../module/core-module.interface";
import { isDevelopment } from "../utils/env.utils";

declare global {
  interface Window {
    globalModule?: GlobalModule;
  }
}

class GlobalModule {
  private modules = new Map<string, ICoreModule>();
  private localization: ILocalization | null = null;
  private cloneUtil: ICloneUtil | null = null;

  constructor() {
    if (isDevelopment()) window.globalModule = this;
  }

  setLocalization(localization: ILocalization) {
    this.localization = localization;
    return this;
  }

  getLocalization() {
    return this.localization;
  }

  registerModule(module: ICoreModule) {
    this.modules.set(module.constructor.name, module);
  }

  getModule(constructor: ModuleConstructor) {
    return this.modules.get(constructor.name);
  }

  setCloneUtil(util: ICloneUtil) {
    this.cloneUtil = util;
    return this;
  }

  getCloneUtil() {
    return this.cloneUtil;
  }

  clear() {
    this.localization = null;
    this.cloneUtil = null;
    this.modules = new Map();
  }
}

export const globalModule = new GlobalModule();
