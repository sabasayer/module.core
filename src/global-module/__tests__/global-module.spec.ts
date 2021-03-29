import { createModule, TestModule } from "@/module/__mocks__/module.mock";
import { globalModule } from "../global-module";
import {
  mockCloneUtil,
  mockDateUtil,
  mockEncyrpctionUtil,
  mockLocalization,
  MockObserver,
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

  it("should get registered dateUtil", () => {
    globalModule.setDateUtil(mockDateUtil);

    const resolved = globalModule.getDateUtil();
    expect(resolved).toEqual(mockDateUtil);
  });

  it("should create observer", () => {
    globalModule.setObserver(MockObserver);
    const observer = globalModule.createObserver<string>();
    expect(observer).toBeInstanceOf(MockObserver);
  });

  it("should clear", () => {
    globalModule.setLocalization(mockLocalization);
    globalModule.setCloneUtil(mockCloneUtil);
    globalModule.setEncryptionUtil(mockEncyrpctionUtil);
    globalModule.setPerformanceUtil(mockPerformanceUtil);
    globalModule.setDateUtil(mockDateUtil);
    globalModule.setObserver(MockObserver);

    const module = createModule();
    globalModule.registerModule(module);

    globalModule.clear();

    const localization = globalModule.getLocalization();
    const resolvedModule = globalModule.getModule(TestModule);
    const clone = globalModule.getCloneUtil();
    const encyription = globalModule.getEncryptionUtil();
    const performance = globalModule.getPerformanceUtil();
    const dateUtil = globalModule.getDateUtil();
    const observer = globalModule.createObserver<string>();

    expect(localization).toBe(null);
    expect(clone).toBe(null);
    expect(encyription).toBe(null);
    expect(performance).toBe(null);
    expect(dateUtil).toBe(null);
    expect(resolvedModule).toBe(undefined);
    expect(observer).toBe(undefined);
  });
});
