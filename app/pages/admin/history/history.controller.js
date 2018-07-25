(function () {
    'use strict';
    var app = angular.module('myApp');
    app.controller('historyAdminController', historyAdminController);

    /** @ngInject */
    function historyAdminController($rootScope, $scope, ngDialog, $localStorage) {
        console.log("f");
    }
})();

