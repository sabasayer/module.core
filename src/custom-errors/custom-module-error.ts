import { EnumAppLayer } from "../shared/app-layer.enum";
import { CustomError } from "./custom-error";
import type { CustomErrorConstructorOptions } from "./types/custom-error-constructor.options";

export class CustomModuleError extends CustomError {
  constructor(options: Omit<CustomErrorConstructorOptions, "layer">) {
    super({ layer: EnumAppLayer.Module, ...options });
  }
}
