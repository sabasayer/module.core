import { IInjectDecorators } from "./inject-decorators.interface";
import { injectable } from "./inject.decorators";
import { IResolveDecorators } from "./resolve-decorators.interface";
import { resolve } from "./resolve.decorators";
import { IDecorators } from "./decorators.interface";

export type { IInjectDecorators, IResolveDecorators, IDecorators };
<<<<<<< HEAD
export { injectable, resolve };
=======
export { injectable as inject, resolve };
>>>>>>> a4d0e8cff15630a08845a7a6bcfb6121dbbede7b
