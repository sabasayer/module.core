import type { IInjectableDecorators } from "./types/injectable-decorators.interface";
import { InjectableDecorators } from "./injectable.decorators";
import type { IResolveDecorators } from "./types/resolve-decorators.interface";
import { ResolveDecorators } from "./resolve.decorators";
import type { IDecorator } from "./types/decorator.interface";
import { cloneArgs, cloneDeepArgs } from "./clone.decorators";
import { measurePerformance } from "./performance.decorator";

export type { IInjectableDecorators, IResolveDecorators, IDecorator };

export {
  InjectableDecorators,
  ResolveDecorators,
  cloneArgs,
  cloneDeepArgs,
  measurePerformance,
};
