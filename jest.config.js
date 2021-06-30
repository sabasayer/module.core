const esModules = ['@sabasayer/utils'].join('|');

export default {
  preset: "ts-jest/presets/js-with-ts",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "@/(.*)$": "<rootDir>/src/$1",
  },
  setupFiles: ["mock-local-storage"],
  transformIgnorePatterns: [`node_modules/(?!(${esModules})/)`],
};
