enum METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

type OptionsType = {
    headers?: Record<string, any>,
    method?: METHODS,
    data?: any,
    timeout?: number,
}

function queryStringify(data: Record<string, string | number | object>) {
    if (typeof data !== 'object') {
        throw new Error('Data must be object');
    }

    const keys = Object.keys(data);
    return keys.reduce((result, key, index) => {
        return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
    }, '?');
}

class HTTPTransport {
    public get = (url: string, options: OptionsType = {}) => {
        return this.request(url, {...options, method: METHODS.GET}, options.timeout);
    };

    public post = (url: string, options: OptionsType = {}) => {
        return this.request(url, {...options, method: METHODS.POST}, options.timeout);
    };

    public put = (url: string, options: OptionsType = {}) => {
        return this.request(url, {...options, method: METHODS.PUT}, options.timeout);
    };

    public delete = (url: string, options: OptionsType = {}) => {
        return this.request(url, {...options, method: METHODS.DELETE}, options.timeout);
    };

    request = (url: string, options: OptionsType = {}, timeout = 5000) => {
        const {headers = {}, method, data} = options;

        return new Promise(function(resolve, reject) {
            if (!method) {
                reject('No method');
                return;
            }

            const xhr = new XMLHttpRequest();
            const isGet = method === METHODS.GET;

            xhr.open(
                method,
                isGet && !!data
                    ? `${url}${queryStringify(data)}`
                    : url,
            );

            Object.keys(headers).forEach(key => {
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.onload = function() {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;

            xhr.timeout = timeout;
            xhr.ontimeout = reject;

            if (isGet || !data) {
                xhr.send();
            } else {
                xhr.send(data);
            }
        });
    };
}

export default HTTPTransport;
