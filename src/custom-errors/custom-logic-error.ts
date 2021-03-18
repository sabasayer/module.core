import { EnumAppLayer } from "../shared";
import { CustomError } from ".";
import { CustomErrorConstructorOptions } from "./types/custom-error-constructor.options";

export class CustomLogicError extends CustomError {
  constructor(options: Omit<CustomErrorConstructorOptions, "layer">) {
    super({ layer: EnumAppLayer.Logic, ...options });
  }
}
