'use strict';

angular.module("myApp").service("dialogService", dialogService);

function dialogService($http, $q) {
    var service = {

        funcBuyTicket: funcBuyTicket,
        updateTicket: updateTicket
    };
    return service;

    function funcBuyTicket(listSelect) {
        var mappingAll = [];
        listSelect.forEach(function (searchData) {
            var mapping = {};
            mapping['id'] = searchData.id;
            mapping['diaChi'] = searchData.diaChi;
            mapping['name'] = searchData.name;
            mapping['nameADDre'] = searchData.nameADDre;
            mapping['numberCar'] = searchData.numberCar;
            mapping['numberChair'] = searchData.numberChair;
            mapping['phone'] = searchData.phone;
            mapping['price'] = searchData.price;
            mapping['tenGaDen'] = searchData.tenGaDen;
            mapping['tenGaDi'] = searchData.tenGaDi;
            mapping['timeEndFilter'] = searchData.timeEndFilter;
            mapping['timeStartFilter'] = searchData.timeStartFilter;
            mapping['numberCart'] = searchData.numberCart;
            mapping['thangHetHan'] = searchData.thangHetHan;
            mapping['namHetHan'] = searchData.namHetHan;
            mapping['CVV'] = searchData.CVV;
            mapping['pay'] = searchData.pay;
            mappingAll.push(mapping);
        });

        var deferred = $q.defer();
        $http({
            url: baseConfig.protocol + baseConfig.server + baseConfig.standardServicePort + baseConfig.baseUrlEnding + "ticket",
            method: config.post,
            headers: {
                'Content-Type': "application/json"
            },
            data: mappingAll
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
    function updateTicket(param) {
        console.log(param)
        var deferred = $q.defer();
        $http({
            url: baseConfig.protocol + baseConfig.server + baseConfig.standardServicePort + baseConfig.baseUrlEnding + "ticket",
            method: config.put,
            headers: {
                'Content-Type': "application/json"
            },
            data: param
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
