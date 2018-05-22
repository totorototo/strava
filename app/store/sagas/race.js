import { put, call, takeEvery } from "redux-saga/effects";
import RNFS from "react-native-fs";
import xmldom from "xmldom";

import { SET_CURRENT_USER_ID } from "../constants/actionTypes";
import { setCurrentRaceID } from "../actions/data";
import { setEntity } from "../actions/entities";
import { getEventDetails } from "../services/event";
import { toGeoJSON } from "../services/helpers/geoJSON";

function* listRaces() {
  // TODO: this is just a test!
  const path = `${RNFS.ExternalStorageDirectoryPath}/Download`;
  RNFS.readDir(path) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
    .then(result => {
      console.log("GOT RESULT", result);

      // stat the first file
      return Promise.all([RNFS.stat(result[0].path), result[0].path]);
    })
    .then(statResult => {
      if (statResult[0].isFile()) {
        // if we have a file, read it
        return RNFS.readFile(statResult[1], "utf8");
      }

      return "no file";
    })
    .then(contents => {
      // log the file contents
      const doc = new xmldom.DOMParser().parseFromString(contents);
      const converted = toGeoJSON.gpx(doc);
      const coordinates = converted.features[0].geometry.coordinates.reduce(
        (coords, location) => [
          ...coords,
          {
            longitude: location[0],
            latitude: location[1],
            altitude: location[2]
          }
        ],
        []
      );
      console.log(converted);
    })
    .catch(err => {
      console.log(err.message, err.code);
    });

  const raceID = 123456;
  const entities = yield call(getEventDetails, raceID);

  yield put(setCurrentRaceID(raceID));
  yield put(setEntity("races", entities));
}

export function* raceSaga() {
  yield takeEvery(SET_CURRENT_USER_ID, listRaces);
}
