export type TypeWithKey<T> = { [key: string]: T };

export const getValidationError = (errorCode: any) => {
  const codeMatcher: TypeWithKey<string> = {
    ERR_NETWORK: 'Network Error',
    ECONNREFUSED: 'Connection refused by a server',
    ENOTFOUND: 'Server or the requested resource could not be found',
    EACCES: 'Permission denied',
    EEXIST: 'File already exists',
    EINVAL: 'Invalid argument',
    ENOSPC: 'No enough space on the disk',
    EISDIR:
      'Read/write operation expected a file, but a directory was provided',
    ENOENT: 'No such file or directory',
    EMFILE: 'Too many open files',
    ETIMEDOUT: 'Connection timed out',
    EPERM: 'Operation not permitted',
    EAGAIN: 'Operation would block',
    EWOULDBLOCK: 'Operation would block',
    EBADF: 'Bad file descriptor',
    EINTR: 'Interrupted function call',
    ESRCH: 'No such process',
    EDEADLK: 'Resource deadlock avoided',
    ECHILD: 'No child processes',
    EPIPE: 'Broken pipe',
    ECONNRESET: 'Connection reset by peer',
    EDESTADDRREQ: 'Destination address required',
    EFAULT: 'Bad address',
    EHOSTUNREACH: 'No route to host',
    EINPROGRESS: 'Operation now in progress',
    ENETDOWN: 'Network is down',
    ENETUNREACH: 'Network is unreachable',
    ENOTCONN: 'Socket is not connected',
    EADDRINUSE: 'Address already in use',
    EADDRNOTAVAIL: 'Cannot assign requested address',
  };

  return codeMatcher[errorCode];
};
