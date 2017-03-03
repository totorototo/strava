// redux saga
// import { takeEvery } from 'redux-saga';
// import { fork } from 'redux-saga/effects';

// sagas
import { authenticationFlowSaga } from './login';
// import { getClubs } from './athlete';

// actions
// import { GET_ATHLETE_CLUBS } from '../constants/actionTypes';

export default [
  authenticationFlowSaga,
  // takeEvery(GET_ATHLETE_CLUBS, getClubs),
];

