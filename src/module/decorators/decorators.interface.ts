import { ICoreModule } from "../index";

export interface IDecorators{
    setModule: (module: ICoreModule) => void;
}