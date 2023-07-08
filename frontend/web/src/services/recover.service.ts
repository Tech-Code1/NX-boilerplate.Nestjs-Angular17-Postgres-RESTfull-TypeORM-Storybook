import { globalAction$, zod$ } from '@builder.io/qwik-city';
import { BASE_API } from '@environments';
import axios from 'axios';
import { RECOVER_PASS } from '../pages/login/models/mutations';
import { Recover } from '../pages/login/models/schemas';
import { IEmail, IRecoverResponse } from '../pages/login/models/types';

export const useRecoverService = globalAction$(async (data, { redirect }) => {
  const { email } = data;

  const recoverData = {
    email,
  };

  const response = await axios
    .post<IEmail, IRecoverResponse>(BASE_API, {
      query: RECOVER_PASS,
      variables: recoverData,
    })
    .then((response) => response);

  if (!response.success) {
    console.log('response error');
    redirect(302, '/recover');
    return;
  }

  if (response.success) {
    console.log('response success');
    redirect(302, '/login');
  }
}, zod$(Recover));
