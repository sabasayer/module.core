import { globalModule } from "@/global-module/global-module";
import { mockCloneUtil } from "@/global-module/__mocks__/global.module.mock";
import { cloneArgs, cloneDeepArgs } from "../clone.decorators";

describe("Clone Decorator", () => {
  class Test {
    @cloneArgs
    test(a: { id: number }) {
      return a;
    }

    @cloneDeepArgs
    test2(a: number) {
      return a;
    }
  }

  const test = new Test();

  beforeEach(() => {
    globalModule.clear();
  });

  it("should run registered cloneUtil clone method", () => {
    globalModule.setCloneUtil(mockCloneUtil);
    const result = test.test({ id: 1 });

    expect(result).toBe(null);
  });

  it("should run registered cloneUtil cloneDeep method", () => {
    globalModule.setCloneUtil(mockCloneUtil);
    const result = test.test2(1);

    expect(result).toEqual(null);
  });
});
