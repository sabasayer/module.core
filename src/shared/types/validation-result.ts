import type { CustomError } from "@/custom-errors";

export type ValidationResult = {
  valid: boolean;
  error?: CustomError;
};
