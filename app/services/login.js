//constants
import {API_ENDPOINT, APPLICATION_TYPE, RESOURCES, METHODS} from '../constants/rest'

//helper
import {callApi} from '../helpers/api'


export const fetchToken = (form_data) => {

    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Origin', '*');
    headers.append('Cache-Control', 'no-cache');
    headers.append('Content-Type', APPLICATION_TYPE.FORM_DATA);

    const request = {
        endpoint: {
            url: API_ENDPOINT + RESOURCES.OAUTH,
            httpVerb: METHODS.POST
        },
        headers: headers,
        body: form_data
    };
    return callApi(request);
};
