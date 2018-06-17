'use strict';
var app = angular.module('myApp');
app.controller('searchController', controller);

function controller($scope, searchService, $location, $localStorage) {
    $scope.Train = $localStorage.Train;
    $localStorage.Train = null;
    $scope.showDetails = function (train) {
        $scope.chairTrainDetails = train.chairTrainSet;
        console.log($scope.chairTrainDetails)
    };

    $scope.doiChuyen = function (tau) {
        $scope.selectTau = tau.id;
        $scope.TrainDetail = tau.trainDetailSet;
    }

}