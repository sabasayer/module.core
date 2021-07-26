import "reflect-metadata";
import type { IClassConstructor } from "@/shared";

export const INJECTION_TOKEN_METADATA_KEY = "injectionTokens";

export const getConstructorArgNames = (target: IClassConstructor) => {
  const types = Reflect.getMetadata("design:paramtypes", target) || [];

  const injectionTokens =
    Reflect.getOwnMetadata(INJECTION_TOKEN_METADATA_KEY, target) || {};
    Object.keys(injectionTokens).forEach((key) => {
      types[+key] = injectionTokens[key];
    });

  return types;
};

export const getConstructorArgNamesAfterFirst = (target: IClassConstructor) => {
  const [, ...dependencies] = getConstructorArgNames(target);
  return dependencies;
};

export const defineInjectionTokenMetaData =
  (token: string) =>
  (target: any, _propertyKey: string | symbol, parameterIndex: number) => {
    const descriptors =
      Reflect.getOwnMetadata(INJECTION_TOKEN_METADATA_KEY, target) || {};

    descriptors[parameterIndex] = token;

    Reflect.defineMetadata(INJECTION_TOKEN_METADATA_KEY, descriptors, target);
  };
