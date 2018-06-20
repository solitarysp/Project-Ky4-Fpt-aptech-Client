(function () {
    'use strict';
    var app = angular.module('myApp');
    app.controller('DialogController', DialogController);

    /** @ngInject */
    function DialogController($rootScope, $scope, ngDialog, $localStorage) {
        if ($scope.chairSelect != null) {
            $scope.chairSelect = $scope.chairSelect;
        }
        if ($scope.chairTrainDetails != null) {
            $scope.chairTrainDetails = $scope.chairTrainDetails;
            console.log($scope.chairTrainDetails)
        }
        if ($localStorage.searchData != null) {
            $scope.searchData = $localStorage.searchData;
        }
        if ($scope.TrainDT != null) {
            $scope.TrainDT = $scope.TrainDT;
        }
    }


})();

