import { ROLES } from '@db/constants';
import { BaseResponseType } from '../../../common';

export interface IUser extends BaseResponseType {
  token?: string;
  id: string;
  email: string;
  username: string;
  isActive: boolean;
  isBlocked: boolean;
  roles: ROLES[];
}
export interface ILoginResponse {
  data: IUser;
  response: BaseResponseType;
}

export interface ILogin {
  token: string;
  user: IUser;
}

export interface ILoginData {
  email: string;
  password: string;
}
