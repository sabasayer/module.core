import { IInjectDecorators } from "./inject-decorators.interface";
import { inject } from "./inject.decorators";
import { IResolveDecorators } from "./resolve-decorators.interface";
import { resolve } from "./resolve.decorators";
import { IDecorators } from "./decorators.interface";

export type { IInjectDecorators, IResolveDecorators, IDecorators };
export { inject, resolve };
