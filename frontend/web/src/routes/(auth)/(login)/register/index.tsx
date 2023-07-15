import { component$ } from '@builder.io/qwik';
import { Form, type DocumentHead } from '@builder.io/qwik-city';
import { FormRegister } from '../../../../pages/login/components/organisms';
import { useRegisterService } from '../../../../pages/login/services';

export default component$(() => {
  const action = useRegisterService();

  return (
    <>
      <Form action={action} class="w-1/2 flex flex-col gap-6 items-center">
        <FormRegister />
      </Form>
    </>
  );
});

export const head: DocumentHead = {
  title: 'Boilerplate NX - Login',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
