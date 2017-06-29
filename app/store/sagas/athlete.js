// redux saga
import { takeEvery } from "redux-saga";
import { call, select } from "redux-saga/effects";

// actions
import { GET_CURRENT_ATHLETE_STATS } from "../constants/actionTypes";

// selectors
import { token, currentUserID } from "../selectors/app";

// services
import {
  getAthleteStats,
  computeAthletePerformance
} from "../services/athlete";

function* getStats() {
  const accessToken = yield select(token);
  const id = yield select(currentUserID);
  const { stats, error } = yield call(getAthleteStats, accessToken, id);
  if (!error && stats) {
    const performanceIndicator = yield call(computeAthletePerformance, stats);
    console.log(performanceIndicator);
  }
}

export function* athleteSaga() {
  yield takeEvery(GET_CURRENT_ATHLETE_STATS, getStats);
}
