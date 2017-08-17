import { call, takeEvery, select } from "redux-saga/effects";

import {
  getCurrentRaceID,
  getCurrentUserID
} from "../state/appState/selectors";

import { getCurrentAthleteLocation } from "../services/geolocation";

import { writeData } from "../services/database";
import { SHARE_LOCATION } from "../constants/actionTypes";

function* shareLocation() {
  const { position, error } = yield call(getCurrentAthleteLocation);
  if (!error && position) {
    const raceID = yield select(getCurrentRaceID);
    const userID = yield select(getCurrentUserID);
    const key = `${raceID}/locations/${userID}`;

    yield call(writeData, key, position);
  }
}

export function* locationSaga() {
  yield takeEvery(SHARE_LOCATION, shareLocation);
}
