import { EnumLayer } from "@/shared-types";
import { EnumCustomErrorType } from "..";

export type CustomErrorConstructorOptions = {
  layer: EnumLayer;
  type: EnumCustomErrorType;
  message?: string;
  translate?: boolean;
};
