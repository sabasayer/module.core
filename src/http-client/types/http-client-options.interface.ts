import type { URLOptions } from "../../utils/types/url-options.interface";

export interface IHTTPClientOptions extends Partial<URLOptions> {
  baseUrl?: string;
  headers?: Record<string, string>;
  preventRequestDuplication?: boolean;
  createErrorFn?: (response: any) => Promise<Error>;
}
