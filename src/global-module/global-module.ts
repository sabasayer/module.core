import type { ICloneUtil } from "../utils/types/clone-util.interface";
import type { ILocalization } from "../localization/types/localization.interface";
import type { ICoreModule } from "../module";
import type { ModuleConstructor } from "../module/core-module.interface";
import type { IEncyrptionUtil } from "../utils/types/encryption-util.interface";
import type { IDateUtil, IPerformanceUtil } from "../utils";
import type { IObserver } from "../utils/types/observer.interface";

declare global {
  interface Window {
    $globalModule?: GlobalModule;
  }
}

class GlobalModule {
  private modules = new Map<string, ICoreModule>();
  private localization: ILocalization | null = null;
  private cloneUtil: ICloneUtil | null = null;
  private encyrpctionUtil: IEncyrptionUtil | null = null;
  private performanceUtil: IPerformanceUtil | null = null;
  private dateUtil: IDateUtil | null = null;
  private observer: (new () => IObserver<any>) | null = null;
  private sharedHeaders: Record<string, string> = {};

  setLocalization(localization: ILocalization) {
    this.localization = localization;
    return this;
  }

  getLocalization() {
    return this.localization;
  }

  registerModule(module: ICoreModule) {
    this.modules.set(module.constructor.name, module);
    return this;
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

  setEncryptionUtil(util: IEncyrptionUtil) {
    this.encyrpctionUtil = util;
    return this;
  }

  getEncryptionUtil() {
    return this.encyrpctionUtil;
  }

  setPerformanceUtil(util: IPerformanceUtil) {
    this.performanceUtil = util;
    return this;
  }

  getPerformanceUtil() {
    return this.performanceUtil;
  }

  setDateUtil(util: IDateUtil) {
    this.dateUtil = util;
    return this;
  }

  getDateUtil() {
    return this.dateUtil;
  }

  setObserver<T>(observer: new () => IObserver<T>) {
    this.observer = observer;
    return this;
  }

  createObserver<T>() {
    if (!this.observer) return;

    return new this.observer() as IObserver<T>;
  }

  addToSharedHeaders(header: Record<string, string>) {
    this.sharedHeaders = { ...this.sharedHeaders, ...header };
  }

  getSharedHeaders() {
    return this.sharedHeaders;
  }

  removeSharedHeaders(...keys: string[]) {
    keys.forEach((key) => delete this.sharedHeaders[key]);
  }

  clear() {
    this.localization = null;
    this.cloneUtil = null;
    this.encyrpctionUtil = null;
    this.performanceUtil = null;
    this.dateUtil = null;
    this.observer = null;
    this.sharedHeaders = {};
    this.modules.clear();
  }
}

const createGlobalModule = (): GlobalModule => {
  let globalModule = window.$globalModule;

  if (!globalModule) globalModule = window.$globalModule = new GlobalModule();

  return globalModule;
};

export const globalModule = createGlobalModule();
