// redux-saga
import { put, call, take } from 'redux-saga/effects';
// router
import { Actions } from 'react-native-router-flux';
// actions
import { getAccessToken, logout } from '../actions/login';
import { getAthleteDetails } from '../actions/athlete';
// constants
import { LOGOUT, GET_TEMPORARY_ACCESS_TOKEN } from '../constants/actionTypes';
// service
import { fetchToken } from './../services/login';

function* signout() {
  try {
    // 1- redirect to login component
    yield call(Actions.login);

    // 2- update state
    yield put(logout());
  } catch (error) {
    throw error;
  }
}

function* authorize(temporary_access_token) {
  try {
    // TODO: use config file to retrieve client id + client secret.
    const formData = new FormData();
    formData.append('client_id', '15688');
    formData.append('client_secret', '');
    formData.append('code', temporary_access_token);

    // 1- convert access-token
    const response = yield call(fetchToken, formData);

    // 2- store token
    const token = response.data.access_token;
    yield put(getAccessToken(token));

    // 3- get athlete details
    const details = response.data.athlete;
    yield put(getAthleteDetails(details));

    // 4- route application
    yield call(Actions.localhost);

    return token;
  } catch (error) {
    throw error;
  }
}

export function* authenticationFlowSaga() {
  try {
    // eslint-disable no-constant-condition
    while (true) {
      const { temporary_access_token } = yield take(GET_TEMPORARY_ACCESS_TOKEN);
      let token = yield call(authorize, temporary_access_token);
      if (token) {
        let userSignedOut;
        while (!userSignedOut) {
          yield take(LOGOUT);
          userSignedOut = true;
          token = null;

          yield call(signout);
        }
      }
    }
  } catch (error) {
    yield call(signout);
  }
}
