import { urlUtils } from "../utils/url.utils";
import { IHTTPClient, IHTTPClientOptions } from "./index";
import { RequestError } from "./request-error";
import { RequestOptions } from "./types/request-options.interface";
import { EnumRequestErrorType } from "./statics/request-error-type.enum";

export class FetchHTTPClient implements IHTTPClient {
  private baseUrl: string;
  private headers?: Record<string, string>;
  private createErrorFn?: (response: Response) => Promise<Error>;
  private pendingRequests = new Map<string, Promise<Response>>();
  private preventRequestDuplication?: boolean;

  constructor(options: IHTTPClientOptions) {
    this.baseUrl = this.createBaseUrl(options);
    this.headers = options.headers;
    this.createErrorFn = options.createErrorFn;
    this.preventRequestDuplication = options.preventRequestDuplication;
  }

  createAbortController() {
    return new AbortController();
  }

  getPendingRequests() {
    return this.pendingRequests;
  }

  async get<TResponse = undefined>(
    url: string,
    options?: RequestOptions
  ): Promise<TResponse | undefined> {
    try {
      return await this.handleGet(url, options);
    } catch (e) {
      this.handleError(e, url);
    }
  }

  async post<TRequest, TResponse = undefined>(
    url: string,
    data?: TRequest,
    options?: RequestOptions
  ): Promise<TResponse | undefined> {
    const key = this.createKey(url, data);

    try {
      return await this.handlePost({
        url,
        data,
        options,
        key,
      });
    } catch (e) {
      this.handleError(e, key);
    }
  }

  async upload<TResponse = undefined>(
    url: string,
    formData: FormData
  ): Promise<TResponse | undefined> {
    try {
      return this.handleUpload(url, formData);
    } catch (e) {
      this.handleError(e, url);
    }
  }

  setHeader(key: string, value: string) {
    if (!this.headers) this.headers = {};

    this.headers[key] = value;
  }

  removeHeader(key: string) {
    delete this.headers?.[key];

    const isHeadersEmpty = !Object.keys(this.headers ?? {}).length;

    if (isHeadersEmpty) this.headers = undefined;
  }

  private async handleUpload<TResponse = undefined>(
    url: string,
    formData: FormData
  ): Promise<TResponse> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: "POST",
      headers: {
        ...this.headers,
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });

    return this.handleResponse(response);
  }

  private createFetchInit(
    method: string,
    options?: RequestOptions,
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

  private async handlePost<TRequest, TResponse = undefined>(options: {
    url: string;
    key: string;
    data?: TRequest;
    options?: RequestOptions;
  }): Promise<TResponse> {
    const pendingRequest = this.pendingRequests.get(options.key);
    const init = this.createFetchInit("POST", options.options, options.data);

    let response: Response = await this.createResponse({
      url: options.url,
      init,
      key: options.key,
      pendingRequest,
    });

    this.pendingRequests.delete(options.key);

    return this.handleResponse(response);
  }

  private createKey(url: string, data?: any) {
    return `${url}_${data ? JSON.stringify(data) : ""}`;
  }

  private async handleGet<TResponse = undefined>(
    url: string,
    options?: RequestOptions
  ): Promise<TResponse> {
    const pendingRequest = this.pendingRequests.get(url);
    const init = this.createFetchInit("GET", options);

    let response: Response = await this.createResponse({
      url,
      init,
      key: url,
      pendingRequest,
    });

    this.pendingRequests.delete(url);

    return this.handleResponse(response);
  }

  private async createResponse(options: {
    url: string;
    init: RequestInit;
    key: string;
    pendingRequest?: Promise<Response>;
  }): Promise<Response> {
    if (options.pendingRequest) return await options.pendingRequest;

    const request = fetch(`${this.baseUrl}${options.url}`, options.init);

    if (this.preventRequestDuplication)
      this.pendingRequests.set(options.key, request);

    return await request;
  }

  private async handleResponse(response: Response) {
    if (response.ok) return response.json();

    await this.handleResponseError(response);
  }

  private async handleResponseError(response: Response) {
    if (this.createErrorFn) throw await this.createErrorFn(response);

    const body = response.body ? ` ${response.body}` : "";
    throw new Error(`${response.status}: ${response.statusText}.${body}`);
  }

  private handleError(error: unknown, key: string) {
    this.pendingRequests.delete(key);

    if (error instanceof DOMException && error.name == "AbortError")
      throw new RequestError(EnumRequestErrorType.aborted);

    throw new RequestError(
      EnumRequestErrorType.serverError,
      (error as Error).message
    );
  }

  private createBaseUrl(options: IHTTPClientOptions): string {
    if (options.baseUrl)
      return urlUtils.ensureLastCharacterToBeSlash(options.baseUrl);

    return urlUtils.createBaseUrl(options);
  }
}
