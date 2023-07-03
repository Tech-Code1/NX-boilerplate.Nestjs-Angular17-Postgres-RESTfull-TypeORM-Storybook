import { component$, useStylesScoped$ } from '@builder.io/qwik';
import {
  Form,
  routeAction$,
  z,
  zod$,
  type DocumentHead,
} from '@builder.io/qwik-city';
import { Code } from '@ui/components';
import { FormLogin } from '../../../pages/login/components/organisms/form-login';
import styles from './login.css?inline';

const Login = z.object({
  email: z.string().email(Code.INVALID_EMAIL),
  password: z.string().min(6, Code.TOO_SMALL),
});

type Login = z.infer<typeof Login>;

export const useLoginUserAction = routeAction$(
  async (data, { cookie, redirect }) => {
    const { email, password } = data;

    if (email === 'djjava1993@gmail.com' && password === '123456') {
      cookie.set('jwt', 'my json', { secure: true, path: '/' });
      redirect(302, '/');
    }
  },
  zod$(Login)
);

z.ZodError;
export default component$(() => {
  useStylesScoped$(styles);
  const action = useLoginUserAction();

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
