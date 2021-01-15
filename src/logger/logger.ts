import { ILogger } from "./logger.interface";

export class Logger implements ILogger {
  private logStyle = "";
  private disabled = false;

  constructor(options?: { disabled?: boolean; logStyle?: string }) {
    this.logStyle = options?.logStyle ?? "";
    this.disabled = options?.disabled ?? false;
  }

  disable() {
    this.disabled = true;
  }

  enable() {
    this.disabled = false;
  }

  log(...args: any[]) {
    if (this.disabled) return;

    const nonObjects = args.filter((e) => typeof e !== "object");
    const objects = args.filter((e) => typeof e === "object");

    const mapped = nonObjects.flatMap((e) => [`%c${e}`, this.logStyle]);

    console.log(...mapped, ...objects);
  }

  logMethod(): MethodDecorator {
    return (target: Object, propertyKey, descriptor: PropertyDescriptor) => {
      const originalMethod = descriptor.value;
      const self = this;
      descriptor.value = function (...args: any[]) {
        let header = `${String(propertyKey)}()`;

        if (target.constructor?.name)
          header = `${target.constructor.name} => ${header}`;

        self.log(header, ...args);
        return originalMethod?.apply(this, args);
      };
      return descriptor;
    };
  }
}
