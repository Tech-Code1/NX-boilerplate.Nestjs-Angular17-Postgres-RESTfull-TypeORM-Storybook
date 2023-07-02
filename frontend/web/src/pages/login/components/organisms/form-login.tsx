import { $, component$, useComputed$, useStore } from '@builder.io/qwik';
import type { ErrorsType } from '@ui/components';
import { Button, Input, Title } from '@ui/components';
import { handleInput } from '../../../../hooks';
import { LoginType } from '../../interfaces/login.interfaces';

export const FormLogin = component$(() => {
  const formLogin = useStore<LoginType>({
    email: '',
    password: '',
    formSubmit: false,
  });

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

  const onSubmit = $(() => {
    formLogin.formSubmit = true;
    const { email, password } = formLogin;

    console.log({ isFormValid: isFormValid.value });
  });
  return (
    <form
      onSubmit$={onSubmit}
      class="w-1/2 flex flex-col gap-6 items-center"
      preventdefault:submit
    >
      <Title style="title-2xl">Login Form</Title>

      <div class="w-full flex flex-col gap-4">
        <div class="relative">
          <Input
            value={formLogin.email}
            errors={formLogin.formSubmit ? emailError.value : ''}
            name="email"
            type="text"
            placeholder="Password"
            titleLabel="Email Address"
            style={'input-primary'}
            onInput$={(e) => handleInput(e, formLogin, 'email')}
          />
        </div>
        <div class="relative">
          <Input
            value={formLogin.password}
            errors={formLogin.formSubmit ? passwordError.value : ''}
            name="password"
            type="password"
            placeholder="Password"
            titleLabel="Password"
            style="input-primary"
            onInput$={(e) => handleInput(e, formLogin, 'password')}
          />
        </div>
      </div>
      <div class="relative w-full">
        <Button
          style="button-primary"
          color="t-white"
          type="submit"
          disabled={!isFormValid.value}
        >
          Ingresar
        </Button>
      </div>
      <code>{JSON.stringify(formLogin, undefined, 2)}</code>
    </form>
  );
});
