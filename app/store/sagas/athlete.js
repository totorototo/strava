// redux saga
import { takeEvery } from "redux-saga";
import { call, select } from "redux-saga/effects";

// actions
import { GET_CURRENT_ATHLETE_STATS } from "../constants/actionTypes";

// selectors
import { token, currentUserID } from "../selectors/app";

// services
import { getAthleteStats } from "../services/athlete";

function* getStats() {
  const accessToken = yield select(token);
  const id = yield select(currentUserID);
  const { error } = yield call(getAthleteStats, accessToken, id);
  if (error) {
    console.log(error);
  }
}

export function* athleteSaga() {
  yield takeEvery(GET_CURRENT_ATHLETE_STATS, getStats);
}
