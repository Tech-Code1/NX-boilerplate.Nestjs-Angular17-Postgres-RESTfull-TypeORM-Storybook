import { IAuthTokenResult, IUseToken } from "../auth/interface/auth.interface";
import * as jwt from 'jsonwebtoken';

export const useToken = (token: string): IUseToken | string => {
    try {
        const { sub, role, exp } = jwt.decode(token) as IAuthTokenResult;

        const currentDate = new Date();
        const expireDate = new Date(exp);

        return {
            sub,
            role,
            isExpired: +expireDate <= +currentDate / 1000
        }
    } catch (error) {
        return 'Token is invalid'
    }
}