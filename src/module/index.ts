import { ICoreModule } from "./core-module.interface";
import { ModuleCore } from "./core-module";
import { createModule } from "./create-module/create-module";

export * from "./decorators/index";
export type { ICoreModule };
export { ModuleCore, createModule };
