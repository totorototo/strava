// constants
import { API_ENDPOINT, APPLICATION_TYPE, METHODS } from "../../constants/rest";

export const callJSONApi = (
  {
    endpoint = { url: API_ENDPOINT, httpVerb: METHODS.GET },
    token = "",
    parameters = {}
  }
) => {
  const headers = new Headers();
  headers.append("Accept", "application/json");
  headers.append("Origin", "*");
  headers.append("Cache-Control", "no-cache");
  headers.append("Content-Type", APPLICATION_TYPE.FORM_DATA);
  if (token.length) {
    headers.append("Authorization", `Bearer ${token}`);
  }

  const params = {
    method: endpoint.httpVerb,
    headers,
    mode: "cors",
    body: (
      Object.getOwnPropertyNames(parameters).length === 0
        ? undefined
        : parameters
    ),
    timeout: 100
  };

  return fetch(endpoint.url, params)
    .then(response => response.json().then(json => ({ json, response })))
    .then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json);
      } else if (response.status >= 200 && response.status <= 299) {
        return json;
      }
      return Promise.reject(json);
    })
    .then(data => ({ data }), error => ({
      error: error.message || "Something bad happened"
    }));
};
