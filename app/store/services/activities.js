import { API_ENDPOINT, RESOURCES, METHODS } from "../constants/rest";

import { callJSONApi } from "./helpers/api";

export const getAthleteActivities = token => {
  const request = {
    endpoint: {
      url: API_ENDPOINT + RESOURCES.ACTIVITIES,
      httpVerb: METHODS.GET
    },
    token
  };
  return callJSONApi(request).then(
    response => ({ response: response.data }),
    error => ({ error })
  );
};
