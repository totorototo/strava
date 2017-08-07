import { call, cancelled, take, takeEvery, race } from "redux-saga/effects";
import { eventChannel } from "redux-saga";

import { SET_CURRENT_USER_ID, LOGOUT } from "../constants/actionTypes";

import { authenticate, disconnect, onDataChange } from "../services/database";

function subscribe() {
  return eventChannel(emit => {
    const handler = snapshot => {
      emit(snapshot.val());
    };

    // TODO: promise, call, generators?
    authenticate();
    const subscriber = onDataChange("locations", handler);

    // The subscriber must return an unsubscribe function
    return () => {
      subscriber.close();
      disconnect();
    };
  });
}

function* watchLocations() {
  const channel = yield call(subscribe);

  try {
    // eslint-disable no-constant-condition
    let userSignedOut;
    while (!userSignedOut) {
      // take(END) will cause the saga to terminate by jumping to the finally block

      const { event, signout } = yield race({
        event: take(channel),
        signout: take(LOGOUT)
      });

      if (event) {
        console.log(event);
      } else {
        console.log(signout);
        userSignedOut = true;
      }
    }
    channel.close();
  } finally {
    if (yield cancelled()) channel.close();
  }
}

export function* locationSaga() {
  yield takeEvery(SET_CURRENT_USER_ID, watchLocations);
}
