import { IDateUtil } from "./types";
import { format, add } from "date-fns";
import { DateDuration } from "./types/date-util.interface";

class DefaultDateUtil implements IDateUtil {
  private defaultFormat: string | null = null;

  setDefaultFormat(value: string) {
    this.defaultFormat = value;
  }

  format(value: string | Date, dateFormat?: string) {
    const date = this.getDate(value);

    return format(date, dateFormat ?? this.defaultFormat ?? "");
  }

  formatISO(value: Date): string {
    return format(value, "yyyy-MM-dd'T'HH:mm:ss");
  }

  add<T extends string | Date>(value: T, duration: DateDuration): T {
    const date = this.getDate(value);

    const result = add(date as Date, duration);

    if (typeof value === "string")
      return format(result, "yyyy-MM-dd'T'HH:mm:ss") as T;

    return result as T;
  }

  private getDate(value: string | Date) {
    return typeof value === "string" ? new Date(value) : value;
  }
}

export const defaultDateUtil = new DefaultDateUtil();
