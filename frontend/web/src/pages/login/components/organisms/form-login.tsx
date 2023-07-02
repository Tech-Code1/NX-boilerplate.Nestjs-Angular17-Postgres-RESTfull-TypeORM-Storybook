import { $, component$, useStore } from '@builder.io/qwik';
import { Button, Input, Title } from '@ui/components';
import { handleInput } from '../../../../hooks';
import { LoginType } from '../../interfaces/login.interfaces';

export const FormLogin = component$(() => {
  const formLogin = useStore<LoginType>({
    email: '',
    password: '',
  });

  const onSubmit = $(() => {
    const { email, password } = formLogin;

    console.log(email, password);
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
            name="email"
            type="text"
            placeholder="Password"
            titleLabel="Email Address"
            style="input-primary"
            onInput$={(e) => handleInput(e, formLogin, 'email')}
          />
        </div>
        <div class="relative">
          <Input
            value={formLogin.password}
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
        <Button style="button-primary" color="t-white" type="submit">
          Ingresar
        </Button>
      </div>
      <code>{JSON.stringify(formLogin, undefined, 2)}</code>
    </form>
  );
});
