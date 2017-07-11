import { call, select, put, takeEvery } from "redux-saga/effects";

import { SET_ENTITIES, SET_CURRENT_CLUB_ID } from "../constants/actionTypes";

import { updateEntity } from "../actions/entities";
import { setCurrentClubID } from "../actions/data";

import { token } from "../state/appState/selectors";

import { listClubMembers, listClubAnnoucements } from "../services/clubs";

function* listMembers() {
  const accessToken = yield select(token);
  const clubID = 288750;
  const { members, error } = yield call(listClubMembers, accessToken, clubID);
  if (!error) {
    yield put(setCurrentClubID(clubID));
    yield put(updateEntity(clubID, "clubs", { members }));
  }
}

function* listAnnouncements() {
  const accessToken = yield select(token);
  const clubID = 288750;
  const { announcements, error } = yield call(
    listClubAnnoucements,
    accessToken,
    clubID
  );
  if (!error && announcements) {
    yield put(updateEntity(clubID, "clubs", { announcements }));
  }
}

export function* clubsSaga() {
  yield takeEvery(SET_ENTITIES, listMembers);
  yield takeEvery(SET_CURRENT_CLUB_ID, listAnnouncements);
}
