import { IInjectDecorators } from "./inject-decorators.interface";
import { injectable } from "./inject.decorators";
import { IResolveDecorators } from "./resolve-decorators.interface";
import { resolve } from "./resolve.decorators";
import { IDecorators } from "./decorators.interface";

export type { IInjectDecorators, IResolveDecorators, IDecorators };
export { injectable as inject, resolve };
