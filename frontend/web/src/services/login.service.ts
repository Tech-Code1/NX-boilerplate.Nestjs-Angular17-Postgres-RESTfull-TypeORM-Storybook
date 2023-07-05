import { globalAction$, z, zod$ } from '@builder.io/qwik-city';
import { BASE_API } from '@environments';
import { Code } from '@ui/components';
import axios from 'axios';
import { LOGIN_USER } from '../pages/login/models/mutations/loginUser';

const Login = z.object({
  email: z.string().email(Code.INVALID_EMAIL),
  password: z.string().min(6, Code.TOO_SMALL),
});

type Login = z.infer<typeof Login>;

export const useLogin = globalAction$(async (data, { cookie, redirect }) => {
  const { email, password } = data;
  console.log(BASE_API, 'BASE API');

  const loginData = {
    loginInput: {
      email,
      password,
    },
  };

  const response = await axios.post(`http://localhost:8000/graphql`, {
    query: LOGIN_USER,
    variables: loginData,
  });

  if (!data || !response) {
    redirect(302, '/login');
    return;
  }

  const token = response.data.data.login.token;

  cookie.set('TOKEN', token, { secure: true, path: '/' });
  redirect(302, '/dashboard');
}, zod$(Login));
