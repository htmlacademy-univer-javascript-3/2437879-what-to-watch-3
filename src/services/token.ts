import {AUTH_TOKEN_NAME} from '../const';

export type Token = string;

export const getToken = () => {
  const token = localStorage.getItem(AUTH_TOKEN_NAME);
  return token ?? '';
};

export const saveToken = (token: Token) => {
  localStorage.setItem(AUTH_TOKEN_NAME, token);
};

export const removeToken = () => {
  localStorage.removeItem(AUTH_TOKEN_NAME);
};
