import { useComputed$, useSignal, useStore } from '@builder.io/qwik';
import { ErrorsType } from '../../../../../ui/components';
import { Register } from '../models/schemas';

export const useRegister = () => {
  const formRegister = useStore<Register>({
    emai: '',
    passwor: '',
  });

  const emailTouch = useSignal<boolean>(false);
  const passwordTouch = useSignal<boolean>(false);

  const emailErr = useComputed$((): ErrorsType | '' => {
    if (!formRegister.emai.includes('@')) return 'INVALID_EMAIL';

    if (formRegister.emai === '') return 'EMPTY';

    return '';
  });

  const passwordErr = useComputed$((): ErrorsType | '' => {
    if (formRegister.passwor.length < 6) return 'LENGTH_PASSWORD';

    if (formRegister.passwor === '') return 'EMPTY';

    return '';
  });

  const isFormValid = useComputed$(() => {
    if (emailErr.value !== '' || passwordErr.value !== '') return false;

    return true;
  });

  return {
    formRegister,
    emailTouch,
    passwordTouch,
    emailErr,
    passwordErr,
    isFormValid,
  };
};
