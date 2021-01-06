import { IAbortController } from "./abort-controller.interface";

export interface RequestOptions {
  abortController: IAbortController;
}
