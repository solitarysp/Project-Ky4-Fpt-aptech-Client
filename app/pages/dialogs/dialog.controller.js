(function () {
    'use strict';
    var app = angular.module('myApp');
    app.controller('DialogController', DialogController);

    /** @ngInject */
    function DialogController($rootScope, $scope, ngDialog, $localStorage, dialogService) {
        $scope.DetailsTicket = [];
        $scope.showinput = false;
        $scope.showinputClick = function () {
            $scope.showinput = !$scope.showinput;
        };
        if ($scope.message != null) {
            $scope.message = $scope.message;
        };
        if ($scope.status != null) {
            $scope.status = $scope.status;
        };
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

        $scope.funcBuyTicket = function () {
            $localStorage.DetailsTicket = $scope.DetailsTicket;
            dialogService.funcBuyTicket($scope.DetailsTicket).then(function (data) {
                $scope.message = data.message;
                $localStorage.thanhcongmuave = $localStorage.Trains;
                $localStorage.Trains = null;
            console.log($localStorage.thanhcongmuave)
                ngDialog.open({
                    template: 'pages/dialogs/dialog-notification.html',
                    className: 'ngdialog-theme-default',
                    controller: 'DialogController',
                    scope: $scope,
                    controllerAs: 'dialogCtrl',
                    width: 1000,
                });
            });
        }

    }


})();

