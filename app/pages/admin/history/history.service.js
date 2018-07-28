'use strict';

angular.module("myApp").service("historyService", historyService);

function historyService($http, $q, $httpParamSerializer, $localStorage) {
    var service = {

        getHistory: getHistory,
        getByIdAddress: getByIdAddress
    };
    return service;

    function getHistory(dataInput, page, trainId, dateStart) {
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

    function getByIdAddress(id, page) {
        var deferred = $q.defer();
        var url = "";
        if (id != undefined) {
            url += "?id=" + id;
            url += "&page=" + page
        }
        if (id == undefined) {
            url += "?page=" + page
        }
        $http({
            url: baseConfig.protocol + baseConfig.server + baseConfig.standardServicePort + baseConfig.baseUrlEnding + "address"
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
