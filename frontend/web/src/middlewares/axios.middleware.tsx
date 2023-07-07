import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { getValidationError } from '../utilities';

export const AxiosInterceptor = () => {
  const updateHeader = (request: AxiosRequestConfig) => {
    request.headers = {
      ...request.headers,
      'Content-Type': 'application/json',
    };

    return Promise.resolve(request as InternalAxiosRequestConfig);
  };

  axios.interceptors.request.use((request) => {
    return updateHeader(request);
  });

  axios.interceptors.response.use(
    (response: AxiosResponse) => {
      // Check if response.data exists and it doesn't have errors
      if (response?.data && !response?.data?.errors) {
        // Find the first key in the data object that is not null or undefined
        const key = Object.keys(response.data).find(
          (k) => response.data[k] != null
        );

        // If a key was found, use it to extract all the data
        let data = key ? response.data[key] : {};

        // If data is an object, extract its properties to the top level
        // ? Activate if you want to lower the graphql responses one level and leave it without the name of the query or mutation, although it is not recommended since if there are several responses it is better to know what query or mutation comes from specifically
        /* if (typeof data === 'object') {
          data = (Object.values(data) as Record<string, any>[]).reduce(
            (
              accumulator: Record<string, any>,
              currentValue: Record<string, any>
            ) => {
              return { ...accumulator, ...currentValue };
            },
            {}
          );
        } */

        const formatResponse = {
          ...data,
          status: 200,
          success: true,
          code: 'SUCCESS',
        };

        console.log(formatResponse, 'formatResponse');

        return formatResponse;
      }

      // If response.data doesn't exist, return an empty array in case of errors
      // or return the errors if they exist.
      if (response?.data?.errors) {
        const error = response.data.errors[0];
        return error;
      }
    },
    (error) => {
      getValidationError(error.code);
      return Promise.reject(error);
    }
  );
};
