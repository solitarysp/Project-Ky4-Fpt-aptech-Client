(function () {
    'use strict';
    var app = angular.module('myApp');
    app.controller('addTrainAdminController', addTrainAdminController);

    /** @ngInject */
    function addTrainAdminController($rootScope, $scope, ngDialog, $localStorage,$window) {
        if ($localStorage.access_token == undefined && $localStorage.access_token == null) {
            window.location = "/#/admin";
        }
    }
})();

