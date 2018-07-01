(function () {
    'use strict';
    var app = angular.module('myApp');
    app.controller('homeAdminController', homeAdminController);

    /** @ngInject */
    function homeAdminController($rootScope, $scope, ngDialog, $localStorage) {
        if ($localStorage.access_token == undefined && $localStorage.access_token == null) {
            window.location = "/#/admin";
        }
    }
})();

