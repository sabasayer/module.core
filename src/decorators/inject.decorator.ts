import { defineInjectionTokenMetaData } from "./reflection.helper";

export const inject = (token: string) => defineInjectionTokenMetaData(token);
