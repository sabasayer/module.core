import { IHTTPClientConstuctor } from "@/http-client/types/http-client.interface";
import { IControllerConstructor } from "@/controller/index";
import { IProviderConstructor } from "@/provider/index";
import { IDecorators } from "./decorators.interface";
import { ICacheConstructor } from "@/cache/cache.interface";

type PropDecoratorFunc = (target: any, key: string | symbol) => void;

export interface IResolveDecorators extends IDecorators {
  api: (api?: IHTTPClientConstuctor) => PropDecoratorFunc;
  provider: (provider: IProviderConstructor | string) => PropDecoratorFunc;
  controller: (
    controller: IControllerConstructor | string
  ) => PropDecoratorFunc;
  cache: (cache: ICacheConstructor | string) => PropDecoratorFunc;
}
