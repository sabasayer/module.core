import type { IHTTPClientConstuctor } from "../../http-client/types/http-client.interface";
import type {
  IController,
  IControllerConstructor,
} from "../../controller/index";
import type { IProvider, IProviderConstructor } from "../../provider/index";
import type { IDecorator } from "./decorator.interface";
import type { KeyUnionType } from "../../module/core-module.interface";

type PropDecoratorFunc = (target: any, key: string | symbol) => void;

export type IResolveDecorators = IDecorator & {
  resolve: (key: KeyUnionType) => PropDecoratorFunc;
  client: (client?: IHTTPClientConstuctor) => PropDecoratorFunc;
  provider: (provider: IProviderConstructor | string) => PropDecoratorFunc;
  controller: <TController extends IController, TProvider extends IProvider>(
    controller: IControllerConstructor<TController, TProvider> | string
  ) => PropDecoratorFunc;
};
