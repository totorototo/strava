// constants
import { API_ENDPOINT, APPLICATION_TYPE, METHODS } from '../../constants/rest';

export const callJSONApi = ({ endpoint = { url: API_ENDPOINT, httpVerb: METHODS.GET }, headers = new Headers({ 'Content-Type': APPLICATION_TYPE.JSON }), body = {} }) => {
  const params = {
    method: endpoint.httpVerb,
    headers,
    mode: 'cors',
    body,
    timeout: 100,
  };

  return fetch(endpoint.url, params)
        .then(response =>
            response.json().then(json => ({ json, response })),
        ).then(({ json, response }) => {
          if (!response.ok) {
            return Promise.reject(json);
          } else if (response.status >= 200 && response.status <= 299) {
            return json;
          }
          return Promise.reject(json);
        })
        .then(
            data => ({ data }),
            error => ({ error: error.message || 'Something bad happened' }),
        );
};
