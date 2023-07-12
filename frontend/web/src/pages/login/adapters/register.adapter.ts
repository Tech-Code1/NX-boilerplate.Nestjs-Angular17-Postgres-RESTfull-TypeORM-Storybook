import { BaseResponseType } from '../../../models/types';
import { managerError } from '../../../utilities';
import { IRegisterResponse, IUser } from '../models/types';

export const RegisterAdapter = (
  resp: IRegisterResponse
): IUser | BaseResponseType => {
  const { Register_User, success, code, status } = resp;

  if (!success) {
    const error = managerError(resp);
    if (error) {
      return error;
    }
  }

  return {
    id: Register_User.id,
    email: Register_User.email,
    username: Register_User.username,
    isActive: Register_User.isActive,
    isBlocked: Register_User.isBlocked,
    roles: Register_User.roles,
    status,
    success,
    code,
  };
};
