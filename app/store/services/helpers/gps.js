const computeDistance = (
  origin = { longitude: 0, latitude: 0 },
  destination = { longitude: 0, latitude: 0 }
) => {
  const R = 6371e3; // metres
  const φ1 = origin.latitude * Math.PI / 180;
  const φ2 = destination.latitude * Math.PI / 180;
  const Δφ = (destination.latitude - origin.latitude) * Math.PI / 180;
  const Δλ = (destination.longitude - origin.longitude) * Math.PI / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c / 1000;
};

const isInRegion = (
  currentLocation = { longitude: 0, latitude: 0 },
  reference = { longitude: 0, latitude: 0 },
  Δλ = 0,
  Δφ = 0
) =>
  Math.abs(currentLocation.longitude - reference.longitude) < Δλ &&
  Math.abs(currentLocation.latitude - reference.latitude) < Δφ;

const computePathDistance = (...locations) =>
  locations.reduce((distance, currentPoint, index) => {
    const nextPoint = locations[index + 1];
    if (nextPoint) {
      return distance + computeDistance(currentPoint, nextPoint);
    }
    return distance;
  }, 0);

const findClosestLocation = (locations = [], currentLocation = {}) => {
  const distances = locations.map((currentPoint, index) => ({
    index,
    distance: computeDistance(currentLocation, currentPoint)
  }));

  const sortedDistances = distances.sort((a, b) => a.distance - b.distance);
  if (sortedDistances.length > 0) {
    return locations[sortedDistances[0].index];
  }
  return null;
};

const computeElevationGain = (...locations) =>
  locations.reduce((elevationGain, currentLocation, index) => {
    const previousPoint = locations[index - 1];
    if (previousPoint) {
      const Δφ = currentLocation.altitude - previousPoint.altitude;
      if (Δφ > 0) {
        return elevationGain + Δφ;
      }
      return elevationGain;
    }
    return elevationGain;
  }, 0);

const computeRegion = (locations = []) =>
  locations.reduce(
    (region, currentLocation) => ({
      minLongitude:
        currentLocation.longitude < region.minLongitude
          ? currentLocation.longitude
          : region.minLongitude,
      maxLongitude:
        currentLocation.longitude > region.maxLongitude
          ? currentLocation.longitude
          : region.maxLongitude,
      minLatitude:
        currentLocation.latitude < region.minLatitude
          ? currentLocation.latitude
          : region.minLatitude,
      maxLatitude:
        currentLocation.latitude > region.maxLongitude
          ? currentLocation.latitude
          : region.maxLongitude
    }),
    {
      minLongitude: locations[0].longitude,
      maxLongitude: locations[0].longitude,
      minLatitude: locations[0].latitude,
      maxLatitude: locations[0].latitude
    }
  );

export default {
  computeRegion,
  computeDistance,
  isInRegion,
  computePathDistance,
  computeElevationGain,
  findClosestLocation
};
