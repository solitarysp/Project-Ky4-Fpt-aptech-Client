(function () {
    'use strict';
    var app = angular.module('myApp');
    app.controller('loginAdminController', loginAdminController);

    /** @ngInject */
    function loginAdminController($rootScope, $scope, ngDialog, $localStorage, loginAdminService,$window) {

        $scope.clickLogin = function () {
            $scope.data = {
                client_id: $scope.dataInput.userAdmin,
                client_secret: $scope.dataInput.password,
            };
            loginAdminService.clickLogin($scope.data).then(function (data) {
                if (data.access_token != undefined && data.access_token != null) {
                    $localStorage.access_token = data.access_token;
                    window.location = "/#/admin/home";
                    $window.location.reload();

                } else {
                    $scope.message = "đăng nhập thất bại, sai mật khẩu hoặc tk.";
                    ngDialog.open({
                        template: 'pages/dialogs/dialog-notification.html',
                        className: 'ngdialog-theme-default',
                        controller: 'DialogController',
                        scope: $scope,
                        width: 1000,
                    });
                }
            }, function (errResponse) {
                $localStorage.Trains = null;
                $scope.message = "đăng nhập thất bại, sai mật khẩu hoặc tk.";
                ngDialog.open({
                    template: 'pages/dialogs/dialog-notification.html',
                    className: 'ngdialog-theme-default',
                    controller: 'DialogController',
                    scope: $scope,
                    width: 1000,
                });
            });
        }
    }
})();

