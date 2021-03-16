import { EnumLayer } from "@/shared-types";
import { CustomError } from ".";
import { CustomErrorConstructorOptions } from "./types/custom-error-constructor.options";

export class CustomCacheError extends CustomError {
  constructor(options: Omit<CustomErrorConstructorOptions, "layer">) {
    super({
      layer: EnumLayer.Cache,
      ...options,
    });
  }
}
