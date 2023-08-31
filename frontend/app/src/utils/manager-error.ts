import Swal from 'sweetalert2';
import { BaseResponse } from '../common';

export const managerError = (resp: BaseResponse): BaseResponse => {
  const { data, response } = resp;

  if (!response) {
    return {
      data: {},
      response: {
        status: 500,
        success: false,
        code: 'UNKNOWN_ERROR',
        message: 'Unknown error',
      },
    };
  }

  const { code, message, status, success } = response;

  console.log('paso por acá');

  Swal.fire('An error has occurred', `${message}`, 'error');

  return {
    data: data ?? {},
    response: {
      message,
      success,
      code,
      status,
    },
  };
};
