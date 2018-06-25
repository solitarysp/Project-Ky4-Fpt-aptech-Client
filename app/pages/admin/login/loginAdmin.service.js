'use strict';

angular.module("myApp").service("loginAdminService", loginAdminService);

function loginAdminService($http, $q,$httpParamSerializer) {
    var service = {

        clickLogin: clickLogin
    };
    return service;

    function clickLogin(dataInput) {
        var deferred = $q.defer();
        $http({
            url: baseConfig.protocol + baseConfig.server + baseConfig.standardServicePort + baseConfig.baseUrlEnding + "oauth/token?client_id="+dataInput.client_id+"&client_secret="+dataInput.client_secret+"&grant_type=client_credentials",
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
