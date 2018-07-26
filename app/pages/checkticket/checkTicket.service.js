'use strict';

angular.module("myApp").service("checkTicketService", checkTicketService);

function checkTicketService($http, $q,$httpParamSerializer) {
    var service = {

        checkTicket: checkTicket
    };
    return service;

    function checkTicket(dataInput) {
        var deferred = $q.defer();
        $http({
            url: baseConfig.protocol + baseConfig.server + baseConfig.standardServicePort + baseConfig.baseUrlEnding + "ticket/getByIdTauOridPhieu"
            +"?id="+dataInput.id+"&type="+dataInput.type,
            method: config.get,
        }).then(
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
