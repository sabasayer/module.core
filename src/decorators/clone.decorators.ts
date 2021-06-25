import { globalModule } from "../global-module/global-module";

const cloneDecorator = (
  deep: boolean,
  _: any,
  __: string | symbol,
  descriptor: PropertyDescriptor
): PropertyDescriptor => {
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

export const cloneArgs = (
  target: any,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor
): PropertyDescriptor => {
  return cloneDecorator(false, target, propertyKey, descriptor);
};

export const cloneDeepArgs = (
  target: any,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor
): PropertyDescriptor => {
  return cloneDecorator(true, target, propertyKey, descriptor);
};
