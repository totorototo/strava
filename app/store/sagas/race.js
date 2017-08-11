import { put, takeEvery } from "redux-saga/effects";

import { SET_CURRENT_USER_ID } from "../constants/actionTypes";

import { setCurrentRaceID } from "../actions/data";
import { setEntity } from "../actions/entities";

import { markers, coordinates } from "./data/data";

function* listRaces() {
  // 1- mock strava api call
  const entities = {};
  const raceID = 123456;
  entities[raceID] = {
    date: "2017-08-25T08:00:00+00:00",
    checkPoints: markers,
    path: {
      coordinates
    }
  };
  yield put(setCurrentRaceID(raceID));
  yield put(setEntity("races", entities));
}

export function* raceSaga() {
  yield takeEvery(SET_CURRENT_USER_ID, listRaces);
}
