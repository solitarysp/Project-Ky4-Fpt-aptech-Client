(function () {
    'use strict';
    var app = angular.module('myApp');
    app.controller('addTrainAdminController', addTrainAdminController);

    /** @ngInject */
    function addTrainAdminController($rootScope, $scope, ngDialog, $localStorage, $window, addTrainService, $timeout) {
        if ($localStorage.access_token == undefined && $localStorage.access_token == null) {
            window.location = "/#/admin";
        }
        $scope.dataCreate = {};
        $(document).ready(function () {

            var date_input = $('#dateStart'); //our date input has the name "date"
            $('#dateStart').datetimepicker({
                format: 'YYYY-MM-DD HH:mm',
            });
            var date_input = $('#dateEnd'); //our date input has the name "date"
            $('#dateEnd').datetimepicker({
                format: 'YYYY-MM-DD HH:mm',
            });
        });


        $scope.changeSoToaTau = function () {
            var numberToa = $scope.dataCreate.SoToaTau;
            $scope.trainDetailSet = [];
            for (let i = 1; i <= numberToa; i++) {
                $scope.detailSet = {};
                $scope.detailSet.numberCar = i;
                $scope.trainDetailSet.push($scope.detailSet);
            }
            $scope.dataCreate.trainDetailSet = $scope.trainDetailSet;
        };

        $scope.changeDetails = function (number) {
            $scope.isChooseDetailNumber = true;
            $scope.chooseDetailNumberParam = number - 1;
            $scope.type = 1;
            ngDialog.open({
                template: 'pages/dialogs/dialog.addDetailTrain.html',
                className: 'ngdialog-theme-default',
                controller: 'DialogController',
                scope: $scope,
                width: 1000,
            });
        };
        $scope.changeLocalNumber = function (number) {
            $scope.chooseDetailNumber = number;
            $scope.chairTrainDetails = $scope.dataCreate.trainDetailSet[number - 1];
        };

        $scope.changeDetailChair = function (number) {
            $scope.changeDatailChair = $scope.chairTrainDetails.chairTrainSet[number];
            $scope.type = 2;
            ngDialog.open({
                template: 'pages/dialogs/dialog.addChairTrain.html',
                className: 'ngdialog-theme-default',
                controller: 'DialogController',
                scope: $scope,
                width: 1000,
            });
        };

        $scope.changedataSatrt = function () {
            $scope.dataCreate.timeStart = $("#dateStart").data("date");
            var dateStart = new Date($scope.dataCreate.timeStart);
            $scope.dataCreate.timeStart = dateStart.getTime();

            $scope.dataCreate.timeEnd = $("#dateEnd").data("date");
            var dateEND = new Date($scope.dataCreate.timeEnd);
            $scope.dataCreate.timeEnd = dateEND.getTime();

        };

        $scope.createAndValidate = function () {
            addTrainService.addTrain($scope.dataCreate).then(function (data) {
                if (data.status == 'true') {
                    $scope.message = "thêm train thành công";
                    ngDialog.open({
                        template: 'pages/dialogs/dialog-notification.html',
                        className: 'ngdialog-theme-default',
                        controller: 'DialogController',
                        scope: $scope,
                        width: 1000,
                    });
                    $scope.dataCreate = null;
                    $timeout(function () {
                        window.location = "/#/home";
                        $window.location.reload();
                    }, 2050);
                } else {
                    $scope.message = "Có lỗi chưa xác định ";
                    ngDialog.open({
                        template: 'pages/dialogs/dialog-notification.html',
                        className: 'ngdialog-theme-default',
                        controller: 'DialogController',
                        scope: $scope,
                        width: 1000,
                    });
                }

            }, function (data, status) {
                if (data.status == "401" || data.status == "-1") {
                    $localStorage.access_token = null;
                    $scope.message = "Bạn Không Có quyền truy cập vui vui lòng đăng nhập lại ";
                    ngDialog.open({
                        template: 'pages/dialogs/dialog-notification.html',
                        className: 'ngdialog-theme-default',
                        controller: 'DialogController',
                        scope: $scope,
                        width: 1000,
                    });
                    $timeout(function () {
                        $localStorage.access_token = null;
                        window.location = "/#/admin";
                        $window.location.reload();
                    }, 2050);
                }
            })
        }

    }
})();

