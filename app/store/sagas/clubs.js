import { call, select, put, takeEvery } from "redux-saga/effects";

import { SET_ENTITIES } from "../constants/actionTypes";

import { updateEntity } from "../actions/entities";
import { setCurrentClubID } from "../actions/data";

import { token } from "../state/appState/selectors";

import { listClubMembers } from "../services/clubs";

function* listMembers() {
  const accessToken = yield select(token);
  const id = 288750;
  const { members, error } = yield call(listClubMembers, accessToken, id);
  if (!error) {
    yield put(setCurrentClubID(id));
    yield put(updateEntity(id, "clubs", { members }));
  }
}

export function* clubsSaga() {
  yield takeEvery(SET_ENTITIES, listMembers);
}
