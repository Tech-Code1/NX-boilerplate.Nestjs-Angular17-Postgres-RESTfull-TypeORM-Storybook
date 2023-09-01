import { ROLES } from '@db/constants';

export interface IUser {
  token?: string;
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
