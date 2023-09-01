import { BaseResponse, IUser } from '@types';
import { managerError } from '@utils';

export const LoginAdapter = (
  resp: BaseResponse<IUser | undefined>
): BaseResponse<IUser | undefined> => {
  console.log('Response', resp);

  const { data, response } = resp;

  const { code, message, status, success } = response;

  if (!success) {
    return managerError(resp);
  }

  const { id, email, username, isActive, isBlocked, roles, token } =
    data as IUser;

  return {
    data: {
      id,
      email,
      username,
      isActive,
      isBlocked,
      roles,
      token,
    },
    response: {
      status,
      success,
      code,
      message,
    },
  };
};
