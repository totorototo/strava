// redux-saga
import { takeEvery } from 'redux-saga';
import { put, call, select } from 'redux-saga/effects';

// service
import { getAthleteClubs, getAthleteStats } from '../services/athlete';

// selector
import getToken from '../selectors/token';
import getAthleteID from '../selectors/athleteID';

// actions
import { GET_ATHLETE_CLUBS, GET_ATHLETE_STATS } from '../constants/actionTypes';

// actions
import { retrieveAthleteClubs, retrieveAthleteStats } from '../actions/athlete';

function* getClubs() {
  try {
    const token = yield select(getToken);
    const clubs = yield call(getAthleteClubs, token);
    yield put(retrieveAthleteClubs(clubs));
  } catch (error) {
    throw error;
  }
}

function* getStats() {
  try {
    const token = yield select(getToken);
    const id = yield select(getAthleteID);
    const stats = yield call(getAthleteStats, token, id);
    yield put(retrieveAthleteStats(stats));
  } catch (error) {
    throw error;
  }
}


export function* athleteSaga() {
  yield [
    takeEvery(GET_ATHLETE_CLUBS, getClubs),
    takeEvery(GET_ATHLETE_STATS, getStats),
  ];
}
