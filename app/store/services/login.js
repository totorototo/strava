// constants
import { API_ENDPOINT, RESOURCES, METHODS } from '../constants/rest';

// helper
import { callJSONApi } from './helpers/api';


export const authenticate = (temporaryAccessToken) => {
  // TODO: use config file to retrieve client id + client secret.
  const formData = new FormData();
  formData.append('client_id', '15688');
  formData.append('client_secret', '');
  formData.append('code', temporaryAccessToken);

  const request = {
    endpoint: {
      url: API_ENDPOINT + RESOURCES.OAUTH,
      httpVerb: METHODS.POST,
    },
    parameters: formData,
  };

  return callJSONApi(request)
    .then(
      response => ({ token: response.data.access_token,
        athleteID: response.data.athlete.id,
        athleteDetails: {
          firstname: response.data.athlete.firstname,
          lastname: response.data.athlete.lastname } }),
      error => ({ error }),
    );
};
