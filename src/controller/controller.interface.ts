export type IController = {};

export type IControllerConstructor<TController extends IController> = new (
  ...args: any[]
) => TController;
