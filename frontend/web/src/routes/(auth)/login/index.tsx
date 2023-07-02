import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { Form, routeAction$, type DocumentHead } from '@builder.io/qwik-city';
import { FormLogin } from '../../../pages/login/components/organisms/form-login';
import styles from './login.css?inline';

export const useLoginUserAction = routeAction$((data, event) => {
  //const { email, password } = await data;
  console.log(data, 'data');

  return {
    sucess: true,
    jwtToken: 'my json',
  };
});

export default component$(() => {
  useStylesScoped$(styles);
  const action = useLoginUserAction();

  return (
    <>
      <Form action={action} class="w-1/2 flex flex-col gap-6 items-center">
        <FormLogin />
        <code>{JSON.stringify(action.value, undefined, 2)}</code>
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
