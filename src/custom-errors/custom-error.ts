import { globalModule } from "../global-module/global-module";
import { EnumAppLayer } from "../shared/app-layer.enum";
import { EnumCustomErrorType } from "./statics/custom-error-type.enum";
import { CustomErrorConstructorOptions } from "./types/custom-error-constructor.options";
import { ICustomError } from "./types/custom-error.interface";

export class CustomError extends Error implements ICustomError {
  layer: EnumAppLayer;
  type: EnumCustomErrorType;

  constructor(options: CustomErrorConstructorOptions) {
    let message = options.message;

    if (options.translate)
      message =
        globalModule.getLocalization()?.translate(options.message) ?? "";

    super(message);
    this.layer = options.layer;
    this.type = options.type;
  }
}
