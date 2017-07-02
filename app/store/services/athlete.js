import { pick } from "lodash";

import { API_ENDPOINT, RESOURCES, METHODS } from "../constants/rest";

import { callJSONApi } from "./helpers/api";

import { references, referencesWeightings } from "../constants/references";

export const getAthleteStats = (token, id) => {
  const request = {
    endpoint: {
      url: `${API_ENDPOINT + RESOURCES.ATHLETE}/${id}/${RESOURCES.STATS}`,
      httpVerb: METHODS.GET
    },
    token
  };
  return callJSONApi(request).then(
    response => {
      const {
        recent_run_totals,
        ytd_run_totals,
        all_run_totals
      } = response.data;
      const recent = pick(recent_run_totals, [
        "count",
        "distance",
        "elevation_gain",
        "achievement_count"
      ]);
      const year = pick(ytd_run_totals, [
        "distance",
        "elevation_gain",
        "count"
      ]);
      const total = pick(all_run_totals, [
        "distance",
        "elevation_gain",
        "count"
      ]);
      return {
        stats: {
          recent,
          year,
          total
        }
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
