const computeDistance = (
  pointA = { longitude: 0, latitude: 0 },
  pointB = { longitude: 0, latitude: 0 }
) => {
  const R = 6371e3; // metres
  const φ1 = pointA.latitude * Math.PI / 180;
  const φ2 = pointB.latitude * Math.PI / 180;
  const Δφ = (pointB.latitude - pointA.latitude) * Math.PI / 180;
  const Δλ = (pointB.longitude - pointA.longitude) * Math.PI / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c / 1000;
};

const isInArea = (
  position = { longitude: 0, latitude: 0 },
  point = { longitude: 0, latitude: 0 },
  Δλ = 0,
  Δφ = 0
) =>
  Math.abs(position.longitude - point.longitude) < Δλ &&
  Math.abs(position.latitude - point.latitude) < Δφ;

const computePathDistance = (points = []) =>
  points.reduce((distance, currentPoint, index) => {
    const nextPoint = points[index + 1];
    if (nextPoint) {
      return distance + computeDistance(currentPoint, nextPoint);
    }
    return distance;
  }, 0);

const findClosestPoint = (points = [], currentPosition = {}) => {
  const distances = points.map((currentPoint, index) => ({
    index,
    distance: computeDistance(currentPosition, currentPoint)
  }));

  const sortedDistances = distances.sort((a, b) => a.distance - b.distance);
  if (sortedDistances.length > 0) {
    return points[sortedDistances[0].index];
  }
  return currentPosition;
};

const computeElevationGain = (points = []) =>
  points.reduce((elevationGain, currentPoint, index) => {
    const previousPoint = points[index - 1];
    if (previousPoint) {
      const Δφ = currentPoint.altitude - previousPoint.altitude;
      if (Δφ > 0) {
        return elevationGain + Δφ;
      }
      return elevationGain;
    }
    return elevationGain;
  }, 0);

export default {
  computeDistance,
  isInArea,
  computePathDistance,
  computeElevationGain,
  findClosestPoint
};
