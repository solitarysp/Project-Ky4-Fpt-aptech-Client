'use strict';
var app = angular.module('myApp');
app.controller('indexController', controller);

function controller($scope, $rootScope, $location, $localStorage, ngDialog,$window) {
    $scope.listSelect = $localStorage.listSelect;
    $scope.access_token = $localStorage.access_token;
    $scope.logout = function () {
        $localStorage.access_token = null;
        window.location = "/#/admin/home";
        $window.location.reload();
    }
}