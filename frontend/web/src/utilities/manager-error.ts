import { BaseResponseType } from '../models/types';

export const managerError = (
  resp: BaseResponseType
): BaseResponseType | null => {
  const { success, code, message, status } = resp;
  if (!success) {
    return {
      message,
      success,
      code,
      status,
    };
  }

  return null;
};
