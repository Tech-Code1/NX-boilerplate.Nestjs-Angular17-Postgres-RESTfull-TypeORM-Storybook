import { globalAction$, zod$ } from '@builder.io/qwik-city';
import { BASE_API } from '@environments';
import axios from 'axios';
import { LoginAdapter } from '../adapters';
import { LOGIN_USER } from '../models/mutations';
import { Login } from '../models/schemas';
import { ILoginResponse, IUser } from '../models/types';

export const useLoginService = globalAction$(
  async (data, { cookie, redirect }) => {
    const { email, password } = data;

    const loginData = {
      loginInput: {
        email,
        password,
      },
    };

    const response = await axios
      .post<IUser, ILoginResponse>(BASE_API, {
        query: LOGIN_USER,
        variables: loginData,
      })
      .then((response) => LoginAdapter(response));

    if (!response.success) {
      console.log('response error');
      redirect(302, '/login');
      return;
    }

    if ('token' in response) {
      console.log('response success');
      const token = response.token;

      if (token) {
        cookie.set('TOKEN', token, { secure: true, path: '/' });
        redirect(302, '/dashboard');
      }
    }
  },
  zod$(Login)
);
