// redux-saga
import { put, call, take } from 'redux-saga/effects';

// navigation
import { NavigationActions } from 'react-navigation';

// actions
import { setAccessToken, logout } from '../actions/login';
import { setEntities } from '../actions/entities';

// constants
import { LOGOUT } from '../constants/actionTypes';

// service
import { authenticate } from '../services/login';

function* signout() {
  try {
    // 1- redirect to login component
    yield put(NavigationActions.navigate({ routeName: 'Login' }));

    // 2- update state
    yield put(logout());
  } catch (error) {
    throw error;
  }
}

function* authorize(temporaryAccessToken) {
  try {
    // 1- convert access-token
    const { token, response, error } =
      yield call(authenticate, temporaryAccessToken);
    if (!error) {
      // 2- store token
      yield put(setAccessToken(token));

      yield put(setEntities(response.entities));
    }
    return token;
  } catch (error) {
    throw error;
  }
}

export function* authenticationFlowSaga() {
  try {
    // eslint-disable no-constant-condition
    while (true) {
      const navigation = yield take('Navigation/NAVIGATE');
      if (navigation.routeName === 'Home' && navigation.params.code !== undefined) {
        let token = yield call(authorize, navigation.params.code);
        if (token !== undefined) {
          let userSignedOut;
          while (!userSignedOut) {
            yield take(LOGOUT);
            userSignedOut = true;
            token = null;

            yield call(signout);
          }
        }
      }
    }
  } catch (error) {
    yield call(signout);
  }
}
