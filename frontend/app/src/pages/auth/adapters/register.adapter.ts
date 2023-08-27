import { BaseResponseType, IRegisterResponse, IUser } from '@types';
import { Swal } from '@utils';

export const RegisterAdapter = async (
  resp: IRegisterResponse
): Promise<IUser | BaseResponseType | void> => {
  const { error } = Swal();
  const { Register_User, success, code, status, message } = resp;

  if (!success) {
    return await error(message);
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
