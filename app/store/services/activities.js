import { schema, normalize } from "normalizr";
import { pick } from "lodash";

import { API_ENDPOINT, RESOURCES, METHODS } from "../constants/rest";
import { callJSONApi } from "./helpers/api";
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
  const overallPerformance = Object.keys(activities).reduce(
    (accumulator, id) => ({
      distance: accumulator.distance + activities[id].distance,
      elevation: accumulator.elevation + activities[id].total_elevation_gain,
      duration: accumulator.duration + activities[id].elapsed_time
    }),
    { distance: 0, elevation: 0, duration: 0 }
  );

  const paceMeterPerSecond =
    overallPerformance.duration > 0
      ? overallPerformance.distance / overallPerformance.duration
      : 0;
  const paceKilometerPerHour = parseFloat(
    (paceMeterPerSecond * 3.6).toFixed(2)
  );

  const distanceHeuristic =
    overallPerformance.distance /
    references.RECENT_RUN_DISTANCE *
    referencesWeightings.RECENT_RUN_DISTANCE;

  const elevationHeuristic =
    overallPerformance.elevation /
    references.RECENT_RUN_ELEVATION_GAIN *
    referencesWeightings.RECENT_RUN_ELEVATION_GAIN;

  const frequencyHeuristic =
    Object.keys(activities).length > 0
      ? Object.keys(activities).length /
        references.RECENT_RUN_COUNT *
        referencesWeightings.RECENT_RUN_COUNT
      : 0;

  const paceHeuristic =
    paceMeterPerSecond /
    references.RECENT_RUN_SPEED *
    referencesWeightings.RECENT_RUN_SPEED;

  const timeHeuristic =
    overallPerformance.duration /
    references.RECENT_RUN_TIME *
    referencesWeightings.RECENT_RUN_TIME;

  const performance =
    distanceHeuristic +
    elevationHeuristic +
    frequencyHeuristic +
    paceHeuristic +
    timeHeuristic;

  return {
    performance: {
      details: [
        {
          name: "distance",
          percent: Math.trunc(distanceHeuristic * 100 / performance),
          value: Math.trunc(overallPerformance.distance / 1000),
          unit: "km"
        },
        {
          name: "elevation",
          percent: Math.trunc(elevationHeuristic * 100 / performance),
          value: overallPerformance.elevation,
          unit: "m"
        },
        {
          name: "duration",
          percent: Math.trunc(timeHeuristic * 100 / performance),
          value: overallPerformance.duration
        },
        {
          name: "pace",
          percent: Math.trunc(paceHeuristic * 100 / performance),
          value: paceKilometerPerHour,
          unit: "km/h"
        },
        {
          name: "runs count",
          percent: Math.trunc(frequencyHeuristic * 100 / performance),
          value: Object.keys(activities).length
        }
      ],
      value: performance
    }
  };
};
