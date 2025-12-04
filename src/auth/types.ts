import { SubmittedDataDto } from "../modules/module-type";

export type RegisterUserFormDto = Partial<
  Omit<
    SubmittedDataDto,
    | "firstName"
    | "lastName1"
    | "lastName2"
    | "countryCode"
    | "nationality"
    | "email"
  >
> & {
  firstName: string;
  lastName: string;
  country: string;
  email: string;
};

export interface SentOtpResult {
  hash: string;
  destination: string;
  sendType: "EMAIL";
}
