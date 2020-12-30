import { URLOptions } from "@/utils/url-options.interface";

export interface IHTTPClientOptions extends Partial<URLOptions> {
  baseUrl?: string;
  headers?: Record<string, string>;
  createErrorFn?: (response: Response) => Promise<Error>;
}
