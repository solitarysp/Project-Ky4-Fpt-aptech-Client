'use strict';
var app = angular.module('myApp');
app.controller('indexController', controller);

function controller($scope, $rootScope, $location, $localStorage, ngDialog, $window) {
    var socket = new SockJS(baseConfig.protocol + baseConfig.server + baseConfig.standardServicePort + baseConfig.baseUrlEnding + 'websocket');
    var stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {

    });
    $scope.listSelect = $localStorage.listSelect;
    $scope.access_token = $localStorage.access_token;
    $scope.logout = function () {
        $localStorage.access_token = null;
        window.location = "/#/admin/home";
        $window.location.reload();
    };
    setInterval(function () {
        if ($scope.listSelect != undefined && $scope.listSelect != null) {
            $scope.listSelect.forEach(function (object, index) {
                var date = new Date();
                var datse = new Date(object['timeCreate']);
                if (date.getTime() - datse.getTime() > 300000) {
                    $scope.objectSelect = $scope.listSelect[index];
                    $scope.objectSelect['select'] = false;
                    stompClient.send("/sub_topic/allSelectChair", {}, JSON.stringify($scope.objectSelect));
                    $scope.listSelect.splice(index, 1);
                }
            })
        }

    }, 800);
}