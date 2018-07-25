(function () {
    'use strict';
    var app = angular.module('myApp');
    app.controller('cartController', cartController);

    /** @ngInject */
    function cartController($rootScope, $scope, ngDialog, $localStorage, $window) {
        $scope.DetailsTicket = [];
        $scope.validateInput = [];
        $scope.showinput = false;
        $scope.showinputPayOnline = true;
        $scope.totalPrice = 0;

        $scope.listSelect = $localStorage.listSelect;
        $scope.listSelect.forEach(value =>
            $scope.totalPrice += value.price
        );
        var socket = new SockJS(baseConfig.protocol + baseConfig.server + baseConfig.standardServicePort + baseConfig.baseUrlEnding + 'websocket');
        var stompClient = Stomp.over(socket);
        stompClient.connect({}, function (frame) {
            stompClient.subscribe('/topic/allSelectChair', function (greeting) {
                $localStorage.listSelectALL = JSON.parse(greeting.body);
                $scope.listSelectALL = $localStorage.listSelectALL;
            });
        });


        $scope.deleteDetails = function (index) {
            $scope.objectSelect = $scope.listSelect[index];
            $scope.objectSelect['select'] = false;
            stompClient.send("/sub_topic/allSelectChair", {}, JSON.stringify($scope.objectSelect));
            $scope.totalPrice-=$scope.listSelect[index].price;
            $scope.listSelect.splice(index, 1);
            $localStorage.listSelect = $scope.listSelect;


        };
    }
})();

