// redux-saga
import { put, call, take } from 'redux-saga/effects';

// navigation
import { NavigationActions } from 'react-navigation';

// actions
import { retrieveAccessToken, logout } from '../actions/login';
import { retrieveAthleteDetails, getAthleteClubs, getAthleteStats } from '../actions/athlete';
import { getAthleteActivities } from '../actions/activities';

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
    const credentials = yield call(authenticate, temporaryAccessToken);

    // 2- store token
    const token = credentials.access_token;
    yield put(retrieveAccessToken(token));

    // 3- get athlete details
    const details = credentials.athlete;
    yield put(retrieveAthleteDetails(details));

    yield put(getAthleteClubs());

    yield put(getAthleteActivities());

    yield put(getAthleteStats());

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
    }
  } catch (error) {
    yield call(signout);
  }
}
