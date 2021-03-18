import { IAbortController, IHTTPClient, RequestOptions } from "../http-client";
import { IProvider } from ".";
import { ProviderRequestOptions } from "./types/provider-request-options.interface";
import {
  ICachableRequestConfig,
  IRequestConfig,
} from "./types/request-config.interface";
import { ICache } from "../cache";
import { CustomProviderError } from "../custom-errors/custom-provider-error";
import { EnumCustomErrorType } from "../custom-errors";

export class CoreProvider implements IProvider {
  private client: IHTTPClient;
  private abortControllers = new Map<string, IAbortController>();
  protected baseUrl: string | null = null;
  protected cache?: ICache;

  constructor(client: IHTTPClient) {
    this.client = client;
  }

  async post<TRequest = undefined, TResponse = undefined>(
    config: IRequestConfig<TRequest, TResponse>,
    data?: TRequest,
    options?: ProviderRequestOptions
  ): Promise<TResponse | undefined> {
    let requestOptions = this.createRequestOptions(options);

    const computedUrl = this.createUrl(config.url);

    return this.tryClientRequest(
      () =>
        this.client.post<TRequest, TResponse>(
          computedUrl,
          data,
          requestOptions
        ),
      options
    );
  }

  async cachablePost<TRequest = undefined, TResponse = undefined>(
    config: ICachableRequestConfig<TRequest, TResponse>,
    data?: TRequest,
    options?: ProviderRequestOptions
  ): Promise<TResponse | undefined> {
    if (!this.cache)
      throw new CustomProviderError({
        type: EnumCustomErrorType.Construction,
        message: "'cache' property must be defined.",
      });

    const cached = this.getFromCache<TResponse>(config.cacheKey);
    if (cached != undefined) return cached;

    const response = await this.post(config, data, options);

    this.saveToCache(config.cacheKey, response);

    return response;
  }

  async get<TResponse = undefined>(
    url: string,
    options?: ProviderRequestOptions
  ): Promise<TResponse | undefined> {
    let requestOptions = this.createRequestOptions(options);

    const computedUrl = this.createUrl(url);

    return this.tryClientRequest(
      () => this.client.get<TResponse>(computedUrl, requestOptions),
      options
    );
  }

  async upload<TResponse = undefined>(
    url: string,
    formData: FormData
  ): Promise<TResponse | undefined> {
    const computedUrl = this.createUrl(url);

    return this.client.upload<TResponse>(computedUrl, formData);
  }

  protected getFromCache<T>(key: string) {
    return this.cache?.get(key) as T | undefined;
  }

  protected saveToCache<T>(key: string, value: T) {
    if (value != undefined) this.cache?.set(key, value);
  }

  private createUrl(url: string) {
    return this.baseUrl ? `${this.baseUrl}/${url}` : url;
  }

  private async tryClientRequest<TResponse>(
    request: () => Promise<TResponse | undefined>,
    options?: ProviderRequestOptions
  ) {
    try {
      const response = await request();
      this.clearAbortControllers(options);

      return response;
    } catch (e) {
      this.clearAbortControllers(options);

      throw e;
    }
  }

  private createRequestOptions(
    options?: ProviderRequestOptions
  ): RequestOptions {
    let requestOptions: RequestOptions = {};

    requestOptions.abortController = this.handleAbortAndCreateAbortController(
      options
    );

    return requestOptions;
  }

  private handleAbortAndCreateAbortController(
    options?: ProviderRequestOptions
  ) {
    if (!options?.raceId || !this.client.createAbortController) return;

    let abortController = this.getAndAbortRacerRequests(options.raceId);

    abortController = this.client.createAbortController();
    this.abortControllers.set(options.raceId, abortController);

    return abortController;
  }

  private getAndAbortRacerRequests(raceId: string) {
    let abortController = this.abortControllers.get(raceId);
    if (abortController) abortController.abort();

    return abortController;
  }

  private clearAbortControllers(options?: ProviderRequestOptions) {
    if (!options?.raceId) return;

    this.abortControllers.delete(options?.raceId);
  }
}
