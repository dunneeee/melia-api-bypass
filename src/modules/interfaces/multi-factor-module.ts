import { Either2 } from "../result-handler";

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
