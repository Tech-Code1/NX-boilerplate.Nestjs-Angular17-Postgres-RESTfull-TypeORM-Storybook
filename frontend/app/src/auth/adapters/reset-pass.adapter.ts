import { BaseResponseType, IResetPassResponse } from '@types';
import { Swal } from '@utils';

export const ResetPassAdapter = async (
  resp: IResetPassResponse
): Promise<BaseResponseType | void> => {
  const { error } = Swal();
  const { success, code, status } = resp;

  if (!success) {
    return await error(resp.message);
  }

  const { Password_Change } = resp;
  const { message } = Password_Change;

  return {
    message,
    status,
    success,
    code,
  };
};
