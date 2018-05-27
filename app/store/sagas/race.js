import { put, call, takeEvery } from "redux-saga/effects";
import RNFS from "react-native-fs";

import { SET_CURRENT_USER_ID } from "../constants/actionTypes";
import { setCurrentRaceID } from "../actions/data";
import { setEntity } from "../actions/entities";
import { getEventDetails } from "../services/event";
import { listTraces, readTrace } from "../services/traces";
import {
  toDoc,
  toGeoJSON,
  toCoordinates,
  getDetails
} from "../services/convert";

function* listRaces() {
  const path = `${RNFS.ExternalStorageDirectoryPath}/Download`;
  const { files, error } = yield call(listTraces, path);
  if (!error && files) {
    for (let i = 0; i < files.length; i += 1) {
      const { contents } = yield call(readTrace, files[i][1]);
      const doc = yield call(toDoc, contents);
      const json = yield call(toGeoJSON, doc);
      const coordinates = yield call(toCoordinates, json);
      const { name } = yield call(getDetails, json);

      const raceID = name;
      const entities = yield call(getEventDetails, raceID, coordinates);

      yield put(setCurrentRaceID(raceID));
      yield put(setEntity("races", entities));
    }
  }
}

export function* raceSaga() {
  yield takeEvery(SET_CURRENT_USER_ID, listRaces);
}
