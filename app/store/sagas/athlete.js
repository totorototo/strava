import { takeEvery } from "redux-saga";
import { call, select, put } from "redux-saga/effects";

import { SET_ENTITIES } from "../constants/actionTypes";

import { updateEntity } from "../actions/entities";

import { token, currentUserID } from "../selectors/app";

import {
  getAthleteStats,
  computeAthletePerformance
} from "../services/athlete";

function* getStats() {
  const accessToken = yield select(token);
  const id = yield select(currentUserID);
  const { stats, error } = yield call(getAthleteStats, accessToken, id);
  if (!error && stats) {
    const { performance } = yield call(computeAthletePerformance, stats);
    if (performance) {
      yield put(updateEntity(id, "athletes", { performance }));
    }
  }
}

export function* athleteSaga() {
  yield takeEvery(SET_ENTITIES, getStats);
}
