import { Track } from "../ui/decorators/track";
import { UITrackerEventEnum } from "../ui/ui-tracker-event";

export enum CaptchaActionEnum {
  REGISTRATION = "registration",
  REGISTRATION_SUBMIT = "registration_submit",
  LOGIN = "login",
}

export class Captcha {
  static readonly SITE_KEY = "6Lf4fvciAAAAAK-gukUvV3cdhY8HM-ECrDRXUzCr";

  @Track(UITrackerEventEnum.CAPTCHA)
  static async solve(action: CaptchaActionEnum): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (typeof window.grecaptcha === "undefined") {
        reject(new Error("grecaptcha is not loaded"));
      }

      window.grecaptcha.ready(() => {
        window.grecaptcha
          .execute(Captcha.SITE_KEY, { action })
          .then((token: string) => {
            resolve(token);
          })
          .catch((error: any) => {
            reject(error);
          });
      });
    });
  }
}
