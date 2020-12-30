import { urlUtils } from "@/utils/url.utils";
import { IAbortController } from "./abort-controller.interface";
import { IHTTPClient, IHTTPClientOptions } from "./index";
import { RequestError } from "./request-error";
import { EnumRequestErrorType } from "./statics/request-error-type.enum";

export class FetchHTTPClient implements IHTTPClient {
  private baseUrl: string;
  private headers?: Record<string, string>;
  private createErrorFn?: (response: Response) => Promise<Error>;

  constructor(options: IHTTPClientOptions) {
    this.baseUrl = this.createBaseUrl(options);
    this.headers = options.headers;
    this.createErrorFn = options.createErrorFn;
  }

  createAbortController() {
    return new AbortController();
  }

  async get<TResponse = undefined>(
    url: string,
    options?: { abortController: IAbortController }
  ): Promise<TResponse | undefined> {
    try {
      return await this.handleGet(url, options);
    } catch (e: unknown) {
      this.handleError(e);
    }
  }

  async post<TRequest, TResponse = undefined>(
    url: string,
    data?: TRequest,
    options?: { abortController: IAbortController }
  ): Promise<TResponse | undefined> {
    try {
      return await this.handlePost(url, data, options);
    } catch (e) {
      this.handleError(e);
    }
  }

  private createFetchInit(
    method: string,
    options?: { abortController: IAbortController },
    data?: unknown
  ): RequestInit {
    const abortController = options?.abortController as
      | AbortController
      | undefined;

    const body = data ? JSON.stringify(data) : undefined;
    return {
      method,
      headers: this.headers,
      body: body,
      signal: abortController?.signal,
    };
  }

  private async handlePost<TRequest, TResponse = undefined>(
    url: string,
    data?: TRequest,
    options?: { abortController: IAbortController }
  ): Promise<TResponse> {
    const init = this.createFetchInit("POST", options, data);
    const response = await fetch(`${this.baseUrl}${url}`, init);

    return this.handleResponse(response);
  }

  private async handleGet<TResponse = undefined>(
    url: string,
    options?: { abortController: IAbortController }
  ): Promise<TResponse> {
    const init = this.createFetchInit("GET", options);
    const response = await fetch(`${this.baseUrl}${url}`, init);

    return this.handleResponse(response);
  }

  private async handleResponse(response: Response) {
    if (!response.ok) {
      if (this.createErrorFn) throw await this.createErrorFn(response);

      const body = response.body ? ` ${response.body}` : "";
      throw new Error(`${response.status}: ${response.statusText}.${body}`);
    }

    return response.json();
  }

  private createBaseUrl(options: IHTTPClientOptions): string {
    if (options.baseUrl)
      return urlUtils.ensureLastCharacterToBeSlash(options.baseUrl);

    return urlUtils.createBaseUrl(options);
  }

  private handleError(error: unknown) {
    if (error instanceof DOMException && error.name == "AbortError") {
      throw new RequestError(EnumRequestErrorType.aborted);
    } else
      throw new RequestError(
        EnumRequestErrorType.serverError,
        (error as Error).message
      );
  }
}
