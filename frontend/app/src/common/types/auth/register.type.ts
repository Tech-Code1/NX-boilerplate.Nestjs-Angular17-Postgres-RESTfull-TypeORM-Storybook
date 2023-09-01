import { IUser } from './login.types';

export interface IRegisterUser {
  email: string;
  username: string;
  password: string;
}

export interface IRegisterResponse {
  Register_User: IUser;
}
