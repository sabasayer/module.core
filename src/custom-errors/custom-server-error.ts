import { CustomError } from "../custom-errors/custom-error";
import { EnumAppLayer } from "../shared/app-layer.enum";
import { EnumCustomErrorType } from "./statics/custom-error-type.enum";
import type { CustomErrorConstructorOptions } from "./types/custom-error-constructor.options";

export class CustomServerError extends CustomError {
  constructor(options?: Omit<CustomErrorConstructorOptions, "layer" | "type">) {
    super({
      layer: EnumAppLayer.Server,
      type: EnumCustomErrorType.Server,
      ...options,
    });
  }
}
