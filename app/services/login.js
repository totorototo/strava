// constants
import { API_ENDPOINT, APPLICATION_TYPE, RESOURCES, METHODS } from '../constants/rest';

// helper
import { callJSONApi } from '../helpers/api';


export const fetchToken = (formData) => {
  const headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Origin', '*');
  headers.append('Cache-Control', 'no-cache');
  headers.append('Content-Type', APPLICATION_TYPE.FORM_DATA);

  const request = {
    endpoint: {
      url: API_ENDPOINT + RESOURCES.OAUTH,
      httpVerb: METHODS.POST,
    },
    headers,
    body: formData,
  };
  return callJSONApi(request);
};
