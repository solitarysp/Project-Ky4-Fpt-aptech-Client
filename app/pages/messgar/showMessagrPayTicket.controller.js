'use strict';
var app = angular.module('myApp');
app.controller('showMessgarPayTicketController', controller);

function controller($scope, $location, $localStorage, ngDialog) {
    $scope.DetailsTicketRepon = $localStorage.DetailsTicketrp;
    $scope.totalPrice = 0;
    console.log($scope.DetailsTicketRepon)
    $scope.DetailsTicketRepon.RP.forEach(value =>
        $scope.totalPrice += +value.price
    );
    var vm = this;
    vm.test = test;

    function test() {
        console.log("đ")
    }
}