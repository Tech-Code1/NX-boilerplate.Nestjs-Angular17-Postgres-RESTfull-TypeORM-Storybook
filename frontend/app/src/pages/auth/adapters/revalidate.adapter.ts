import { BaseResponse } from '@types';
import { managerError } from '@utils';
import { IRevalidateTokenResponse } from '../types';

export const RevalidateAdapter = (
  resp: BaseResponse<IRevalidateTokenResponse | undefined>
): BaseResponse<IRevalidateTokenResponse | undefined> => {
  const { data, response } = resp;

  const { code, message, status, success } = response;

  if (!success) {
    return managerError(resp);
  }

  const { token, user } = data as IRevalidateTokenResponse;

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
