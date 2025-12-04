import { CreateOperationOutForm } from "../modules/module-type";
import { WebpackRequire } from "../modules/webpack-require";
import { Captcha, CaptchaActionEnum } from "./captcha";
import { SentOtpResult } from "./types";

export class AuthService {
  async sentOtp(email: string, country: string): Promise<SentOtpResult> {
    const payload: CreateOperationOutForm = {
      countryNavigation: country,
      lang: "en",
      operationType: WebpackRequire.ConstantModule.vz.REGISTRATION,
      user: email,
    };

    const captchaToken = await Captcha.solve(CaptchaActionEnum.REGISTRATION);

    const { value } =
      await WebpackRequire.MultiFactorModule.Z.createOperationOut(
        payload,
        captchaToken,
        undefined
      );

    if (value.kind === "left")
      throw new Error(`Error sending OTP: ${value.leftValue.kind}`);

    return value.rightValue;
  }
}
