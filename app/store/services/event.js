import { coordinates, markers } from "../sagas/data/data";
import positionHelper from "./helpers/gps";
import { convertPercentToGrade } from "./helpers/event";

const getEventEdges = (...locations) => {
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

const getEdgesElevationDetails = (...edges) => {
  let distanceDone = 0;
  return edges.reduce((accu, edge, index) => {
    const length = positionHelper.computeDistance(edge);
    distanceDone += length;
    const elevation = (edge.dest.altitude - edge.src.altitude) / 1000;
    const percent = elevation / length * 100;
    const grade = convertPercentToGrade(percent);

    return [...accu, { ...edge, percent, index, distanceDone, grade }];
  }, []);
};

export const getEventDetails = (eventID = 0, withElevationDetails = true) => {
  const entities = {};

  const edges = getEventEdges(...coordinates);
  const raceID = eventID;
  entities[raceID] = {
    date: "2018-08-24T03:00:00+00:00",
    checkPoints: markers,
    path: { edges }
  };

  if (withElevationDetails) {
    const detailedEdges = getEdgesElevationDetails(...edges);
    entities[raceID].path.edges = detailedEdges;
  }

  return entities;
};
