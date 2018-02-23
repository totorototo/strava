import { coordinates, markers } from "../sagas/data/data";
import positionHelper from "./helpers/gps";
import { convertGradeToColor, convertPercentToGrade } from "./helpers/event";

const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);

const addData = (...edges) => {
  let distanceDone = 0;
  return edges.reduce((accu, edge, index) => {
    const length = positionHelper.computeDistance(edge);
    distanceDone += length;
    const elevation = (edge.dest.altitude - edge.src.altitude) / 1000;
    const percent = elevation / length * 100;
    const grade = convertPercentToGrade(percent);
    const color = convertGradeToColor(grade);

    const enhancedEdge = {
      edge,
      length,
      percent,
      index,
      distanceDone,
      grade,
      color
    };
    return [...accu, enhancedEdge];
  }, []);
};

const groupBy = (...edges) => {
  let currentGrade = "";
  return edges.reduce((accu, edge) => {
    if (currentGrade === edge.grade) {
      return [
        ...accu.slice(0, accu.length - 1),
        ...accu.slice(accu.length),
        [...accu[accu.length - 1], edge]
      ];
    }
    currentGrade = edge.grade;
    return [...accu, [edge]];
  }, []);
};

const getEdges = (...locations) =>
  locations.reduce((accu, location, index) => {
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

export const getEventDetails = (id = 0) => {
  const edges = compose(groupBy, addData, getEdges(...coordinates))(id);
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
