import {
  LoginFormDto,
  RegisterFormDto,
} from "../modules/interfaces/auth-module";
import { CreateOperationOutForm } from "../modules/interfaces/multi-factor-module";
import { WebpackRequire } from "../modules/webpack-require";
import { Track } from "../ui/decorators/track";
import { UITrackerEventEnum } from "../ui/ui-tracker-event";
import { Country } from "../utils/country";
import { Generator } from "../utils/generator";
import { Captcha, CaptchaActionEnum } from "./captcha";
import { OperationData, RegisterUserFormDto, SentOtpResult } from "./types";

export class AuthService {
  static readonly DEFAULT_PASSWORD = "Melia@123456";
  @Track(UITrackerEventEnum.AUTH_SERVICE)
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

  @Track(UITrackerEventEnum.AUTH_SERVICE)
  async submitRegistration(
    form: RegisterUserFormDto,
    operationData: OperationData
  ) {
    const { prefix } = Country.getOrDefaultCountry(form.country);
    const tokenCaptcha = await Captcha.solve(
      CaptchaActionEnum.REGISTRATION_SUBMIT
    );
    const payload: RegisterFormDto = {
      countryCaptcha: form.country,
      operationId: operationData.hash,
      user: form.email,
      verificationCode: operationData.otp,
      tokenCaptcha,
      submittedData: {
        birthDate: Generator.generateRandomDateStringWithLimit(),
        countryCode: form.country,
        prefix,
        email: form.email,
        firstName: form.firstName,
        lastName1: form.lastName,
        lastName2: null,
        nationality: form.country,
        password: form.password || AuthService.DEFAULT_PASSWORD,
        phone: Generator.generateRandomPhoneNumber(),
        registerPublicity: false,
      },
    };

    if (form.loyaltyToken) {
      payload.memberReferred = {
        loyaltyToken: form.loyaltyToken,
        refererMemberId: undefined,
      };
    }

    const { value } = await WebpackRequire.AuthModule.Z.registerUser(payload);

    if (value.kind === "left")
      throw new Error(`Registration failed: ${value.leftValue.kind}`);

    return value.rightValue;
  }

  @Track(UITrackerEventEnum.AUTH_SERVICE)
  async loginUser(email: string, password: string, country: string) {
    const payload: LoginFormDto = {
      countryNavigation: country,
      lang: "en",
      password,
      user: email,
      rememberMe: false,
    };

    const captchaToken = await Captcha.solve(CaptchaActionEnum.LOGIN);
    const result = await WebpackRequire.AuthModule.Z.login(
      payload,
      captchaToken
    );

    if (result.logged !== "OK")
      throw new Error(`Login failed: ${result.logged}`);

    return true;
  }

  @Track(UITrackerEventEnum.AUTH_SERVICE)
  async logoutUser() {
    const module = WebpackRequire.AuthActionModule;
    if (!module) throw new Error("AuthLogoutModule not found");
    return await module.Z.logoutUser();
  }
}
