import { BaseResponseType } from '../models/types';

export const managerError = (resp: BaseResponseType): BaseResponseType => {
  if (!resp) {
    throw new Error('No response object provided');
  }

  const { success, code, message, status } = resp;

  return {
    message,
    success,
    code,
    status,
  };
};
