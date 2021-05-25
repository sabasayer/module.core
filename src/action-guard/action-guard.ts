import { ValidationResult } from "@/shared";

export type ValidatorFunc<T> = (options: T) => boolean | Promise<boolean>;

export class ActionGuard<T> {
  constructor(private validator: ValidatorFunc<T>) {}

  async validate(options: T): Promise<ValidationResult> {
    try {
      const res = await this.validator(options);
      return {
        valid: res,
      };
    } catch (error) {
      return {
        valid: false,
        errorMessage: error?.toString(),
      };
    }
  }
}

export const createActionGuard = <T>(validator: ValidatorFunc<T>) =>
  new ActionGuard(validator);
