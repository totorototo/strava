import { call, select, takeEvery } from "redux-saga/effects";

import { SET_ENTITIES } from "../constants/actionTypes";

import { token, getCurrentUserID } from "../state/appState/selectors";

import { getAthleteActivities } from "../services/activities";

function* getCurrentAthleteActivities() {
  const accessToken = yield select(token);
  const id = yield select(getCurrentUserID);
  const { entities, IDs, error } = yield call(
    getAthleteActivities,
    accessToken,
    id
  );
  if (!error) {
    console.log(entities, IDs);
  }
}

export function* activitiesSaga() {
  yield takeEvery(SET_ENTITIES, getCurrentAthleteActivities);
}
