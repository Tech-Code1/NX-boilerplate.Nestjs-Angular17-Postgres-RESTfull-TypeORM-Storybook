import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { Form, routeAction$, type DocumentHead } from '@builder.io/qwik-city';
import { FormLogin } from '../../../pages/login/components/organisms/form-login';
import styles from './login.css?inline';

export const useLoginUserAction = routeAction$((data, { cookie, redirect }) => {
  const { email, password } = data;
  if (email === 'djjava1993@gmail.com' && password === '123456') {
    cookie.set('jwt', 'my json', { secure: true, path: '/' });
    redirect(302, '/');
  }
});

export default component$(() => {
  useStylesScoped$(styles);
  const action = useLoginUserAction();

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
