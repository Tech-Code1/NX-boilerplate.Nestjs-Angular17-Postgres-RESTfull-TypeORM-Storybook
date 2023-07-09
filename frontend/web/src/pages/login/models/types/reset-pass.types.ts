import { BaseResponseType } from '../../../../models/types';

export interface IResetPassResponse extends BaseResponseType {
  message: string;
}
export interface IResetPass extends BaseResponseType {
  password: string;
  repeatPass: string;
}
