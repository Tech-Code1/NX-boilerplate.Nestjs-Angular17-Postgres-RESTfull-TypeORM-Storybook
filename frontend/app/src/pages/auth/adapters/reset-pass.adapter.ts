import { BaseResponse } from '@types';
import { managerError } from '@utils';

export const ResetPassAdapter = (
  resp: BaseResponse<object | undefined>
): BaseResponse<object | undefined> => {
  const { data, response } = resp;

  const { code, message, status, success } = response;

  if (!success) {
    return managerError(resp);
  }

  return {
    data: {},
    response: {
      status,
      success,
      code,
      message,
    },
  };
};
