import { call, select, put, takeEvery } from "redux-saga/effects";

import {
  SET_CURRENT_USER_ID,
  SET_CURRENT_CLUB_ID
} from "../constants/actionTypes";

import { updateEntity, setEntity } from "../actions/entities";
import { setCurrentClubID } from "../actions/data";

import { token, getCurrentUserID } from "../state/appState/selectors";

import {
  listClubMembers,
  listClubActivities,
  listClubAnnouncements
} from "../services/clubs";

import { getStats } from "./athlete";
import { getRankings } from "../services/activities";

function* listActivities(clubID, membersIDs) {
  const accessToken = yield select(token);
  const { ids, entities, error } = yield call(
    listClubActivities,
    accessToken,
    clubID
  );
  if (!error) {
    yield put(updateEntity(clubID, "clubs", { activities: ids }));
    yield put(setEntity("activities", entities));
    const { ranking } = yield call(getRankings, membersIDs, entities);
    yield put(updateEntity(clubID, "clubs", { ranking }));
  }
}

function* listMembers() {
  const accessToken = yield select(token);
  const currentUserID = yield select(getCurrentUserID);
  // TODO: this should not be done this way! (current club ID)
  const clubID = 288750;
  yield put(setCurrentClubID("loading"));
  const { ids, error } = yield call(listClubMembers, accessToken, clubID);
  if (!error) {
    yield put(updateEntity(clubID, "clubs", { members: ids }));
    const filteredIds = ids.filter(id => id !== currentUserID);
    let mergedEntities = {};
    for (let index = 0; index < filteredIds.length; index += 1) {
      const { entities } = yield getStats(filteredIds[index]);
      mergedEntities = {
        ...mergedEntities,
        athletes: {
          ...mergedEntities.athletes,
          ...entities.athletes
        }
      };
    }
    yield put(setEntity("athletes", mergedEntities.athletes));
    yield put(setCurrentClubID(clubID));
    yield listActivities(clubID, ids);
  }
}

export function* clubsSaga() {
  yield takeEvery(SET_CURRENT_USER_ID, listMembers);
}
