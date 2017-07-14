import { call, select, put, takeEvery } from "redux-saga/effects";

import {
  SET_CURRENT_USER_ID,
  SET_CURRENT_CLUB_ID
} from "../constants/actionTypes";

import { updateEntity, setSubEntities } from "../actions/entities";
import { setCurrentClubID } from "../actions/data";

import { token } from "../state/appState/selectors";

import {
  listClubMembers,
  listClubAnnouncements,
  listClubActivities
} from "../services/clubs";

import { getStats } from "./athlete";

function* listMembers() {
  const accessToken = yield select(token);
  const clubID = 288750;
  yield put(setCurrentClubID("loading"));
  const { members, error } = yield call(listClubMembers, accessToken, clubID);
  if (!error) {
    yield put(setCurrentClubID(clubID));
    yield put(updateEntity(clubID, "clubs", { members }));
    for (let index = 0; index < members.length; index += 1) {
      yield getStats(members[index]);
    }
  }
}

function* listAnnouncements() {
  const accessToken = yield select(token);
  const clubID = 288750;
  const { announcements, error } = yield call(
    listClubAnnouncements,
    accessToken,
    clubID
  );
  if (!error && announcements) {
    yield put(updateEntity(clubID, "clubs", { announcements }));
  }
}

function* listActivities() {
  const accessToken = yield select(token);
  const clubID = 288750;
  const { activities, entities, error } = yield call(
    listClubActivities,
    accessToken,
    clubID
  );
  if (!error) {
    yield put(updateEntity(clubID, "clubs", { activities }));
    yield put(setSubEntities("activities", entities));
  }
}

export function* clubsSaga() {
  yield takeEvery(SET_CURRENT_USER_ID, listMembers);
  yield takeEvery(SET_CURRENT_CLUB_ID, listAnnouncements);
  yield takeEvery(SET_CURRENT_CLUB_ID, listActivities);
}
