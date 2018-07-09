(function () {
    'use strict';
    var app = angular.module('myApp');
    app.controller('DialogController', DialogController);

    /** @ngInject */
    function DialogController($rootScope, $scope, ngDialog, $localStorage, dialogService) {
        $scope.DetailsTicket = [];
        $scope.validateInput = [];
        $scope.showinput = false;
        $scope.listSelect = $localStorage.listSelect;
        $scope.showinputClick = function () {
            $scope.showinput = !$scope.showinput;
        };

        $scope.deleteDetails = function (index) {
            $scope.listSelect.splice(index, 1);
            $localStorage.listSelect=$scope.listSelect;

        };
        $scope.isPayVisa = false;
        $scope.clickChangeSsPayVisa = function () {
            if ($scope.validateValue()) {
                $scope.isPayVisa = !$scope.isPayVisa;
            }

        };
        if ($scope.message != null) {
            $scope.message = $scope.message;
        }
        ;
        if ($scope.status != null) {
            $scope.status = $scope.status;
        }

        $scope.funcBuyTicket = function (isPay) {
            if ($scope.validateValue(isPay)) {
                $scope.listSelect = $localStorage.listSelect;
                $scope.listSelect.forEach(function (value) {
                    if (isPay == 1) {
                        value['pay'] = 1;
                    } else {
                        value['pay'] = 0;
                    }
                });
                dialogService.funcBuyTicket($scope.listSelect).then(function (data) {
                    $scope.message = data.message;
                    if ($localStorage.DetailsTicket == null) {
                        $localStorage.DetailsTicket = [];
                    }
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
                            $localStorage.DetailsTicket = data.data;
                            $localStorage.DetailsTicket1 = $localStorage.DetailsTicket;
                            window.location = "/#/showMessgarPayTicket";
                            $localStorage.DetailsTicket = null;
                            ngDialog.close();
                            break;
                    }

                });
            } else {
                console.log('null')
            }


        };
        $scope.validateValue = function (isPay) {
            var isValidate = true;
            if ($scope.DetailsTicket['nameADDre'] == null || $scope.DetailsTicket['nameADDre'].length < 1) {
                $scope.validateInput['name'] = false;
                var isValidate = false;
            } else {
                $scope.validateInput['name'] = true;

            }
            if ($scope.DetailsTicket['diaChi'] == null || $scope.DetailsTicket['diaChi'].length < 1) {
                $scope.validateInput['diaChi'] = false;
                var isValidate = false;
            } else {
                $scope.validateInput['diaChi'] = true;

            }
            if ($scope.DetailsTicket['phone'] == null || $scope.DetailsTicket['phone'].length < 1) {
                $scope.validateInput['phone'] = false;
                var isValidate = false;
            } else {
                $scope.validateInput['phone'] = true;
            }
            if (isPay == 1) {
                if ($scope.DetailsTicket['numberCart'] == null || $scope.DetailsTicket['numberCart'].length < 1) {
                    $scope.validateInput['numberCart'] = false;
                    var isValidate = false;
                } else {
                    $scope.validateInput['numberCart'] = true;
                }

                if ($scope.DetailsTicket['thangHetHan'] == null || $scope.DetailsTicket['thangHetHan'].length < 1) {
                    $scope.validateInput['thangHetHan'] = false;
                    var isValidate = false;
                } else {
                    $scope.validateInput['thangHetHan'] = true;
                }
                if ($scope.DetailsTicket['namHetHan'] == null || $scope.DetailsTicket['namHetHan'].length < 1) {
                    $scope.validateInput['namHetHan'] = false;
                    var isValidate = false;
                } else {
                    $scope.validateInput['namHetHan'] = true;
                }
                if ($scope.DetailsTicket['CVV'] == null || $scope.DetailsTicket['CVV'].length < 1) {
                    $scope.validateInput['CVV'] = false;
                    var isValidate = false;
                } else {
                    $scope.validateInput['CVV'] = true;
                }
            }
            return isValidate;
        };

    }


})();

