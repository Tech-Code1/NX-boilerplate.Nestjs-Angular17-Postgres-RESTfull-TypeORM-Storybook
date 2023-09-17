import { BaseResponse } from '@types';
import { managerError } from '@utils';
import { ILogin } from '../types';

export const LoginAdapter = (
  resp: BaseResponse<ILogin | undefined>
): BaseResponse<ILogin | undefined> => {
  const { data, response } = resp;

  const { code, message, status, success } = response;

  if (!success) {
    return managerError(resp);
  }

  const { token, user } = data as ILogin;

  return {
    data: {
      id: user.id,
      email: user.email,
      username: user.username,
      isActive: user.isActive,
      isBlocked: user.isBlocked,
      roles: user.roles,
      token: token,
    },
    response: {
      status,
      success,
      code,
      message,
    },
  };
};
