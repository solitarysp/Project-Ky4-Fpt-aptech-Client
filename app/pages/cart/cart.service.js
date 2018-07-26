'use strict';

angular.module("myApp").service("cartService", cartService);

function cartService($http, $q) {
    var service = {

        funcBuyTicket: funcBuyTicket
    };
    return service;

    function funcBuyTicket(objectParam) {
        console.log(objectParam)
        var deferred = $q.defer();
        $http({
            url: baseConfig.protocol + baseConfig.server + baseConfig.standardServicePort + baseConfig.baseUrlEnding + "ticket",
            method: config.post,
            headers: {
                'Content-Type': "application/json"
            },
            data: objectParam
        })
            .then(
                function (response) {
                    deferred.resolve(response.data);
                },
                function (error) {
                    deferred.reject(error);
                }
            );
        return deferred.promise;
    }
}