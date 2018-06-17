'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.version',
    'ngStorage'
]).config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $routeProvider
        .when('/search', {
            templateUrl: 'pages/search/search.html',
            constructor: "searchController",
        }).when('/home', {
        templateUrl: 'pages/home/home.html',
        constructor: "homeController",
    })
        .otherwise({redirectTo: '/search'});
}]);
