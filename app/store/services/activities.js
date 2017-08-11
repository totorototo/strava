import { schema, normalize } from "normalizr";

import { pick } from "lodash";

import { API_ENDPOINT, RESOURCES, METHODS } from "../constants/rest";

import { callJSONApi } from "./helpers/api";
import { convert } from "./helpers/moment";

import { references, referencesWeightings } from "../constants/references";

export const getGivenActivity = (token, activityID) => {
  const request = {
    endpoint: {
      url: `${API_ENDPOINT + RESOURCES.ACTIVITIES}/${activityID}`,
      httpVerb: METHODS.GET
    },
    token
  };
  return callJSONApi(request).then(
    response => {
      const activitySchema = new schema.Entity(
        "activity",
        {},
        {
          idAttribute: "id",
          processStrategy: entity => pick(entity, ["distance", "type"])
        }
      );
      const normalizedData = normalize(response.data, activitySchema);

      return {
        id: normalizedData.result,
        entities: normalizedData.entities
      };
    },
    error => ({ error })
  );
};

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
        "Runs",
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
              "start_date",
              "type"
            ])
        }
      );

      const activitiesSchema = new schema.Array(
        {
          Runs: activitySchema
        },
        input => `${input.type}s`
      );
      const normalizedData = normalize(response.data, activitiesSchema);

      return {
        entities: normalizedData.entities
      };
    },
    error => ({ error })
  );
};

export const getRankings = (members = [], activities = {}) => {
  const sortedActivitiesByAthlete = members.map(member => {
    const filteredIDs = Object.keys(activities).filter(
      id => activities[id].athlete.id === member
    );
    return filteredIDs.map(id => activities[id]);
  });

  const computedDataByAthlete = sortedActivitiesByAthlete.map(
    activitiesSortedByAthlete =>
      activitiesSortedByAthlete.reduce(
        (acc, currentValue) => ({
          distance: acc.distance + currentValue.distance,
          total_elevation_gain:
            acc.total_elevation_gain + currentValue.total_elevation_gain,
          elapsed_time: acc.elapsed_time + currentValue.elapsed_time,
          max_speed:
            currentValue.max_speed > acc.max_speed
              ? currentValue.max_speed
              : acc.max_speed,
          achievement_count:
            acc.achievement_count + currentValue.achievement_count,
          name: currentValue.athlete.firstname
        }),
        {
          distance: 0,
          total_elevation_gain: 0,
          elapsed_time: 0,
          max_speed: 0,
          achievement_count: 0,
          name: ""
        }
      )
  );

  const ranking = {
    distance: {
      value: 0,
      athlete: ""
    },
    total_elevation_gain: {
      value: 0,
      athlete: ""
    },
    elapsed_time: {
      value: 0,
      athlete: ""
    },
    max_speed: {
      value: 0,
      athlete: ""
    },
    achievement_count: {
      value: 0,
      athlete: ""
    }
  };

  computedDataByAthlete.forEach(statsByAthlete => {
    Object.keys(statsByAthlete).forEach(stat => {
      if (ranking[stat] === undefined) {
        return;
      }
      if (statsByAthlete[stat] > ranking[stat].value) {
        ranking[stat].value = statsByAthlete[stat];
        ranking[stat].athlete = statsByAthlete.name;
      }
    });
  });

  return { ranking };
};

export const computePerformance = (activities = {}) => {
  let distance = 0;
  let elevation = 0;
  let duration = 0;

  Object.keys(activities).forEach(id => {
    distance += activities[id].distance;
    elevation += activities[id].total_elevation_gain;
    duration += activities[id].elapsed_time;
  });

  const speedMeterPerSecond = distance / duration;
  const speedMinutePerKilometer =
    distance > 0 ? (1000 / (distance / duration * 60)).toFixed(2) : 0;

  const distanceHeuristic =
    distance /
    references.RECENT_RUN_DISTANCE *
    referencesWeightings.RECENT_RUN_DISTANCE;

  const elevationHeuristic =
    elevation /
    references.RECENT_RUN_ELEVATION_GAIN *
    referencesWeightings.RECENT_RUN_ELEVATION_GAIN;

  const frequencyHeuristic =
    Object.keys(activities).length > 0
      ? Object.keys(activities).length /
        references.RECENT_RUN_COUNT *
        referencesWeightings.RECENT_RUN_COUNT
      : 0;

  const speedHeuristic =
    speedMeterPerSecond /
    references.RECENT_RUN_SPEED *
    referencesWeightings.RECENT_RUN_SPEED;

  const timeHeuristic =
    duration /
    references.RECENT_RUN_TIME *
    referencesWeightings.RECENT_RUN_TIME;

  const performance =
    distanceHeuristic +
    elevationHeuristic +
    frequencyHeuristic +
    speedHeuristic +
    timeHeuristic;

  const performanceDetails = [];
  performanceDetails.push({
    name: "distance",
    percent: Math.trunc(distanceHeuristic * 100 / performance),
    absolute: Math.trunc(distance / 1000),
    unit: "km"
  });
  performanceDetails.push({
    name: "elevation",
    percent: Math.trunc(elevationHeuristic * 100 / performance),
    absolute: elevation,
    unit: "m"
  });
  performanceDetails.push({
    name: "duration",
    percent: Math.trunc(timeHeuristic * 100 / performance),
    absolute: convert(duration),
    unit: ""
  });
  performanceDetails.push({
    name: "speed",
    percent: Math.trunc(speedHeuristic * 100 / performance),
    absolute: speedMinutePerKilometer,
    unit: "min/km"
  });
  performanceDetails.push({
    name: "runs count",
    percent: Math.trunc(frequencyHeuristic * 100 / performance),
    absolute: Object.keys(activities).length,
    unit: ""
  });

  return {
    performance: {
      details: performanceDetails,
      value: performance
    }
  };
};
