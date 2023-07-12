import { globalAction$, zod$ } from '@builder.io/qwik-city';
import { BASE_API } from '@environments';
import axios from 'axios';
import { LoginAdapter } from '../pages/login/adapters/login.adapter';
import { REGISTER_USER } from '../pages/login/models/mutations/loginUser';
import { Login } from '../pages/login/models/schemas';
import { ILoginResponse, IUser } from '../pages/login/models/types';

export const useRegisterService = globalAction$(
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
        query: REGISTER_USER,
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
