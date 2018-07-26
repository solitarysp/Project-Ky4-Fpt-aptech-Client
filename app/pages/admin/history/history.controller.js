(function () {
    'use strict';
    var app = angular.module('myApp');
    app.controller('historyAdminController', historyAdminController);

    /** @ngInject */
    function historyAdminController($rootScope, $scope, ngDialog, $localStorage, $window, historyService, $timeout) {
        if ($localStorage.access_token == undefined && $localStorage.access_token == null) {
            window.location = "/#/admin";
        }
        $scope.isFindByIdTrain = false;
        $scope.isFindByDateStart = false;
        $scope.dataSearchHistory = {};
        $scope.clickFindByIdTrain = function () {
            $scope.isFindByIdTrain = !$scope.isFindByIdTrain;
            $scope.dataSearchHistory.trainId = null;
            $scope.isFindByDateStart = false;

        }

        $scope.clickFindByDateStart = function () {
            $scope.isFindByIdTrain = false;
            $scope.isFindByDateStart = !$scope.isFindByDateStart;
            $scope.dataSearchHistory.trainId = null;
        };
        $(document).ready(function () {

            var date_input = $('#dateStart'); //our date input has the name "date"
            var dateEnd = $('#dateEnd'); //our date input has the name "date"
            var container = $('.bootstrap-iso form').length > 0 ? $('.bootstrap-iso form').parent() : "body";
            var options = {
                format: 'dd/mm/yyyy',
                container: container,
                todayHighlight: true,
                autoclose: true,
            };
            date_input.datepicker(options);
            dateEnd.datepicker(options);
        });

        $scope.getHistory = function (type, page) {
            $scope.currentPage = page;
            historyService.getHistory(type, page, $scope.dataSearchHistory.trainId).then(function (data) {
                $scope.data = data;
                $scope.datas = data.data;
                $scope.totalElement = $scope.data.paging.totalElements;
                $scope.pageSize = $scope.data.paging.totalElements;
            }, function (data,status) {
            console.log(data)
            console.log(status)
                if (data.status == "401"||data.status == "-1") {
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

