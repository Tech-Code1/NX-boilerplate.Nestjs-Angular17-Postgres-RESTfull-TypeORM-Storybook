import { BaseResponseType } from '../../../../models/types';

export interface IRecoverResponse extends BaseResponseType {
  message: string;
}
export interface IEmail extends BaseResponseType {
  email: string;
}
