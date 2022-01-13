import axios, { AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios';
import { API_URL } from '~/shared/constants/environments';
import qs from 'qs';
import { camelizeKeys, decamelizeKeys } from 'humps';

/**
 * @see https://github.com/axios/axios
 */
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-type': 'application/json; charset=utf-8',
  },
  paramsSerializer: function (params) {
    return qs.stringify(params, { arrayFormat: 'brackets' });
  },
});

/**
 * @see https://javascript.plainenglish.io/configuring-a-camelcase-to-snake-case-parser-with-axios-9fa34fd3b16f
 */
function axiosRequestInterceptor(config: AxiosRequestConfig) {
  if (config.params) {
    config.params = decamelizeKeys(config.params);
  }
  if (config.data) {
    config.data = decamelizeKeys(config.data);
  }
  return config;
}

function axiosResponseInterceptor(response: AxiosResponse) {
  if (
    response.data &&
    response.headers['content-type'] === 'application/json'
  ) {
    response.data = camelizeKeys(response.data);
  }
  return response;
}

function axiosErrorInterceptor(error: AxiosError) {
  return Promise.reject(error);
}

axiosInstance.interceptors.request.use(
  axiosRequestInterceptor,
  axiosErrorInterceptor,
);
axiosInstance.interceptors.response.use(
  axiosResponseInterceptor,
  axiosErrorInterceptor,
);

export default axiosInstance;
