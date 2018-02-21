const computeDistanceBetweenLocations = (
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

const computeRegionForLocations = (locations = []) =>
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

const computeRegion = (...edges) => {
  const initialRegion = {
    minLatitude: edges[0].src.latitude || 0,
    maxLatitude: edges[0].src.latitude || 0,
    minLongitude: edges[0].src.longitude || 0,
    maxLongitude: edges[0].src.longitude || 0
  };
  return edges.reduce((region, edge) => {
    const currentRegion = computeRegionForLocations([edge.src, edge.dest]);
    return {
      minLatitude:
        currentRegion.minLatitude < region.minLatitude
          ? currentRegion.minLatitude
          : region.minLatitude,
      maxLatitude:
        currentRegion.maxLatitude > region.maxLatitude
          ? currentRegion.maxLatitude
          : region.maxLatitude,
      minLongitude:
        currentRegion.minLongitude < region.minLongitude
          ? currentRegion.minLongitude
          : region.minLongitude,
      maxLongitude:
        currentRegion.maxLongitude > region.maxLongitude
          ? currentRegion.maxLongitude
          : region.maxLongitude
    };
  }, initialRegion);
};

const computeDistance = (...edges) =>
  edges.reduce(
    (distance, edge) =>
      distance + computeDistanceBetweenLocations(edge.src, edge.dest),
    0
  );

const computeElevationGain = (...edges) =>
  edges.reduce((elevationGain, edge) => {
    const Δφ = edge.dest.altitude - edge.src.altitude;
    if (Δφ > 0) {
      return elevationGain + Δφ;
    }
    return elevationGain;
  }, 0);

const findClosestEdge = (location, ...edges) => {
  if (edges.length <= 1) {
    return edges[0];
  }

  const gaps = edges.reduce(
    (acc, edge) => [
      ...acc,
      {
        edge,
        distance:
          computeDistanceBetweenLocations(edge.src, location) +
          computeDistanceBetweenLocations(edge.dest, location)
      }
    ],
    []
  );
  return gaps.sort((a, b) => a.distance - b.distance)[0].edge;
};

export default {
  computeDistance,
  findClosestEdge,
  computeElevationGain,
  computeDistanceBetweenLocations,
  computeRegion
};
