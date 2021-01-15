export type ILogger = {
  log: (...args: any[]) => void;

  logMethod: () => MethodDecorator;
};
