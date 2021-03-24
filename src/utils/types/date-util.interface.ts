export type IDateUtil = {
  setDefaultFormat(value: string): void;
  /**
   * @param value Date or valid date string
   * @param format formatter like 'yyyy/MM/ddd'
   */
  format(value: DateUnion, format?: string): string;
  formatISO(value: Date): string;
  add<T extends DateUnion>(value: T, duration: DateDuration): T;
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
