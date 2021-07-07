import "reflect-metadata";
import type { IControllerConstructor } from "@/controller";
import type { IClassConstructor } from "@/shared";

export const getParamInfo = (controller: IControllerConstructor<any, any>) => {
  return Reflect.getMetadata("design:paramtypes", controller) || [];
};

export const getConstructorArgNames = (target: IClassConstructor) => {
  const types = Reflect.getMetadata("design:paramtypes", target) || [];
  return types?.map((e: any) => e.name);
};

export const getConstructorArgNamesAfterFirst = (target: IClassConstructor) => {
  const [, ...dependencies] = getConstructorArgNames(target);
  return dependencies;
};
