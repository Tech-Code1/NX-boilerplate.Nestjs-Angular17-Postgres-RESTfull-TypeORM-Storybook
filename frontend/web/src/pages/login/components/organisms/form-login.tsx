import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { Button, Input, Title } from '@ui/components';
import { handleInput } from '../../../../hooks';
import { useLogin } from '../../hooks/useLogin';

export const FormLogin = component$(() => {
  const {
    formLogin,
    emailError,
    emailTouched,
    isFormValid,
    passwordError,
    passwordTouched,
  } = useLogin();
  return (
    <>
      <Title style="title-2xl">Login Form</Title>
      <div class="w-full flex flex-col gap-4">
        <div class="relative">
          <Input
            value={formLogin.email}
            errors={emailTouched.value ? emailError.value : ''}
            name="email"
            type="text"
            placeholder="Email Address"
            titleLabel="Email Address"
            style="input-primary"
            onInput$={(e) => handleInput(e, formLogin, 'email')}
            onBlur$={() => (emailTouched.value = true)}
          />
        </div>
        <div class="relative">
          <Input
            value={formLogin.password}
            errors={passwordTouched.value ? passwordError.value : ''}
            name="password"
            type="password"
            placeholder="Password"
            titleLabel="Password"
            style="input-primary"
            onInput$={(e) => handleInput(e, formLogin, 'password')}
            onBlur$={() => (passwordTouched.value = true)}
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
