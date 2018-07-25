'use strict';
var app = angular.module('myApp');
app.controller('indexController', controller);

function controller($scope, $rootScope, $location, $localStorage, ngDialog) {
    $scope.listSelect = $localStorage.listSelect;
    $scope.access_token = $localStorage.access_token;
    $scope.clickPay = function () {
        ngDialog.open({
            template: 'pages/dialogs/dialog-detail-chair.html',
            className: 'ngdialog-theme-default',
            controller: 'DialogController',
            scope: $scope,
            controllerAs: 'dialogCtrl',
            width: 1000,
        });
    }

}