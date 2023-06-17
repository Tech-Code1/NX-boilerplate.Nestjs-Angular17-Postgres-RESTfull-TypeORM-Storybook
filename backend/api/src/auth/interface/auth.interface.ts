import { ROLES } from 'backend/database/src/constants/interfaces.entities';

export interface IPayloadToken {
  id: number;
  role: ROLES;
}

export interface IAuthBody {
  username: string;
  password: string;
}

export interface IAuthTokenResult {
  role: string;
  sub: string;
  iat: number;
  exp: number;
}

export interface IUseToken {
  role: string;
  sub: number;
  isExpired: boolean;
}
