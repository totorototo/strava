import { call, select, put, takeEvery } from "redux-saga/effects";

import { SET_ENTITIES } from "../constants/actionTypes";

import { updateEntity } from "../actions/entities";

import { token, getCurrentUserID } from "../state/appState/selectors";

import {
  getAthleteStats,
  computeAthletePerformance
} from "../services/athlete";

function* getStats() {
  const accessToken = yield select(token);
  const id = yield select(getCurrentUserID);
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
