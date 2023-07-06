import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { getValidationError } from '../../../utilities';

export const AxiosInterceptor = () => {
  const updateHeader = (request: AxiosRequestConfig) => {
    request.headers = {
      ...request.headers,
      'Content-Type': 'application/json',
    };

    return Promise.resolve(request as InternalAxiosRequestConfig);
  };

  axios.interceptors.request.use((request) => {
    console.log(request, 'request');

    return updateHeader(request);
  });

  axios.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error) => {
      getValidationError(error.code);
      return Promise.reject(error);
    }
  );
};
