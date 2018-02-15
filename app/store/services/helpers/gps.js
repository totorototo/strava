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

const partitionPath = (...edges) => {
  const DIRECTION = {
    UP: 0x1,
    DOWN: 0x0
  };

  let direction = DIRECTION.UP;
  const mask = 0x1;

  return edges.reduce((accu, edge) => {
    const delta = edge.dest.altitude - edge.src.altitude;
    if (
      (delta > 0 && direction === DIRECTION.DOWN) ||
      (delta < 0 && direction === DIRECTION.UP)
    ) {
      // eslint-disable-next-line
      direction ^= mask;
      return [...accu, [{ edge, delta }]];
    }
    return [
      ...accu.slice(0, accu.length - 1),
      ...accu.slice(accu.length),
      [...accu[accu.length - 1], { edge, delta }]
    ];
  }, []);
};

const findClosestEdge = (location, ...edges) => {
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
  const sortedEdges = gaps.sort((a, b) => a.distance - b.distance);
  if (sortedEdges.length > 0) {
    return sortedEdges[0].edge;
  }

  return null;
};

export default {
  computeDistance,
  findClosestEdge,
  computeElevationGain,
  computeDistanceBetweenLocations,
  partitionPath
};
