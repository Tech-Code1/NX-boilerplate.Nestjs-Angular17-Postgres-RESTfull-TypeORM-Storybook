import { useComputed$, useSignal, useStore } from '@builder.io/qwik';
import { ErrorsType } from '../../../../../ui/components';
import { ResetPass } from '../models/schemas';

export const useResetPass = () => {
  const formResetPass = useStore<ResetPass>({
    password: '',
    repeatPass: '',
  });

  const passwordTouched = useSignal<boolean>(false);
  const repeatPassTouched = useSignal<boolean>(false);

  const passwordError = useComputed$((): ErrorsType | '' => {
    if (formResetPass.password.length < 6) return 'LENGTH_ERROR';

    if (formResetPass.password === '') return 'EMPTY';

    return '';
  });

  const repeatPassError = useComputed$((): ErrorsType | '' => {
    if (formResetPass.repeatPass.length < 6) return 'LENGTH_ERROR';

    if (formResetPass.repeatPass === '') return 'EMPTY';

    return '';
  });

  const isFormValid = useComputed$(() => {
    if (repeatPassError.value !== '' || passwordError.value !== '')
      return false;

    return true;
  });

  return {
    formResetPass,
    repeatPassTouched,
    passwordTouched,
    repeatPassError,
    passwordError,
    isFormValid,
  };
};
