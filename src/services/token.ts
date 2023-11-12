import {AuthTokenName} from '../const';

export type Token = string;

export const getToken = () => {
  const token = localStorage.getItem(AuthTokenName);
  return token ?? '';
};

export const saveToken = (token: Token) => {
  localStorage.setItem(AuthTokenName, token);
};

export const removeToken = () => {
  localStorage.removeItem(AuthTokenName);
};
