import { convertToDoc, converToGeoJSON } from "./helpers/converters";

export const toDoc = contents => convertToDoc(contents);

export const toGeoJSON = doc => converToGeoJSON(doc);

export const toCoordinates = geoJSON =>
  geoJSON.features[0].geometry.coordinates.reduce(
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
