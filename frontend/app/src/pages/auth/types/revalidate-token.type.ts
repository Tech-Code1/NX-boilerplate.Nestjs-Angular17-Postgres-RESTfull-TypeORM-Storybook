import { IUser } from '.';

export interface IRevalidateTokenResponse {
  token: string;
  user: IUser;
}
