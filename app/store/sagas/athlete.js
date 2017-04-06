// redux-saga
import { put, call, select, takeEvery } from 'redux-saga/effects';

// service
import { getAthleteClubs, getAthleteStats } from '../services/athlete';

// selector
import getToken from '../selectors/token';
import getCurrentAthlete from '../selectors/currentAthlete';

// actions
import { GET_ATHLETE_CLUBS, GET_ATHLETE_STATS } from '../constants/actionTypes';

// actions
import { retrieveAthleteClubs, retrieveAthleteStats } from '../actions/athletes';

function* getCurrentAtheteClubs() {
  try {
    const token = yield select(getToken);
    const id = yield select(getCurrentAthlete);
    const { response, error } = yield call(getAthleteClubs, token);
    if (!error) {
      yield put(retrieveAthleteClubs(id, response));
    }
  } catch (error) {
    throw error;
  }
}

function* getCurrentAthleteStats() {
  try {
    const token = yield select(getToken);
    const id = yield select(getCurrentAthlete);
    const { response, error } = yield call(getAthleteStats, token, id);
    if (!error) {
      yield put(retrieveAthleteStats(id, response));
    }
  } catch (error) {
    throw error;
  }
}


export function* athleteSaga() {
  yield [
    takeEvery(GET_ATHLETE_CLUBS, getCurrentAtheteClubs),
    takeEvery(GET_ATHLETE_STATS, getCurrentAthleteStats),
  ];
}
