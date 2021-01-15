import mockConsole from "jest-mock-console";
import { Logger } from "../logger";

describe("Logger", () => {
  const logStyle =
    "font-weight:500;border-left:2px solid steelblue; padding-left:3px;";

  const restore = mockConsole();

  beforeEach(() => {
    mockConsole();
  });

  afterEach(() => {
    restore();
  });

  it("should console log text", () => {
    const logger = new Logger({
      logStyle,
    });

    logger.log("some logging");

    expect(console.log).toHaveBeenCalledWith("%csome logging", logStyle);
  });

  it("should console log multiple values", () => {
    const logger = new Logger({
      logStyle,
    });

    logger.log("test", 2, true);

    expect(console.log).toHaveBeenCalledWith(
      "%ctest",
      logStyle,
      "%c2",
      logStyle,
      "%ctrue",
      logStyle
    );
  });

  it("should console log object types after styled values", () => {
    const logger = new Logger({
      logStyle,
    });

    logger.log([1, 2, 3], "test");

    expect(console.log).toHaveBeenCalledWith("%ctest", logStyle, [1, 2, 3]);
  });

  it("should conse log function types after styled values", () => {
    const logger = new Logger({
      logStyle,
    });

    const classFunction = class Test {};

    logger.log(classFunction, "hohoho");

    expect(console.log).toHaveBeenCalledWith(
      "%chohoho",
      logStyle,
      classFunction
    );
  });

  it("should not call console when disabled ", () => {
    const logger = new Logger({
      disabled: true,
    });

    logger.log("asd");

    expect(console.log).toHaveBeenCalledTimes(0);
  });

  it("should set disabled with disable method ", () => {
    const logger = new Logger();
    logger.disable();

    logger.log("test");

    expect(console.log).toHaveBeenCalledTimes(0);
  });

  it("should set disabled false with enable method", () => {
    const logger = new Logger();
    logger.disable();

    logger.enable();

    logger.log("test");

    expect(console.log).toHaveBeenCalledWith("%ctest", "");
  });

  it("should log on method call with args", () => {
    const logger = new Logger({
      logStyle,
    });
    class Test {
      @logger.logMethod()
      get(id: number, name: string) {}
    }

    new Test().get(1, "ali");

    expect(console.log).toHaveBeenCalledWith(
      "%cTest => get()",
      logStyle,
      "%c1",
      logStyle,
      "%cali",
      logStyle
    );
  });
});
