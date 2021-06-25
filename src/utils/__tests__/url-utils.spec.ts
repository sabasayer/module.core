import type { URLOptions } from "../types/url-options.interface";
import { urlUtils } from "../url.utils";

describe("URL Utils", () => {
  global.window = Object.create(window);

  Object.defineProperty(window, "location", {
    value: {
      host: "test.com",
    },
  });

  const testTable: [URLOptions, string][] = [
    [
      {
        protocol: "http",
        hostName: "test.com",
      },
      "http://test.com/",
    ],
    [
      {
        protocol: "https",
        hostName: "test.com",
      },
      "https://test.com/",
    ],
    [
      {
        hostName: "test.com",
      },
      "//test.com/",
    ],
    [
      {
        hostName: "test.com",
        prefix: "json",
      },
      "//test.com/json/",
    ],
    [
      {
        hostName: "test.com",
        prefix: "json",
        languagePrefix: "tr-tr",
      },
      "//test.com/tr-tr/json/",
    ],
    [
      {
        hostNames: {
          "test.com": "testapi.com",
        },
        prefix: "json",
        languagePrefix: "tr-tr",
      },
      "//testapi.com/tr-tr/json/",
    ],
  ];

  it.each(testTable)(
    "should use %j options and create %s",
    (options, expected) => {
      const result = urlUtils.createBaseUrl(options);
      expect(result).toBe(expected);
    }
  );

  it("should throw error if hostName and hostNames is not defined", () => {
    expect(() => urlUtils.createBaseUrl({})).toThrowError(
      "hostName or proper hostNames must be defined"
    );
  });
});
