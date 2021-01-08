import { ICoreModule } from "./core-module.interface";
import { ModuleCore } from "./module";
import { createModule } from "./create-module/create-module";

export * from "./decorators/index";
export type { ICoreModule };
export { ModuleCore, createModule };
