import { IHTTPClientConstuctor } from "@/api/http-client.interface";
import { IControllerConstructor } from "@/controller/index";
import { IProviderConstructor } from "@/provider/index";
import { IDecorators } from "./decorators.interface";

type PropDecoratorFunc = (target: any, key: string | symbol) => void;

export interface IResolveDecorators extends IDecorators {
  api: (api?: IHTTPClientConstuctor) => PropDecoratorFunc;
  provider: (provider: IProviderConstructor | string) => PropDecoratorFunc;
  controller: (controller: IControllerConstructor|string) => PropDecoratorFunc;
}
