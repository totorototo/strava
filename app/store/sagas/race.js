import { put, takeEvery } from "redux-saga/effects";

import { SET_CURRENT_USER_ID } from "../constants/actionTypes";
import { setCurrentRaceID } from "../actions/data";
import { setEntity } from "../actions/entities";
import { markers, coordinates } from "./data/data";
import positionHelper from "../services/helpers/gps";

function* listRaces() {
  const edges = coordinates.reduce((accu, location, index) => {
    if (coordinates[index + 1]) {
      const length = positionHelper.computeDistanceBetweenLocations(
        location,
        coordinates[index + 1]
      );
      const edge = {
        src: location,
        dest: coordinates[index + 1],
        length
      };
      return [...accu, edge];
    }
    return accu;
  }, []);

  const entities = {};
  const raceID = 123456;
  entities[raceID] = {
    date: "2018-08-24T03:00:00+00:00",
    checkPoints: markers,
    path: {
      edges
    }
  };
  yield put(setCurrentRaceID(raceID));
  yield put(setEntity("races", entities));
}

export function* raceSaga() {
  yield takeEvery(SET_CURRENT_USER_ID, listRaces);
}
