import { isProduction } from "@/utils/env.utils";
import { Logger } from "./logger";

export const coreLogger = new Logger({
  logStyle:
    "font-weight:500;border-left:3px solid black; color:#222; padding-left:3px;background-color: #ffffff;background-image: linear-gradient(315deg, #ffffff 0%, #d7e1ec 74%);",
  disabled: isProduction(),
});
