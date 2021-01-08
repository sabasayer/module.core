import { IAbortController } from "./abort-controller.interface";

export type RequestOptions = {
  abortController?: IAbortController;
};
