import { globalAction$, zod$ } from '@builder.io/qwik-city';
import { BASE_API } from '@environments';
import axios from 'axios';
import { LOGIN_USER } from '../pages/login/models/mutations/loginUser';
import { Login } from '../pages/login/models/schemas';

export const useLogin = globalAction$(
  async (data, { cookie, redirect, request }) => {
    const { email, password } = data;

    const loginData = {
      loginInput: {
        email,
        password,
      },
    };

    const response = await axios.post(BASE_API, {
      query: LOGIN_USER,
      variables: loginData,
    });

    if (!data || !response) {
      redirect(302, '/login');
      return;
    }

    console.log(response, 'response finally');

    const token = response.data?.token;

    if (token) {
      cookie.set('TOKEN', token, { secure: true, path: '/' });
    }

    redirect(302, '/dashboard');
  },
  zod$(Login)
);
