import type { IPerformanceUtil } from "./types";
import type { IPerformance } from "./types/performace.interface";

export class PerformanceUtil implements IPerformanceUtil {
  constructor(private performance: IPerformance) {}

  measureFunc = (body: Function, name: string) => {
    const startMark = name + "-start";
    const endMark = name + "-end";
    this.performance.mark(startMark);

    body();

    this.performance.mark(endMark);

    const perfName = "meause " + name;
    this.performance.measure(perfName, startMark, endMark);

    const result = this.performance.getEntriesByName(perfName)[0]?.duration;

    console.log(`Performance Result | ${name} => ${result}`);

    this.performance.clearMarks();
    this.performance.clearMeasures();
  };
}

export const browserPerformanceUtil = new PerformanceUtil(performance);
