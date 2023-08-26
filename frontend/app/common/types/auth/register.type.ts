import { BaseResponseType } from '../../../common/types/reponses.type';
import { IUser } from './login.types';

export interface IRegisterUser extends BaseResponseType {
  email: string;
  username: string;
  password: string;
}

export interface IRegisterResponse extends BaseResponseType {
  Register_User: IUser;
}
