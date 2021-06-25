import type { ICoreModule } from "../../module/index";

export type IDecorator = {
  setModule: (module: ICoreModule) => void;
};
