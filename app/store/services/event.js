// import { coordinates, markers } from "../sagas/data/data";
import positionHelper from "./helpers/gps";

const getEventEdges = (...locations) => {
  const result = locations.reduce((accu, location, index) => {
    if (locations[index + 1]) {
      const length = positionHelper.computeDistanceBetweenLocations(
        location,
        locations[index + 1]
      );
      const edge = {
        src: location,
        dest: locations[index + 1],
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

    return [...accu, { ...edge, percent, index, distanceDone }];
  }, []);
};

export const getEventDetails = (
  eventID = 0,
  coordinates = [],
  withElevationDetails = true
) => {
  const entities = {};

  const edges = getEventEdges(...coordinates);
  const raceID = eventID;
  entities[raceID] = {
    date: "2018-08-24T03:00:00+00:00",
    path: { edges }
  };

  if (withElevationDetails) {
    const detailedEdges = getEdgesElevationDetails(...edges);
    entities[raceID].path.edges = detailedEdges;
  }

  return entities;
};
