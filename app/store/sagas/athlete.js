// redux saga
import { takeEvery } from "redux-saga";
import { call, select, put } from "redux-saga/effects";

// constants
import { GET_CURRENT_ATHLETE_STATS } from "../constants/actionTypes";

// actions
import { updateEntities } from "../actions/entities";

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
    const performance = yield call(computeAthletePerformance, stats);
    yield put(updateEntities(id, "athletes", { performance }));
  }
}

export function* athleteSaga() {
  yield takeEvery(GET_CURRENT_ATHLETE_STATS, getStats);
}
