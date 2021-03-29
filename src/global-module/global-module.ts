import { ICloneUtil } from "../utils/types/clone-util.interface";
import { ILocalization } from "../localization/types/localization.interface";
import { ICoreModule } from "../module";
import { ModuleConstructor } from "../module/core-module.interface";
import { isDevelopment } from "../utils/env.utils";
import { IEncyrptionUtil } from "../utils/types/encryption-util.interface";
import { IDateUtil, IPerformanceUtil } from "@/utils";
import { IObserver } from "@/utils/types/observer.interface";

declare global {
  interface Window {
    globalModule?: GlobalModule;
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

  clear() {
    this.localization = null;
    this.cloneUtil = null;
    this.encyrpctionUtil = null;
    this.performanceUtil = null;
    this.dateUtil = null;
    this.observer = null;
    this.modules.clear();
  }
}

export const globalModule = new GlobalModule();
