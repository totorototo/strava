import { call, takeEvery, select } from "redux-saga/effects";

import {
  getCurrentRaceID,
  getCurrentUserID
} from "../state/appState/selectors";

import { writeData } from "../services/database";
import { SHARE_LOCATION } from "../constants/actionTypes";

function* shareLocation() {
  // 1- get location
  // 2- share it
  const raceID = yield select(getCurrentRaceID);
  const userID = yield select(getCurrentUserID);
  const key = `${raceID}/locations/${userID}`;
  const data = {
    time: new Date().toISOString(),
    coordinates: {
      latitude: 42.79689,
      longitude: 0.01307
    }
  };

  yield call(writeData, key, data);
}

export function* locationSaga() {
  yield takeEvery(SHARE_LOCATION, shareLocation);
}
