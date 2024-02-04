/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
function createRequest(options){
    const xhr = new XMLHttpRequest();

    xhr.open(options.method, options.url);

    xhr.responseType = 'json';

    if (options.data){
        if (options.method === 'GET'){
            let queryParams = '';
            for (const key in options.data) {
                if (queryParams !== '') {
                    queryParams += '&';
                }
                queryParams += `${encodeURIComponent(key)}=${encodeURIComponent(options.data[key])}`;
            }
            options.url += `?${queryParams}`;
        }
        else{
            const formData = new FormData();
            for(const key in options.data){
                formData.append(key, options.data)
            }
            xhr.send(formData);
        }
    }
    else{
        xhr.send();
    }
    xhr.onload = function () {
        if (xhr.readyState === 4) {
            // В случае успеха вызываем callback без ошибки и с данными ответа
            options.callback(null, xhr.response);
        } else {
            // В случае ошибки передаем объект ошибки в callback
            options.callback(new Error(`Request failed with status ${xhr.status}`), null);
        }
    };
    xhr.onerror = function () {
        // В случае ошибки передаем объект ошибки в callback
        options.callback(new Error('Request failed'), null);
    };
}