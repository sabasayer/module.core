import { createModule, TestModule } from "@/module/__mocks__/module.mock";
import { globalModule } from "../global-module";
import {
  mockCloneUtil,
  mockEncyrpctionUtil,
  mockLocalization,
  mockPerformanceUtil,
} from "../__mocks__/global.module.mock";

describe("Global Module", () => {
  beforeEach(() => {
    globalModule.clear();
  });

  it("should get registered localization", () => {
    globalModule.setLocalization(mockLocalization);

    const resolved = globalModule.getLocalization();
    expect(resolved).toEqual(mockLocalization);
  });

  it("should register module", () => {
    const module = createModule();
    globalModule.registerModule(module);
    const resolved = globalModule.getModule(TestModule);
    expect(resolved).toEqual(module);
  });

  it("should get registered clone util", () => {
    globalModule.setCloneUtil(mockCloneUtil);

    const resolved = globalModule.getCloneUtil();
    expect(resolved).toEqual(mockCloneUtil);
  });

  it("shoul get registered encryption util", () => {
    globalModule.setEncryptionUtil(mockEncyrpctionUtil);

    const resolved = globalModule.getEncryptionUtil();
    expect(resolved).toEqual(mockEncyrpctionUtil);
  });

  it("should get registered performance util", () => {

    globalModule.setPerformanceUtil(mockPerformanceUtil);
    const resolved = globalModule.getPerformanceUtil();
    expect(resolved).toEqual(mockPerformanceUtil);
  });

  it("should clear", () => {
    globalModule.setLocalization(mockLocalization);
    globalModule.setCloneUtil(mockCloneUtil);
    globalModule.setEncryptionUtil(mockEncyrpctionUtil);

    const module = createModule();
    globalModule.registerModule(module);

    globalModule.clear();

    const resolvedLocalization = globalModule.getLocalization();
    const resolvedModule = globalModule.getModule(TestModule);
    const resolvedClone = globalModule.getCloneUtil();
    const resolvedEncyription = globalModule.getEncryptionUtil();

    expect(resolvedLocalization).toBe(null);
    expect(resolvedClone).toBe(null);
    expect(resolvedEncyription).toBe(null);
    expect(resolvedModule).toBe(undefined);
  });
});
