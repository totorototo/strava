import { schema, normalize } from "normalizr";
import Config from "react-native-config";
import { pick } from "lodash";

import { callJSONApi } from "./helpers/api";
import { API_ENDPOINT, RESOURCES, METHODS } from "../constants/rest";

export const authenticate = temporaryAccessToken => {
  const formData = new FormData();
  formData.append("client_id", Config.CLIENT_ID);
  formData.append("client_secret", Config.CLIENT_SECRET);
  formData.append("code", temporaryAccessToken);

  const request = {
    endpoint: {
      url: API_ENDPOINT + RESOURCES.OAUTH,
      httpVerb: METHODS.POST
    },
    parameters: formData
  };

  return callJSONApi(request).then(
    response => {
      const { athlete } = response.data;
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
        token: response.data.access_token,
        currentUserID: normalizedData.result,
        entities: normalizedData.entities
      };
    },
    error => ({ error })
  );
};
