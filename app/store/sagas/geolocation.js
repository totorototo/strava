import { call, takeEvery, select, put } from "redux-saga/effects";

import {
  getCurrentRaceID,
  getCurrentUserID
} from "../state/appState/selectors";
import { getCurrentAthleteLocation } from "../services/geolocation";
import { SHARE_LOCATION } from "../constants/actionTypes";
import { updateEntity } from "../actions/entities";

function* shareLocation() {
  const { position, error } = yield call(getCurrentAthleteLocation);
  if (!error && position) {
    const raceID = yield select(getCurrentRaceID);
    const userID = yield select(getCurrentUserID);

    yield put(
      updateEntity(raceID, "races", {
        positions: {
          [userID]: position
        }
      })
    );
  }
}

export function* locationSaga() {
  yield takeEvery(SHARE_LOCATION, shareLocation);
}
