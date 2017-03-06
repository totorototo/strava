// redux-saga
import { takeEvery } from 'redux-saga';
import { put, call, select } from 'redux-saga/effects';

// service
import { getAthleteClubs } from '../services/athlete';

// selector
import getToken from '../selectors/token';

// actions
import { GET_ATHLETE_CLUBS } from '../constants/actionTypes';

// actions
import { retrieveAthleteClubs } from '../actions/athlete';

function* getClubs() {
  try {
    const token = yield select(getToken);
    const response = yield call(getAthleteClubs, token);
    yield put(retrieveAthleteClubs(response.data));
  } catch (error) {
    throw error;
  }
}


export function* athleteSaga() {
  yield [
    takeEvery(GET_ATHLETE_CLUBS, getClubs),
  ];
}
