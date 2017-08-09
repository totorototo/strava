import {
  call,
  cancelled,
  take,
  takeEvery,
  race,
  select,
  put
} from "redux-saga/effects";
import { eventChannel } from "redux-saga";

import { SET_CURRENT_RACE_ID, LOGOUT } from "../../constants/actionTypes";

import { getCurrentRaceID } from "../../state/appState/selectors";
import { updateEntity } from "../../actions/entities";

import {
  authenticate,
  disconnect,
  onDataChange
} from "../../services/database";

function subscribe(id) {
  return eventChannel(emit => {
    const handler = snapshot => {
      emit(snapshot.val());
    };

    authenticate();
    const unsubscribe = onDataChange(id, handler);

    // The subscriber must return an unsubscribe function
    return () => {
      unsubscribe();
      disconnect();
    };
  });
}

function* watchData() {
  const raceID = yield select(getCurrentRaceID);
  const channel = yield call(subscribe, raceID);

  try {
    // eslint-disable no-constant-condition
    let userSignedOut;
    while (!userSignedOut) {
      // take(END) will cause the saga to terminate by jumping to the finally block

      const { event } = yield race({
        event: take(channel),
        signout: take(LOGOUT)
      });

      if (event) {
        yield put(
          updateEntity(raceID, "races", { locations: event.locations })
        );
      } else {
        userSignedOut = true;
      }
    }
    channel.close();
  } finally {
    if (yield cancelled()) channel.close();
  }
}

export function* remoteDataSaga() {
  yield takeEvery(SET_CURRENT_RACE_ID, watchData);
}
