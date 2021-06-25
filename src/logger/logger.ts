import type { ILogger } from "./logger.interface";

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

    const nonObjects = args.filter((e) => this.isPrimativeValue(e));
    const objects = args.filter((e) => !this.isPrimativeValue(e));

    const joined = nonObjects.map((e) => String(e)).join(" ");

    const primativeArgs = nonObjects.length
      ? [`%c${joined}`, this.logStyle]
      : [];

    console.log(...primativeArgs, ...objects);
  }

  logMethod(): MethodDecorator {
    return (target: Object, propertyKey, descriptor: PropertyDescriptor) => {
      const originalMethod = descriptor.value;
      const self = this;
      descriptor.value = function (...args: any[]) {
        let header = self.createHeader(propertyKey, target);

        self.log(header, ...args);

        return originalMethod?.apply(this, args);
      };
      return descriptor;
    };
  }

  private isPrimativeValue(value: any) {
    return typeof value !== "object" && typeof value !== "function";
  }

  private createHeader(propKey: string | symbol, target: Object): string {
    let header = `${String(propKey)}()`;

    if (target.constructor?.name)
      header = `${target.constructor.name} => ${header}`;

    return header;
  }
}
