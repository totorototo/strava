import { LOGIN, LOGOUT, RETRIEVE_TEMPORARY_ACCESS_TOKEN, RETRIEVE_ACCESS_TOKEN } from '../constants/actionTypes';

export function login() {
  return {
    type: LOGIN,
  };
}

export function retrieveTemporaryAcessToken(temporaryAccessToken) {
  return {
    type: RETRIEVE_TEMPORARY_ACCESS_TOKEN,
    temporaryAccessToken,
  };
}

export function retrieveAccessToken(accessToken) {
  return {
    type: RETRIEVE_ACCESS_TOKEN,
    accessToken,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}
