import axios, {AxiosInstance, AxiosRequestConfig, AxiosError, AxiosResponse} from 'axios';
import {getToken} from './token';
import {StatusCodes} from 'http-status-codes';
import {toast} from 'react-toastify';
import browserHistory from './browser-history.ts';
import {AppRoute} from '../const.ts';

type DetailMessageType = {
  type: string;
  message: string;
};

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true,
};

const shouldDisplayError = (response: AxiosResponse) => StatusCodeMapping[response.status];

const BaseUrl = 'https://13.design.pages.academy/wtw';
const RequestTimeout = 1000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BaseUrl,
    timeout: RequestTimeout,
  });

  api.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = getToken();

    if (token && config.headers) {
      config.headers['x-token'] = token;
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<DetailMessageType>) => {
      if (error.response && error.response.status === 404) {
        browserHistory.push(AppRoute.NotFound);
      } else if (error.response && shouldDisplayError(error.response)) {
        const detailMessage = error.response.data;

        toast.warn(detailMessage.message);
      }

      throw error;
    }
  );

  return api;
};
