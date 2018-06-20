'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.version',
    'ngStorage',
    'ngDialog'
]).config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'pages/home/home.html',
            constructor: "homeController",
        })
        .when('/search', {
            templateUrl: 'pages/search/search.html',
            constructor: "searchController",
        })
        .otherwise({redirectTo: '/home'});
}]);
