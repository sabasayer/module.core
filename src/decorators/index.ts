import { IInjectableDecorators } from "./types/injectable-decorators.interface";
import { InjectableDecorators } from "./injectable.decorators";
import { IResolveDecorators } from "./types/resolve-decorators.interface";
import { ResolveDecorators } from "./resolve.decorators";
import { IDecorator } from "./types/decorator.interface";
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
