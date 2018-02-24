import { coordinates, markers } from "../sagas/data/data";
import positionHelper from "./helpers/gps";

const getEdges = (...locations) => {
  const result = locations.reduce((accu, location, index) => {
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
  return result;
};

export const getEventDetails = (id = 0) => {
  const edges = getEdges(...coordinates);

  const entities = {};
  const raceID = id;
  entities[raceID] = {
    date: "2018-08-24T03:00:00+00:00",
    checkPoints: markers,
    path: {
      edges
    }
  };

  return entities;
};
