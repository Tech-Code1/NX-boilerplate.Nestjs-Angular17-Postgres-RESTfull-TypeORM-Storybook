export type CustomResponse = {
  status: number;
  code: string;
  success: boolean;
  message: string;
};

export type ResponseError = {
  data: object;
  response: CustomResponse;
};

export type ResponseSuccess<T> = {
  data: T;
  response: CustomResponse;
};

export type BaseResponse<T = undefined> = T extends undefined
  ? ResponseError
  : ResponseSuccess<T>;
