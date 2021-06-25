import type { ICloneUtil } from "./types/clone-util.interface";
import cloneDeep from "lodash/cloneDeep";

class DefaultCloneUtil implements ICloneUtil {
  clone<T = any>(item: T): T {
    if (item instanceof Array) return [...item] as any;
    else if (typeof item === "object") return { ...item };
    return item;
  }

  cloneDeep<T>(item: T) {
    return cloneDeep(item);
  }
}

export const defaultCloneUtil = new DefaultCloneUtil();
