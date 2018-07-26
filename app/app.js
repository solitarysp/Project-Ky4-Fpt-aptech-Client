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
            controllerAs: 'homeCtrl'
        })
        .when('/search', {
            templateUrl: 'pages/search/search.html',
            constructor: "searchController",
            controllerAs: 'searchCtrl'

        })
        .when('/showMessgarPayTicket', {
            templateUrl: 'pages/messgar/showMessgarPayTicket.html',
            constructor: "showMessgarPayTicketController",
            controllerAs: 'showMessgarPayTicketCtrl'

        })
        .when('/admin', {
            templateUrl: 'pages/admin/login/loginAdmin.html',
            constructor: "loginAdminController",
            controllerAs: 'loginAdminCtrl'

        }).when('/admin/home', {
            templateUrl: 'pages/admin/home/home.html',
            constructor: "homeAdminController",
            controllerAs: 'homeAdminCtrl'
        }).when('/admin/addtrain', {
            templateUrl: 'pages/admin/addtrain/addTrain.html',
            constructor: "addTrainAdminController",
            controllerAs: 'addTrainHomeAdminCtrl'

        }).when('/admin/history', {
            templateUrl: 'pages/admin/history/history.html',
            constructor: "historyAdminController",
            controllerAs: 'historyAdminCtrl'

        }).when('/cart', {
            templateUrl: 'pages/cart/cart.html',
            constructor: "cartController",
            controllerAs: 'cartCtrl'

        }).when('/checkTicket', {
            templateUrl: 'pages/checkticket/checkTicket.html',
            constructor: "checkTicketController",
            controllerAs: 'checkTicketCtrl'

        })
        .otherwise({redirectTo: '/home'});
}]);
