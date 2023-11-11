import axios, { AxiosInstance } from 'axios';

const BaseUrl = 'https://13.design.pages.academy/wtw';
const RequestTimeout = 5000;

export const createAPI = (): AxiosInstance =>
  axios.create({
    baseURL: BaseUrl,
    timeout: RequestTimeout,
  });
