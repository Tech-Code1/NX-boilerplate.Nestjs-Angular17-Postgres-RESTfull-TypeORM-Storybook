import { component$, useStore } from '@builder.io/qwik';
import { Button, Input, Title } from '@ui/components';
import { handleInput } from '../../../../hooks';

export const FormLogin = component$(() => {
  const formState = useStore({
    email: '',
    password: '',
  });

  return (
    <>
      <Title style="title-2xl">Login Form</Title>

      <div class="w-full flex flex-col gap-4">
        <div class="relative">
          <Input
            id="email"
            name="email"
            type="text"
            placeholder="Password"
            label="Email Address"
            titleLabel="Email Address"
            style="input-primary"
            onInput$={(e) => handleInput(e, formState, 'email')}
          />
        </div>
        <div class="relative">
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            label="Password"
            titleLabel="Password"
            style="input-primary"
            onInput$={(e) => handleInput(e, formState, 'password')}
          />
        </div>
      </div>
      <div class="relative w-full">
        <Button style="button-primary" color="t-white">
          Ingresar
        </Button>
      </div>
      <code>{JSON.stringify(formState, undefined, 2)}</code>
    </>
  );
});
