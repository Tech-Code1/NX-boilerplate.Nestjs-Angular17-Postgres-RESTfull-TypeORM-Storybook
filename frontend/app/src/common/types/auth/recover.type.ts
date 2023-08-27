import { BaseResponseType } from '../../../common/types/reponses.type';

export interface IRecoverResponse extends BaseResponseType {
  message: string;
}
export interface IEmail extends BaseResponseType {
  email: string;
}
