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
        $scope.isPayVisa = false;
        $scope.clickChangeSsPayVisa = function () {
            $scope.isPayVisa = !$scope.isPayVisa;
        };
        if ($scope.message != null) {
            $scope.message = $scope.message;
        }
        ;
        if ($scope.status != null) {
            $scope.status = $scope.status;
        }
        ;
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


        $scope.funcBuyTicket = function (isPay) {
            $localStorage.DetailsTicket = $scope.DetailsTicket;
            if ($localStorage.DetailsTicket == null) {
                $localStorage.DetailsTicket = $scope.DetailsTicket;
            }
            if (isPay == 1) {
                $localStorage.DetailsTicket['pay'] = 1;
            } else {
                $localStorage.DetailsTicket['pay'] = 0;
            }
            console.log($localStorage.DetailsTicket['pay'])
            dialogService.funcBuyTicket($localStorage.DetailsTicket).then(function (data) {
                $scope.message = data.message;
                $localStorage.DetailsTicket['dataResponse'] = data;
                switch ($localStorage.DetailsTicket['dataResponse'].status) {
                    case '900':
                        ngDialog.open({
                            template: 'pages/dialogs/dialog-notification.html',
                            className: 'ngdialog-theme-default',
                            controller: 'DialogController',
                            scope: $scope,
                            controllerAs: 'dialogCtrl',
                            width: 1000,
                        });
                        break;
                    case '200':
                        $localStorage.thanhcongmuave = $localStorage.Trains;

                        $localStorage.Trains = null;
                        $localStorage.DetailsTicket['idTicket'] = data.data.idTicket;
                        $localStorage.DetailsTicket1 = $localStorage.DetailsTicket;
                        window.location = "/#/showMessgarPayTicket";
                        $localStorage.DetailsTicket = null;
                        ngDialog.close();
                        break;
                }

            });

        };
    }


})();

