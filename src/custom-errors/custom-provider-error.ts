import { EnumAppLayer } from "@/shared-types/app-layer.enum";
import { CustomError } from "./custom-error";
import { CustomErrorConstructorOptions } from "./types/custom-error-constructor.options";

export class CustomProviderError extends CustomError {
  constructor(options: Omit<CustomErrorConstructorOptions, "layer">) {
    super({ layer: EnumAppLayer.Provider, ...options });
  }
}
