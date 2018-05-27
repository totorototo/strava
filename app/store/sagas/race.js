import { put, call, takeEvery } from "redux-saga/effects";
import RNFS from "react-native-fs";

import { SET_CURRENT_USER_ID } from "../constants/actionTypes";
import { setCurrentRaceID } from "../actions/data";
import { setEntity } from "../actions/entities";
import { getEventDetails } from "../services/event";
import { listTraces, readTrace } from "../services/traces";
import { toDoc, toGeoJSON, toCoordinates } from "../services/convert";

function* listRaces() {
  const path = `${RNFS.ExternalStorageDirectoryPath}/Download`;
  const { files, error } = yield call(listTraces, path);
  if (!error && files) {
    for (let i = 0; i < files.length; i += 1) {
      const { contents } = yield call(readTrace, files[i][1]);
      const doc = yield call(toDoc, contents);
      const json = yield call(toGeoJSON, doc);
      yield call(toCoordinates, json);
    }
  }

  const raceID = 123456;
  const entities = yield call(getEventDetails, raceID);

  yield put(setCurrentRaceID(raceID));
  yield put(setEntity("races", entities));
}

export function* raceSaga() {
  yield takeEvery(SET_CURRENT_USER_ID, listRaces);
}
