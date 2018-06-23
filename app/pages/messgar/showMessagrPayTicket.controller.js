'use strict';
var app = angular.module('myApp');
app.controller('showMessgarPayTicketController', controller);

function controller($scope, $location, $localStorage, ngDialog) {
    $scope.DetailsTicket1 = $localStorage.DetailsTicket1;
    console.log($localStorage.DetailsTicket1)

}