export type ICloneUtil = {
  clone: <T = any>(item: T) => T;
  cloneDeep: <T = any>(item: T) => T;
};
