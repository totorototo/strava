import { call, select, put } from "redux-saga/effects";

import { updateEntity } from "../actions/entities";

import { token } from "../state/appState/selectors";

import { getAthleteDetails } from "../services/athlete";

export function* getStats(athleteID) {
  const accessToken = yield select(token);
  const { details, error } = yield call(
    getAthleteDetails,
    accessToken,
    athleteID
  );
  if (!error && details) {
    yield put(updateEntity(athleteID, "athletes", details));
  }
}
