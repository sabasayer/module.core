import { globalModule } from "../global-module/global-module";

const cloneDecorator = (deep: boolean) => (): MethodDecorator => {
  return function (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const cloneUtil = globalModule.getCloneUtil();

      const newArgs = cloneUtil
        ? args.map((arg) =>
            deep ? cloneUtil.cloneDeep(arg) : cloneUtil.clone(arg)
          )
        : args;

      return originalMethod.apply(this, newArgs);
    };

    return descriptor;
  };
};

export const clone = cloneDecorator(false);
export const cloneDeep = cloneDecorator(true);
