import { call, select, put, takeEvery } from "redux-saga/effects";

import {
  SET_CURRENT_CLUB_ID,
  SET_CURRENT_USER_ID
} from "../constants/actionTypes";
import { updateEntity, setEntity } from "../actions/entities";
import { setCurrentClubID } from "../actions/data";
import {
  token,
  getCurrentUserID,
  getCurrentClubID,
  getCurrentClubMembers
} from "../state/appState/selectors";
import {
  listClubMembers,
  listClubActivities,
  filterClubAthletes
} from "../services/clubs";
import { getRankings } from "../services/activities";

function* listActivities() {
  const clubID = yield select(getCurrentClubID);
  if (clubID === "loading") return;

  const membersIDs = yield select(getCurrentClubMembers);
  const accessToken = yield select(token);

  const { ids, entities, error } = yield call(
    listClubActivities,
    accessToken,
    clubID
  );
  if (!error) {
    yield put(updateEntity(clubID, "clubs", { activities: ids }));
    yield put(setEntity("activities", entities));
    // TODO: strava api changed: activity and member id not set anymore!
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
  const { ids, error, entities } = yield call(
    listClubMembers,
    accessToken,
    clubID
  );
  if (!error) {
    yield put(updateEntity(clubID, "clubs", { members: ids }));

    const athletes = yield call(
      filterClubAthletes,
      entities.members,
      currentUserID
    );

    yield put(setEntity("athletes", athletes));
    yield put(setCurrentClubID(clubID));
  }
}

export function* clubsSaga() {
  yield takeEvery(SET_CURRENT_USER_ID, listMembers);
  yield takeEvery(SET_CURRENT_CLUB_ID, listActivities);
}
