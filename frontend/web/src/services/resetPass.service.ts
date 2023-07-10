import { globalAction$, zod$ } from '@builder.io/qwik-city';
import { BASE_API } from '@environments';
import axios from 'axios';
import { ResetPassAdapter } from '../pages/login/adapters';
import { RESET_PASS } from '../pages/login/models/mutations/loginUser';
import { ResetPass } from '../pages/login/models/schemas';
import { IResetPass, IResetPassResponse } from '../pages/login/models/types';

export const useResetPass = globalAction$(async (data, { redirect, query }) => {
  const { password } = data;
  const id = query.get('id');
  const token = query.get('token');

  const resetPassData = {
    userId: id,
    password,
    token,
  };

  const response = await axios
    .post<IResetPass, IResetPassResponse>(BASE_API, {
      query: RESET_PASS,
      variables: resetPassData,
    })
    .then((response) => ResetPassAdapter(response));

  console.log(response, 'response');

  if (response.success) {
    console.log('Password reset successful');
    redirect(302, '/login');
    return;
  }

  if (!response.success) {
    console.log('response error');
    return;
  }
}, zod$(ResetPass));
