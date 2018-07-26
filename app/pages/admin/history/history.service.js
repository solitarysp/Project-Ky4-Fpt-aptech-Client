'use strict';

angular.module("myApp").service("historyService", historyService);

function historyService($http, $q, $httpParamSerializer) {
    var service = {

        getHistory: getHistory
    };
    return service;

    function getHistory(dataInput, page, trainId) {
        var deferred = $q.defer();
        var url = "";
        if (trainId != undefined) {
            url += "&trainId=" + trainId;
        }
        $http({
            url: baseConfig.protocol + baseConfig.server + baseConfig.standardServicePort + baseConfig.baseUrlEnding + "ticket/getTicket"
            + "?type=" + dataInput
            + "&page=" + page
            + url
            ,
            method: config.post,
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
