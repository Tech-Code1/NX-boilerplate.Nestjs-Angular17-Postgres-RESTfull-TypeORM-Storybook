import * as jwt from 'jsonwebtoken';
import { IAuthTokenResult } from '../auth/interface/auth.interface';

export const useToken = (token: string) => {
  try {
    const { sub, role, exp } = jwt.decode(token) as IAuthTokenResult;

    const currentDate = new Date();
    const expireDate = new Date(exp);

    return {
      sub,
      role,
      isExpired: +expireDate <= +currentDate / 1000,
    };
  } catch (error) {
    return 'Token is invalid';
  }
};
