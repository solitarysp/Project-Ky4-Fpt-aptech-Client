'use strict';
var app = angular.module('myApp');
app.controller('searchController', controller);

function controller($scope, $rootScope, searchService, $location, $localStorage, ngDialog) {
    $scope.Trains = $localStorage.Trains;
    $scope.searchData = $localStorage.searchData;

    $scope.DetailsTicket = [];
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


    };


    $scope.clickChair = function (chair, chairTrainDetails, isSelect) {
        $scope.listSelect = $localStorage.listSelect;
        console.log($localStorage.listSelect);
        if($scope.listSelect==undefined){
            $scope.listSelect=[];
        }
        if (chair.byTicket == true) {
            $scope.chairSelect = chair;
            $scope.chairTrainDetails = chairTrainDetails;
            var details = $scope.getDetailsTicket();
            if ($localStorage.listSelect == undefined && $localStorage.listSelect == null) {
                $localStorage.listSelect = [];
            }
            var index = $scope.listSelect.map(function (object) {
                return object.id + object.numberCar + object.numberChair;
            }).indexOf(details.id + details.numberCar + details.numberChair);

            if (isSelect) {
                $scope.listSelect.push(details);
                chair.select = true;
            } else {
                if (index >= 0) {
                    chair.select = false;
                    $scope.listSelect.splice(index, 1);
                }
            }
            $localStorage.listSelect=$scope.listSelect;
        }
    };
    $scope.getDetailsTicket = function () {
        $scope.DetailsTicket = {};
        if ($scope.chairSelect != null) {
            $scope.chairSelect = $scope.chairSelect;
            $scope.DetailsTicket['numberChair'] = $scope.chairSelect.numberChair;
            $scope.DetailsTicket['price'] = $scope.chairSelect.price;
        }
        if ($scope.chairTrainDetails != null) {
            $scope.chairTrainDetails = $scope.chairTrainDetails;
            $scope.DetailsTicket['numberCar'] = $scope.chairTrainDetails.numberCar;
        }
        if ($localStorage.searchData != null) {
            $scope.searchData = $localStorage.searchData;
            $scope.DetailsTicket['tenGaDi'] = $scope.searchData.tenGaDi;
            $scope.DetailsTicket['tenGaDen'] = $scope.searchData.tenGaDen;
        }
        if ($localStorage.Trains != null) {
            $scope.Trains = $localStorage.Trains;

            var index = $scope.Trains.map(function (object) {
                return object.id;
            }).indexOf($scope.chairTrainDetails.idTrain)
            $scope.train = $scope.Trains[index];

            $scope.DetailsTicket['id'] = $scope.train.id;
            $scope.DetailsTicket['name'] = $scope.train.name;

            $scope.DetailsTicket['timeStartFilter'] = $scope.train.scheduleTrainSet.filter(function (item) {
                return item.locationStart == $scope.searchData.tenGaDi;
            })[0].timeStart;

            $scope.DetailsTicket['timeEndFilter'] = $scope.train.scheduleTrainSet.filter(function (item) {
                return item.locationEnd == $scope.searchData.tenGaDen;
            })[0].timeEnd;
        }
        return $scope.DetailsTicket;
    };
    $scope.testShow = function () {
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