import { LOGIN, LOGOUT, GET_TEMPORARY_ACCESS_TOKEN, GET_ACCESS_TOKEN } from '../constants/actionTypes';

export function login() {
  return {
    type: LOGIN,
  };
}

export function getTemporaryAcessToken(temporaryAccessToken) {
  return {
    type: GET_TEMPORARY_ACCESS_TOKEN,
    temporaryAccessToken,
  };
}

export function getAccessToken(accessToken) {
  return {
    type: GET_ACCESS_TOKEN,
    accessToken,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}
