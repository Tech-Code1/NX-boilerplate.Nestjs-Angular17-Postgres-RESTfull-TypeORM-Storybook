import { component$ } from '@builder.io/qwik';
import { Form, type DocumentHead } from '@builder.io/qwik-city';
import { FormResetPass } from '../../../pages/login/components/organisms';
import { useResetPass } from '../../../services';

export default component$(() => {
  const action = useResetPass();

  return (
    <>
      <Form action={action} class="w-1/2 flex flex-col gap-6 items-center">
        <FormResetPass />
      </Form>
    </>
  );
});

export const head: DocumentHead = {
  title: 'Boilerplate NX - Reset Password',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
