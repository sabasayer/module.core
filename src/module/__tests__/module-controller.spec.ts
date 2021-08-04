import {
  createRegisterProvider,
  createRegisterController,
  TestController,
} from "../__mocks__/module.mock";

describe("Module Controller", () => {
  it("should register controller", () => {
    const module = createRegisterProvider();

    module.registerController(TestController);

    const controller = module.resolveController("TestController");

    expect(controller).toBeInstanceOf(TestController);
  });

  it("should register with key", () => {
    const module = createRegisterProvider();
    module.registerController(TestController, {
      key: "test_controller",
    });

    const controller = module.resolveController("test_controller");

    expect(controller).toBeInstanceOf(TestController);
  });

  it("should resolve by class", () => {
    const module = createRegisterController();

    const controller = module.resolveController(TestController);

    expect(controller).toBeInstanceOf(TestController);
  });
});
