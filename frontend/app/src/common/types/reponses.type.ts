export type OptionalResponseType = {
  status: number;
  code: string;
  success: boolean;
  message: string;
};

export type BaseResponseType = Partial<OptionalResponseType>;
