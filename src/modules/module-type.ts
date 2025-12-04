import { Either, Either2 } from "./result-handler";

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
}

export interface AuthModule {
  Z: {
    login: (form: LoginFormDto) => Promise<any>;
    registerUser: (form: RegisterFormDto) => Promise<any>;
  };
}

export interface CreateOperationOutForm {
  user: string;
  operationType: string;
  lang: string;
  countryNavigation: string;
}

export type CreateOperationResult = Either2<
  {
    kind: string;
  },
  {
    hash: string;
    destination: string;
    sendType: "EMAIL";
  }
>;

export interface MultiFactorModule {
  Z: {
    createOperationOut: (
      form: CreateOperationOutForm,
      captcha: string,
      unknownValue: unknown
    ) => Promise<CreateOperationResult>;
  };
}

export interface ConstantModule {
  vz: {
    REGISTRATION: string;
  };
}

export interface WebpackModuleMap {
  64630: AuthModule;
  20213: MultiFactorModule;
  49226: ConstantModule;
}

export type InferModuleType<
  ID extends string | number,
  T = any
> = ID extends keyof WebpackModuleMap ? WebpackModuleMap[ID] : T;
