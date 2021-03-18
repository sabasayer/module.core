import { EnumAppLayer } from "../../shared";
import { EnumCustomErrorType } from "..";

export type CustomErrorConstructorOptions = {
  layer: EnumAppLayer;
  type: EnumCustomErrorType;
  message?: string;
  translate?: boolean;
};
