import { Either2 } from "../result-handler";

export interface LoginFormDto {
  user: string;
  password: string;
  lang: string;
  countryNavigation: string;
  rememberMe: false;
}

export interface SubmittedDataDto {
  email: string;
  password: string;
  firstName: string;
  lastName1: string;
  lastName2: string | null;
  nationality: string;
  birthDate: string;
  countryCode: string;
  prefix: string;
  phone: string;
  registerPublicity: boolean;
}

export interface RegisterFormDto {
  submittedData: SubmittedDataDto;
  operationId: string;
  user: string;
  verificationCode: string;
  tokenCaptcha: string;
  countryCaptcha: string;
  memberReferred?: {
    refererMemberId?: string;
    loyaltyToken: string;
  };
}

export type RegisterUserResult = Either2<
  {
    kind: string;
  },
  boolean
>;

export type LoginUserResult = {
  logged: "OK" | "GENERIC_ERROR" | (string & {});
};

export interface AuthModule {
  Z: {
    login: (form: LoginFormDto, captcha: string) => Promise<LoginUserResult>;
    registerUser: (form: RegisterFormDto) => Promise<RegisterUserResult>;
  };
}

export interface AuthActionModule {
  Z: {
    logoutUser: () => Promise<boolean>;
  };
}
