import { put, takeEvery } from "redux-saga/effects";

import { SET_CURRENT_USER_ID } from "../constants/actionTypes";

import { setCurrentRaceID } from "../actions/data";
import { setEntity } from "../actions/entities";
import { shareLocation } from "../actions/location";

import { markers, coordinates } from "../../routes/screens/race/data";

function* listRaces() {
  // 1- mock strava api call
  const entities = {};
  const raceID = 123456;
  entities[raceID] = {
    startingTime: "2017-08-25T08:00:00+00:00",
    checkPoints: markers,
    path: {
      coordinates
    }
  };
  yield put(setCurrentRaceID(raceID));
  yield put(setEntity("races", entities));
  yield put(shareLocation());
}

export function* raceSaga() {
  yield takeEvery(SET_CURRENT_USER_ID, listRaces);
}
