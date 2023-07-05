import axios from 'axios';

export const AxiosInterceptor = () => {
  axios.interceptors.request.use((request) => {
    return request;
  });
};
