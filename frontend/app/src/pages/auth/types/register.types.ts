import { ROLES } from '@db/constants';
import { IUser } from './login.types';

export interface IRegisterData {
  email: string;
  username: string;
  password: string;
}
export interface IUserResponse {
  email: string;
  username: string;
  deletedAt: string | null;
  firstName: string | null;
  lastName: string | null;
  age: number | null;
  timeBlocked: string | null;
  id: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  isBlocked: boolean;
  roles: ROLES[];
}

export interface IRegisterResponse {
  Register_User: IUser;
}
