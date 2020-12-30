import { URLOptions } from "./url-options.interface";

class URLUtils {
  createBaseUrl(options: URLOptions): string {
    const protocol = options.protocol ? `${options.protocol}:/` : "/";

    const currentHost = window.location.host;
    const hostName = options.hostName
      ? options.hostName
      : options.hostNames?.[currentHost];

    if (!hostName) throw "hostName or proper hostNames must be defined";

    const joined = [protocol, hostName, options.languagePrefix, options.prefix]
      .filter((e) => e)
      .join("/");

    return this.ensureLastCharacterToBeSlash(joined);
  }

  ensureLastCharacterToBeSlash(baseUrl: string): string {
    if (baseUrl[baseUrl.length - 1] != "/") return baseUrl + "/";
    return baseUrl;
  }
}

export const urlUtils = new URLUtils();
