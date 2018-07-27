'use strict';

angular.module("myApp").service("historyService", historyService);

function historyService($http, $q, $httpParamSerializer,$localStorage) {
    var service = {

        getHistory: getHistory
    };
    return service;

    function getHistory(dataInput, page, trainId,dateStart) {
        var deferred = $q.defer();
        var url = "";
        if (trainId != undefined) {
            url += "&trainId=" + trainId;
        }
        if (dateStart != undefined) {
            url += "&dateStart=" + dateStart
        }
        $http({
            url: baseConfig.protocol + baseConfig.server + baseConfig.standardServicePort + baseConfig.baseUrlEnding + "ticket/getTicket"
            + "?type=" + dataInput
            + "&page=" + page
            + url
            + "&access_token=" + $localStorage.access_token

            ,
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
