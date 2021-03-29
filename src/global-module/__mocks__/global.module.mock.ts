import { ILocalization } from "@/localization";
import { IDateUtil, IPerformanceUtil } from "@/utils";
import { ICloneUtil } from "@/utils/types/clone-util.interface";
import {
  DateDuration,
  DateUnion,
  SetDateValues,
} from "@/utils/types/date-util.interface";
import { IEncyrptionUtil } from "@/utils/types/encryption-util.interface";
import {
  IObserver,
  PublishType,
  SubscribeOptions,
} from "@/utils/types/observer.interface";

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
  now = () => new Date();
  nowISO = () => "";
  setDefaultDateFormat = (value: string) => undefined;
  format = (value: string) => "";
  formatISO = (value: Date) => "";
  formatTime = (value: DateUnion) => "";
  add = <T extends DateUnion>(value: T, duration: DateDuration) => "" as any;
  clearTime = <T extends DateUnion>(value: T) => "" as any;
  set = <T extends DateUnion>(value: T, values: SetDateValues) => "" as any;
  setTimeSpan = <T extends DateUnion>(value: T, timeSpan: string) => "" as any;
}

export const mockDateUtil = new DateUtil();

export class MockObserver<T> implements IObserver<T> {
  subscribe<T>(options: SubscribeOptions<T>) {
    return 1;
  }

  unsubscribe(id: number) {}

  publish(data: T, type: PublishType) {}
}
