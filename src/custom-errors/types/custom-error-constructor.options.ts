import type { EnumAppLayer } from "../../shared";
import type { EnumCustomErrorType } from "..";

export type CustomErrorConstructorOptions = {
  layer: EnumAppLayer;
  type: EnumCustomErrorType;
  message?: string;
  translate?: boolean;
  translateArgs?: string[];
};
