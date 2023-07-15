import { BaseResponseType } from '../../../models/types';
import { managerError } from '../../../utilities';
import { IResetPassResponse } from '../models/types';

export const ResetPassAdapter = (
  resp: IResetPassResponse
): BaseResponseType => {
  const { Password_Change, success, code, status } = resp;

  if (!success) {
    return managerError(resp);
  }

  return {
    message: Password_Change.message,
    status,
    success,
    code,
  };
};
