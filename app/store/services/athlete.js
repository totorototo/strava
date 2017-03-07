// constants
import { API_ENDPOINT, RESOURCES, METHODS } from '../constants/rest';

// helper
import { callJSONApi } from './helpers/api';

export const getAthleteClubs = (token) => {
  const request = {
    endpoint: {
      url: API_ENDPOINT + RESOURCES.ATHLETE_CLUB,
      httpVerb: METHODS.GET,
    },
    token,
  };
  return callJSONApi(request)
    .then(
      response => (response.data),
      error => (error),
  );
};

export const getAthleteStats = (token, id) => {
  const request = {
    endpoint: {
      url: `${API_ENDPOINT + RESOURCES.ATHLETE}/${id}/${RESOURCES.STATS}`,
      httpVerb: METHODS.GET,
    },
    token,
  };
  return callJSONApi(request)
     .then(
         response => (response.data),
         error => (error),
     );
};
