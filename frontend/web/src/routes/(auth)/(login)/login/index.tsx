import { component$ } from '@builder.io/qwik';
import { Form, type DocumentHead } from '@builder.io/qwik-city';
import { FormLogin } from '../../../../pages/login/components/organisms/form-login';
import { useLoginService } from '../../../../pages/login/services';

export default component$(() => {
  const action = useLoginService();

  return (
    <>
      <Form action={action} class="w-1/2 flex flex-col gap-6 items-center">
        <FormLogin />
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
