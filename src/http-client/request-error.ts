import { EnumRequestErrorType } from "./statics/request-error-type.enum";

export class RequestError extends Error {
  type: EnumRequestErrorType;
  constructor(type: EnumRequestErrorType, message?: string) {
    super(message);
    this.type = type;
  }
}
