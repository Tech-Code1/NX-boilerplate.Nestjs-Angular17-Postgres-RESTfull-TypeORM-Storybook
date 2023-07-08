import { globalAction$, zod$ } from '@builder.io/qwik-city';
import { BASE_API } from '@environments';
import axios from 'axios';
import { BaseResponseType } from '../models/types';
import { RECOVER_PASS } from '../pages/login/models/mutations';
import { Recover } from '../pages/login/models/schemas';
import { IEmail } from '../pages/login/models/types';

export const useRecoverService = globalAction$(async (data, { redirect }) => {
  const { email } = data;

  const recoverData = {
    emailInput: {
      email,
    },
  };

  const response = await axios
    .post<IEmail, BaseResponseType>(BASE_API, {
      query: RECOVER_PASS,
      variables: recoverData,
    })
    .then((response) => response);

  if (!response.success) {
    console.log('response error');
    redirect(302, '/recover');
    return;
  }

  if ('token' in response) {
    console.log('response success');
    redirect(302, '/login');
  }
}, zod$(Recover));
