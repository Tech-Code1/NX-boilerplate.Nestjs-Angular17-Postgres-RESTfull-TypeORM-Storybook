import { BaseResponseType } from '../models/types';

export const managerError = (resp: BaseResponseType): BaseResponseType => {
  const { success, code, message, status } = resp;

  return {
    message,
    success,
    code,
    status,
  };
};
