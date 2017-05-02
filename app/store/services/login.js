// normalizr
import { schema, normalize } from "normalizr";

// constants
import { API_ENDPOINT, RESOURCES, METHODS } from "../constants/rest";

// helper
import { callJSONApi } from "./helpers/api";

export const authenticate = temporaryAccessToken => {
  // TODO: use config file to retrieve client id + client secret.
  const formData = new FormData();
  formData.append("client_id", "15688");
  formData.append("client_secret", "");
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
      const athlete = response.data.athlete;
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
        { idAttribute: "id" }
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
