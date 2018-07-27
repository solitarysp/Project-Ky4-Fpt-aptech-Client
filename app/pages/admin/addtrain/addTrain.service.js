'use strict';

angular.module("myApp").service("addTrainService", addTrainService);

function addTrainService($http, $q, $httpParamSerializer, $localStorage) {
    var service = {

        addTrain: addTrain
    };
    return service;

    function addTrain(objectParam,) {
        var deferred = $q.defer();
        $http({
            url: baseConfig.protocol + baseConfig.server + baseConfig.standardServicePort + baseConfig.baseUrlEnding + "Trains"
            + "?access_token=" + $localStorage.access_token

            ,
            method: config.post,
            headers: {
                'Content-Type': "application/json"
            },
            data: objectParam
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
