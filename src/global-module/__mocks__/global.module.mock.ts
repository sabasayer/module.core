import type { ILocalization } from "@/localization";
import type { IDateUtil, IPerformanceUtil } from "@/utils";
import type { ICloneUtil } from "@/utils/types/clone-util.interface";
import type {
  DateDuration,
  DateUnion,
  SetDateValues,
} from "@/utils/types/date-util.interface";
import type { IEncyrptionUtil } from "@/utils/types/encryption-util.interface";
import type {
  IObserver,
  PublishType,
  SubscribeOptions,
} from "@/utils/types/observer.interface";

class Testlocalization implements ILocalization {
  clear() {}
  getLang() {
    return null;
  }
  setLang(_: string) {
    return this;
  }
  setTranslations(_: any) {
    return this;
  }
  translate(_: string) {
    return null;
  }
}

export const mockLocalization = new Testlocalization();

class TestCloneUtil implements ICloneUtil {
  clone(_: any) {
    return null as any;
  }

  cloneDeep(_: any) {
    return null as any;
  }
}

export const mockCloneUtil = new TestCloneUtil();

class TestEncyrption implements IEncyrptionUtil {
  encrypt = (_: string) => "";
  decrypt = (_: string) => "";
}

export const mockEncyrpctionUtil = new TestEncyrption();

class MockPerformanceUtil implements IPerformanceUtil {
  measureFunc(_: Function, name: string) {
    console.log(name);
  }
}

export const mockPerformanceUtil = new MockPerformanceUtil();

class DateUtil implements IDateUtil {
  now = () => new Date();
  nowISO = () => "";
  setDefaultDateFormat = (_: string) => undefined;
  format = (_: string) => "";
  formatISO = (_: Date) => "";
  formatTime = (_: DateUnion) => "";
  add = <T extends DateUnion>(_: T, __: DateDuration) => "" as any;
  clearTime = <T extends DateUnion>(_: T) => "" as any;
  set = <T extends DateUnion>(_: T, __: SetDateValues) => "" as any;
  setTimeSpan = <T extends DateUnion>(_: T, __: string) => "" as any;
}

export const mockDateUtil = new DateUtil();

export class MockObserver<T> implements IObserver<T> {
  subscribe<T>(_: SubscribeOptions<T>) {
    return 1;
  }

  unsubscribe(_: number) {}

  publish(_: T, __: PublishType) {}
}
