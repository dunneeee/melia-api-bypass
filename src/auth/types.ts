import { SubmittedDataDto } from "../modules/interfaces/auth-module";

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

export interface OperationData {
  hash: string;
  destination: string;
  otp: string;
}
