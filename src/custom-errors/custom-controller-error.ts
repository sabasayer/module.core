import { EnumAppLayer } from "../shared/app-layer.enum";
import { CustomError } from "./custom-error";
import { CustomErrorConstructorOptions } from "./types/custom-error-constructor.options";

export class CustomControllerError extends CustomError {
  constructor(options: Omit<CustomErrorConstructorOptions, "layer">) {
    super({ layer: EnumAppLayer.Controller, ...options });
  }
}
