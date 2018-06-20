'use strict';

angular.module("myApp").service("dialogService", dialogService);

function dialogService($http, $q) {
    var service = {

        funcBuyTicket: funcBuyTicket
    };
    return service;

    function funcBuyTicket(searchData) {
        console.log(searchData);
    }

}
