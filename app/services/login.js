//constants
import * as restConstants from '../constants/rest'

//helper
import {callApi} from '../helpers/api'


export const fetchToken = (form_data) => {

    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Origin', '*');
    headers.append('Cache-Control', 'no-cache');
    headers.append('Content-Type', restConstants.APPLICATION_TYPE.FORM_DATA);

    const request = {
        endpoint: {
            url: restConstants.API_ENDPOINT + restConstants.RESOURCES.OAUTH,
            httpVerb: restConstants.METHODS.POST
        },
        headers: headers,
        body: form_data
    };
    return callApi(request);
};
