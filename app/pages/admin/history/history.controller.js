(function () {
    'use strict';
    var app = angular.module('myApp');
    app.controller('historyAdminController', historyAdminController);

    /** @ngInject */
    function historyAdminController($rootScope, $scope, ngDialog, $localStorage,$window) {
        if ($localStorage.access_token == undefined && $localStorage.access_token == null) {
            window.location = "/#/admin";
        }
    }
})();

