import { IHTTPClientConstuctor } from "../../http-client/types/http-client.interface";
import { IControllerConstructor } from "../../controller/index";
import { IProvider, IProviderConstructor } from "../../provider/index";
import { IDecorators } from "./decorators.interface";
import { ICacheConstructor } from "../../cache/cache.interface";

type PropDecoratorFunc = (target: any, key: string | symbol) => void;

export type IResolveDecorators = IDecorators & {
  client: (client?: IHTTPClientConstuctor) => PropDecoratorFunc;
  provider: (provider: IProviderConstructor | string) => PropDecoratorFunc;
  controller: <TProvider extends IProvider>(
    controller: IControllerConstructor<TProvider> | string
  ) => PropDecoratorFunc;
  cache: (cache: ICacheConstructor | string) => PropDecoratorFunc;
};
