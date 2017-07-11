import { schema, normalize } from "normalizr";

import { pick } from "lodash";

import { API_ENDPOINT, RESOURCES, METHODS } from "../constants/rest";

import { callJSONApi } from "./helpers/api";

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
      const memberSchema = new schema.Entity(
        "members",
        {},
        {
          idAttribute: "id",
          processStrategy: entity => pick(entity, ["username"])
        }
      );
      const membersSchema = [memberSchema];
      const normalizedData = normalize(response.data, membersSchema);

      return {
        members: normalizedData.result,
        entities: normalizedData.entities
      };
    },
    error => ({ error })
  );
};

export const listClubAnnoucements = (token, id) => {
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
        IDs: normalizedData.result,
        entities: normalizedData.entities
      };
    },
    error => ({ error })
  );
};
