import { component$ } from '@builder.io/qwik';
import { Button, Input, Title } from '@ui/components';
import { handleInput } from '../../../../hooks';
import { useRegister } from '../../hooks/useRegister';

export const FormRegister = component$(() => {
  const {
    formRegister,
    emailError,
    emailTouched,
    isFormValid,
    passwordError,
    passwordTouched,
    usernameError,
    usernameTouched,
  } = useRegister();
  return (
    <>
      <Title style="title-2xl">Register Form</Title>
      <div class="w-full flex flex-col gap-4">
        <div class="relative">
          <Input
            value={formRegister.email}
            errors={emailTouched.value ? emailError.value : ''}
            name="email"
            type="text"
            placeholder="Email Address"
            titleLabel="Email Address"
            style="input-primary"
            onInput$={(e) => handleInput(e, formRegister, 'email')}
            onBlur$={() => (emailTouched.value = true)}
          />
        </div>
        <div class="relative">
          <Input
            value={formRegister.username}
            errors={usernameTouched.value ? usernameError.value : ''}
            name="username"
            type="text"
            placeholder="Enter your username"
            titleLabel="Username"
            style="input-primary"
            onInput$={(e) => handleInput(e, formRegister, 'username')}
            onBlur$={() => (usernameTouched.value = true)}
          />
        </div>
        <div class="relative">
          <Input
            value={formRegister.password}
            errors={passwordTouched.value ? passwordError.value : ''}
            name="password"
            type="password"
            placeholder="Enter your password"
            titleLabel="Password"
            style="input-primary"
            onInput$={(e) => handleInput(e, formRegister, 'password')}
            onBlur$={() => (passwordTouched.value = true)}
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
          Sign in
        </Button>
      </div>
    </>
  );
});
