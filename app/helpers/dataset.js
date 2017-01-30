import * as restConstants from '../constants/rest'

export const dataset = (endpoint, resource, method, token, body, contentType) => {

    let url = endpoint + resource;
    let headers = new Headers();

    headers.append('Accept', 'application/json');
    headers.append('Origin', '*');
    headers.append('Cache-Control', 'no-cache');

    if(contentType && body && ((method === restConstants.METHODS.POST || method === restConstants.METHODS.PUT))){
        headers.append('Content-Type', contentType);
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

        console.log('url: ' + url);
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
