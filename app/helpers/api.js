//constants
import {API_ENDPOINT, APPLICATION_TYPE, METHODS} from '../constants/rest'

export const callJSONApi = ({endpoint = {url: API_ENDPOINT , httpVerb: METHODS.GET}, headers = new Headers({'Content-Type': APPLICATION_TYPE.JSON}), body = {}}) => {

    let params = {
        method: endpoint.httpVerb,
        headers: headers,
        mode: 'cors',
        body: body,
        timeout: 100
    };

    return fetch(endpoint.url, params)
        .then(response =>
            response.json().then(json => ({json, response}))
        ).then(({json, response}) => {
            if (!response.ok) {
                return Promise.reject(json)
            } else {
                if (200 <= response.status && response.status <= 299) {
                    return json;
                } else {
                    return Promise.reject(json)
                }
            }
        })
        .then(
            data => ({data}),
            error => ({error: error.message || 'Something bad happened'})
        )
};