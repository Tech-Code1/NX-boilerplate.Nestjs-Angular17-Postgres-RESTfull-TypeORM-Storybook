import { BaseResponseType } from '../../../../models/types';
import { IUser } from './login.types';

/* export interface IResetPassResponse extends BaseResponseType {
  Register_User: IRegisterUser;
} */
export interface IRegisterUser extends BaseResponseType {
  email: string;
  username: string;
  password: string;
}

export interface IRegisterResponse extends BaseResponseType {
  Register_User: IUser;
}
