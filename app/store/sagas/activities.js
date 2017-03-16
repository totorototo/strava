// redux-saga
import { put, call, select, takeEvery } from 'redux-saga/effects';

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
    const { response, error } = yield call(getAthleteActivities, token);
    if (!error) {
      yield put(retrieveAthleteActivities(response));
    }
  } catch (error) {
    throw error;
  }
}

export function* activitySaga() {
  yield [
    takeEvery(GET_ATHLETE_ACTIVITIES, getActivities),
  ];
}
