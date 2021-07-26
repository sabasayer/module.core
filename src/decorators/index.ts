import type { IInjectableDecorators } from "./types/injectable-decorators.interface";
import { InjectableDecorators } from "./injectable.decorators";
import type { IDecorator } from "./types/decorator.interface";
import { cloneArgs, cloneDeepArgs } from "./clone.decorators";
import { measurePerformance } from "./performance.decorator";
import { inject } from "./inject.decorator";

export type { IInjectableDecorators, IDecorator };

export {
  InjectableDecorators,
  cloneArgs,
  cloneDeepArgs,
  measurePerformance,
  inject,
};
