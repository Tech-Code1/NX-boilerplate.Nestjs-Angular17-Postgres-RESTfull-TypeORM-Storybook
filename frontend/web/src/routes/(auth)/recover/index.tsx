import { component$ } from '@builder.io/qwik';
import { Form, type DocumentHead } from '@builder.io/qwik-city';
import { FormRecover } from '../../../pages/login/components/organisms';
import { useRecoverService } from '../../../pages/login/services';

export default component$(() => {
  const action = useRecoverService();

  return (
    <>
      <Form action={action} class="w-1/2 flex flex-col gap-6 items-center">
        <FormRecover />
      </Form>
    </>
  );
});

export const head: DocumentHead = {
  title: 'Boilerplate NX - Recover',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
