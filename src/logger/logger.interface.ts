export type ILogger = {
  log: (...args: any[]) => void;

  logMethod: (ignoreArguments?:boolean) => MethodDecorator;
};
