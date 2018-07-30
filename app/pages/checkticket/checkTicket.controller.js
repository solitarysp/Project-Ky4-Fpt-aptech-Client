(function () {
    'use strict';
    var app = angular.module('myApp');
    app.controller('checkTicketController', checkTicketController);

    /** @ngInject */
    function checkTicketController($rootScope, $scope, ngDialog, $location, $localStorage, $window, checkTicketService) {
        var paramValue = $location.search();

        $scope.searchData = [];
        $scope.checkPay = 1;
        $scope.searchData['type'] = 0;
        $scope.dataTicketSerach = {};
        $scope.total = 0;

        $scope.submitSearch = function () {
            if ($scope.validate()) {
                $scope.total = 0;
                $scope.message = "Vui lòng đợi trong giây lát";
                $scope.Dialog = ngDialog.open({
                    template: 'pages/dialogs/dialog-notification.html',
                    className: 'ngdialog-theme-default',
                    controller: 'DialogController',
                    scope: $scope,
                    width: 1000,
                });
                checkTicketService.checkTicket($scope.searchData).then(function (data) {
                    $scope.Dialog.close();
                    $scope.dataTicketSerach = data;
                    $scope.dataTicketSerach.forEach(function (data) {
                        data.ticketDtos.forEach(function (dataticket) {
                            $scope.total += dataticket.price;
                        })
                    })
                }, function (data) {
                    $scope.Dialog.close();
                })
            } else {
                $scope.message = "Vui Lòng Nhập Mã Vé hoặc Mã Phiếu";
                $scope.Dialog = ngDialog.open({
                    template: 'pages/dialogs/dialog.notificationHasButtonClose.html',
                    className: 'ngdialog-theme-default',
                    controller: 'DialogController',
                    scope: $scope,
                    width: 1000,
                });
            }

        };
        if (paramValue != undefined && paramValue.idPhieu != undefined) {
            $scope.searchData['type'] = 1;
            $scope.searchData['id'] = paramValue.idPhieu;
            $scope.submitSearch();
        }
        $scope.validate = function () {
            if ($scope.searchData.id == undefined || $scope.searchData.id == null || $scope.searchData.id == '') {
                return false;
            }
            return true;
        }
    }
})();

