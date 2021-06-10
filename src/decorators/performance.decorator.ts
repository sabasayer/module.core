import { globalModule } from "../global-module/global-module";

/**
 * Don't use with async methods
 */
export const measurePerformance = (
  target: any,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor
) => {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    const performanceUtil = globalModule.getPerformanceUtil();

    let res: any;

    const className = target.constructor.name;
    const name = `${className}:${String(propertyKey)}`;

    performanceUtil?.measureFunc(
      () => (res = originalMethod.apply(this, args)),
      name
    );

    return res;
  };

  return descriptor;
};
