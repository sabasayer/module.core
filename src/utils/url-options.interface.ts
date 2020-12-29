export interface URLOptions {
  hostNames?: Record<string, string>;
  hostName?: string;
  protocol?: "http" | "https";
  prefix?: string;
  languagePrefix?: string;
}
