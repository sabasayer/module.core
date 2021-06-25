import mockConsole from "jest-mock-console";
import { PerformanceUtil } from "../performance.util";
import type { IPerformance } from "../types/performace.interface";

describe("Performance", () => {
  const restore = mockConsole();

  beforeEach(() => {
    mockConsole();
  });

  afterEach(() => {
    restore();
  });

  class MockPerformance implements IPerformance {
    mark(_: string) {}
    measure(_: string) {}
    clearMarks() {}
    clearMeasures() {}
    getEntriesByName(_: string) {
      return [];
    }
  }

  const performanceUtil = new PerformanceUtil(new MockPerformance());

  it("should log to console performance duration of function", () => {
    performanceUtil.measureFunc(() => {
      return 2 + 3;
    }, "add");

    expect(console.log).toHaveBeenCalledTimes(1);
  });
});
