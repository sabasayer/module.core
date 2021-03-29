export type IDateUtil = {
  now(): Date;
  nowISO(): string;
  setDefaultDateFormat(value: string): void;
  format(value: DateUnion, format?: string): string;
  formatISO(value: Date): string;
  formatTime(value: DateUnion): string;
  add<T extends DateUnion>(value: T, duration: DateDuration): T;
  set<T extends DateUnion>(value: T, values: SetDateValues): T;
  setTimeSpan<T extends DateUnion>(value: T, timeSpan: string): T;
  clearTime<T extends DateUnion>(value: T): T;
};

/**
 * Date or valid date string
 */
export type DateUnion = string | Date;

export type DateDuration = {
  years?: number;
  months?: number;
  weeks?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
};

export type SetDateValues = {
  year?: number;
  month?: number;
  date?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  milliseconds?: number;
};
