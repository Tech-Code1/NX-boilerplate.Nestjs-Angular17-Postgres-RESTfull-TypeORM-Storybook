import swal from 'sweetalert2';

export const Swal = () => {
  const success = (text = 'Success'): Promise<void> => {
    return new Promise((res, rej) => {
      swal
        .fire({
          title: 'Succes',
          text: text,
          icon: 'success',
        })
        .then(() => res())
        .catch((ex) => rej(ex));
    });
  };

  const httpError = (
    code: number,
    text: string | null = null
  ): Promise<void> => {
    let message = text;

    if (text === null) {
      switch (code) {
        case 403:
          message = 'Forbidden';
          break;

        case 404:
          message = 'Not Found';
          break;

        case 401:
          message = 'Unauthorize';
          break;

        case 500:
          message = 'Error Server';
          break;

        default:
          message = 'Error';
          break;
      }
    }

    return new Promise((res, rej) => {
      swal
        .fire({
          title: code.toString(),
          icon: 'error',
          text: message!,
        })
        .then(() => res())
        .catch((ex) => rej(ex));
    });
  };

  const error = (text = 'Something goes wrong!'): Promise<void> => {
    return new Promise((res, rej) => {
      swal
        .fire({
          title: 'Error!',
          icon: 'error',
          text: text,
        })
        .then(() => res())
        .catch((ex) => rej(ex));
    });
  };

  const warning = (text = 'Warning!'): Promise<void> => {
    return new Promise((res, rej) => {
      swal
        .fire({
          title: 'Warning!',
          icon: 'warning',
          text: text,
        })
        .then(() => res())
        .catch((ex) => rej(ex));
    });
  };

  const info = (text = 'Info!'): Promise<void> => {
    return new Promise((res, rej) => {
      swal
        .fire({
          title: 'Info!',
          icon: 'info',
          text: text,
        })
        .then(() => res())
        .catch((ex) => rej(ex));
    });
  };

  const confirmation = (
    text: string | undefined = undefined
  ): Promise<boolean> => {
    return new Promise((res, rej) => {
      swal
        .fire({
          title: 'Are you sure?',
          text: text,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
          reverseButtons: true,
        })
        .then((response) => {
          if (response.isConfirmed) {
            res(true);
          } else {
            res(false);
          }
        })
        .catch((ex) => rej(ex));
    });
  };

  return {
    success,
    error,
    warning,
    info,
    confirmation,
    httpError,
  };
};
