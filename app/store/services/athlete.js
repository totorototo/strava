import { schema, normalize } from "normalizr";
import { pick } from "lodash";

import { API_ENDPOINT, RESOURCES, METHODS } from "../constants/rest";
import { callJSONApi } from "./helpers/api";
import { references, referencesWeightings } from "../constants/references";

export const getAthleteDetails = (token, id) => {
  const request = {
    endpoint: {
      url: `${API_ENDPOINT + RESOURCES.ATHLETE}/${id}`,
      httpVerb: METHODS.GET
    },
    token
  };
  return callJSONApi(request).then(
    response => {
      const athlete = response.data;
      const shoes = new schema.Entity("shoes", {}, { idAttribute: "id" });
      const bikes = new schema.Entity("bikes", {}, { idAttribute: "id" });
      const clubs = new schema.Entity("clubs", {}, { idAttribute: "id" });
      const athleteSchema = new schema.Entity(
        "athletes",
        {
          shoes: [shoes],
          bikes: [bikes],
          clubs: [clubs]
        },
        {
          idAttribute: "id",
          processStrategy: entity =>
            pick(entity, [
              "firstname",
              "lastname",
              "profile",
              "bikes",
              "shoes",
              "clubs",
              "id"
            ])
        }
      );

      const normalizedData = normalize(athlete, athleteSchema);

      return {
        currentUserID: normalizedData.result,
        entities: normalizedData.entities
      };
    },
    error => ({ error })
  );
};

export const computeAthletePerformance = (
  { recent = {}, year = {}, total = {} } = {}
) => {
  const heuristic1 =
    (recent.count /
      references.RECENT_RUN_COUNT *
      referencesWeightings.RECENT_RUN_COUNT +
      recent.distance /
        references.RECENT_RUN_DISTANCE *
        referencesWeightings.RECENT_RUN_DISTANCE +
      recent.elevation_gain /
        references.RECENT_RUN_ELEVATION_GAIN *
        referencesWeightings.RECENT_RUN_ELEVATION_GAIN) *
    referencesWeightings.RECENT_EFFORTS;

  const heuristic2 =
    (year.count /
      references.YEAR_RUN_COUNT *
      referencesWeightings.YEAR_RUN_COUNT +
      year.distance /
        references.YEAR_RUN_DISTANCE *
        referencesWeightings.YEAR_RUN_DISTANCE +
      year.elevation_gain /
        references.YEAR_RUN_ELEVATION_GAIN *
        referencesWeightings.YEAR_RUN_ELEVATION_GAIN) *
    referencesWeightings.YEAR_EFFORTS;

  const heuristic3 =
    (total.count /
      references.TOTAL_RUN_COUNT *
      referencesWeightings.TOTAL_RUN_COUNT +
      total.distance /
        references.TOTAL_RUN_DISTANCE *
        referencesWeightings.TOTAL_RUN_DISTANCE +
      total.elevation_gain /
        references.TOTAL_RUN_ELEVATION_GAIN *
        referencesWeightings.TOTAL_RUN_ELEVATION_GAIN) *
    referencesWeightings.TOTAL_EFFORTS;

  const performance = heuristic1 + heuristic2 + heuristic3;
  if (performance !== undefined || !isNaN(performance)) {
    return { performance };
  }
  return { error: "Oops" };
};
