import { BaseResponseType } from '../../../models/types';
import { managerError } from '../../../utilities';
import { ILoginResponse, IUser } from '../models/types';

export const LoginAdapter = (
  resp: ILoginResponse
): IUser | BaseResponseType => {
  const { success, code, status } = resp;

  if (!success) {
    return managerError(resp);
  }

  const { login } = resp;
  const { user, token } = login;

  return {
    token,
    id: user.id,
    email: user.email,
    username: user.username,
    isActive: user.isActive,
    isBlocked: user.isBlocked,
    roles: user.roles,
    status,
    success,
    code,
  };
};
