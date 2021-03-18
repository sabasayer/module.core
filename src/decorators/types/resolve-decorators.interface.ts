import { IHTTPClientConstuctor } from "../../http-client/types/http-client.interface";
import { IControllerConstructor } from "../../controller/index";
import { IProvider, IProviderConstructor } from "../../provider/index";
import { IDecorator } from "./decorator.interface";
import { ICacheConstructor } from "../../cache/cache.interface";
import { KeyUnionType } from "../../module/core-module.interface";

type PropDecoratorFunc = (target: any, key: string | symbol) => void;

export type IResolveDecorators = IDecorator & {
  resolve: (key: KeyUnionType) => PropDecoratorFunc;
  client: (client?: IHTTPClientConstuctor) => PropDecoratorFunc;
  provider: (provider: IProviderConstructor | string) => PropDecoratorFunc;
  controller: <TProvider extends IProvider>(
    controller: IControllerConstructor<TProvider> | string
  ) => PropDecoratorFunc;
  cache: (cache: ICacheConstructor | string) => PropDecoratorFunc;
};
