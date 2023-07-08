import { component$ } from '@builder.io/qwik';
import { Button, Input, Title } from '@ui/components';
import { handleInput } from '../../../../hooks';
import { useRecover } from '../../hooks';

export const FormRecover = component$(() => {
  const { formRecover, emailError, emailTouched, isFormValid } = useRecover();
  return (
    <>
      <Title style="title-2xl">Recover password</Title>
      <div class="w-full flex flex-col gap-4">
        <div class="relative">
          <Input
            value={formRecover.email}
            errors={emailTouched.value ? emailError.value : ''}
            name="email"
            type="text"
            placeholder="Email Address"
            titleLabel="Email Address"
            style="input-primary"
            onInput$={(e) => handleInput(e, formRecover, 'email')}
            onBlur$={() => (emailTouched.value = true)}
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
          Enviar
        </Button>
      </div>
    </>
  );
});
