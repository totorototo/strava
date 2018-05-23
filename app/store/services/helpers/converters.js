import xmldom from "xmldom";

import { toGeoJSON } from "./geoJSON";

export const convertToDoc = (contents = "") =>
  new Promise(resolve => {
    resolve(new xmldom.DOMParser().parseFromString(contents));
  });

export const converToGeoJSON = doc =>
  new Promise(resolve => {
    resolve(toGeoJSON.gpx(doc));
  });
