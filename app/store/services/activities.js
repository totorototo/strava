import { schema, normalize } from "normalizr";

import { pick } from "lodash";

import { API_ENDPOINT, RESOURCES, METHODS } from "../constants/rest";

import { callJSONApi } from "./helpers/api";

import { references, referencesWeightings } from "../constants/references";

export const getAthleteActivities = token => {
  const d = new Date();
  d.setMonth(d.getMonth() - 1);
  const query = Math.round(d.getTime() / 1000);

  const request = {
    endpoint: {
      url: API_ENDPOINT + RESOURCES.ACTIVITIES,
      httpVerb: METHODS.GET
    },
    token,
    queryParameters: {
      after: query
    }
  };
  return callJSONApi(request).then(
    response => {
      const activitySchema = new schema.Entity(
        "activities",
        {},
        {
          idAttribute: "id",
          processStrategy: entity =>
            pick(entity, [
              "distance",
              "total_elevation_gain",
              "elapsed_time",
              "achievement_count",
              "pr_count",
              "kudos_count",
              "average_speed",
              "max_speed",
              "average_cadence",
              "average_heartrate",
              "max_heartrate",
              "start_date"
            ])
        }
      );
      const activitiesSchema = [activitySchema];
      const normalizedData = normalize(response.data, activitiesSchema);

      return {
        IDs: normalizedData.result,
        entities: normalizedData.entities
      };
    },
    error => ({ error })
  );
};

export const computePerformance = (activities = {}) => {
  let distance = 0;
  let elevation = 0;
  let time = 0;
  let avgSpeed = 0;

  Object.keys(activities).forEach(id => {
    distance += activities[id].distance;
    elevation += activities[id].total_elevation_gain;
    time += activities[id].elapsed_time;
    avgSpeed += activities[id].average_speed;
  });

  avgSpeed /= Object.keys(activities).length;

  const distanceHeuristic =
    distance /
    references.RECENT_RUN_DISTANCE *
    referencesWeightings.RECENT_RUN_DISTANCE;

  const elevationHeuristic =
    elevation /
    references.RECENT_RUN_ELEVATION_GAIN *
    referencesWeightings.RECENT_RUN_ELEVATION_GAIN;

  const frequencyHeuristic =
    Object.keys(activities).length /
    references.RECENT_RUN_COUNT *
    referencesWeightings.RECENT_RUN_COUNT;

  const speedHeuristic =
    avgSpeed /
    references.RECENT_RUN_SPEED *
    referencesWeightings.RECENT_RUN_SPEED;

  const timeHeuristic =
    time / references.RECENT_RUN_TIME * referencesWeightings.RECENT_RUN_TIME;

  const performance =
    distanceHeuristic +
    elevationHeuristic +
    frequencyHeuristic +
    speedHeuristic +
    timeHeuristic;

  const performanceDetails = [];
  performanceDetails.push({
    name: "distance",
    number: Math.trunc(distanceHeuristic * 100 / performance)
  });
  performanceDetails.push({
    name: "elevation",
    number: Math.trunc(elevationHeuristic * 100 / performance)
  });
  performanceDetails.push({
    name: "time",
    number: Math.trunc(timeHeuristic * 100 / performance)
  });
  performanceDetails.push({
    name: "speed",
    number: Math.trunc(speedHeuristic * 100 / performance)
  });
  performanceDetails.push({
    name: "frequency",
    number: Math.trunc(frequencyHeuristic * 100 / performance)
  });

  return {
    performance: {
      details: performanceDetails,
      value: performance
    }
  };
};
