import { IInjectableDecorators } from "./injectable-decorators.interface";
import { injectable, InjectableDecorators } from "./injectable.decorators";
import { IResolveDecorators } from "./resolve-decorators.interface";
import { resolve, ResolveDecorators } from "./resolve.decorators";
import { IDecorators } from "./decorators.interface";

export type { IInjectableDecorators, IResolveDecorators, IDecorators };

export { injectable, resolve, InjectableDecorators, ResolveDecorators };
