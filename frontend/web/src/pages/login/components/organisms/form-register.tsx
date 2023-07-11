import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { Button, Input, Title } from '@ui/components';
import { handleInput } from '../../../../hooks';
import { useRegister } from '../../hooks/useRegister';

export const FormRegister = component$(() => {
  const {
    formRegister,
    emailErr,
    emailTouch,
    isFormValid,
    passwordErr,
    passwordTouch,
  } = useRegister();
  return (
    <>
      <Title style="title-2xl">Register Form</Title>
      <div class="w-full flex flex-col gap-4">
        <div class="relative">
          <Input
            value={formRegister.emai}
            errors={emailTouch.value ? emailErr.value : ''}
            name="email"
            type="text"
            placeholder="Email Address"
            titleLabel="Email Address"
            style="input-primary"
            onInput$={(e) => handleInput(e, formRegister, 'email')}
            onBlur$={() => (emailTouch.value = true)}
          />
        </div>
        <div class="relative">
          <Input
            value={formRegister.passwor}
            errors={passwordTouch.value ? passwordErr.value : ''}
            name="password"
            type="password"
            placeholder="Password"
            titleLabel="Password"
            style="input-primary"
            onInput$={(e) => handleInput(e, formRegister, 'password')}
            onBlur$={() => (passwordTouch.value = true)}
          />
        </div>
        <Link class="underline" href="/recover">
          have you forgotten your password ?
        </Link>
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
    </>
  );
});
