import { JWT_TOKEN } from './constants';

let jwtToken = '';

export const getToken = () => {
  return jwtToken ?? localStorage.getItem(JWT_TOKEN);
};

export const setToken = (token: string) => {
  jwtToken = token;
  localStorage.setItem(JWT_TOKEN, token);
};

export const removeToken = () => {
  jwtToken = '';
  localStorage.removeItem(JWT_TOKEN);
};
