'use strict';
var app = angular.module('myApp');
app.controller('homeController', controller);

function controller($scope, searchService, $location, $localStorage) {
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
        searchService.getListTrain($scope.searchData).then(function (data) {
            if (data == null || data == undefined || data == '') {
                $scope.mess = mess.not_find;
            } else {
                $localStorage.searchData = $scope.searchData;
                $localStorage.Trains = data;
                window.location = "/#/search";

            }
        });
    }

}