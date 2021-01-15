import { IInjectableDecorators } from "./injectable-decorators.interface";
import { InjectableDecorators } from "./injectable.decorators";
import { IResolveDecorators } from "./resolve-decorators.interface";
import {  ResolveDecorators } from "./resolve.decorators";
import { IDecorators } from "./decorators.interface";

export type { IInjectableDecorators, IResolveDecorators, IDecorators };

export { InjectableDecorators, ResolveDecorators };
