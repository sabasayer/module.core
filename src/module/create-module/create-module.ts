import { ICoreModule } from "../core-module.interface";
import { ModuleCore } from "../core-module";

export type CreateModuleFunc<TOptions = undefined> = (
  options?: TOptions
) => ICoreModule;

export const createModule: CreateModuleFunc = () => {
  return new ModuleCore();
};
