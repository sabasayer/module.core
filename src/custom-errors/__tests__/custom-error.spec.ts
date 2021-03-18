import { globalModule } from "@/global-module/global-module";
import { defaultLocalization } from "@/localization/default-localization";
import { EnumAppLayer } from "@/shared";
import { CustomError } from "..";
import { EnumCustomErrorType } from "../statics/custom-error-type.enum";

describe("Custom Error", () => {
  it("should translate message", () => {
    globalModule.clear();
    defaultLocalization.setLang("tr");
    defaultLocalization.setTranslations({ tr: { hi: "Merhaba" } });
    globalModule.setLocalization(defaultLocalization);

    const error = new CustomError({
      layer: EnumAppLayer.Controller,
      type: EnumCustomErrorType.Construction,
      message: "hi",
      translate: true,
    });
    const message = error.message;
    expect(message).toEqual("Merhaba");
  });
});
