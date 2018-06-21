(function () {
    'use strict';

    angular
        .module('myApp');

})();

var baseConfig = {
    protocol: 'http://',
    server: 'localhost',
    standardServicePort: ':8080',
    baseUrlEnding: '/'
};
var config = {
    post: 'POST',
    get: 'GET',
    delete: 'DELETE',
    put: 'PUT'
};

var mess =
    {
        not_find : "không tìm thấy",
    };