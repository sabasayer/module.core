import type { ValidationResult } from "@/shared";
import { createActionGuard, ValidatorFunc } from "../action-guard";

describe("Action Guard", () => {
  const cases: [ValidatorFunc<any>, any, ValidationResult][] = [
    [
      (options: string) => options === "ali",
      "test",
      {
        valid: false,
      },
    ],
    [
      (options: string) => options === "ali",
      "ali",
      {
        valid: true,
      },
    ],
  ];

  it.each(cases)(
    "use validator %j, options %j, expect = %j",
    async (
      validator: ValidatorFunc<any>,
      options: any,
      expected: ValidationResult
    ) => {
      const actionGuard = createActionGuard(validator);

      const res = await actionGuard.validate(options);

      expect(res).toEqual(expected);
    }
  );

  it("should return throw error", async () => {
    const error = "Error";
    const actionGuard = createActionGuard((options: number) => {
      if (options < 10) throw new Error(error);

      return true;
    });

    const res = await actionGuard.validate(8);
    const expected: ValidationResult = {
      valid: false,
      error: new Error("Error"),
    };
    expect(res).toEqual(expected);
  });

  it("should wait for promise", async () => {
    const actionGuard = createActionGuard((options: boolean) => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(options), 100);
      });
    });

    const res = await actionGuard.validate(true);
    const expected: ValidationResult = {
      valid: true,
    };
    expect(res).toEqual(expected);
  });
});
