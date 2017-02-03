

export const callApi = ({endpoint, headers, body}) => {

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