import { IDateUtil } from "./types";
import { format, formatISO, add, parseISO, set } from "date-fns";
import {
  DateDuration,
  DateUnion,
  SetDateValues,
} from "./types/date-util.interface";

class DefaultDateUtil implements IDateUtil {
  private defaultFormat: string | null = null;

  setDefaultFormat(value: string) {
    this.defaultFormat = value;
  }

  now = () => new Date();
  nowISO() {
    return this.formatISO(this.now());
  }

  format(value: string | Date, dateFormat?: string) { 
    const date = this.getDate(value);

    return format(date, dateFormat ?? this.defaultFormat ?? "");
  }

  formatISO(value: Date): string {
    return formatISO(value).substr(0, 19);
  }

  add<T extends DateUnion>(value: T, duration: DateDuration): T {
    return this.mutateDateUnion(value, (date) => add(date, duration));
  }

  set<T extends DateUnion>(value: T, values: SetDateValues): T {
    return this.mutateDateUnion(value, (date) => set(date, values));
  }

  clearTime<T extends DateUnion>(value: T): T {
    return this.set(value, {
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    });
  }

  private mutateDateUnion<T extends DateUnion>(
    value: T,
    mutateFn: (date: Date) => Date
  ) {
    let date = this.getDate(value);

    const result = mutateFn(date);

    return this.getDateUnion(value, result) as T;
  }

  private getDate(value: DateUnion) {
    return typeof value === "string" ? parseISO(value) : value;
  }

  private getDateUnion(value: DateUnion, result: Date): DateUnion {
    if (typeof value === "string") return this.formatISO(result);

    return result;
  }
}

export const defaultDateUtil = new DefaultDateUtil();
