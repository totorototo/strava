import { schema, normalize } from "normalizr";
import { pick } from "lodash";

import { API_ENDPOINT, RESOURCES, METHODS } from "../constants/rest";
import { callJSONApi } from "./helpers/api";

const computeID = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const listClubMembers = (token, id) => {
  const request = {
    endpoint: {
      url: `${API_ENDPOINT + RESOURCES.CLUBS}/${id}/${RESOURCES.MEMBERS}`,
      httpVerb: METHODS.GET
    },
    token
  };
  return callJSONApi(request).then(
    response => {
      const enhancedData = response.data.map(member => ({
        ...member,
        id: computeID(0, 100000).toString()
      }));
      const memberSchema = new schema.Entity(
        "members",
        {},
        {
          idAttribute: "id",
          processStrategy: entity =>
            pick(entity, ["firstname", "lastname", "id"])
        }
      );
      const membersSchema = [memberSchema];
      const normalizedData = normalize(enhancedData, membersSchema);

      return {
        ids: normalizedData.result,
        entities: normalizedData.entities
      };
    },
    error => ({ error })
  );
};

export const listClubAnnouncements = (token, id) => {
  const request = {
    endpoint: {
      url: `${API_ENDPOINT + RESOURCES.CLUBS}/${id}/${RESOURCES.ANNOUNCEMENTS}`,
      httpVerb: METHODS.GET
    },
    token
  };
  return callJSONApi(request).then(
    response => {
      const announcementSchema = new schema.Entity(
        "announcements",
        {},
        {
          idAttribute: "id"
        }
      );
      const announcementsSchema = [announcementSchema];
      const normalizedData = normalize(response.data, announcementsSchema);

      return {
        ids: normalizedData.result,
        entities: normalizedData.entities
      };
    },
    error => ({ error })
  );
};

export const listClubActivities = (token, id) => {
  const request = {
    endpoint: {
      url: `${API_ENDPOINT +
        RESOURCES.CLUBS}/${id}/${RESOURCES.CLUB_ACTIVITIES}`,
      httpVerb: METHODS.GET
    },
    token,
    queryParameters: {
      per_page: 200
    }
  };
  return callJSONApi(request).then(
    response => {
      const enhancedData = response.data.map(activity => ({
        ...activity,
        id: computeID(0, 100000).toString()
      }));
      const activitySchema = new schema.Entity(
        "Runs",
        {},
        {
          idAttribute: "id",
          processStrategy: entity =>
            pick(entity, [
              "id",
              "type",
              "name",
              "athlete",
              "distance",
              "achievement_count",
              "elapsed_time",
              "max_speed",
              "total_elevation_gain"
            ])
        }
      );

      const activitiesSchema = [activitySchema];
      const normalizedData = normalize(enhancedData, activitiesSchema);

      return {
        ids: normalizedData.result,
        entities: normalizedData.entities.Runs
      };
    },
    error => ({ error })
  );
};

export const filterClubAthletes = (athletes = {}, filteredAthleteID = 0) =>
  Object.keys(athletes)
    .filter(member => parseInt(member, 0) !== filteredAthleteID)
    .map(key => ({ [key]: athletes[key] }))
    .reduce((accumulator, current) => ({ ...accumulator, ...current }), {});
