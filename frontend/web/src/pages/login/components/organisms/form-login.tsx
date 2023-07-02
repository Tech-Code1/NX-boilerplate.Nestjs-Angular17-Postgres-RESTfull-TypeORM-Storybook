import { component$ } from '@builder.io/qwik';
import { Button, Input, Title } from '@ui/components';

export const FormLogin = component$(() => {
  return (
    <>
      <Title style="title-2xl">Login Form</Title>
      <div class="w-full flex flex-col gap-4">
        <div class="relative">
          <Input
            name="email"
            type="text"
            placeholder="Email Address"
            titleLabel="Email Address"
            style="input-primary"
          />
        </div>
        <div class="relative">
          <Input
            name="password"
            type="password"
            placeholder="Password"
            titleLabel="Password"
            style="input-primary"
          />
        </div>
      </div>
      <div class="relative w-full">
        <Button style="button-primary" color="t-white" type="submit">
          Ingresar
        </Button>
      </div>
    </>
  );
});
