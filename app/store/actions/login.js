import { LOGIN, LOGOUT, SET_ACCESS_TOKEN } from "../constants/actionTypes";

export function login() {
  return {
    type: LOGIN
  };
}

export function setAccessToken(accessToken) {
  return {
    type: SET_ACCESS_TOKEN,
    accessToken
  };
}

export function logout() {
  return {
    type: LOGOUT
  };
}
