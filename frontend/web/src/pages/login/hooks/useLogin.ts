import { useComputed$, useSignal, useStore } from '@builder.io/qwik';
import { ErrorsType } from '../../../../../ui/components';
import { Login } from '../models/schemas';

export const useLogin = () => {
  const formLogin = useStore<Login>({
    email: '',
    password: '',
  });

  const emailTouched = useSignal<boolean>(false);
  const passwordTouched = useSignal<boolean>(false);

  const emailError = useComputed$((): ErrorsType | '' => {
    if (!formLogin.email.includes('@')) return 'INVALID_EMAIL';

    if (formLogin.email === '') return 'EMPTY';

    return '';
  });

  const passwordError = useComputed$((): ErrorsType | '' => {
    if (formLogin.password.length < 6) return 'LENGTH_PASSWORD';

    if (formLogin.password === '') return 'EMPTY';

    return '';
  });

  const isFormValid = useComputed$(() => {
    if (emailError.value !== '' || passwordError.value !== '') return false;

    return true;
  });

  return {
    formLogin,
    emailTouched,
    passwordTouched,
    emailError,
    passwordError,
    isFormValid,
  };
};
