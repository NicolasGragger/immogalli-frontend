import Cookies from 'js-cookie';

const endpoint = 'http://185.228.139.30:2604/';

const request = (method, url, data, progress) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        
        xhr.open(method, endpoint + url);

        xhr.responseType = 'json';

        console.log(data instanceof FormData);


        if (data && !(data instanceof FormData))
            xhr.setRequestHeader('Content-Type', 'application/json');

        if(Cookies.get('token'))
            xhr.setRequestHeader('Authorization', Cookies.get('token'));
        
        xhr.onload = () => {
            if (xhr.status >= 400) {
                reject(xhr.response);
            } else {
                if(xhr.response && xhr.response.token)
                    Cookies.set('token', xhr.response.token);
            
                resolve(xhr.response);
            }
        };

        xhr.onerror = () => {
            reject('connection problem');
        };

        xhr.onprogress = progress;


        if(data instanceof FormData)
            xhr.send(data);
        else
            xhr.send(JSON.stringify(data));
    });
}


export {request, endpoint};