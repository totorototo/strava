// redux-saga
import { put, call, select } from 'redux-saga/effects';

// service
import { getAthleteClubs } from '../services/athlete';

// selector
import getToken from '../selectors/token';

// actions
import { retrieveAthleteClubs } from '../actions/athlete';

export function* getClubs() {
  try {
    const token = yield select(getToken);
    const clubs = yield call(getAthleteClubs, token);
    yield put(retrieveAthleteClubs(clubs));
  } catch (error) {
    yield put();
  }
}
