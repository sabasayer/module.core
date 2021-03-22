export type IPerformance = {
  mark(name: string): void;
  measure(name: string, startMark?: string, endMark?: string): void;
  getEntriesByName(name: string): IPerformanceEntry[];
  clearMarks(): void;
  clearMeasures(): void;
};

export type IPerformanceEntry = {
  name: string;
  duration: number;
};
