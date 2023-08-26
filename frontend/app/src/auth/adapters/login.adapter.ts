import { BaseResponseType, ILoginResponse, IUser } from '@types';
import { Swal } from '@utils';

export const LoginAdapter = async (
  resp: ILoginResponse
): Promise<IUser | BaseResponseType | void> => {
  const { error } = Swal();
  const { success, code, status, message } = resp;

  if (!success) {
    return await error(message);
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
    success: success,
    code,
  };
};
