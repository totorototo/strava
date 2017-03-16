// redux-saga
import { put, call, select, takeEvery } from 'redux-saga/effects';

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
    const { response, error } = yield call(getAthleteClubs, token);
    if (!error) {
      yield put(retrieveAthleteClubs(response));
    }
  } catch (error) {
    throw error;
  }
}

function* getStats() {
  try {
    const token = yield select(getToken);
    const id = yield select(getAthleteID);
    const { response, error } = yield call(getAthleteStats, token, id);
    if (!error) {
      yield put(retrieveAthleteStats(response));
    }
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
