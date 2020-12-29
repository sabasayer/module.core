import { IApiOptions } from "@/api/api-options.interface";
import { IApi } from "@/api/api.interface";
import { IController } from "@/controller/controller.interface";
import { IProvider } from "@/provider/provider.interface";
import { createModule } from "../create-module/create-module";
import { inject } from "../decorators/inject.decorators";
import { resolve } from "../decorators/resolve.decorators";
import { ICoreModule } from "../index";

export class TestApi implements IApi {
  constructor(options: IApiOptions) {}

  async get(url:string){}
}

export class TestProvider implements IProvider {
  constructor(api: IApi) {}
}

export class TestController implements IController {
  constructor(provider: IProvider) {}
}

export const createRegisterApi = (moduleArg?: ICoreModule) => {
  const module = moduleArg ?? createModule();
  module.registerApi(TestApi, {});
  return module;
};

export const createAndUseInject = () => {
  const module = createModule();
  module.useDecorators(inject);
  return module;
};

export const createAndUseResolve = () => {
  const module = createModule();
  module.useDecorators(resolve);
  return module;
};

export const createRegisterApiAndUseResolve = () => {
  const module = createAndUseResolve();
  return createRegisterApi(module);
};

export const createRegisterApiAndProvider = () => {
  const module = createRegisterApi();
  module.registerProvider(TestProvider);
  return module;
};

export const createRegisterController = () => {
  const module = createRegisterApiAndProvider();
  module.registerController(TestController, {
    provider: TestProvider,
  });
  return module;
};
