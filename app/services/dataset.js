import * as restConstants from '../constants/rest'

export const dataset = (endpoint, resource, method, token, body, language) => {

    let url = endpoint + resource;
    let headers = new Headers();

    if ((method === restConstants.METHODS.POST || method === restConstants.METHODS.PUT) && body) {
        headers.append('Content-Type', restConstants.APPLICATION_TYPE.JSON);
    }

    headers.append('Accept', 'application/json');
    headers.append('Origin', '*');
    headers.append('Cache-Control', 'no-cache');

    if (language) {
        headers.append('Accept-Language', language);
    }

    if (token) {
        headers.append('Authorization', 'Bearer ' + token);
    }

    let params = {
        method: method,
        headers: headers,
        mode: 'cors',
        body: body,
        timeout: 100
    };

    return new Promise((resolve, reject) => {

        setTimeout(function () {
            reject()
        }, 30000);

        fetch(url, params).then(response => {

            if (200 <= response.status && response.status <= 299) {
                response.text().then((data) => {
                    let json;
                    try {
                        json = JSON.parse(data);
                    }
                    catch (e) {
                        json = data;
                    }
                    resolve({
                        data: {statusCode: response.status, content: json, headers: response.headers}
                    });
                })
            }
            else {
                reject({
                    data: {statusCode: response.status, content: response.statusText, headers: response.headers}
                });
            }
        }).catch(error => {
            reject(error);
        });
    });
};
