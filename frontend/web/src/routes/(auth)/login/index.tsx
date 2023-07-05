import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { Form, type DocumentHead } from '@builder.io/qwik-city';
import { FormLogin } from '../../../pages/login/components/organisms/form-login';
import { useLogin } from '../../../services/login.service';
import styles from './login.css?inline';

export default component$(() => {
  useStylesScoped$(styles);
  const action = useLogin();

  return (
    <>
      <Form action={action} class="w-1/2 flex flex-col gap-6 items-center">
        <FormLogin />
        <code>{JSON.stringify(action.value?.fieldErrors, undefined, 2)}</code>
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
