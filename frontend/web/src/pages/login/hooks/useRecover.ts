import { useComputed$, useSignal, useStore } from '@builder.io/qwik';
import { ErrorsType } from '../../../../../ui/components';
import { Recover } from '../models/schemas';

export const useRecover = () => {
  const formRecover = useStore<Recover>({
    email: '',
  });

  const emailTouched = useSignal<boolean>(false);

  const emailError = useComputed$((): ErrorsType | '' => {
    if (!formRecover.email.includes('@')) return 'INVALID_EMAIL';

    if (formRecover.email === '') return 'EMPTY';

    return '';
  });

  const isFormValid = useComputed$(() => {
    if (emailError.value !== '') return false;

    return true;
  });

  return {
    formRecover,
    emailTouched,
    emailError,
    isFormValid,
  };
};
