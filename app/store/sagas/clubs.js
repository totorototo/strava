import { call, select, put, takeEvery } from "redux-saga/effects";

import { SET_CURRENT_USER_ID } from "../constants/actionTypes";
import { updateEntity, setEntity } from "../actions/entities";
import { setCurrentClubID } from "../actions/data";
import { token, getCurrentUserID } from "../state/appState/selectors";
import { listClubMembers, listClubActivities } from "../services/clubs";
import { getStats } from "./athlete";
import { getRankings } from "../services/activities";

function* listActivities(clubID, membersIDs) {
  const accessToken = yield select(token);
  const { ids, activities, maps, error } = yield call(
    listClubActivities,
    accessToken,
    clubID
  );
  if (!error) {
    yield put(updateEntity(clubID, "clubs", { activities: ids }));
    yield put(setEntity("activities", activities));
    yield put(setEntity("maps", maps));
    const { ranking } = yield call(getRankings, membersIDs, activities);
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
