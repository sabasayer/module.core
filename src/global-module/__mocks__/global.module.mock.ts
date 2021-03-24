import { ILocalization } from "@/localization";
import { IDateUtil, IPerformanceUtil } from "@/utils";
import { ICloneUtil } from "@/utils/types/clone-util.interface";
import { DateDuration } from "@/utils/types/date-util.interface";
import { IEncyrptionUtil } from "@/utils/types/encryption-util.interface";

class Testlocalization implements ILocalization {
  clear() {}
  getLang() {
    return null;
  }
  setLang(lang: string) {
    return this;
  }
  setTranslations(t: any) {
    return this;
  }
  translate(t: string) {
    return null;
  }
}

export const mockLocalization = new Testlocalization();

class TestCloneUtil implements ICloneUtil {
  clone(item: any) {
    return null as any;
  }

  cloneDeep(item: any) {
    return null as any;
  }
}

export const mockCloneUtil = new TestCloneUtil();

class TestEncyrption implements IEncyrptionUtil {
  encrypt = (value: string) => "";
  decrypt = (value: string) => "";
}

export const mockEncyrpctionUtil = new TestEncyrption();

class MockPerformanceUtil implements IPerformanceUtil {
  measureFunc(body: Function, name: string) {
    console.log(name);
  }
}

export const mockPerformanceUtil = new MockPerformanceUtil();

class DateUtil implements IDateUtil {
  setDefaultFormat = (value: string) => undefined;
  format = (value: string) => "";
  formatISO = (value: Date) => "";
  add = <T extends string | Date>(value: T, duration: DateDuration) =>
    "" as any;
}

export const mockDateUtil = new DateUtil();
