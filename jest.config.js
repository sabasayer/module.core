export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "@/(.*)$": "<rootDir>/src/$1",
  },
  setupFiles: ["mock-local-storage"],
};
