import { IAbortController, IHTTPClient, RequestOptions } from "@/http-client";
import { IProvider } from ".";
import { ProviderRequestOptions } from "./provider-request-options.interface";

export class CoreProvider implements IProvider {
  private client: IHTTPClient;
  private abortControllers = new Map<string, IAbortController>();

  constructor(client: IHTTPClient) {
    this.client = client;
  }

  async post<TRequest = undefined, TResponse = undefined>(
    url: string,
    data?: TRequest,
    options?: ProviderRequestOptions
  ) {
    let requestOptions = this.createRequestOptions(options);

    return this.tryClientRequest(
      () => this.client.post<TRequest, TResponse>(url, data, requestOptions),
      options
    );
  }

  async get<TResponse = undefined>(
    url: string,
    options?: ProviderRequestOptions
  ) {
    let requestOptions = this.createRequestOptions(options);

    return this.tryClientRequest(
      () => this.client.get<TResponse>(url, requestOptions),
      options
    );
  }

  async upload<TResponse = undefined>(url: string, formData: FormData) {
    return this.client.upload<TResponse>(url, formData);
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
