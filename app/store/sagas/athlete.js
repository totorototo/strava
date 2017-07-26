import { call, select, put } from "redux-saga/effects";

import { setEntity, setEntities } from "../actions/entities";

import { token } from "../state/appState/selectors";

import { getAthleteDetails } from "../services/athlete";

export function* getStats(athleteID) {
  const accessToken = yield select(token);
  const { entities, error } = yield call(
    getAthleteDetails,
    accessToken,
    athleteID
  );
  if (!error && entities) {
    yield put(setEntity("athletes", entities.athletes));
  }
}

export function* getDetails(athleteID) {
  const accessToken = yield select(token);
  const { entities, error } = yield call(
    getAthleteDetails,
    accessToken,
    athleteID
  );
  if (!error && entities) {
    yield put(setEntities(entities));
  }
}
