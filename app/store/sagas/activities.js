import { call, select, put, takeEvery } from "redux-saga/effects";

import { SET_CURRENT_USER_ID } from "../constants/actionTypes";
import { token, getCurrentUserID } from "../state/appState/selectors";
import {
  getAthleteActivities,
  getGivenActivity,
  computePerformance
} from "../services/activities";
import { updateEntity } from "../actions/entities";

function* getCurrentAthleteActivities() {
  const accessToken = yield select(token);
  const id = yield select(getCurrentUserID);
  const { entities, error } = yield call(getAthleteActivities, accessToken, id);
  if (!error) {
    const { performance } = yield call(computePerformance, entities.Runs);
    yield put(updateEntity(id, "athletes", { performance }));
  }
}

export function* getActivity(activityID) {
  const accessToken = yield select(token);
  const { entities, error } = yield call(
    getGivenActivity,
    accessToken,
    activityID
  );
  if (!error) {
    yield put(updateEntity(activityID, "activities", entities.activity));
  }
}

export function* activitiesSaga() {
  yield takeEvery(SET_CURRENT_USER_ID, getCurrentAthleteActivities);
}
