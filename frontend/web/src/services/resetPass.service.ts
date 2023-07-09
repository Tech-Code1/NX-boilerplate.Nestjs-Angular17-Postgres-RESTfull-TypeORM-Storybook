import { globalAction$, zod$ } from '@builder.io/qwik-city';
import { BASE_API } from '@environments';
import axios from 'axios';
import { RESET_PASS } from '../pages/login/models/mutations/loginUser';
import { ResetPass } from '../pages/login/models/schemas';
import { IResetPass, IResetPassResponse } from '../pages/login/models/types';

export const useResetPass = globalAction$(
  async (data, { cookie, redirect, request }) => {
    const { password, repeatPass } = data;

    const loginData = {
      loginInput: {
        password,
        repeatPass,
      },
    };

    const response = await axios
      .post<IResetPass, IResetPassResponse>(BASE_API, {
        query: RESET_PASS,
        variables: loginData,
      })
      .then((response) => response);

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
  zod$(ResetPass)
);
