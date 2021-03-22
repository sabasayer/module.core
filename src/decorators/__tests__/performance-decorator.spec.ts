import { globalModule } from "@/global-module/global-module";
import { mockPerformanceUtil } from "@/global-module/__mocks__/global.module.mock";
import mockConsole from "jest-mock-console";
import { measurePerformance } from "../performance.decorator";

describe("Performance", () => {
  const restore = mockConsole();

  beforeEach(() => {
    mockConsole();
    globalModule.clear();
  });

  afterEach(() => {
    restore();
  });

  it("should log to class and name of function", () => {
    globalModule.setPerformanceUtil(mockPerformanceUtil);

    class Test {
      @measurePerformance
      test() {
        return 1 + 1;
      }
    }

    const test = new Test();
    test.test();

    expect(console.log).toHaveBeenCalledWith("Test:test");
  });
});
