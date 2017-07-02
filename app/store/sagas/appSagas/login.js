import { put, call, take } from "redux-saga/effects";

import { NavigationActions } from "react-navigation";

import { setAccessToken, logout } from "../../actions/login";
import { setEntities } from "../../actions/entities";
import { setCurrentUserID } from "../../actions/data";

import { LOGOUT } from "../../constants/actionTypes";

import { authenticate } from "../../services/login";

function* signout() {
  try {
    // 1- redirect to login component
    yield put(NavigationActions.navigate({ routeName: "Login" }));

    // 2- update state
    yield put(logout());
  } catch (error) {
    throw error;
  }
}

function* authorize(temporaryAccessToken) {
  // 1- convert access-token
  const { token, currentUserID, entities, error } = yield call(
    authenticate,
    temporaryAccessToken
  );
  if (!error) {
    yield put(setAccessToken(token));
    yield put(setCurrentUserID(currentUserID));
    yield put(setEntities(entities));
  }
  return { token, error };
}

export function* authenticationFlowSaga() {
  try {
    // eslint-disable no-constant-condition
    while (true) {
      const navigation = yield take("Navigation/NAVIGATE");
      if (
        navigation.routeName === "Home" &&
        navigation.params.code !== undefined
      ) {
        // eslint-disable-next-line no-unused-vars, prefer-const
        let { token, error } = yield call(authorize, navigation.params.code);
        if (!error) {
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
