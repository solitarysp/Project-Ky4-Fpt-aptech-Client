'use strict';
var app = angular.module('myApp');
app.controller('showMessgarPayTicketController', controller);

function controller($scope, $location, $localStorage, ngDialog) {
    $scope.DetailsTicketRepon = $localStorage.DetailsTicket1;
    console.log($scope.DetailsTicketRepon);
    var vm = this;
    vm.test = test;

    function test() {
        console.log("đ")
    }
}