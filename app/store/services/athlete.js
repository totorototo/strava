// constants
import { API_ENDPOINT, APPLICATION_TYPE, RESOURCES, METHODS } from '../constants/rest';

// helper
import { callJSONApi } from './helpers/api';

export const getAthleteClubs = (token) => {
  const headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Origin', '*');
  headers.append('Cache-Control', 'no-cache');
  headers.append('Content-Type', APPLICATION_TYPE.JSON);
  headers.append('Authorization', `Bearer ${token}`);

  const request = {
    endpoint: {
      url: API_ENDPOINT + RESOURCES.ATHLETE_CLUB,
      httpVerb: METHODS.GET,
    },
    headers,
  };
  return callJSONApi(request);
};
