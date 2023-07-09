import { component$ } from '@builder.io/qwik';
import { Button, Input, Title } from '@ui/components';
import { handleInput } from '../../../../hooks';
import { useResetPass } from '../../hooks';

export const FormResetPass = component$(() => {
  const {
    formResetPass,
    isFormValid,
    passwordError,
    passwordTouched,
    repeatPassError,
    repeatPassTouched,
  } = useResetPass();
  return (
    <>
      <Title style="title-2xl">Change password</Title>
      <div class="w-full flex flex-col gap-4">
        <div class="relative">
          <Input
            value={formResetPass.password}
            errors={passwordTouched.value ? passwordError.value : ''}
            name="password"
            type="password"
            placeholder="Password"
            titleLabel="Password"
            style="input-primary"
            onInput$={(e) => handleInput(e, formResetPass, 'password')}
            onBlur$={() => (passwordTouched.value = true)}
          />
        </div>
        <div class="relative">
          <Input
            value={formResetPass.repeatPass}
            errors={repeatPassTouched.value ? repeatPassError.value : ''}
            name="repeatPass"
            type="password"
            placeholder="Repeat password"
            titleLabel="Repeat password"
            style="input-primary"
            onInput$={(e) => handleInput(e, formResetPass, 'repeatPass')}
            onBlur$={() => (repeatPassTouched.value = true)}
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
          Aceptar
        </Button>
      </div>
    </>
  );
});
