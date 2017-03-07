// redux-saga
import { takeEvery } from 'redux-saga';
import { put, call, select } from 'redux-saga/effects';

// service
import { getAthleteActivities } from '../services/activities';

// selector
import getToken from '../selectors/token';

// actions
import { GET_ATHLETE_ACTIVITIES } from '../constants/actionTypes';

// actions
import { retrieveAthleteActivities } from '../actions/activities';

function* getActivities() {
  try {
    const token = yield select(getToken);
    const activities = yield call(getAthleteActivities, token);
    yield put(retrieveAthleteActivities(activities));
  } catch (error) {
    throw error;
  }
}

export function* activitySaga() {
  yield [
    takeEvery(GET_ATHLETE_ACTIVITIES, getActivities),
  ];
}
