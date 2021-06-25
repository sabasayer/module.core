import "reflect-metadata";
import type { IControllerConstructor } from "@/controller";

export const getParamInfo = (controller: IControllerConstructor<any, any>) => {
  return Reflect.getMetadata("design:paramtypes", controller) || [];
};
