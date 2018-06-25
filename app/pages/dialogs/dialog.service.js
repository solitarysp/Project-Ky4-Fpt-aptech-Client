'use strict';

angular.module("myApp").service("dialogService", dialogService);

function dialogService($http, $q) {
    var service = {

        funcBuyTicket: funcBuyTicket
    };
    return service;

    function funcBuyTicket(searchData) {
        var deferred = $q.defer();
        $http({
            url: baseConfig.protocol + baseConfig.server + baseConfig.standardServicePort + baseConfig.baseUrlEnding + "ticket",
            method: config.post,
            headers: {
                'Content-Type': "application/json"
            },
            data: {
                'id': searchData.id,
                'diaChi': searchData.diaChi,
                'name': searchData.name,
                'nameADDre': searchData.nameADDre,
                'numberCar': searchData.numberCar,
                'numberChair': searchData.numberChair,
                'phone': searchData.phone,
                'price': searchData.price,
                'tenGaDen': searchData.tenGaDen,
                'tenGaDi': searchData.tenGaDi,
                'timeEndFilter': searchData.timeEndFilter,
                'timeStartFilter': searchData.timeStartFilter,
                'numberCart': searchData.numberCart,
                'thangHetHan': searchData.thangHetHan,
                'namHetHan': searchData.namHetHan,
                'CVV': searchData.CVV,
                'pay': searchData.pay,
            }
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
