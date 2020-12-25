import { IApiOptions } from "@/api/api-options.interface";
import { IApi } from "@/api/api.interface";
import { IController } from "@/controller/controller.interface";
import { IProvider } from "@/provider/provider.interface";
import { createModule } from "../create-module/create-module";
import { coreDecorators } from "../decorators/core-module.decorators";

export class TestApi implements IApi {
  constructor(options: IApiOptions) {}
}

export class TestProvider implements IProvider {
  constructor(api: IApi) {}
}

export class TestController implements IController {
  constructor(provider: IProvider) {}
}

export const createModuleAndRegisterTestApi = () => {
  const module = createModule();
  module.registerApi(TestApi, {});
  return module;
};

export const createAndUseDecorators = () => {
  const module = createModule();
  module.useDecorators(coreDecorators);
  return module;
};

export const createRegisterApiAndProvider = () => {
  const module = createModuleAndRegisterTestApi();
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
