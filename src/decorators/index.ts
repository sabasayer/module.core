import { IInjectableDecorators } from "./types/injectable-decorators.interface";
import { InjectableDecorators } from "./injectable.decorators";
import { IResolveDecorators } from "./types/resolve-decorators.interface";
import {  ResolveDecorators } from "./resolve.decorators";
import { IDecorator } from "./types/decorator.interface";

export type { IInjectableDecorators, IResolveDecorators, IDecorator as IDecorators };

export { InjectableDecorators, ResolveDecorators };
