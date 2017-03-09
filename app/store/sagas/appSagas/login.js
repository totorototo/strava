// redux-saga
import { put, call, take } from 'redux-saga/effects';

// navigation
import { NavigationActions } from 'react-navigation';

// actions
import { getAccessToken, logout } from '../../actions/login';
import { getAthleteDetails } from '../../actions/athlete';

// constants
import { LOGOUT } from '../../constants/actionTypes';

// service
import { fetchToken } from '../../services/login';

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
    // TODO: use config file to retrieve client id + client secret.
    const formData = new FormData();
    formData.append('client_id', '15688');
    formData.append('client_secret', '');
    formData.append('code', temporaryAccessToken);

    // 1- convert access-token
    const response = yield call(fetchToken, formData);

    // 2- store token
    const token = response.data.access_token;
    yield put(getAccessToken(token));

    // 3- get athlete details
    const details = response.data.athlete;
    yield put(getAthleteDetails(details));

    return token;
  } catch (error) {
    throw error;
  }
}

export function* authenticationFlowSaga() {
  console.log('yeah');
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
