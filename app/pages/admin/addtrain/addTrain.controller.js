(function () {
    'use strict';
    var app = angular.module('myApp');
    app.controller('addTrainAdminController', addTrainAdminController);

    /** @ngInject */
    function addTrainAdminController($rootScope, $scope, ngDialog, $localStorage, $window) {
        if ($localStorage.access_token == undefined && $localStorage.access_token == null) {
            window.location = "/#/admin";
        }
        $scope.dataCreate = {};
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


        $scope.changeSoToaTau = function () {
            var numberToa = $scope.dataCreate.SoToaTau;
            $scope.trainDetailSet = [];
            for (let i = 1; i <= numberToa; i++) {
                $scope.detailSet = {};
                $scope.trainDetailSet.push($scope.detailSet);
            }
            $scope.dataCreate.trainDetailSet = $scope.trainDetailSet;
        };

        $scope.changeDetails = function (number) {
            $scope.isChooseDetailNumber = true;
            $scope.chooseDetailNumber = number-1;
            ngDialog.open({
                template: 'pages/dialogs/dialog.addDetailTrain.html',
                className: 'ngdialog-theme-default',
                controller: 'DialogController',
                scope: $scope,
                width: 1000,
            });
        }
        $scope.changeLocalNumber = function (number) {
            $scope.chooseDetailNumber = number-1;
            $scope.chairTrainDetails = $scope.dataCreate.trainDetailSet[number-1];
        }
    }
})();

