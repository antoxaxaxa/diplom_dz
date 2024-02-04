const { JSDOM } = require('jsdom');

// Имитируем объект window и XMLHttpRequest
const { window } = new JSDOM();
global.window = window;
global.XMLHttpRequest = window.XMLHttpRequest;

// Подключаем вашу функцию createRequest
const { createRequest } = require('./createRequest');

// Теперь вы можете использовать createRequest в этом файле
createRequest({
    url: 'http://127.0.0.1:8080',
    method: 'GET',
    callback: (err, response) => {
        console.log('Error:', err);
        console.log('Response:', response);
    },
});
