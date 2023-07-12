import { useComputed$, useSignal, useStore } from '@builder.io/qwik';
import { ErrorsType } from '../../../../../ui/components';
import { Register } from '../models/schemas';

export const useRegister = () => {
  const formRegister = useStore<Register>({
    email: '',
    username: '',
    password: '',
  });

  const emailTouched = useSignal<boolean>(false);
  const usernameTouched = useSignal<boolean>(false);
  const passwordTouched = useSignal<boolean>(false);

  const emailError = useComputed$((): ErrorsType | '' => {
    if (!formRegister.email.includes('@')) return 'INVALID_EMAIL';

    if (formRegister.email === '') return 'EMPTY';

    return '';
  });

  const usernameError = useComputed$((): ErrorsType | '' => {
    if (formRegister.username.length < 3) return 'LENGTH_ERROR';

    if (formRegister.username === '') return 'EMPTY';

    return '';
  });

  const passwordError = useComputed$((): ErrorsType | '' => {
    if (formRegister.password.length < 6) return 'LENGTH_ERROR';

    if (formRegister.password === '') return 'EMPTY';

    return '';
  });

  const isFormValid = useComputed$(() => {
    if (
      emailError.value !== '' ||
      passwordError.value !== '' ||
      usernameError.value !== ''
    )
      return false;

    return true;
  });

  return {
    formRegister,
    emailTouched,
    passwordTouched,
    usernameTouched,
    emailError,
    passwordError,
    isFormValid,
    usernameError,
  };
};
