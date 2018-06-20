'use strict';
var app = angular.module('myApp');
app.controller('searchController', controller);

function controller($scope, searchService, $location, $localStorage, ngDialog) {
    $scope.Trains = $localStorage.Trains;
    $scope.searchData = $localStorage.searchData;

    $scope.Trains.forEach(function (entry) {
        console.log(entry);
        entry.timeStartFilter = entry.scheduleTrainSet.filter(function (item) {
            return item.locationStart == $scope.searchData.tenGaDi;
        })[0].timeStart;

        entry.timeEndFilter = entry.scheduleTrainSet.filter(function (item) {
            return item.locationEnd == $scope.searchData.tenGaDen;
        })[0].timeEnd;

    });
    $scope.showDetails = function (train) {
        $scope.chairTrainDetails = train;
    };

    $scope.doiChuyen = function (tau) {
        $scope.selectTau = tau.id;
        $scope.TrainDetail = tau.trainDetailSet;
        console.log(tau);


    };
    $scope.clickChair = function (chair, chairTrainDetails) {
        $scope.chairSelect = chair;
        $scope.chairTrainDetails = chairTrainDetails;
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