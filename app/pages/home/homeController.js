'use strict';
var app = angular.module('myApp');
app.controller('homeController', controller);

function controller($scope, searchService, $location, $localStorage, $window) {
    $scope.searchData = null;
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
    $scope.validateInput = function () {
        if ($scope.validateSearchData($scope.searchData)) {
            searchService.getListTrain($scope.searchData).then(function (data) {

                if ($scope.searchData.isOneWay == 1) {
                    if (data.ONE_WAY || data.Multil_WAY) {
                        $scope.mess = mess.not_find;
                        return;
                    }
                }

                if (data == null || data == undefined || data == '' || data.ONE_WAY == null) {
                    $scope.mess = mess.not_find;
                    return;
                }
                else {
                    $localStorage.searchData = $scope.searchData;
                    $localStorage.Trains = data;
                    window.location = "/#/search";
                    $window.location.reload();

                }
            });
        } else {
            $scope.mess = "vui long nhap day du cac value";

        }

    };
    $scope.validateSearchData = function (value) {
        if (value == null) {
            isValidate = false;
            return isValidate;
        }
        var isValidate = false;
        if (value.dateStart == null || value.dateEnd == null || value.tenGaDi == null || value.tenGaDen == null) {
            isValidate = false;
        } else {
            isValidate = true;

        }
        return isValidate;
    }
    $scope.changeDataStart = function () {
        if ($scope.searchData.isOneWay == 0) {
            $scope.searchData.dateEnd = $scope.searchData.dateStart;
        }
    };
    $scope.click1Chieu = function () {
        $scope.searchData.dateEnd = $scope.searchData.dateStart;
    }


}