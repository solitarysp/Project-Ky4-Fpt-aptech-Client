'use strict';

angular.module("myApp").service("searchService", searchService);

function searchService($http, $q) {
    var service = {

        getListTrain: getListTrain
    };
    return service;

    function getListTrain(searchData) {
        var deferred = $q.defer();
        $http.post(baseConfig.protocol + baseConfig.server + baseConfig.standardServicePort + baseConfig.baseUrlEnding + "getTrain?"
        +"dateStart="+searchData.dateStart
        +"&dateEnd="+searchData.dateEnd
        +"&locationStart="+searchData.tenGaDi
        +"&locationEnd="+searchData.tenGaDen
        ).success(
            function (response) {
                deferred.resolve(response);
            }
        );
        return deferred.promise;
    }

}
