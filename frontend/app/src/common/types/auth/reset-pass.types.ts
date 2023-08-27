import { BaseResponseType } from '../../../common/types/reponses.type';

export interface IResetPassResponse extends BaseResponseType {
  Password_Change: { message: string };
}
export interface IResetPass extends BaseResponseType {
  password: string;
  repeatPass: string;
}
