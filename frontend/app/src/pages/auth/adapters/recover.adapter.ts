/* import { BaseResponse } from '@types';
import { managerError } from '@utils';

export interface IResponseRecover {
  email: string;
}

export const ResetPassAdapter = (
  resp: BaseResponse<IResponseRecover | undefined>
): BaseResponse<IResponseRecover | undefined> => {
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
 */
