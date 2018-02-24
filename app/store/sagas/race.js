import { put, call, takeEvery } from "redux-saga/effects";

import { SET_CURRENT_USER_ID } from "../constants/actionTypes";
import { setCurrentRaceID } from "../actions/data";
import { setEntity } from "../actions/entities";
import { getEventDetails } from "../services/event";

function* listRaces() {
  const raceID = 123456;
  const entities = yield call(getEventDetails, raceID);

  yield put(setCurrentRaceID(raceID));
  yield put(setEntity("races", entities));
}

export function* raceSaga() {
  yield takeEvery(SET_CURRENT_USER_ID, listRaces);
}
