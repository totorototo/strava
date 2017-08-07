import { put, takeEvery } from "redux-saga/effects";

import { SET_CURRENT_CLUB_ID } from "../constants/actionTypes";

import { setCurrentRaceID } from "../actions/data";
import { setEntity } from "../actions/entities";

function* listRaces() {
  // 1- mock strava api call
  const entities = {};
  const raceID = 123456;
  yield put(setCurrentRaceID(raceID));
  yield put(setEntity("races", entities));
}

export function* raceSaga() {
  yield takeEvery(SET_CURRENT_CLUB_ID, listRaces);
}
