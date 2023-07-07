import { ROLES } from '@db/constants';
import { BaseResponseType } from '../../../../models/types';

export interface IUser extends BaseResponseType {
  token: string;
  id: string;
  email: string;
  username: string;
  isActive: boolean;
  isBlocked: boolean;
  roles: ROLES[];
}

export interface ILogin {
  token: string;
  user: IUser;
}

export interface ILoginResponse extends BaseResponseType {
  login: ILogin;
}
